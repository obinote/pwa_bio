/* eslint-disable linebreak-style */
import { gql } from '@apollo/client';

const orderOutput = `
    total_count
    items {
        id
        order_number
        order_date
        updated_at
        order_comment
        payment_status
        reject_reason
        can_submit_ticket
        shipment_status {
            shipstatus
        }
        flash_sale
        track_shipment
        due_date_order
        customer_group
        sp_number
        distributor_name
        validate_otp
        signature_img
        signature_name
        customer_company {
            company_name
            sarana_name
            sarana_no_izin
            apoteker_name
            apoteker_sipa
            logo_img_path
        }
        customer_name
        rating {
            due_date_input_rating
            can_input_rating
        }
        invoice {
            invoice_increment_id
            fine
        }
        invoice_seller_url
        seller {
            seller_id
            seller_code
            seller_name
        }
        comments {
            message
            timestamp
        }
        status
        status_label
        items {
            product_name
            product_sku
            product_type
            product_url_key
            product_sale_price {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
            status
            quantity_invoiced
            quantity_ordered
            quantity_shipped
            percentage_discount
            sales_unit
            do_data {
                do_number
                batch_numbers
                exp_date
                kemasan
                do_date
                qty
            }
        }
        shipping_address {
            firstname
            lastname
            street
            city
            region
            country_code
            telephone
            postcode
        }
        billing_address {
            firstname
            lastname
            street
            city
            region
            country_code
            telephone
            postcode
        }
        shipping_method
        shipments {
            id
            comments {
                message
                timestamp
            }
            items {
                product_name
                product_sku
                quantity_shipped
            }
            number
            tracking {
                carrier
                number
                title
            }
        }
        shipment {
            shipment_id
            shipment_number
            shipment_tracking
        }
        shipment_history {
            date
            history
            status
        }
        payment_methods {
            name
            type
            additional_data {
                name
                value
            }
        }
        tier_discount {
            amount
            nett
        }
        total {
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
            adminfee {
                amount {
                    currency
                    value
                }
                label
            }
            discounts_custom {
                items {
                    rule_name
                    coupon_code
                }
                amount {
                    currency
                    value
                }
            }
            grand_total {
                value
                currency
            }
            subtotal {
                value
                currency
            }
            total_giftcard {
                value
                currency
            }
            total_shipping {
                value
                currency
            }
            total_tax {
                value
                currency
            }
            taxes {
                amount {
                    currency
                    value
                }
                title
                rate
            }
        }
        is_process_refund
        credit_memos {
            id
            items {
              order_item {
                id
                product_name
                product_sku
                quantity_refunded
                product_sale_price {
                    currency
                    value
                }
                percentage_discount
              }
            }
            total {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    value
                    currency
                }
                subtotal {
                    value
                    currency
                }
                total_shipping {
                    value
                    currency
                }
                total_tax {
                    value
                    currency
                }
                taxes {
                    amount {
                        currency
                        value
                    }
                    title
                    rate
                }
            }
        }
        refund {
            is_refund
            reference_no
            refund_date
        }
        detail{
            aw_reward_points {
                is_use_reward_points
                reward_points
                reward_points_amount
            }
        } 
    }
`;

export const getOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customer {
            orders(pageSize: $pageSize, currentPage: $currentPage) {
                total_count
                items {
                    id
                    order_number
                    order_date
                    status
                    shipping_method
                    payment_methods {
                        name
                    }
                    total {
                        grand_total {
                            value
                            currency
                        }
                    }
                }
            }
        }
    }
`;

export const getCustomerOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int, $filter: CustomerOrdersFilterInput, $sort: GetCustomerOrderSortInput) {
        customer {
            orders(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
                total_count
                items {
                    id
                    order_number
                    order_date
                    customer_name
                    items {
                        product_name
                        product_sku
                        quantity_ordered
                    }
                    total {
                        grand_total {
                            value
                            currency
                        }
                    }
                    status
                }
            }
        }
    }
`;

export const getCustomerOrderDownloadable = gql`
    query {
        customerDownloadableProducts {
            items {
                date
                download_url
                order_increment_id
                remaining_downloads
                status
                link_title
                title
            }
        }
    }
`;

export const getOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customerOrders(filter: { ids: { eq: $order_id } }) {
            ${orderOutput}
        }
    }
`;

export const getCustomerOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customer {
            email
            orders(filter: { number: { eq: $order_id } }) {
                ${orderOutput}
            }
        }
    }
`;

// reorder
export const reOrder = gql`
    mutation reOrder($order_id: String!) {
        reorderItems(orderNumber: $order_id) {
            cart {
                id
                items {
                    product {
                        name
                    }
                    prices {
                        price {
                            currency
                            value
                        }
                    }
                    quantity
                }
            }
        }
    }
`;

