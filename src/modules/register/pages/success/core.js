/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Layout from '@layout';
import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

const Register = (props) => {
    const {
        t, pageConfig, Content, query,
    } = props;

    const data = query;

    React.useEffect(() => {
        if (!data.name) {
            Router.push('/customer/account/login');
        }
    }, [data]);

    const config = {
        title: t('register:success'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('register:success'),
        bottomNav: false,
    };

    if (!data.name) {
        return (<div />);
    }

    const coreProps = {
        data,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                {...props}
                t={t}
                {...coreProps}
            />
        </Layout>
    );
};

export default Register;
