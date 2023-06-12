import { useLazyQuery } from '@apollo/client';
import Schema from '@core_modules/digitalsign/services/graphql/schema';

// const NOT_USING_INTERNAL = false;
const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

const getOrderLetter = (options = {}) => useLazyQuery(Schema.getOrderLetter, {
    ...options,
    ...config(USING_INTERNAL),
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
});

export default { getOrderLetter };
