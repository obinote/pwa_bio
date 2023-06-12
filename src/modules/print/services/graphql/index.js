import { useQuery } from '@apollo/client';
import * as Schema from '@src_modules/print/services/graphql/schema';

export const getOrderPrintAsGuest = (variables) => useQuery(Schema.getOrderPrintAsGuest, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getInvoicePrintAsGuest = (variables) => useQuery(Schema.getInvoicePrintAsGuest, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getShipmentPrintAsGuest = (variables) => useQuery(Schema.getShipmentPrintAsGuest, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getQuotationPrintAsGuest = (variables) => useQuery(Schema.getQuotationPrintAsGuest, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getRequisitionPrintAsGuest = (variables) => useQuery(Schema.getRequisitionPrintAsGuest, {
    context: {
        request: 'internal',
    },
    variables,
});

export default {
    getOrderPrintAsGuest,
    getInvoicePrintAsGuest,
    getShipmentPrintAsGuest,
    getQuotationPrintAsGuest,
    getRequisitionPrintAsGuest,
};