export const getPaymentInformation = gql`
    query getPaymentInformation($order_id: String!) {
        OrderPaymentInformation(input: { order_id: $order_id }) {
            method_title
            method_code
            virtual_account
            due_date
            instructions
            is_virtual_account
            invoice_url
            payment_code
            xendit_retail_outlet
            xendit_qrcode_external_id
            xendit_mode
        }
    }
`;

export const getTrackingOrder = gql`
    query getTrackingOrder($order_id: String) {
        ordersFilter(filters: { ids: { eq: $order_id } }) {
            data {
                id
                order_number
                status
                status_label
                detail {
                    payment {
                        method
                        additional_information
                        payment_additional_info {
                            method_title
                            __typename
                        }
                        __typename
                    }
                    __typename
                    shipping_methods {
                        shipping_description
                        shipping_detail {
                            track_number
                            trackorder_type
                            data_detail
                            __typename
                        }
                        __typename
                    }
                    shipping_address {
                        firstname
                        lastname
                        __typename
                    }
                    items {
                        name
                        __typename
                    }
                    __typename
                }
                grand_total
                __typename
            }
        }
    }
`;

export const getCustomerOrderOverdue = gql`
    query getCustomerOrderOverdue($filter: GetCustomerOrderOverdueInput, $pageSize: Int, $currentPage: Int, $sort: GetCustomerOrderOverdueSortInput) {
        getCustomerOrderOverdue(filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            items {
                status
                number
                total {
                    grand_total {
                        currency
                        value
                    }
                    subtotal {
                        currency
                        value
                    }
                    total_tax {
                        currency
                        value
                    }
                }
                order_date
                due_date
                fine
                is_confirm
            }
            total_count
            total_amount
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
`;

export const getCustomerOrderOutstanding = gql`
    query getCustomerOrderOutstanding($pageSize: Int, $currentPage: Int) {
        getCustomerOrderOutstanding(pageSize: $pageSize, currentPage: $currentPage) {
            items {
                fine
                created_at
                due_date
                grand_total
                id
                invoices {
                    number
                }
                increment_id
                is_confirm
                items {
                    quantity_ordered
                }
                status_billing
                order_date
                fine
                order_number
                status
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_amount
            total_count
            total_fine
        }
    }
`;

export const mutationCreateBilling = gql`
    mutation mutationCreateBilling($invoiceNumber: [InvoiceIds]!) {
        createBilling(input: { invoice_number: $invoiceNumber }) {
            message
            status
        }
    }
`;

export const getAvailableBillOrderInvoice = gql`
    {
        getAvailableBillOrderInvoice(filter: {}) {
            billing_detail {
                id
                billing_number
                invoice_ids {
                    number
                }
                expired_at
                created_at
                total_fine
                grand_total
                bank_name
                url_midtrans
                status
            }
            page_info {
                page_size
                total_pages
                current_page
            }
            total_count
        }
    }
`;

export const getBillingPayment = gql`
    {
        getBillingPayment(billing_number: "string") {
            billing_number
            grand_total
            payment {
                code
                title
            }
        }
    }
`;

export const dataSnapBillingPaymentUrl = gql`
    query getDataSnapBillingPaymentUrl($billingNumber: String, $billingTotal: Float, $paymentCode: String) {
        getSnapBillingPaymentUrl(billing_number: $billingNumber, billing_total: $billingTotal, payment_code: $paymentCode) {
            message
            status
            url_payment
        }
    }
`;

export const getRefundForm = gql`
    mutation getRefundForm($order_number: String) {
        getRefundForm(input: { orderNumber: $order_number }) {
            message
            status
            url
        }
    }
`;

export const sendOrderCompletion = gql`
    mutation sendOrderCompletion($orderId: String!) {
        sendOrderCompletion(orderId: $orderId) {
            message
            status
        }
    }
`;

export const setOrderRating = gql`
    mutation setOrderRating($id: String!, $rate: Int!, $comment: String, $file: [CommentFile]) {
        setOrderRating(input: { id: $id, rate: $rate, comment: $comment, file: $file }) {
            response
            message
        }
    }
`;

export const getOrderRating = gql`
    query getOrderRating($id: String!) {
        getOrderRating(id: $id) {
            response
            message
            id
            increment_id
            rating
            submitRating
            comment
            file {
                path
                filename
            }
        }
    }
`;

export const getVendorReview = gql`
    query getVendorReviews ($filter: VendorReviewFilterInput) {
        getVendorReviews (filter: $filter) {
            items {
                id
                buyer_name
                buyer_email
                buyer_company_name
                content
                rating
                submit_date
                images {
                    type
                    value
                }
                feedback {
                    company_name
                    submit_date
                    content
                }
            }
        }
    }
`;

