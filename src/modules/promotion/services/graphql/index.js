/* eslint-disable import/prefer-default-export */
import { useLazyQuery, useQuery } from '@apollo/client';
import Schema from '@core_modules/promotion/services/graphql/schema';

export const getCustomerPromotionList = () => useLazyQuery(Schema.customerPromotionList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
});
