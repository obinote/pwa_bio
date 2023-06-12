import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/product/services/graphql/schema';
import * as ActionSchema from '@core_modules/product/services/graphql/actionSchema';
import * as CustomizableSchema from '@core_modules/product/services/graphql/customizableSchema';

const defaultConfig = {

};

export const getProduct = (config = {}, options = {}) => useQuery(Schema.getProduct(config), {
    ...defaultConfig,
    ...options,
    fetchPolicy: 'cache-and-network',
});

export const getProductLabel = (config = {}, options = {}) => useQuery(Schema.getProductLabel(config), {
    ...defaultConfig,
    ...options,
});

export const getRelatedProduct = (config, options = {}) => useQuery(Schema.getRelatedProduct(config), {
    ...defaultConfig,
    ...options,
});

export const getUpsellProduct = (config = {}, options = {}) => useQuery(Schema.getUpsellProduct(config), {
    ...defaultConfig,
    ...options,
});

export const getCustomizableOption = (urlpath) => useLazyQuery(CustomizableSchema.getCustomizableOption(urlpath), {
    ...defaultConfig,
    fetchPolicy: 'no-cache',
});

export const smartProductTabs = (params) => useLazyQuery(Schema.smartProductTabs(), {
    ...defaultConfig,
    variables: {
        ...params,
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'cache-and-network',
});

export const getProductBySku = (config, params) => useQuery(Schema.getProductBySku(config), {
    ...params,
    ...defaultConfig,
    context: {
        request: 'internal',
    },
});

export const getReviews = (params) => useQuery(Schema.getReview(), {
    variables: {
        ...params,
    },
    fetchPolicy: 'cache-and-network',
});

export const addReview = () => useMutation(Schema.addReview, {
    context: {
        request: 'internal',
    },
});

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getConfigurableProduct = (config = {}, params = {}) => useQuery(Schema.getConfigurableProduct(config), {
    ...defaultConfig,
    ...params,
});
export const getBundleProduct = (sku) => useQuery(Schema.getBundleProduct(sku), {
    ...defaultConfig,
});
export const getDownloadroduct = (sku) => useQuery(Schema.getDownloadProduct(sku), {
    ...defaultConfig,
});
export const getGroupedProduct = (config = {}, params = {}) => useQuery(Schema.getGroupedProduct(config), {
    ...defaultConfig,
    ...params,
});

// actions add to cart

export const addProductsToCartCustom = () => useMutation(ActionSchema.addProductsToCartCustom, {
    context: {
        request: 'internal',
    },
});

export const addSimpleProductsToCart = () => useMutation(ActionSchema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addVirtualProductToCart = () => useMutation(ActionSchema.addVirtualProductToCart, {
    context: {
        request: 'internal',
    },
});

export const addDownloadProductToCart = () => useMutation(ActionSchema.addDownloadableProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addConfigProductsToCart = () => useMutation(ActionSchema.addConfigProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addConfigurableProductsToCart = () => useMutation(ActionSchema.addConfigurableProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addBundleProductsToCart = () => useMutation(ActionSchema.addBundleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addGiftCardProductsToCart = () => useMutation(ActionSchema.addGiftCardProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const getGuestCartId = () => useMutation(ActionSchema.createCartIdGuest, {
    context: {
        request: 'internal',
    },
});
export const getCustomerCartId = () => useLazyQuery(ActionSchema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const addProductsToCart = () => useMutation(ActionSchema.addProductToCart, {
    context: {
        request: 'internal',
    },
});

export const getProductBannerLite = (urlpath, options = {}) => useLazyQuery(Schema.getProductBannerLite(urlpath), {
    ...defaultConfig,
    ...options,
});

export const createCompareList = () => useMutation(Schema.createCompareList, {
    context: {
        request: 'internal',
    },
});

export const addProductsToCompareList = () => useMutation(Schema.addProductsToCompareList, {
    context: {
        request: 'internal',
    },
});

export const getRequisitionList = (options = {}) => useQuery(Schema.getRequisitionList, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export const createRequisitionList = (variables) => useMutation(Schema.createRequisitionList, {
    variables,
    context: {
        request: 'internal',
    },
});

export const addItemToRequisitionList = (variables) => useMutation(Schema.addItemToRequisitionList, {
    variables,
    context: {
        request: 'internal',
    },
});

export const getProductShippingRate = (options = {}) => useQuery(Schema.getProductShippingRate, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export const getProductDetailInformation = (options = {}) => useQuery(Schema.getProductDetailInformation, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export const getPromoRecommendation = (options = {}) => useQuery(Schema.getPromoRecommendation, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export const getProductPrivateEvent = (options = {}) => useQuery(Schema.getProductPrivateEvent, {
    fetchPolicy: 'no-cache',
    ...options,
    context: {
        request: 'internal',
    },
});

export const writeProductViewReportMutation = (productId) => useMutation(ActionSchema.writeProductViewReport, {
    variables: { productId },
    context: {
        request: 'internal',
    },
});

export const writeCartProductsReportMutation = (productId) => useMutation(ActionSchema.writeCartProductReport, {
    variables: { productId },
    context: {
        request: 'internal',
    },
});

export default { getProduct, getProductDetailInformation, getPromoRecommendation };
