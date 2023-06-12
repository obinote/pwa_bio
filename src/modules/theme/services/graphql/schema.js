/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const categories = gql`
    {
        categoryList {
            children_count
            children {
                id
                level
                name
                path
                url_path
                url_key
                include_in_menu
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    image
                    image_path
                    children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                        children {
                            id
                            level
                            name
                            path
                            url_path
                            url_key
                        }
                    }
                }
            }
        }
    }
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getCustomer = gql`
    {
        customer {
            id
            firstname
            lastname
            email
            is_subscribed
            company_status
        }
        wishlist {
            items {
                id
            }
        }
    }
`;

export const removeToken = gql`
    mutation {
        internalDeleteCustomerToken {
            result
        }
    }
`;

export const vesMenu = gql`
    query getVesMenu($alias: String!) {
        vesMenu(alias: $alias) {
            menu_id
            name
            items {
                id
                name
                link
                content_type
                link_type
                category_id
                menu_id
                children {
                    id
                    name
                    link
                    link_type
                    category_id
                    children {
                        id
                        name
                        link
                        link_type
                        category_id
                        children {
                            id
                            name
                            link
                            link_type
                            category_id
                        }
                    }
                }
            }
        }
    }
`;

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getProduct = gql`
    query getProductsAutocomplete ($term: String!) {
        products(
            search: $term,
            pageSize: 5
            ) {
            items {
                id
                name
                sku
                url_key
                vendor_code
                vendor_name
                small_image {
                    url
                    label
                }
                price_tiers {
                    discount {
                        percent_off
                        amount_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
                tier_prices_custom {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                    customer_group
                }
                price_range{
                    maximum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                }
            }
            total_count
            }
    }`;

export const getRecentlyProduct = () => {
    const query = gql`
    query getRecentlyProduct($filter: ProductAttributeFilterInput) {
      products(filter: $filter) {
        items {
            id
            name
            url_key
            small_image {
                url
                label
            }
            price_range{
                maximum_price{
                  discount{
                    amount_off
                    percent_off
                  }
                  final_price{
                    currency
                    value
                  }
                  fixed_product_taxes{
                    amount{
                      currency
                      value
                    }
                    label
                  }
                  regular_price{
                    currency
                    value
                  }
                }
                minimum_price{
                            discount{
                    amount_off
                    percent_off
                  }
                  final_price{
                    currency
                    value
                  }
                  fixed_product_taxes{
                    amount{
                      currency
                      value
                    }
                    label
                  }
                  regular_price{
                    currency
                    value
                  }
                }
              }
        }
      }
    }
  `;
    return query;
};
/**
 * schema dynamic resolver url
 * @param name String
 * @returns graphql query
 */

export const getCategoryByName = gql`
    query  getCategoryListByName($name: String!) {
        categoryList(filters: { name: { match: $name } }) {
            id
            name
            url_key
            url_path
            __typename
            breadcrumbs {
                category_id
                category_level
                category_name
                category_url_key
                category_url_path
            }
        }
    }
`;

/**
 * [SCHEMA] get category by id
 * @param id
 * @return {graphql}
 */
export const getCategoryById = (id) => {
    const query = gql`{
        category(id: "${id}") {
            children {
                id
                name
                url_path
                children {
                    id
                    name
                    url_path
                }
            }
        }
    }`;
    return query;
};

/**
 * [SCHEMA] get currency
 * @param null
 * @return {graphql}
 */
export const getCurrencySchema = gql`
    {
        currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
                currency_to
                rate
            }
        }
    }
`;

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

export const setImageSearchByImage = gql`
mutation($image: String!) {
    saveImage(image: $image)
}
`;

export default {
    categories,
    getCustomer,
    removeToken,
    vesMenu,
    getCurrencySchema,
    getProduct,
    getCategoryByName,
    getCategoryById,
    getRecentlyProduct,
    getCountCart,
    setImageSearchByImage,
};
