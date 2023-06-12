import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

const isLogin = 0;
if (typeof window !== 'undefined') {
    // isLogin = getLoginInfo();
}

export const getCmsPageIdentifier = (variables) => useLazyQuery(Schema.getCmsPageIdentifier, { variables });

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    ...(isLogin && { fetchPolicy: 'network-only' }),
});
export const getInstagramToken = () => useLazyQuery(Schema.getInstagramToken);

export const getPageBuilderTemplate = (variables) => useQuery(Schema.getPageBuilderTemplate, {
    variables,
});

// mutation
export const getInstagramFeed = () => useMutation(Schema.getInstagramFeed, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : '',
});

export const getProductReviews = (variables) => useQuery(Schema.getProductReviews, { variables });
export const getProductList = (variables) => useQuery(Schema.getProductList, {
    variables,
    context: {
        request: 'internal',
    },
});
export const getCategories = (variables) => useQuery(Schema.getCategories, { variables });
export const getCmsPages = (identifier) => useQuery(Schema.getCmsPages(identifier));
export const getSliderBanner = (sliderId) => useQuery(Schema.getSliderBanner(sliderId));
export const getProductRecommend = (variables) => useLazyQuery(Schema.getProductRecommend, {
    variables,
    context: {
        request: 'internal',
    },
});

export const getRecentlyViewedProduct = (variables) => useMutation(Schema.getRecentlyViewedProduct, {
    variables,
    context: {
        request: 'internal',
    },
});

export default { getCmsPage, getProductRecommend };
