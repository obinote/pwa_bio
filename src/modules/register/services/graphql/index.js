import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/register/services/graphql/schema';

export const register = () => useMutation(Schema.register, {
    context: {
        request: 'internal',
    },
});

export const otpConfig = () => useQuery(Schema.otpConfig, {
    fetchPolicy: 'no-cache',
});

export const mergeCart = () => useMutation(Schema.mergeCart, {
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

export const getGuestCustomer = (options = {}) => useLazyQuery(Schema.getGuestCustomer, {
    ...options,
    context: {
    },
    fetchPolicy: 'no-cache',
});

export const getCountry = () => useQuery(Schema.getCountry, {
    context: {
        request: 'internal',
    },
});

export const getRegion = (options = {}) => useQuery(Schema.getRegion, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getCity = (options = {}) => useLazyQuery(Schema.getCity, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const getOTP = () => useMutation(Schema.getOTP, {
    context: {
        request: 'internal',
    },
});

export const validateOTP = () => useMutation(Schema.validateOTP, {
    context: {
        request: 'internal',
    },
});

/**
 * Complete Application GQL - start
 */

// step 1
export const getCompanyType = () => useQuery(Schema.getCompanyType, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});
export const addCompanyType = () => useMutation(Schema.addCompanyType, {
    context: {
        request: 'internal',
    },
});

// step 2
export const getBusinessProfile = () => useQuery(Schema.getBusinessProfile, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const addBusinessProfile = () => useMutation(Schema.addBusinessProfile, {
    context: {
        request: 'internal',
    },
});

// step 3
export const getDocumentProfile = () => useQuery(Schema.getDocumentProfile, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const addDocumentProfile = () => useMutation(Schema.addDocumentProfile, {
    context: {
        request: 'internal',
    },
});

export const removeDocument = () => useMutation(Schema.removeDocument, {
    context: {
        request: 'internal',
    },
});

// step 4
export const getAvailableSellerList = () => useQuery(Schema.getAvailableSellerList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getSelectedSellerList = () => useQuery(Schema.getSelectedSellerList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const addSellerCompany = () => useMutation(Schema.addSellerCompany, {
    context: {
        request: 'internal',
    },
});

// step 5
export const getSelectedCompanyType = () => useQuery(Schema.getSelectedCompanyType, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const addSummaryCompany = () => useMutation(Schema.addSummaryCompany, {
    context: {
        request: 'internal',
    },
});

export const uploadCompanyDocument = () => useMutation(Schema.uploadCompanyDocument, {
    context: {
        request: 'internal',
    },
});

export const saveDocumentProfile = () => useMutation(Schema.saveDocumentProfile, {
    context: {
        request: 'internal',
    },
});

/**
 * Complete Application GQL - end
 */

export default {
    register,
};
