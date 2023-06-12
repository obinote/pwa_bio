/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const registerToDistributor = gql`
    mutation registerToDistributors($vendorCode: String!) {
        registerSeller(vendor_code: $vendorCode) {
            message
        }
    }
`;

export const getDistributors = gql`
    query getDistributorList($currentPage: Int, $filter: AllActiveSellerFilterInput) {
        getAllActiveSeller(currentPage: $currentPage, filter: $filter) {
            items {
                category_id
                company_code
                company_name
                logo
                approval_status
            }
            page_info {
                page_size
                current_page
                total_pages
            }
            total_count
        }
    }
`;

export const getDistributor = gql`
    query getDistributorDetail($code: String!) {
        getSellerOmsByCompanyCode(code: $code) {
            category_id
            url_path
            company_id
            company_code
            company_name
            logo
            banner
            email
            no_telp
            company_street
            company_city
            description
            company_social_media {
                name
                value
            }
            carousell {
                url
                position
            }
            website
            location_operational_time {
                loc_id
                day
                open_at
                close_at
                is_active
            }
            ratings {
                average_rating
                total_rating
                total_reviewer
            }
            product_highlight {
                id
                is_valid
                sku
                name
                url_key
                stock_status
                vendor_name
                short_description {
                    html
                    __typename
                }
                small_image {
                    url
                    label
                    __typename
                }
                categories {
                    name
                    __typename
                }
                __typename
                price_tiers {
                    discount {
                        percent_off
                        amount_off
                        __typename
                    }
                    final_price {
                        currency
                        value
                        __typename
                    }
                    quantity
                    __typename
                }
                price_range {
                    maximum_price {
                        discount {
                            amount_off
                            percent_off
                            __typename
                        }
                        final_price {
                            currency
                            value
                            __typename
                        }
                        regular_price {
                            currency
                            value
                            __typename
                        }
                        __typename
                    }
                    minimum_price {
                        discount {
                            amount_off
                            percent_off
                            __typename
                        }
                        final_price {
                            currency
                            value
                            __typename
                        }
                        regular_price {
                            currency
                            value
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                special_from_date
                special_to_date
                new_from_date
                new_to_date
                valid_to_nie
                no_nie
            }
        }
    }
`;

export const getDistributorEtalase = gql`
    query getDistributorEtalase($attributes: [AttributeInput!]!) {
        customAttributeMetadata(attributes: $attributes) {
            items {
                attribute_code
                attribute_options {
                    label
                    value
                }
                attribute_type
                entity_type
                input_type
            }
        }
    }
`;

export const getVendorReviewByCompany = gql`
query getVendorReviewByCompany(
        $sort: VendorReviewByCompanySortInput
        $filter: VendorReviewByCompanyFilterInput
        $currentPage: Int
        $pageSize: Int
    ) {
        getVendorReviewByCompany(
            sort: $sort
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
        items {
            buyer_company_name
            buyer_name
            buyer_email
            channel_order_id
            content
                feedback {
                company_name
                content
                submit_date
            }
            id
            images {
                value
                type
            }
            rating
            submit_date
        }
        count_rating {
            count_1
            count_2
            count_3
            count_4
            count_5
            count_all
        }
        page_info {
            current_page
            page_size
            total_pages
        }
        total_count
        }
    }
`;

export const getPromoList = gql`
query getPromoList($vendor_code: String, $page_size: Int, $current_page: Int) {
        getPromoList(vendor_code: $vendor_code, pageSize: $page_size, currentPage: $current_page) {
            item {
              rule_id
              name
              from_date
              simple_action
              vendor_code
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
    `;

export const getProductPromoListSchema = gql`
    query getPromoProduct(
        $vendor_code: String,
        $page_size: Int,
        $current_page: Int
    ) {
        getProductPromoList(
            vendor_code: $vendor_code, 
            pageSize: $page_size, 
            currentPage: $current_page
        ) {
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        items {
            id
            is_valid
            sku
            name
            url_key
            stock_status
            vendor_name
            short_description {
                html
                __typename
            }
            small_image {
                url
                label
                __typename
            }
            categories {
                name
                __typename
            }
            __typename
            price_tiers {
                discount {
                    percent_off
                    amount_off
                    __typename
                }
                final_price {
                    currency
                    value
                    __typename
                }
                quantity
                __typename
            }
            price_range {
                maximum_price {
                discount {
                    amount_off
                    percent_off
                    __typename
                }
                final_price {
                    currency
                    value
                    __typename
                }
                regular_price {
                    currency
                    value
                    __typename
                }
                __typename
                }
                minimum_price {
                discount {
                    amount_off
                    percent_off
                    __typename
                }
                final_price {
                    currency
                    value
                    __typename
                }
                regular_price {
                    currency
                    value
                    __typename
                }
                __typename
                }
                __typename
            }
            special_from_date
            special_to_date
            new_from_date
            new_to_date
            valid_to_nie
            no_nie
        }
    }
}

`;

export const getOmsAccessKey = gql`
    query {
        storeConfig {
            swiftoms_omsconnect_configurations_access_key
        }
    }  
`;
