import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as schemaCategory from '@core_modules/catalog/services/graphql/categorySchema';
import * as productSchema from '@core_modules/catalog/services/graphql/productSchema';

export const getProduct = (config, otherConfig = {}) => useQuery(productSchema.getProduct(config), {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'cache-first',
    ...otherConfig,
});
export const getCategoryUrlPath = () => useLazyQuery(schemaCategory.getCategoryUrlPath);
export const getProductAgragations = () => useQuery(productSchema.getProductAgragations(), {
    fetchPolicy: 'cache-first',
    context: {
        request: 'internal',
    },
});
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables), {
});
export const getCategoryProducts = (variables) => useQuery(schemaCategory.getCategoryProducts(variables), {
    context: {
        request: 'internal',
    },
});
export const getFilter = (catId) => useQuery(schemaCategory.getFilter(catId), { ssr: true });
export const addWishlist = () => useMutation(productSchema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getDetailProduct = (config = {}) => useLazyQuery(productSchema.getDetailProduct(config), {
});

export const getPwaConfig = () => useQuery(schemaCategory.configpwa);

export const getCategoryPrivateEvent = (options = {}) => useQuery(schemaCategory.getCategoryPrivateEvent, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export default { getCategory, getCategoryProducts, getCategoryUrlPath };
