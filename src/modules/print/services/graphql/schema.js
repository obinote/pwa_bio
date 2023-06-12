import { gql } from '@apollo/client';

export const getOrderPrintAsGuest = gql`
    query getOrderPrintAsGuest($order_number: String!) {
        printOrder(order_number: $order_number) {
          id
          printed_at
          order_number
          order_status
          currency
          customer_group
          itemSection {
            percentage_discount
            productDiscount
            productName
            productPrice
            productQty
            productSku
            productSubtotal
            productUom
          }
          orderSection {
            subtotal
            grandtotal
            discountAmount
            discountDetail
            total_shipping
            total_tax
            flash_sale
            shipping_methods
            tier_discount {
              amount
              nett
            }
            taxes {
              amount
            }
            shipping_address {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone 
            }        
            billing_address {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone
            }
            pickup_store {
              is_use_pickup_store
              pickup_person_email
              pickup_person_name
              pickup_person_phone
            } 
            payment_info {
              method_title
              is_virtual_account
              virtual_account
            }
          }
          invoiceSection {
            reward_points {
              is_use_reward_points
              reward_points
              reward_points_amount
            } 
          }
      }
    }
`;

export const getInvoicePrintAsGuest = gql`
    query getInvoicePrintAsGuest($order_number: String!) {
        printOrder(order_number: $order_number) {
          currency
          order_number
          order_status
          printed_at
          invoiceSection {
            branch {
              company_address
              company_phone
            } 
            company_name
            customer_segment
            invoice_date
            npwp
            fine
            license
            reward_points {
              is_use_reward_points
              reward_points
              reward_points_amount
            }  
            payer {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone
            } 
            payment_status
            printed_at
            salesman  
            sold_to {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone
            } 
          }
          itemSection {
            percentage_discount
            productBatchED {
              batchNumber
              doDate
              doNumber
              expiredDate
              package
              qty
            } 
            productDiscount
            productName
            productPrice
            productQty
            productSku
            productSubtotal
            productUom
          }
          orderSection {
            discountDetail
            flash_sale
            grandtotal
            subtotal
            payment_methods {
              type
            } 
            total_tax
            taxes {
              amount
              rate
              title
            } 
            tier_discount {
              amount
              nett
            } 
            discounts_custom {
              amount {
                currency
                value
              }
              items {
                coupon_code
                rule_id
                rule_name
              }
            } 
            total_shipping
          }
        }
    }
`;

export const getShipmentPrintAsGuest = gql`
    query getShipmentPrintAsGuest($order_number: String!) {
        printOrder(order_number: $order_number) {
          currency
          order_status
          printed_at
          status_label
          order_number
          itemSection {
            percentage_discount
            productBatchED {
              batchNumber
              doDate
              doNumber
              expiredDate
              package
              qty
            } 
            productDiscount
            productName
            productPrice
            productQty
            productSku
            productSubtotal
            productUom
          }
          orderSection {
            applied_extra_fee {
              title
              extrafee_value {
                currency
                value
              } 
            }
            aw_store_credit {
              is_use_store_credit
              store_credit_amount
              store_credit_refunded
              store_credit_reimbursed
            } 
            discountDetail
            flash_sale
            giftcard_data {
              amount
              code
            } 
            grandtotal
            subtotal
            taxes {
              amount
              rate
              title
            } 
            tier_discount {
              amount
              nett
            } 
            total_shipping
          }
          shipmentSection {
            billing_address {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone
            } 
            customer_group
            discountAmount
            discountDetail
            order_date
            order_status
            payment_methods {
              additional_data {
                name
                value
              }
              name
            } 
            payment_status
            shipment {
              shipment_number
              tracking {
                number
                title
              }
            } 
            shipment_date
            shipping_address {
              city
              country
              firstname
              lastname
              postcode
              region
              street
              telephone
            } 
            shipping_methods
            status_label
            subtotal
            taxes {
              amount
              rate
              title
            } 
            total_shipping
            total_tax
          }
        }
    }
`;

export const getQuotationPrintAsGuest = gql`
    query getQuotationPrintAsGuest($uid: ID!) {
        omsNegotiableQuote(uid: $uid) {
          name
          status
          created_at
          expiration_date
          buyer {
            firstname
            lastname
          }
          items {
            quantity
            uid
            product {
              name
              vendor_name
              sku
              qty_stock
            }
            prices {
              price {
                value
                currency
              }
              row_total {
                value
                currency
              }
            }
          }
          prices {
            subtotal_including_tax {
              currency
              value
            } 
            subtotal_with_discount_excluding_tax {
              value
            } 
          }
          negotiable_data {
            discount
            estimation_day
            quote_discount
            quote_subtotal_tier_price_incl_tax
            total_price_excl_tax
            total_price_incl_tax
          }
          shipping_addresses {
            firstname
            lastname
            telephone
            street
            city
            postcode
            region {
              label
            }
            country {
              label
            } 
          }
        }
    }
`;

export const getRequisitionPrintAsGuest = gql`
  query getRequisitionPrintAsGuest($entity_id: Int!) {
      printRequisitionList(entity_id: $entity_id) {
        name
        description
        items {
          name
          sku
          qty
          price
          subtotal
          image {
            url(width: 1, height: 1)
          } 
        }
      }
  }
`;

// Note: new query should be added to /src/api/grapqhl/remote/index.js on "printAsGuestQueryList" variable
export default {
    getOrderPrintAsGuest,
    getInvoicePrintAsGuest,
    getShipmentPrintAsGuest,
    getQuotationPrintAsGuest,
    getRequisitionPrintAsGuest,
};
