/* eslint-disable no-plusplus */
import { gql } from '@apollo/client';

const productDetail = (config = {}) => `
    id
    name
    sku
    ${config?.pwa?.label_sale_enable ? 'sale' : ''}
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url,
      label
    }
    image{
      url
    }
    media_gallery_entries{
      media_type
      video_content{
        video_url
      }
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date

    `;
const priceRange = `
    price_range {
      minimum_price {
        discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
      maximum_price {
         discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
    }
    `;

const priceTiers = `
    price_tiers {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      quantity
    }
    `;

const priceTiersCustom = `
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
    `;

export const getUpsellProduct = (config = {}) => gql`
query Product($url: String!){
  products(
    search: "" ,filter: {
      url_key: {
        eq: $url
      }
    }
  ) {
    items {
      id
      upsell_products {
        ${productDetail(config)}
        ${priceRange}
        ${priceTiers}
      }
    }
  }
}
`;

export const getRelatedProduct = (config = {}) => gql`
query Product($url: String!) {
  products(
    search: "" ,filter: {
      url_key: {
        eq: $url
      }
    }
  ) {
    items {
      id
      related_products {
        ${productDetail(config)}
        ${priceRange}
        ${priceTiers}
      }
    }
  }
}
`;
const tabListProduct = `
    tab_1 {
      label
      content
    }
    tab_2 {
      label
      content
    }
    tab_3 {
      label
      content
    }
    `;
/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

const priceRangePartial = `
  minimum_price {
    discount {
      amount_off
      percent_off
    }
    final_price {
      currency
      value
    }
    fixed_product_taxes {
      amount {
        currency
        value
      }
      label
    }
    regular_price {
      currency
      value
    }
  }
  maximum_price {
    discount {
      amount_off
      percent_off
    }
    final_price {
      currency
      value
    }
    fixed_product_taxes {
      amount {
        currency
        value
      }
      label
    }
    regular_price {
      currency
      value
    }
  }
 `;

const priceTiersPartial = `
  discount {
    amount_off
    percent_off
  }
  final_price {
    currency
    value
  }
  quantity
 `;

const productDetailFragment = (config = {}) => gql`
  fragment CORE_PRODUCT_DETAILS on ProductInterface {
    id
    is_valid
    vendor_name
    vendor_code
    name @skip(if: $includeName)
    sku
    ${config?.pwa?.label_sale_enable ? 'sale' : ''}
    stock_status
    max_sale_qty
    url_key
    ar_gltf
    __typename
    attribute_set_id
    small_image @skip(if: $includeImg) {
      url,
      label
    }
    image {
      url
    }
    media_gallery_entries {
      __typename
      media_type
      video_content {
        video_url
      }
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date
    price_range @skip(if: $includePrice) {
      ${priceRangePartial}
    }
    price_tiers @skip(if: $includePrice) {
      ${priceTiersPartial}
    }
    tier_prices_custom @skip(if: $includePrice) {
      ${priceTiersCustom}
    }
  }
`;

export const getProduct = (config = {}) => {
    const query = gql`
    ${productDetailFragment(config)}
    query getProducts(
      $includeName: Boolean = false,
      $includePrice: Boolean = false,
      $includeImg: Boolean = false,
      $url: String!
    ) {
        products(
            search: "" ,filter: {
              url_key: {
                eq: $url
              }
            }
        ) {
          items {
            ...CORE_PRODUCT_DETAILS
            description {
              html
            }
            short_description {
              html
            }
            more_info {
              code
              label
              value
            }
            return_policy
            media_gallery {
              url
              label
              ... on ProductVideo {
                  video_content {
                      media_type
                      video_provider
                      video_url
                      video_title
                      video_description
                      video_metadata
                  }
              }
            }
          }
          total_count
        }
    }`;
    return query;
};

export const smartProductTabs = () => {
    const query = gql`
    query getSmartProductTabs($search: String, $filter: ProductAttributeFilterInput) {
      products(search: $search, filter: $filter) {
        items {
          id
          smartProductTabs {
            ${tabListProduct}
          }
        }
      }
    }
  `;
    return query;
};

export const getProductBySku = (config = {}) => {
    const query = gql`query(
      $sku: [String]
    ){
        products(
            search: "" ,filter: {
              sku: {
                in: $sku
              }
            }
          ) {
            items {
              ${productDetail(config)}
              ${priceRange}
              ${priceTiers}
              description {
                html
              }
              short_description {
                html
              }
              more_info {
                label
                value
              }
            }
            total_count
          }
    }`;
    return query;
};

export const addReview = gql`
    mutation createReview($nickname: String!, $rating: Int!, $title: String!, $detail: String!, $pkValue: Int!) {
        addProductReview(
            input: {
                entity_pk_value: $pkValue
                title: $title
                detail: $detail
                nickname: $nickname
                ratings: { rating_name: "Rating", value: $rating }
            }
        ) {
            message
        }
    }
`;

export const getReview = () => {
    const query = gql`
        query getReview($sku: String!, $pageSize: Int, $currentPage: Int) {
            getProductReviews(sku: $sku, pageSize: $pageSize, currentPage: $currentPage) {
                items {
                    id
                    nickname
                    ratings {
                        rating_name
                        value
                    }
                    entity_pk_value
                    review_entity
                    review_type
                    review_status
                    title
                    detail
                    created_at
                }
                message
                totalCount
            }
        }
    `;
    return query;
};

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;

