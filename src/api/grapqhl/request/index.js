/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient, gql } = require('graphql-request');
const { graphqlEndpoint, storeCode } = require('../../../../swift.config');

const { decrypt } = require('../../../../core/helpers/encryption');
const { getAppEnv } = require('../../../../core/helpers/env');

function requestGraph(query, variables = {}, context = {}, config = {}) {
    let token = '';
    if (config.token) {
        token = `Bearer ${config.token}`;
    } else if (context.session || context.headers) {
        token = context.session.token ? `Bearer ${decrypt(context.session.token)}`
            : context.headers.authorization ? context.headers.authorization : '';
    }

    if (config.method && config.method === 'GET') {
        return new Promise((resolve) => {
            const appEnv = getAppEnv();

            const graphQLClient = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
                method: 'GET',
                jsonSerializer: {
                    parse: JSON.parse,
                    stringify: JSON.stringify,
                },
            });

            const req = gql`
                ${query}
            `;
            graphQLClient
                .request(req, variables)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => resolve(err));
        });
    }

    return new Promise((resolve) => {
        const additionalHeader = storeCode ? { store: storeCode } : {};
        if (token && token !== '') {
            additionalHeader.Authorization = token;
        }
        const headers = {
            ...additionalHeader,
        };
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
