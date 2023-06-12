import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getArProduct = (options = {}) => useQuery(Schema.getArProduct, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export default {
    getArProduct,
};
