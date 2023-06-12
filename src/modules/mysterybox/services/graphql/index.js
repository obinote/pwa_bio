import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/mysterybox/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCustomerMisteryBoxAvailable = (options) => useQuery(Schema.getCustomerMisteryBoxAvailable, {
    ...options, ...context, ...fetchPolicy,
});

export const getPrize = (variables) => useMutation(Schema.getPrize, {
    variables,
    ...context,
});

export default {
    getCustomerMisteryBoxAvailable,
    getPrize,
};
