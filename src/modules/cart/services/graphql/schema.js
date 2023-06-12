/* eslint-disable import/prefer-default-export */
/* eslint-disable no-tabs */
import { gql } from '@apollo/client';
import { modules } from '@config';

const vendor = `
vendor{
  vendor_name
}
`;

const applied_store_credit = modules.storecredit.useCommerceModule
    ? `
applied_store_credit {
    applied_balance {
      currency
      value
    }
    current_balance {
      currency
      value
    }
    enabled
}
`
    : `
applied_store_credit {
    store_credit_amount
    is_use_store_credit
}
`;

const applied_cashback = `
applied_cashback {
    data {
        amount
        promo_name
    }
    is_cashback
    total_cashback
}
`;

const applied_reward_points = `
applied_reward_points {
    is_use_reward_points
    reward_points_amount
}
`;

const applied_coupons = `
applied_coupons {
    code
}
`;

const applied_extrafee = `
applied_extra_fee {
    extrafee_value {
      currency
      value
    }
    select_options {
      default
      label
      option_id
      price
    }
    show_on_cart
    title
}
addtional_fees {
    data {
      enabled
      fee_name
      frontend_type
      id_fee
      options {
        default
        label
        option_id
        price
      }
    }
    show_on_cart
}
`;

const applied_giftcard = modules.giftcard.useCommerceModule
    ? `
applied_gift_cards {
    applied_balance {
      currency
      value
    }
    code
    current_balance {
      currency
      value
    }
}
`
    : `
applied_giftcard {
    giftcard_amount
    giftcard_detail {
        giftcard_amount_used
        giftcard_code
    }
}

`;

const prices = `
prices {
  flash_sale {
      amount {
          currency
          value
      }
      label
  }
  tier_price {
      amount {
          currency
          value
      }
      label
  }
  nett {
      amount {
          currency
          value
      }
      label
  }
  discounts {
      amount {
          currency
          value
      }
      label
  }
  subtotal_excluding_tax {
      currency
      value
  }
  subtotal_including_tax {
      currency
      value
  }
  subtotal_with_discount_excluding_tax {
      currency
      value
  }
  applied_taxes {
    amount {
        value
        currency
    }
    label
    percent
  }
  grand_total {
      currency
      value
  }
}
`;

const customizable_options = `
customizable_options {
  id
  label
  is_required
  sort_order
  values {
    label
    value
    price {
      type
      units
      value
    }
  }
}
`;

const items = `
items {
  id
  quantity
  ... on SimpleCartItem {
    SimpleMiniCustomizable: ${customizable_options}
  }

  ... on VirtualCartItem {
    virutalItemCustomizable: ${customizable_options}
  }
  ... on ConfigurableCartItem {
    ConfigurableMiniCustomizable: ${customizable_options}
      configurable_options {
      option_label
      value_label
    }
  }
  ... on BundleCartItem {
    bundle_options {
      label
      type
      values {
        label
        price
        quantity
      }
    }
  }
  ... on DownloadableCartItem {
    downloadablItemCustomizable: ${customizable_options}
    links {
      title
    }
  }
  prices {
    tier_price{
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
    }
    price {
      value
      currency
    }
    price_including_tax {
      value
      currency
    }
    row_total {
      currency
      value
    }
    row_total_including_tax {
      currency
      value
    }
    total_item_discount {
      currency
      value
    }
  }
  product {
    id
    name
    small_image {
      url
      label
    }
    url_key
    sku
    stock_status
    qty_stock
    qty_stock_status
    categories {
      name
    }
  }
}
`;

const cartAvailablePaymentMethods = `
    available_payment_methods {
        code
        title
    }
`;

const promoBanner = `
promoBanner {
  cms_block_id
  name
  cms_block_identifier
  rule_id
}
`;

const cartRequiredSelection = `
id
errorItems
total_quantity
${modules.checkout.cashback.enabled ? applied_cashback : ''}
${modules.rewardpoint.enabled ? applied_reward_points : ''}
${modules.promo.enabled ? applied_coupons : ''}
${modules.checkout.extraFee.enabled ? applied_extrafee : ''}
${modules.storecredit.enabled ? applied_store_credit : ''}
${prices}
${promoBanner}
`;
const cartAvailableFreeItems = `
    available_free_items {
        sku
        quantity
        promo_item_data {
            ruleId
            minimalPrice
            discountItem
            isDeleted
            qtyToProcess
            __typename
        }
        __typename
    }
`;

const shippingMethodAmount = `
shipping_addresses {
  selected_shipping_method {
    amount {
      value
      currency
    }
    carrier_code
    carrier_title
    method_code
    method_title
  }
}
`;

export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            ${vendor}
            ${cartRequiredSelection}
            ${cartAvailablePaymentMethods}
            ${shippingMethodAmount}
            address_status {
              is_address_approved
              is_address_default
            }
        }
    }
`;

export const getCartCustom = gql`
    query customerQuotes($vendor_code: String) {
      customerQuotes(vendor_code: $vendor_code) {
          cart_id
          quote_id
          vendor_code
          vendor_name
          category
          is_active
          negotiable_quote_id
          ${prices}
          ${items}
        }
    }
