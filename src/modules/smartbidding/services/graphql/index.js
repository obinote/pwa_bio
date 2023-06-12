import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/smartbidding/services/graphql/schema';

export const getBiddingList = (variables) => useQuery(Schema.getBiddingList, {
    context: {
        request: 'internal',
    },
    variables,
});

export const createBiddingList = (variables) => useMutation(Schema.createBiddingList, {
    context: {
        request: 'internal',
    },
    variables,
});

export const createBiddingDraft = (variables) => useMutation(Schema.createBiddingDraft, {
    context: {
        request: 'internal',
    },
    variables,
});

export const saveBiddingList = (variables) => useMutation(Schema.saveBiddingList, {
    context: {
        request: 'internal',
    },
    variables,
});

export const saveBiddingDraft = (variables) => useMutation(Schema.saveBiddingDraft, {
    context: {
        request: 'internal',
    },
    variables,
});

export const getBiddingDetails = (variables) => useQuery(Schema.getBiddingDetails, {
    context: {
        request: 'internal',
    },
    variables,
});

export const cancelBidding = (variables) => useMutation(Schema.cancelBidding, {
    context: {
        request: 'internal',
    },
    variables,
});

export default {
    getBiddingList,
    createBiddingList,
    createBiddingDraft,
    saveBiddingDraft,
    saveBiddingList,
    getBiddingDetails,
    cancelBidding,
};
