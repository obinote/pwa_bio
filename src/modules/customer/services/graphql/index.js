import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { getLoginInfo } from '@helper_auth';
import * as Schema from './schema';

// CHAT RELATED SCHEMA

export const getSessionMessageList = (options = {}) => useQuery(Schema.getSessionMessageListSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const addMessage = (options = {}) => useMutation(Schema.addMessageSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const terminateSession = (options = {}) => useMutation(Schema.terminateSessionSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const createFirebaseDoc = (options = {}) => useMutation(Schema.createFirebaseDocSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getMessageList = (options = {}) => useLazyQuery(Schema.getMessageListSchema, {
    ...options,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
    skip: typeof window === 'undefined',
});

export const getBlacklist = (options = {}) => useQuery(Schema.getBlacklistSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getAgentList = (options = {}) => useQuery(Schema.getAgentListSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const addActiveSession = (options = {}) => useMutation(Schema.addActiveSessionSchema, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const markUnreadMessage = () => useMutation(Schema.markUnreadMessage, {
    context: {
        request: 'internal',
    },
});

export const getVendorLogo = () => useLazyQuery(Schema.getVendorLogo);

// END CHAT RELATED SCHEMA

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

const config = {
    context: {
        request: 'internal',
    },
};

export const getRegions = () => useLazyQuery(Schema.getRegion);

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export const getCustomerCompanyDetail = () => useQuery(Schema.getCustomerCompanyDetail, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerCompanyEditValues = (options = {}) => useQuery(Schema.CUSTOMER_COMPANY_EDIT_VALUES, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...options,
});

export const getCustomer = (otherConfig = {}) => useQuery(Schema.getCustomer(otherConfig), {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerAddress = () => useQuery(Schema.getCustomerAddress, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerMembership = () => useQuery(Schema.getCustomerMembership, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerOrderSummary = () => useQuery(Schema.getCustomerOrderSummary, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});
export const getDataCustomer = () => useQuery(Schema.getDataCustomer, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerOrder = () => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
});

export const getCustomerSettings = () => useQuery(Schema.getCustomerSettings, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const customerWishlist = (options) => useLazyQuery(Schema.customerWishlist, {
    ...options,
    ...config,
});

export const shareWishlist = (options = {}) => useMutation(Schema.shareWishlist, {
    ...options,
    ...config,
});

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : 'cache-first',
    skip: typeof window === 'undefined',
});

export const getGiftCard = () => useQuery(Schema.getGiftCard, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const checkBalance = (code) => useQuery(Schema.checkBalance, {
    context: {
        request: 'internal',
    },
    variables: {
        gift_card_code: code,
    },
    skip: code === '' || !code,
});

export const updatedDefaultAddress = (options = {}) => useMutation(Schema.updatedDefaultAddress, {
    ...options,
    ...config,
});

export const updateCustomerAddress = (options = {}) => useMutation(Schema.updateCustomerAddress, {
    ...options,
    ...config,
});

export const createCustomerAddress = (options = {}) => useMutation(Schema.createCustomerAddress, {
    ...options,
    ...config,
});

export const updateCustomer = (options = {}) => useMutation(Schema.updateCustomer, {
    ...options,
    ...config,
});

export const updateCustomerEmail = (options = {}) => useMutation(Schema.updateCustomerEmail, {
    ...options,
    ...config,
});

export const updateCustomerProfile = (options = {}) => useMutation(Schema.updateCustomerProfile, {
    ...options,
    ...config,
});

export const changeCustomerPassword = (options = {}) => useMutation(Schema.changeCustomerPassword, {
    ...options,
    ...config,
});

export const addSimpleProductsToCart = () => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const removeWishlist = () => useMutation(Schema.removeWishlist, {
    context: {
        request: 'internal',
    },
});

export const removeAddress = () => useMutation(Schema.removeAddress, {
    context: {
        request: 'internal',
    },
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export const checkExpiredRegisterToken = (variables) => useQuery(Schema.checkExpiredRegisterToken, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const newPassword = () => useMutation(Schema.setNewPassword, {
    ...config,
});

export const subscribeNewsletter = () => useMutation(Schema.subscribeNewsletter, { ...config });

export const getRequisitionList = (options) => useQuery(Schema.getRequisitionList, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const insertRequisitionList = (variables) => useMutation(Schema.insertRequisitionList, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const addDateReminderRequisitionList = (variables) => useMutation(Schema.addDateReminderRequisitionList, {
    variables,
    fetchPolicy: 'network-only',
    context: {
        request: 'internal',
    },
});

export const getDateReminderRequisitionList = (options) => useQuery(Schema.getDateReminderRequisitionList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
    ...options,
});

export const updateRequisition = (variables) => useMutation(Schema.updateRequisition, {
    variables,
    context: {
        request: 'internal',
    },
});

export const deleteRequisition = (variables) => useMutation(Schema.deleteRequisition, {
    variables,
    context: {
        request: 'internal',
    },
});

export const deleteRequisitionItem = (options) => useMutation(Schema.deleteRequisitionItem, {
    context: {
        request: 'internal',
    },
    options,
    fetchPolicy: 'network-only',
});

export const addProductsToCart = (variables) => useMutation(Schema.addProductsToCart, {
    variables,
    context: {
        request: 'internal',
    },
});

export const updateRequisitionItem = (options) => useMutation(Schema.updateRequisitionItem, {
    context: {
        request: 'internal',
    },
    options,
});

export const moveRequisitionItem = (options) => useMutation(Schema.moveRequisitionItem, {
    context: {
        request: 'internal',
    },
    options,
});

export const exportRequisitionItem = (options) => useQuery(Schema.exportRequisitionItem, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const negotiableQuotes = (options) => useQuery(Schema.negotiableQuotes, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'no-cache',
});

export const getSingleNegotiableQuote = (options) => useQuery(Schema.getSingleNegotiableQuote, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'no-cache',
});

export const closeNegotiableQuotes = () => useMutation(Schema.closeNegotiableQuotes, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const placeNegotiableQuoteOrder = () => useMutation(Schema.placeNegotiableQuoteOrder, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const checkoutNegotiableQuote = () => useMutation(Schema.checkoutNegotiableQuote, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const deleteNegotiableQuotes = () => useMutation(Schema.deleteNegotiableQuotes, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const setNegotiableQuoteBillingAddress = () => useMutation(Schema.setNegotiableQuoteBillingAddress, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const negotiableQuoteBiddingAproval = () => useMutation(Schema.negotiableQuoteBiddingAproval, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const sendNegotiableQuoteForReview = () => useMutation(Schema.sendNegotiableQuoteForReview, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const updateNegotiableQuoteQuantities = () => useMutation(Schema.updateNegotiableQuoteQuantities, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getQuoteShippingAddress = (options) => useQuery(Schema.getQuoteShippingAddress, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getApprovalAddressStatus = () => useLazyQuery(Schema.getApprovalAddressStatus, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const approvalAddressCancel = () => useMutation(Schema.approvalAddressCancel, {
    context: {
        request: 'internal',
    },
});

export const getApprovedSellerList = () => useQuery(Schema.getApprovedSellerList, {
    context: {
        request: 'internal',
    },
});

export const approvalAddressRequest = () => useMutation(Schema.approvalAddressRequest, {
    context: {
        request: 'internal',
    },
});

export const companyUsers = (options = {}) => useQuery(Schema.companyUsers, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...options,
});

export const createCompanyUser = (variables) => useMutation(Schema.createCompanyUser, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const updateCompanyUser = (variables) => useMutation(Schema.updateCompanyUser, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getRegularCredit = (options) => useQuery(Schema.getRegularCredit, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getCustomerRegularCreditHistory = (options) => useQuery(Schema.getCustomerRegularCreditHistory, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getCustomerSalesRule = (options) => useQuery(Schema.getCustomerSalesRule, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getNegotiableQuoteComments = (options) => useQuery(Schema.getNegotiableQuoteComments, {
    ...options,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getNegotiableQuoteHistory = (options) => useQuery(Schema.getNegotiableQuoteHistory, {
    ...options,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const registerSeller = (variables) => useMutation(Schema.registerSeller, {
    variables,
    context: {
        request: 'internal',
    },
});

export const getSellerByKecamatan = ({ variables }) => useQuery(Schema.getSellerByKecamatan, {
    variables,
    context: {
        request: 'internal',
    },
});

export const getCompanyStatus = () => useQuery(Schema.getCompanyStatus, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getAwHelpdesk2TicketList = (variables) => useQuery(Schema.getAwHelpdesk2TicketList, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const updateCompany = () => useMutation(Schema.updateCompany, {
    context: {
        request: 'internal',
    },
    refetchQueries: [Schema.getCustomerCompanyDetailQName],
});

export const getTicketById = (variables) => useQuery(Schema.getTicketById, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const addTicketRate = (variables) => useMutation(Schema.addTicketRate, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const ticketEscalate = (variables) => useMutation(Schema.ticketEscalate, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const ticketReply = (variables) => useMutation(Schema.ticketReply, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const ticketClose = (variables) => useMutation(Schema.ticketClose, {
    ...variables,
    context: {
        request: 'internal',
    },
});
export const ticketReOpen = (variables) => useMutation(Schema.ticketReOpen, {
    ...variables,
    context: {
        request: 'internal',
    },
});

export const getCustomRewardPointsTransaction = (options) => useQuery(Schema.getCustomRewardPointsTransaction, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getInboxNotificationList = (options) => useQuery(Schema.getInboxNotificationList, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getCustomerGuideStatus = () => useLazyQuery(Schema.getCustomerGuideStatus, {
    context: { request: 'internal' },
});

export const getCustomerGuideConfig = (page) => useLazyQuery(Schema.GET_CUSTOMER_GUIDE_CONFIG, {
    variables: { page },
});

export const setCompleteGuide = (page) => useMutation(Schema.COMPLETE_GUIDE, {
    context: { request: 'internal' },
    variables: { page },
});

export const getCustomerVoucher = (options) => useQuery(Schema.getCustomerVoucher, {
    context: {
        request: 'internal',
    },
    ...options,
    fetchPolicy: 'network-only',
});

export const getDownloadBase64 = (options = {}) => useMutation(Schema.getDownloadBase64, {
    ...options,
    ...config,
});

export default {
    getCountries,
    getCityByRegionId,
    customerNotificationList,
    getCustomerCompanyDetail,
    getCustomerCompanyEditValues,
    updateCompany,
    getCustomer,
    getCustomerOrder,
    getCustomerAddress,
    getCustomerMembership,
    getCustomerOrderSummary,
    getDataCustomer,
    reOrder,
    getRequisitionList,
    insertRequisitionList,
    updateRequisition,
    deleteRequisition,
    deleteRequisitionItem,
    addProductsToCart,
    closeNegotiableQuotes,
    deleteNegotiableQuotes,
    setNegotiableQuoteBillingAddress,
    negotiableQuoteBiddingAproval,
    placeNegotiableQuoteOrder,
    sendNegotiableQuoteForReview,
    updateRequisitionItem,
    moveRequisitionItem,
    exportRequisitionItem,
    negotiableQuotes,
    checkoutNegotiableQuote,
    updateNegotiableQuoteQuantities,
    getSingleNegotiableQuote,
    getQuoteShippingAddress,
    getApprovalAddressStatus,
    approvalAddressCancel,
    approvalAddressRequest,
    companyUsers,
    createCompanyUser,
    updateCompanyUser,
    getRegularCredit,
    getCustomerRegularCreditHistory,
    getCustomerSalesRule,
    getNegotiableQuoteComments,
    getNegotiableQuoteHistory,
    getSellerByKecamatan,
    getCompanyStatus,
    registerSeller,
    getAwHelpdesk2TicketList,
    getTicketById,
    addTicketRate,
    ticketEscalate,
    ticketReply,
    ticketClose,
    ticketReOpen,
    addDateReminderRequisitionList,
    getCustomRewardPointsTransaction,
    getDateReminderRequisitionList,
    getInboxNotificationList,
    getCustomerVoucher,
    getVendorLogo,
    getDownloadBase64,
};