export const trackOrderHistory = gql`
    query getTrackOrder($id: String!) {
        getTrackOrder(id: $id) {
            awb_num
            copyWriting
            courier
            courierName
            courierPhone
            eta
            grab_eta
            history {
                hub_name
                message
                time
            }
            id
            increment_id
            message
            receipientAddr
            receipientName
            receipientPhone
            response
            senderAddr
            senderCompany
            senderName
            senderPhone
            service
            shipping_date
            shipping_method
            status
            url
            vehicle
            vehiclePlate
        }
    }
`;

export const getCustomerOrderForPrint = gql`
    query getCustomerOrder($order_id: String) {
        customer {
            orders(filter: { number: { eq: $order_id } }) {
                total_count
                items {
                    id
                    order_number
                    status_label
                    created_at
                    total {
                        discounts {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        grand_total {
                            value
                            currency
                        }
                        subtotal {
                            value
                            currency
                        }
                        total_giftcard {
                            value
                            currency
                        }
                        total_shipping {
                            value
                            currency
                        }
                        total_tax {
                            value
                            currency
                        }
                        taxes {
                            amount {
                                currency
                                value
                            }
                            title
                            rate
                        }
                    }
                    tier_discount {
                        amount
                        nett
                    }
                    flash_sale
                    shipping_address {
                        firstname
                        lastname
                        street
                        city
                        region
                        country_code
                        telephone
                        postcode
                    }
                    billing_address {
                        firstname
                        lastname
                        street
                        city
                        region
                        country_code
                        telephone
                        postcode
                    }
                    payment_methods {
                        name
                        type
                        additional_data {
                            name
                            value
                        }
                    }
                    customer_group
                    items {
                        product_name
                        product_sku
                        sales_unit
                        product_sale_price {
                            currency
                            value
                        }
                        percentage_discount
                        quantity_ordered
                    }
                }
            }
        }
    }
`;

export const getCustomerInvoice = gql`
    query getCustomerInvoice($orderId: String) {
        customer {
            orders(filter: { number: { eq: $orderId } }) {
                items {
                    order_number
                    order_date
                    status_label
                    payment_status
                    print_invoice {
                        printed_at
                        invoice_date
                        payer {
                            address
                            cityKecamatan
                            country
                            customer_name
                            phone
                        }
                        sold_to {
                            address
                            cityKecamatan
                            country
                            customer_name
                            phone
                        }
                        customer_segment
                        company_name
                        npwp
                        license
                        branch {
                            company_address
                            company_phone
                        }
                        salesman
                        invoice_no
                    }
                    invoice {
                        fine
                    }
                    payment_methods {
                        type
                    }
                    items {
                        product_sku
                        product_name
                        do_data {
                            do_number
                            batch_numbers
                            exp_date
                            kemasan
                            do_date
                            qty
                        }
                        sales_unit
                        quantity_invoiced
                        product_sale_price {
                            currency
                            value
                        }
                        percentage_discount
                    }
                    total {
                        discounts {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        adminfee {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        discounts_custom {
                            items {
                                rule_name
                                coupon_code
                            }
                            amount {
                                currency
                                value
                            }
                        }
                        grand_total {
                            value
                            currency
                        }
                        subtotal {
                            value
                            currency
                        }
                        total_giftcard {
                            value
                            currency
                        }
                        total_shipping {
                            value
                            currency
                        }
                        total_tax {
                            value
                            currency
                        }
                        taxes {
                            amount {
                                currency
                                value
                            }
                            title
                            rate
                        }
                    }
                    tier_discount {
                        amount
                        nett
                    }
                    flash_sale
                    detail {
                        aw_reward_points {
                            is_use_reward_points
                            reward_points
                            reward_points_amount
                        }
                    }
                }
            }
        }
    }
`;

export const getCustomerShipment = gql`
    query getCustomerShipment($orderId: String) {
        customer {
            orders(filter: { number: { eq: $orderId } }) {
                items {
                    order_number
                    order_date
                    status_label
                    payment_status
                    shipping_method
                    shipments {
                        number
                        tracking {
                            title
                            number
                        }
                    }
                    shipping_address {
                        firstname
                        lastname
                        street
                        city
                        region
                        telephone
                        postcode
                    }
                    billing_address {
                        firstname
                        lastname
                        street
                        city
                        region
                        telephone
                        postcode
                    }
                    customer_group
                    items {
                        product_sku
                        product_name
                        do_data {
                            do_number
                            batch_numbers
                            exp_date
                            kemasan
                            do_date
                            qty
                        }
                        sales_unit
                        quantity_shipped
                        product_sale_price {
                            currency
                            value
                        }
                        percentage_discount
                    }
                    payment_methods {
                        name
                        type
                        additional_data {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getOrder,
    getCustomerOrderOverdue,
    getCustomerOrderOutstanding,
    getAvailableBillOrderInvoice,
    getBillingPayment,
    dataSnapBillingPaymentUrl,
    trackOrderHistory,
    getVendorReview,
};
