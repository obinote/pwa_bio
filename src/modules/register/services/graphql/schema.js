import { gql } from '@apollo/client';

export const register = gql`
    mutation createCompanyIcube($input: CompanyCreateIcubeInput!) {
        createCompanyIcube(input: $input) {
            status
            message
        }
    }
`;

export const getCustomer = gql`
    {
        customer {
            id
            firstname
            email
            phonenumber
            whatsapp_number
        }
    }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const mergeCart = gql`
    mutation mergeCart($sourceCartId: String!, $destionationCartId: String!) {
        mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destionationCartId) {
            id
            total_quantity
        }
    }
`;

export const otpConfig = gql`
    {
        otpConfig {
            otp_enable {
                enable_otp_register
            }
        }
    }
`;

export const getGuestCustomer = gql`
    query getGuestCustomer($ids: FilterEqualTypeInput) {
        ordersFilter(filters: { ids: $ids }) {
            data {
                detail {
                    customer_firstname
                    customer_lastname
                    customer_email
                }
            }
        }
    }
`;

export const getCountry = gql`
    {
        country(id: "ID") {
            id
            full_name_locale
        }
    }
`;

export const getRegion = gql`
    query getRegions($country_id: String) {
        getRegions(country_id: $country_id) {
            item {
                region_id
                country_id
                code
                name
            }
        }
    }
`;

export const getCity = gql`
    query getCityByRegionId($region_id: Int!) {
        getCityByRegionId(region_id: $region_id) {
            item {
                city
                region_id
                region_code
                postcode
            }
        }
    }
`;

export const getOTP = gql`
    mutation getOTP($email: String!) {
        registerCompanyOTP(email: $email) {
            status
            message
        }
    }
`;

export const validateOTP = gql`
    mutation validateOTP($email: String!, $otp: String!) {
        validateCompanyOTP(email: $email, otp: $otp) {
            status
            message
            locked
        }
    }
`;

export const getCompanyType = gql`
    query getCompanyType {
        getCompanyType {
            selectedCompanyType {
                label
                value
            }
            optionCompanyType {
                label
                value
            }
        }
    }
`;

export const addCompanyType = gql`
    mutation addCompanyType($input: CompanyTypeInput!) {
        addCompanyType(input: $input) {
            status
            message
        }
    }
`;

export const getBusinessProfile = gql`
    query getBusinessProfile {
        getBusinessProfile {
            administrasi {
                no_npwp
                nama_sarana
                nama_npwp
                alamat
                telepon
                email
                kota_kodepos
            }
            faktur {
                nama
                kota
                alamat
            }
            bayar {
                metode
            }
            financial {
                no_account_bank
                nama_account_bank
                nama_bank
            }
            spesimen_data_pelanggan {
                label
                fields {
                    label
                    name
                    value
                    type
                    validation
                }
            }
        }
    }
`;

export const addBusinessProfile = gql`
    mutation addBusinessProfile($input: BusinessProfileInput!) {
        addBusinessProfile(input: $input) {
            status
            message
        }
    }
`;

export const getDocumentProfile = gql`
    query getDocumentProfile {
        GetDocumentProfile {
            items {
                label
                name
                expired_date_required
                value
                date_label
                date_name
                type
                validation
            }
        }
    }
`;

export const addDocumentProfile = gql`
    mutation addDocumentProfile($input: DocumentProfileInput!) {
        addDocumentProfile(input: $input) {
            status
            message
        }
    }
`;

export const removeDocument = gql`
    mutation removeDocumentProfile($name: String!) {
        removeDocumentProfile(input: { name: $name }) {
            status
            message
        }
    }
`;

export const getAvailableSellerList = gql`
    query getAvailableSellerList {
        GetAvailableSellerList {
            items {
                vendor_code
                vendor_name
                logo
            }
        }
    }
`;

export const getSelectedSellerList = gql`
    query getSelectedSellerList {
        GetSelectedSellerList {
            items {
                vendor_code
                vendor_name
                logo
            }
        }
    }
`;

export const addSellerCompany = gql`
    mutation addSellerCompany($input: SellerCompanyInput!) {
        addSellerCompany(input: $input) {
            status
        }
    }
`;

export const getSelectedCompanyType = gql`
    query getSelectedCompanyType {
        getCompanyType {
            selectedCompanyType {
                label
            }
        }
    }
`;

export const addSummaryCompany = gql`
    mutation addSummaryCompany($input: SummaryCompanyInput!) {
        addSummaryCompany(input: $input) {
            status
        }
    }
`;

export const uploadCompanyDocument = gql`
    mutation uploadCompanyDocument($name: String!, $image: String!) {
        uploadCompanyDocument(input: { name: $name, value: $image }) {
            filename
            message
        }
    }
`;

export const saveDocumentProfile = gql`
    mutation saveDocumentProfile($input: DocumentProfileInput!) {
        saveDocumentProfile(input: $input) {
            status
            message
        }
    }
`;

export default {
    register,
};
