import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/order/services/graphql/schema';

export const getPaymentInformation = (params) => useQuery(Schema.getPaymentInformation, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const getOrder = (params) => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
});
export const getOrderDownloadable = () => useQuery(Schema.getCustomerOrderDownloadable, {
    context: {
        request: 'internal',
    },
});

export const getOrderDetail = (params) => useQuery(Schema.getCustomerOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const getOrderForPrint = (variables) => useQuery(Schema.getCustomerOrderDetail, {
    context: { request: 'internal' },
    variables,
});

export const getInvoiceForPrint = (orderId) => useQuery(Schema.getCustomerInvoice, {
    context: { request: 'internal' },
    variables: { orderId },
});

export const getShipmentForPrint = (orderId) => useQuery(Schema.getCustomerShipment, {
    context: { request: 'internal' },
    variables: { orderId },
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export const getTrackingOrder = (params) => useQuery(Schema.getTrackingOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export const getCustomerOrderOverdue = (variables) => useQuery(Schema.getCustomerOrderOverdue, {
    context: {
        request: 'internal',
    },
    variables,
    fetchPolicy: 'cache-and-network',
});

export const getCustomerOrderOutstanding = (variables) => useQuery(Schema.getCustomerOrderOutstanding, {
    context: {
        request: 'internal',
    },
    variables,
    fetchPolicy: 'cache-and-network',
});

export const mutationCreateBilling = () => useMutation(Schema.mutationCreateBilling, {
    context: {
        request: 'internal',
    },
});

export const getAvailableBillOrderInvoice = (variables) => useQuery(Schema.getAvailableBillOrderInvoice, {
    context: {
        request: 'internal',
    },
    variables,
    fetchPolicy: 'cache-and-network',
});

export const getBillingPayment = (variables) => useQuery(Schema.getBillingPayment, {
    context: {
        request: 'internal',
    },
    variables,
});

export const dataSnapBillingPaymentUrl = (variables) => useLazyQuery(Schema.dataSnapBillingPaymentUrl, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getRefundForm = (variables) => useMutation(Schema.getRefundForm, {
    context: {
        request: 'internal',
    },
    variables,
});

export const sendOrderCompletion = () => useMutation(Schema.sendOrderCompletion, {
    context: {
        request: 'internal',
    },
});

export const setOrderRating = () => useMutation(Schema.setOrderRating, {
    context: {
        request: 'internal',
    },
});

export const getOrderRating = (variables) => useQuery(Schema.getOrderRating, {
    context: {
        request: 'internal',
    },
    variables,
});

export const trackOrderHistory = (params) => useQuery(Schema.trackOrderHistory, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const getVendorReview = (variables) => useLazyQuery(Schema.getVendorReview, {
    context: {
        request: 'oms',
    },
    variables,
});

export default {
    getOrder,
    reOrder,
    getCustomerOrderOverdue,
    getCustomerOrderOutstanding,
    mutationCreateBilling,
    getAvailableBillOrderInvoice,
    getBillingPayment,
    dataSnapBillingPaymentUrl,
    sendOrderCompletion,
    setOrderRating,
    trackOrderHistory,
    getVendorReview,
};