`;

export const getCartItem = gql`query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
      ${items}
  }
}`;

export const getCrossellCart = (config = {}) => gql`
query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
     items {
      product {
        crosssell_products {
          id
          name
          url_key
          sku
          ${
              config?.pwa?.label_weltpixel_enable
                  ? `
          weltpixel_labels {
            categoryLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color          
            }
            productLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color  
            }
          }        
          `
                  : ''
}
          thumbnail {
            url
          }
          small_image {
            url,
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
          price_range {
            maximum_price {
              discount {
                amount_off
                percent_off
              }
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
              discount {
                amount_off
                percent_off
              }
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
      }
     }
  }
}
`;

export const getMiniCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            errorItems
            total_quantity
            prices {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    currency
                    value
                }
                subtotal_including_tax {
                  currency
                  value
                }
            }
            ${cartAvailablePaymentMethods}
            items {
              id
              quantity
              ... on SimpleCartItem {
                SimpleMiniCustomizable: ${customizable_options}
              }

              ... on VirtualCartItem {
                virtualMiniCustomizable: ${customizable_options}
              }

              ... on ConfigurableCartItem {
                ConfigurableMiniCustomizable: ${customizable_options}
                configurable_options {
                  option_label
                  value_label
                }
              }
              ... on BundleCartItem {
                bundle_options {
                  label
                  type
                  values {
                    label
                    price
                    quantity
                  }
                }
              }
              ... on DownloadableCartItem {
                downloadableMiniCustomizable: ${customizable_options}
                links {
                  title
                }
              }
              prices {
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                price {
                  value
                  currency
                }
                row_total_including_tax {
                  currency
                  value
                }
                total_item_discount {
                  currency
                  value
                }
            }
            product {
              id
              name
              small_image {
                url
                label
              }
              url_key
              sku
              stock_status
              qty_stock
              qty_stock_status
              categories {
                name
              }
            }
          }
        }
    }
`;

export const deleteCartitem = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        quote_data {
          cart_id
          quote_id
          vendor_code
          vendor_name
          category
          is_active
          negotiable_quote_id
          ${items}
          ${prices}
        }
      }
    }
`;

export const deleteCartItemOnPage = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        quote_data {
          cart_id
          quote_id
          vendor_code
          vendor_name
          category
          is_active
          negotiable_quote_id
          ${items}
          ${prices}
        }
      }
    }
`;

export const updateCartitem = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          ${vendor}
          ${cartRequiredSelection}
          ${items}
        }
      }
    }
`;

export const updateCartitemCustom = gql`
    mutation updateCartItemsCustom($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItemsCustom(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart_id
        quote_id
        vendor_code
        vendor_name
        category
        is_active
        negotiable_quote_id
        ${prices}
        ${items}
      }
    }
`;

export const updateCartitemBulk = gql`
    mutation updateCartItemsBulk($cartId: String!, $cartItems: [CartItemUpdateInput]!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: $cartItems
        }
      ) {
        cart {
          ${vendor}
          ${cartRequiredSelection}
          ${items}
        }
      }
    }
`;

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
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

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

// reorder
export const reOrder = gql`
    mutation reOrder($order_id: String!) {
        reorder(input: { order_id: $order_id }) {
            cart_id
        }
    }
`;

export const cancelAndReOrder = gql`
    mutation cancelAndReorder($order_id: String!) {
        cancelAndReorder(order_id: $order_id) {
            cart_id
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

export const applyCouponToCart = gql`
    mutation($cartId: String!, $coupon: String!) {
        applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon }) {
            cart {
                id
                ${vendor}
                ${cartRequiredSelection}
                ${items}
            }
        }
    }
`;

export const removeCouponFromCart = gql`
    mutation($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                id
                ${vendor}
                ${cartRequiredSelection}
                ${items}
            }
        }
    }
`;

export const addProductsToPromoCart = gql`
    mutation addProductsToCartPromo(
        $cart_id: String!,
        $cart_items: [CartItemPromoInput]!
    ) {
          addProductsToCartPromo(
              input: {
                cart_id: $cart_id
                cart_items: $cart_items
              }
          ) {
              cart {
                  ${vendor}
                  ${applied_giftcard}
                  ${cartRequiredSelection}
                  ${items}
                  ${cartAvailableFreeItems}
              }
          }
    }
`;

export const getRequisitionList = gql`
    query {
        getRequisitionList(pageSize: 10, currentPage: 1) {
            data {
                customer_id
                entity_id
                name
            }
        }
    }
`;

export const addRequisition = gql`
    mutation addRequisition($input: RequisitionListInput) {
        insertRequisitionList(input: $input) {
            status
            message
        }
    }
`;

export const addItemToRequisitionList = gql`
    mutation addItemToRequisitionList($input: RequisitionListInputItems) {
        addItemToRequisitionList(input: $input) {
            status
            message
        }
    }
`;

export const addQtyToRequisitionListItem = gql`
    mutation addQtyToRequisitionListItem($input: RequisitionListInputQty) {
        addQtyToRequisitionListItem(input: $input) {
            status
            message
        }
    }
`;

export const requestNegotiableQuote = gql`
    mutation requestNegotiableQuote(
        $cart_id: ID!,
        $quote_name: String!,
        $comment: String!,
        $file_encoded: String,
        $file_name: String,
        $file_type: String,
    ) {
          requestNegotiableQuote(
              input: {
                cart_id: $cart_id
                quote_name: $quote_name,
                comment: {
                  comment: $comment
                  attachments: {
                    file_encoded: $file_encoded,
                    file_name: $file_name,
                    file_type: $file_type
                  }
                },
              }
          ) {
              quote {
                  id
              }
          }
    }
`;

export const storeConfig = gql`
    query{
        storeConfig {
          max_size
        }
    }
`;
