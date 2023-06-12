/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/distributor/services/graphql/shema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

export const getDistributorList = (options = {}) => useQuery(Schema.getDistributors, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getDistributorDetail = (variables) => useQuery(Schema.getDistributor, {
    variables,
    context: {
        request: 'internal',
    },
});

export const getDistributorEtalase = (variables) => useQuery(Schema.getDistributorEtalase, {
    variables,
});

export const registerToDistributor = (options = {}) => useMutation(Schema.registerToDistributor, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getPromoList = (options) => useLazyQuery(Schema.getPromoList, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'no-cache',
});

export const getProductPromoList = (options = {}) => useQuery(Schema.getProductPromoListSchema, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...options,
});

export const getVendorReviewByCompany = (options = {}) => useLazyQuery(Schema.getVendorReviewByCompany, {
    ...options,
});

export const getOmsAccessKey = () => useQuery(Schema.getOmsAccessKey, {
    skip: !isLogin,
});