export const getBundleProduct = (sku) => {
    const query = gql`{
  products(
    search: "" ,filter: {
      sku: {
        eq: "${sku}"
      }
    }
  ) {
    items {
      ... on BundleProduct {
        id
        name
        url_key
        items {
          position
          option_id
          title
          type
          required
          options {
            id
            is_default
            label
            quantity
            can_change_quantity
            product {
              id
              name
              price_range {
                minimum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
    return query;
};

export const getDownloadProduct = (sku) => {
    const query = gql`{
    products(
      search: "" ,filter: {
        sku: {
          eq: "${sku}"
        }
      }
    ) {
      items {
        ... on DownloadableProduct {
          id
          name
          url_key
          downloadable_product_links {
            id
            uid
            title
            price
          }
        }
      }
    }
  }`;
    return query;
};

export const getConfigurableProduct = (config = {}) => {
    const query = gql`
    query Product ($sku: String!) {
    products(
      search: "" ,filter: {
        sku: {
          eq: $sku
        }
      }
    ) {
      items {
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id
            label
            position
            use_default
            attribute_code
            values {
              value_index
              label
              swatch_data {
                value
                ... on ImageSwatchData {
                  thumbnail
                  value
                }
                ... on ColorSwatchData {
                  value
                }
                ... on TextSwatchData {
                  value
                }
              }
            }
            product_id
          }
          variants {
            product {
              ${productDetail(config)}
              ${priceRange}
              ${priceTiers}
              media_gallery {
                url
                label
                ... on ProductVideo {
                    video_content {
                        media_type
                        video_provider
                        video_url
                        video_title
                        video_description
                        video_metadata
                    }
                }
              }
            }
            attributes {
              uid
              label
              code
              value_index
            }
          }
        }
      }
    }
  }`;
    return query;
};

export const getGroupedProduct = (config = {}) => gql`
    query getGroupedProduct($sku: String!) {
        products(search: "", filter: { sku: { eq: $sku } }) {
            items {
                __typename
                ... on GroupedProduct {
                    items {
                        qty
                        position
                        product {
                            id
                            name
                            sku
                            ${config?.pwa?.label_sale_enable ? 'sale' : ''}
                            stock_status
                            special_from_date
                            special_to_date
                            ${priceRange}
                            ${priceTiers}
                        }
                    }
                }
            }
        }
    }
`;

export const getProductLabel = () => gql`
query Products($url: String){
  products(
    search: "" ,filter: {
      url_key: {
        eq: $url
      }
    }
  ) {
    items {
      id
      __typename
    }
  }
}
`;

export const getProductBannerLite = (url) => {
    const query = gql`{
      products(
          search: "", filter: {
            url_key: {
              eq: "${url}"
            }
          }
        ) {
          items {
            id
            banners_data {
              entity_id
              salesrule_id
              banner_image
              banner_type
              banner_link
              banner_alt
            }
          }
          total_count
        }
  }`;
    return query;
};

export const createCompareList = gql`
    mutation createCompareList($uid:[ID]){
      createCompareList(
          input: {
            products: $uid
          }
      ) {
          uid
          item_count
          attributes {
              code
              label
          }
          items {
              uid
              product {
                  id
                  sku
                  name
                  description {
                      html
                  }
              }
          }
      }
    }
`;

export const addProductsToCompareList = gql`
    mutation addProductsToCompareList($uid:ID!, $products:[ID]!){
        addProductsToCompareList(
          input: {
            uid: $uid,
            products: $products
          }
        ) {
          uid
          item_count
          attributes {
            code
            label
          }
          items {
            uid
            product {
              sku
              name
              description {
                html
              }
            }
          }
        }
    }
`;

export const getRequisitionList = gql`
  query{
    getRequisitionList {
      data {
        description
        entity_id
        name
      }
      message
      page_info {
        current_page
        page_size
        total_pages
      }
      status
      total_count
    }
  }
`;

export const createRequisitionList = gql`
    mutation createRequisitionList($name: String!, $description: String,) {
        createRequisitionList(
            input: {
                name: $name
                description: $description
            }
        ) {
          requisition_list {
            description
            items_count
            name
            uid
            updated_at
          }
        }
    }
`;

export const addItemToRequisitionList = gql`
  mutation addItemToRequisitionList($id_requisition: Int!, $items: [RequisitionListItemInput]) {
    addItemToRequisitionList(
        input: {
            id_requisition : $id_requisition
            items: $items
        }
    ){
        status
        message
    }
  }
`;

export const getProductShippingRate = gql`
  query getProductShippingRate($sku: String!){
    getProductShippingRate(sku: $sku){
      carrier
      estimation
      label
      method
      price
    }
  }
`;

export const getProductDetailInformation = gql`
  query getProductDetailInformation($sku: String!){
    getProductDetailInformation(sku: $sku){
      return_policy
      ar_gltf
    }
  }
`;

export const getPromoRecommendation = gql`
  query getPromoRecommendation($sku: String!){
    getPromoRecommendation(sku: $sku){
      type
      title
      is_free
      total
      final_total
      subtotal_amount             
      products{
        sku
        name
        price
        final_price   
        qty
        small_image
        is_free
      }
    }
  }
`;

export const getProductPrivateEvent = gql`
  query getProductPrivateEvent($sku: String!) {
    getProductPrivateEvent(
      sku: $sku
      ) {
      start_date
      end_date
      status
    }
  }
`;

export default {
    getProductBySku,
    getProduct,
};
