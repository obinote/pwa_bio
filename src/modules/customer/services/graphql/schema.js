/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-tabs */
import { gql } from '@apollo/client';

export const getRegion = gql`
    query getRegions($country_id: String!) {
        getRegions(country_id: $country_id) {
            item {
                code
                name
                region_id
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

export const getCountries = gql`
    {
        countries {
            id
            full_name_locale
            full_name_english
        }
    }
`;

export const getCityByRegionId = gql`
    query Cities($regionId: Int!) {
        getCityByRegionId(region_id: $regionId) {
            item {
                id
                city
                postcode
            }
        }
    }
`;

export const customerWishlist = gql`
    query customerWishlist($sharing_code: ID) {
        customerWishlist(sharing_code: $sharing_code) {
            items {
                added_at
                description
                id
                product {
                    id
                    name
                    url_key
                    sku
                    small_image {
                        url
                    }
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
                }
                qty
            }
            items_count
            name
            sharing_code
            updated_at
        }
    }
`;

export const shareWishlist = gql`
    mutation shareWishlist($emails: [ID]!, $message: String) {
        shareWishlist(input: { emails: $emails, message: $message })
    }
`;

// schema settingsPage

export const updateCustomer = gql`
    mutation updateCustomerSetting($isSubscribed: Boolean!) {
        updateCustomer(input: { is_subscribed: $isSubscribed }) {
            customer {
                is_subscribed
            }
        }
    }
`;

export const getCustomerSettings = gql`
    {
        customer {
            firstname
            lastname
            email
            is_subscribed
        }
    }
`;

const productDetail = (config = {}) => `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
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

export const getCustomer = (config = {}) => gql`
{
    customer {
      id
      firstname
      lastname
      email
      company_id
      company_name
      is_subscribed
      phonenumber
      orders{
        total_count
      }
      addresses {
        id
        city
        default_billing
        default_shipping
        extension_attributes {
            attribute_code
            value
        }
        firstname
        lastname
        company
        fax
        erp_id_address
        postcode
        country_code
        country {
          code
          label
        }
        region {
            region
            region_code
        }
        street
        telephone
        latitude
        longitude
        address_label
        can_edit
        can_delete
        can_cancel_request
        can_request
        can_view_status
    }
     wishlist {
      id
      items {
        id
        product {
          ${productDetail(config)}
          ${priceRange}
          ${priceTiers}
        }
      }
    }
    }
  }
`;

export const getCustomerAddress = gql`
    {
        customer {
            addresses {
                id
                city
                company
                default_billing
                default_shipping
                extension_attributes {
                    attribute_code
                    value
                }
                firstname
                lastname
                postcode
                country_code
                country {
                    code
                    label
                }
                region {
                    region
                    region_code
                }
                region_id
                street
                telephone
                latitude
                longitude
                address_label
                can_edit
                can_delete
                can_cancel_request
                can_request
                can_view_status
            }
        }
    }
`;

export const getCustomerMembership = gql`
{
    customer {
        member_level {
            current_level_name
            current_level_value
            next_level_name
            next_level_value
            percentage_to_next_level
        }
    }
}
`;

export const getCustomerOrderSummary = gql`
{
    customer {
        order_summary {
            total_discount
            total_order_qty
            total_purchase
            total_unpaid_order_qty
        }
    }
}
`;

export const getDataCustomer = gql`
{
    customer {
        firstname
        lastname
        email
        company_name
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

export const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
            totalUnread
            items {
                content
                createdAt
                entityId
                subject
                unread
            }
        }
    }
`;

export const getGiftCard = gql`
    {
        customer {
            gift_card {
                giftcard_code
                giftcard_balance
            }
        }
    }
`;

export const checkBalance = gql`
    query checkBalance($gift_card_code: String!) {
        giftCardAccount(input: { gift_card_code: $gift_card_code }) {
            code
            balance
            initial_balance
            expiration_date
        }
    }
`;

export const updatedDefaultAddress = gql`
    mutation updatedDefaultAddress($addressId: Int!, $street: String!) {
        updateCustomerAddress(id: $addressId, input: { default_billing: false, default_shipping: true, street: [$street] }) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerAddress = gql`
    mutation updateCustomerAddress(
        $address_label: String
        $city: String!
        $countryCode: CountryCodeEnum!
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $company: String
        $fax: String
        $erp_id_address: String
        $telephone: String!
        $postcode: String!
        $street: String!
        $addressId: Int!
        $region: String!
        $regionCode: String
        $regionId: Int
        $longitude: String
        $latitude: String
    ) {
        updateCustomerAddress(
            id: $addressId
            input: {
                address_label: $address_label
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                company: $company
                fax: $fax
                erp_id_address: $erp_id_address
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
                longitude: $longitude
                latitude: $latitude
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const createCustomerAddress = gql`
    mutation createCustomerAddress(
        $address_label: String
        $city: String!
        $countryCode: CountryCodeEnum!
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $company: String
        $fax: String
        $erp_id_address: String
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $regionCode: String
        $regionId: Int
        $longitude: String
        $latitude: String
    ) {
        createCustomerAddress(
            input: {
                address_label: $address_label
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                company: $company
                fax: $fax
                erp_id_address: $erp_id_address
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
                longitude: $longitude
                latitude: $latitude
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerProfile = gql`
    mutation updateCustomerV2($firstname: String!, $lastname: String!, $allow_remote_shopping_assistance: Boolean, $phonenumber: String) {
        updateCustomerV2(
            input: {
                firstname: $firstname
                lastname: $lastname
                allow_remote_shopping_assistance: $allow_remote_shopping_assistance
                phonenumber: $phonenumber
            }
        ) {
            customer {
                firstname
                lastname
                email
                phonenumber
                allow_remote_shopping_assistance
            }
        }
    }
`;

export const updateCustomerEmail = gql`
    mutation updateCustomerEmail($email: String!, $password: String!) {
        updateCustomerEmail(email: $email, password: $password) {
            customer {
                email
            }
        }
    }
`;

export const changeCustomerPassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            firstname
            lastname
            email
        }
    }
`;

export const addSimpleProductsToCart = gql`
    mutation addSimpleProductsToCart($cartId: String!, $qty: Float!, $sku: String!) {
        addSimpleProductsToCart(input: { cart_id: $cartId, cart_items: { data: { quantity: $qty, sku: $sku } } }) {
            cart {
                id
                total_quantity
            }
        }
    }
`;

export const removeWishlist = gql`
    mutation removeWishlist($wishlistItemId: Int!) {
        removeItemWishlist(wishlistItemId: $wishlistItemId) {
            info
        }
    }
`;

export const removeAddress = gql`
    mutation deleteCustomerAddress($id: Int!) {
        deleteCustomerAddress(id: $id)
    }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const checkExpiredRegisterToken = gql`
    query checkExpiredRegisterToken($id: Int!, $token: String!) {
        getCompanyExpTokenOtp(id: $id, token: $token) {
            status
            message
        }
    }
`;

export const setNewPassword = gql`
    mutation($password: String!, $confirmPassword: String!, $token: String!, $id: Int!) {
        createPasswordCustomer(password: $password, confirmPassword: $confirmPassword, token: $token, id: $id) {
            status
            message
        }
    }
`;

export const getCustomerOrder = gql`
    {
        customerOrders(pageSize: 5) {
            items {
                id
                grand_total
                order_number
                status
                status_label
                created_at
                detail {
                    global_currency_code
                    shipping_address {
                        firstname
                        lastname
                    }
                    grand_total
                }
            }
        }
    }
`;

export const getRequisitionList = gql`
    query getRequisition($entity_id: [Int], $page_size: Int, $current_page: Int) {
        getRequisitionList(filter: { entity_id: $entity_id }, pageSize: $page_size, currentPage: $current_page) {
            total_count
            data {
                entity_id
                customer_id
                name
                description
                updated_at
                items {
                    image {
                        url
                        label
                        position
                    }
                    item_id
                    name
                    sku
                    price
                    qty
                    tier_price
                    subtotal
                    url_key
                }
                total_count
            }
            page_info {
                current_page
                page_size
            }
        }
    }
`;

export const addDateReminderRequisitionList = gql`
    mutation addDateReminderRequisitionList($list_id: Int!, $date_reminder: [Int!]) {
        addDateReminderRequisitionList(list_id: $list_id, date_reminder: $date_reminder) {
            status
            message
        }
    }
`;

export const getDateReminderRequisitionList = gql`
    query getDateReminderRequisitionList($list_id: Int!) {
        getDateReminderRequisitionList(list_id: $list_id)
    }
`;

export const insertRequisitionList = gql`
    mutation insertRequisitionList($name: String!, $description: String) {
        insertRequisitionList(input: { name: $name, description: $description }) {
            status
            message
        }
    }
`;

export const updateRequisition = gql`
    mutation updateRequisition($list_id: Int!, $name: String, $description: String) {
        updateRequisition(list_id: $list_id, name: $name, description: $description) {
            message
            status
        }
    }
`;

export const deleteRequisition = gql`
    mutation deleteRequisition($list_id: Int!) {
        deleteRequisition(list_id: $list_id) {
            message
            status
        }
    }
`;

export const deleteRequisitionItem = gql`
    mutation deleteRequisitionItem($item_id: [Int!], $list_id: Int!) {
        deleteRequisitionItem(item_id: $item_id, list_id: $list_id) {
            message
            status
        }
    }
`;

export const updateRequisitionItem = gql`
    mutation updateRequisitionItem($list_id: Int!, $qty_item: [QtyItem!]) {
        updateRequisitionItem(list_id: $list_id, qty_item: $qty_item) {
            message
            status
        }
    }
`;

export const moveRequisitionItem = gql`
    mutation moveRequisitionItem($item_id: [Int!], $list_id: Int!, $copy: Boolean) {
        moveRequisitionItem(item_id: $item_id, list_id: $list_id, copy: $copy) {
            message
            status
        }
    }
`;

export const exportRequisitionItem = gql`
    query exportRequisitionItem($list_id: Int!) {
        exportRequisitionItem(list_id: $list_id)
    }
`;

export const negotiableQuotes = gql`
    query negotiableQuotes($page_size: Int, $current_page: Int) {
        negotiableQuotes(filter: {}, pageSize: $page_size, currentPage: $current_page) {
            items {
                created_at
                name
                status
                updated_at
                uid
                id
                buyer {
                    firstname
                    lastname
                }
                shipping_addresses {
                    firstname
                    lastname
                }
                prices {
                    grand_total {
                        currency
                        value
                    }
                }
            }
            total_count
        }
    }
`;

const negotiableQuoteComment = () => gql`
    fragment NEGOTIABLE_QUOTE_COMMENTS on NegotiableQuote {
        comments {
            attachment
            author {
                firstname
                lastname
            }
            created_at
            creator_type
            text
            uid
        }
    }
`;

const negotiableQuoteItems = () => gql`
    fragment NEGOTIABLE_QUOTE_ITEMS on NegotiableQuote {
        items {
            uid
            quantity
            product {
                name
                sku
                vendor_name
                qty_stock
                stock_status
                # url_key
                vendor_name
                vendor_code
                # is_etalase
                # small_image{
                #   url
                # }
            }
            prices {
                price {
                    currency
                    value
                }
                row_total {
                    currency
                    value
                }
            }
        }
    }
`;

const negotiableQuoteShipping = () => gql`
    fragment NEGOTIABLE_QUOTE_SHIPPING on NegotiableQuote {
        shipping_addresses {
            city
            company
            country {
                code
                label
            }
            firstname
            lastname
            postcode
            region {
                code
                label
                region_id
            }
            selected_shipping_method {
                carrier_code
                carrier_title
                method_code
                method_title
            }
            street
            telephone
        }
        billing_address {
            city
            company
            country {
                code
                label
            }
            firstname
            lastname
            postcode
            region {
                code
                label
                region_id
            }
            street
            telephone
        }
    }
`;

export const getSingleNegotiableQuote = gql`
    ${negotiableQuoteComment()}
    ${negotiableQuoteItems()}
    ${negotiableQuoteShipping()}
    query negotiableQuotes($uid: ID!, $skipComment: Boolean = true, $skipShipping: Boolean = true) {
        negotiableQuote(uid: $uid) {
            created_at
            name
            uid
            status
            status_seller
            status_system
            user_can_close_quote
            updated_at
            expiration_date
            is_bidding
            approved_by_buyer
            has_checkout
            negotiable_data {
                subtotal_excl_tax
                discount
                estimated_tax
                estimation_day
                total_price_excl_tax
                total_price_incl_tax
                quote_discount
                quote_subtotal_excl_tax
                quote_estimated_tax
                quote_grand_total_excl_tax
                quote_grand_total_with_discount
                quote_subtotal_tier_price_incl_tax
            }
            buyer {
                firstname
                lastname
            }
            shipping_addresses {
                firstname
                lastname
            }
            ...NEGOTIABLE_QUOTE_ITEMS
            ...NEGOTIABLE_QUOTE_COMMENTS @skip(if: $skipComment)
            ...NEGOTIABLE_QUOTE_SHIPPING @skip(if: $skipShipping)
        }
    }
`;

export const closeNegotiableQuotes = gql`
    mutation closeNegotiableQuotes($quote_uids: ID!) {
        closeNegotiableQuotes(input: { quote_uids: [$quote_uids] }) {
            operation_results {
                __typename
            }
            result_status
        }
    }
`;

export const placeNegotiableQuoteOrder = gql`
    mutation placeNegotiableQuoteOrder($quote_uid: ID!) {
        placeNegotiableQuoteOrder(input: { quote_uid: $quote_uid }) {
            order {
                order_id
                order_number
            }
        }
    }
`;

export const deleteNegotiableQuotes = gql`
    mutation deleteNegotiableQuotes($quote_uids: ID!) {
        deleteNegotiableQuotes(input: { quote_uids: [$quote_uids] }) {
            operation_results {
                __typename
            }
            result_status
        }
    }
`;

export const negotiableQuoteBiddingAproval = gql`
    mutation negotiableQuoteBiddingAproval($uid: ID!, $is_approve: Boolean = true) {
        negotiableQuoteBiddingAproval(uid: $uid, is_approve: $is_approve) {
            status
            status_seller
            status_system
        }
    }
`;

export const sendNegotiableQuoteForReview = gql`
    mutation sendNegotiableQuoteForReview($quote_uid: ID!, $comment: String!, $attachment: NegotiableAttachmentInput = {}) {
        sendNegotiableQuoteForReview(input: { quote_uid: $quote_uid, comment: { comment: $comment }, attachment_files: $attachment }) {
            quote {
                status
                updated_at
            }
        }
    }
`;

export const updateNegotiableQuoteQuantities = gql`
    mutation updateNegotiableQuoteQuantities($quote_uid: ID!, $items: [NegotiableQuoteItemQuantityInput]!) {
        updateNegotiableQuoteQuantities(input: { quote_uid: $quote_uid, items: $items }) {
            quote {
                status
            }
        }
    }
`;

export const setNegotiableQuoteBillingAddress = gql`
    mutation setNegotiableQuoteBillingAddress($quote_uid: ID!, $billing_address: NegotiableQuoteBillingAddressInput!) {
        setNegotiableQuoteBillingAddress(input: { quote_uid: $quote_uid, billing_address: $billing_address }) {
            quote {
                billing_address {
                    company
                    firstname
                    lastname
                    street
                    city
                    region {
                        label
                        code
                    }
                    country {
                        label
                        code
                    }
                }
            }
        }
    }
`;
export const checkoutNegotiableQuote = gql`
    mutation checkoutNegotiableQuote($uid: ID!) {
        checkoutNegotiableQuote(uid: $uid) {
            success
            message
        }
    }
`;

export const getQuoteShippingAddress = gql`
    query getQuoteShippingAddress($uid: ID!) {
        negotiableQuote(uid: $uid) {
            uid
            shipping_addresses {
                city
                company
                country {
                    code
                    label
                }
                firstname
                lastname
                postcode
                region {
                    code
                    label
                    region_id
                }
                selected_shipping_method {
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                }
                street
                telephone
            }
            billing_address {
                city
                company
                country {
                    code
                    label
                }
                firstname
                lastname
                postcode
                region {
                    code
                    label
                    region_id
                }
                street
                telephone
            }
        }
    }
`;

export const addProductsToCart = gql`
    mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
        addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
            cart {
                id
            }
            user_errors {
                code
                message
            }
        }
    }
`;

export const subscribeNewsletter = gql`
    mutation updateCustomer($email: String!) {
        subscribe(input: { email: $email }) {
            status {
                code
                message
                response
            }
        }
    }
`;

export const reOrder = gql`
    mutation reOrder($order_id: String!) {
        reorder(input: { order_id: $order_id }) {
            cart_id
        }
    }
`;

export const getApprovalAddressStatus = gql`
    query getApprovalAddressStatus($address_id: Int!) {
        getApprovalAddressStatus(address_id: $address_id) {
            vendor_code
            vendor_name
            status
        }
    }
`;

export const approvalAddressCancel = gql`
    mutation approvalAddressCancel($address_id: Int!) {
        approvalAddressCancel(input: { address_id: $address_id }) {
            success
            message
        }
    }
`;

export const approvalAddressRequest = gql`
    mutation approvalAddressRequest($address_id: Int!) {
        approvalAddressRequest(input: { address_id: $address_id }) {
            success
            message
        }
    }
`;

export const companyUsers = gql`
    query getUsers($pageSize: Int!, $currentPage: Int!) {
        company {
            role_id
            users(pageSize: $pageSize, currentPage: $currentPage) {
                items {
                    id
                    email
                    firstname
                    lastname
                    status
                    job_title
                    telephone
                }
                page_info {
                    current_page
                    page_size
                    total_pages
                }
                total_count
            }
        }
    }
`;

export const createCompanyUser = gql`
    mutation createCompanyUser(
        $job_title: String!
        $firstname: String!
        $lastname: String!
        $email: String!
        $telephone: String!
        $status: CompanyUserStatusEnum!
        $role_id: ID!
    ) {
        createCompanyUser(
            input: {
                job_title: $job_title
                firstname: $firstname
                lastname: $lastname
                email: $email
                telephone: $telephone
                role_id: $role_id
                status: $status
            }
        ) {
            user {
                created_at
                email
            }
        }
    }
`;

export const updateCompanyUser = gql`
    mutation updateCompanyUser(
        $job_title: String!
        $firstname: String!
        $lastname: String!
        $email: String!
        $telephone: String!
        $status: CompanyUserStatusEnum!
        $id: ID!
    ) {
        updateCompanyUser(
            input: {
                id: $id
                job_title: $job_title
                firstname: $firstname
                lastname: $lastname
                email: $email
                telephone: $telephone
                status: $status
            }
        ) {
            user {
                email
                firstname
                lastname
                job_title
                telephone
                status
            }
        }
    }
`;

export const getCustomerCompanyDetailQName = 'CustomerCompanyFullDetail';

export const getCustomerCompanyDetail = gql`
  query ${getCustomerCompanyDetailQName} {
    getCustomerCompanyDetail {
      available_payment_method
      available_shipping_method
      contact_admin{
          name
          email
          job
      }
      contact_sales{
          name
          email
          job
      }
      company_admin_email
      company_admin_name
      company_city
      company_country_id
      company_email
      company_name
      company_postcode
      company_region_id
      company_street
      company_district
      company_sub_district
      company_telephone
      company_logo_url
      status_company
      administrasi_alamat
      administrasi_email
      administrasi_kode_pelanggan
      administrasi_kota_kodepos
      administrasi_nama_npwp
      administrasi_nama_sarana
      administrasi_no_npwp
      administrasi_nomor_izin
      administrasi_telepon
      analisis_jumlah_dokter
      analisis_jumlah_kunjungan
      analisis_jumlah_resep
      apoteker_alamat
      apoteker_email
      apoteker_nama
      apoteker_sika_sipa
      apoteker_sika_sipa_masa_berlaku
      apoteker_stra
      apoteker_stra_masa_berlaku
      apoteker_telepon
      asisten_alamat
      asisten_nama
      asisten_sikttk
      asisten_sikttk_masa_berlaku
      asisten_telepon
      bayar_metode
      bayar_pembayaran_nama
      bayar_pembayaran_telepon
      bayar_pembelian_nama
      bayar_pembelian_telepon
      bayar_penerimaan_nama
      bayar_penerimaan_telepon
      buyer_documents {
        document_expired_date
        document_label
        document_name
        # document_url
        document_key
      }
      document_apj
      document_ktp_apoteker
      document_ktp_apoteker_asisten
      document_ktp_apoteker_pendamping
      document_ktp_pemilik_sarana
      document_npwp
      document_sertifikasi_cdakb
      document_sertifikasi_cdob
      document_sikttk_apoteker_asisten
      document_sipa_sika_apoteker
      document_sipa_sika_apoteker_pendamping
      document_siup
      document_sppkp
      document_stra_apoteker
      document_stra_apoteker_pendamping
      document_surat_izin_sarana
      faktur_alamat
      faktur_kota
      faktur_nama
      financial_cabang
      financial_kota
      financial_nama_account_bank
      financial_nama_bank
      financial_no_account_bank
      jadwal_kirim_barang_alamat
      jadwal_kirim_barang_hari
      jadwal_kirim_barang_jam
      jadwal_kirim_barang_tanggal
      jadwal_pembayaran_alamat
      jadwal_pembayaran_hari
      jadwal_pembayaran_jam
      jadwal_pembayaran_tanggal
      jadwal_pembelian_alamat
      jadwal_pembelian_hari
      jadwal_pembelian_jam
      jadwal_pembelian_tanggal
      jadwal_tukar_faktur_alamat
      jadwal_tukar_faktur_hari
      jadwal_tukar_faktur_jam
      jadwal_tukar_faktur_tanggal
      sarana_alamat
      sarana_alamat_pemilik
      sarana_email
      sarana_fax
      sarana_city
      sarana_kota_kodepos
      sarana_kabupaten
      sarana_kecamatan
      sarana_kelurahan
      sarana_masa_berlaku
      sarana_masa_berlaku_izin
      sarana_nama
      sarana_nama_pemilik
      sarana_nama_wajib_pajak
      sarana_no_izin
      sarana_no_ktp_pemilik
      sarana_no_nib
      sarana_no_siup
      sarana_sertifikasi_cdob
      sarana_status_usaha
      sarana_telepon
      selected_distributor_list {
        vendor_name
      }
      type_of_business
    }
  }
`;

export const CUSTOMER_COMPANY_EDIT_VALUES = gql`
    query {
        getCustomerCompanyDetail {
            company_name
            company_email
            company_street
            company_country_id
            company_city
            company_postcode
            company_telephone
            company_logo_url
            company_region_id
            company_district
            company_sub_district
            company_region_id
        }
    }
`;

export const getRegularCredit = gql`
    {
        getRegularCredit {
            regularCredits {
                amount
                company_id
                company_name
                id
                outstanding_amount
                overdue_amount
                top
                vendor_code
                vendor_name
            }
        }
    }
`;

export const getCustomerRegularCreditHistory = gql`
    {
        getCustomerRegularCreditHistory {
            data {
                action_type
                actor
                amount
                billing_increment_id
                company_id
                company_name
                created_at
                entity_id
                order_increment_id
                regular_credit_id
                vendor_code
            }
            message
            status
            total_count
        }
    }
`;

export const getCustomerSalesRule = gql`
    query($page_size: Int, $current_page: Int) {
        getCustomerSalesRule(pageSize: $page_size, currentPage: $current_page) {
            sales_rules {
                coupon_code
                description
                end_date
                name
                seller_name
                start_date
            }
            total_count
        }
    }
`;

export const getNegotiableQuoteComments = gql`
    query getNegotiableQuoteComments($uid: ID!, $pageSize: Int!, $currentPage: Int!) {
        getNegotiableQuoteComments(
            uid: $uid
            pageSize: $pageSize
            currentPage: $currentPage
            sort: { sort_field: CREATED_AT, sort_direction: DESC }
        ) {
            items {
                attachment
                author {
                    firstname
                    lastname
                }
                created_at
                creator_type
                text
                uid
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

export const getNegotiableQuoteHistory = gql`
    query getNegotiableQuoteHistory($uid: ID!, $pageSize: Int!, $currentPage: Int!) {
        getNegotiableQuoteHistory(uid: $uid, pageSize: $pageSize, currentPage: $currentPage, sort: { sort_field: CREATED_AT, sort_direction: DESC }) {
            items {
                author {
                    firstname
                    lastname
                }
                change_type
                created_at
                uid
                changes {
                    comment_added {
                        comment
                    }
                    custom_changes {
                        new_value
                        old_value
                        title
                    }
                    expiration {
                        new_expiration
                        old_expiration
                    }
                    expired_date
                    proposed_type
                    proposed_value
                    statuses {
                        changes {
                            new_status
                            old_status
                        }
                    }
                    total {
                        new_price {
                            currency
                            value
                        }
                        old_price {
                            currency
                            value
                        }
                    }
                }
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

export const registerSeller = gql`
    mutation registerSeller($vendor_code: String!) {
        registerSeller(vendor_code: $vendor_code) {
            message
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany($company_email: String, $company_logo: String, $company_name: String, $legal_address: CompanyLegalAddressUpdateInput) {
        updateCompany(
            input: { company_email: $company_email, company_logo: $company_logo, company_name: $company_name, legal_address: $legal_address }
        ) {
            company {
                email
                id
                legal_address {
                    city
                    country_code
                    district
                    postcode
                    region {
                        region
                        region_code
                        region_id
                    }
                    street
                    telephone
                }
                legal_name
                name
                payment_methods
                reseller_id
                vat_tax_id
            }
        }
    }
`;

export const getSellerByKecamatan = gql`
    query getSellerByKecamatan($page_size: Int, $current_page: Int) {
        getSellerByKecamatan(pageSize: $page_size, currentPage: $current_page) {
            status
            message
            total_count
            total_pages
            seller {
                approval_status
                banner
                beneficiaries
                business_type
                business_type_active
                company_city
                company_code
                company_country_id
                company_id
                company_name
                company_region
                company_social_media
                company_street
                description
                email
                estimation_days
                freeshipping_minimum_order_amount
                latitude
                location_operational_time
                logo
                longitude
                no_telp
                shipper_shipping
                short_description
                status
                vendor_payments
                vendor_shipping
                website
            }
        }
    }
`;

export const getCompanyStatus = gql`
    query getCompanyStatus {
        getCompanyStatus {
            status
            message
            revision
            docs_expired
            docs_will_expired
            is_company_admin
        }
    }
`;

// CHAT RELATED SCHEMA

export const getSessionMessageListSchema = gql`
    query getSessionList($customer_email: String) {
        getSessionMessageList(
            customer_email: $customer_email
            pageSize: 1000
            currentPage: 1
            sort: { sort_direction: DESC, sort_field: updated_at }
        ) {
            answered
            chat_id
            created_at
            customer_email
            customer_id
            customer_name
            ip_address
            is_read
            agent_code
            agent_name
            updated_at
            auto_terminate
            session
            last_message {
                time
                message
            }
        }
    }
`;

export const getMessageListSchema = gql`
    query getMessageList($chat_session_id: Int!) {
        getMessageList(chat_session_id: $chat_session_id, pageSize: 1000, currentPage: 1) {
            # chat_session_id
            chat_id
            customer_email
            customer_id
            customer_name
            messages {
                body_message
                # chat_message_id
                message_id
                created_at
                is_robot
                question_id
                updated_at
                sender
                is_read
                is_read_customer
                filename
                filetype
                url_data {
                    available
                    data
                }
            }
            agent_code
        }
    }
`;

export const terminateSessionSchema = gql`
    mutation terminateChatSessionUser($chat_id: Int!) {
        terminateChatSession(input: { chat_id: $chat_id }) {
            status
        }
    }
`;

export const addMessageSchema = gql`
    mutation sendMessage(
        $body_message: String!
        $chat_session_id: Int!
        $customer_email: String!
        $customer_id: Int
        $customer_name: String!
        $is_robot: Int!
        $agent_code: String!
        $sender: Int!
        $file: String
        $file_name: String
        $response_question_id: Int
    ) {
        addMessage(
            input: {
                body_message: $body_message
                chat_session_id: $chat_session_id
                customer_email: $customer_email
                customer_id: $customer_id
                customer_name: $customer_name
                is_robot: $is_robot
                agent_code: $agent_code
                sender: $sender
                file: $file
                file_name: $file_name
                response_question_id: $response_question_id
            }
        ) {
            body_message
            chat_message_id
            chat_session_id
            created_at
            customer_email
            customer_id
            customer_name
            is_robot
            product_id
            agent_code
            updated_at
            auto_response {
                agent_code
                auto_response_text
                message
                question_id
                answer {
                    message
                    answer_id
                    question_id
                    response_question_id
                }
            }
        }
    }
`;

export const createFirebaseDocSchema = gql`
    mutation createFirebaseDoc($agent_code: String!, $agent_name: String!, $customer_email: String!, $customer_name: String!, $phone_number: String) {
        createFirebaseDocument(
            input: {
                agent_code: $agent_code
                agent_name: $agent_name
                customer_email: $customer_email
                customer_name: $customer_name
                phone_number: $phone_number
            }
        ) {
            status
        }
    }
`;

export const getBlacklistSchema = gql`
    query getBlacklist($email: String!) {
        getBlacklist(email: $email) {
            status
        }
    }
`;

export const getAgentListSchema = gql`
    query getAgentList($role: String) {
        getAgentList(role: $role) {
            agent_id
            agent_name
            agent_code
        }
    }
`;

export const addActiveSessionSchema = gql`
    mutation addActiveSession($agent_code: String!, $customer_email: String!) {
        addActiveSession(input: { agent_code: $agent_code, customer_email: $customer_email }) {
            status
        }
    }
`;

export const markUnreadMessage = gql`
    mutation markUnreadMessage($chat_session_id: Int!) {
        markUnreadMessage(input: { sender: 1, chat_session_id: $chat_session_id }) {
            status
        }
    }
`;

export const getApprovedSellerList = gql`
    {
        getApprovedSellerListCustomerLogin {
            company_name
            status
            vendor_code
        }
    }
`;

export const getVendorLogo = gql`
    query getVendorLogo($filter: MultipleImageSellerOmsFilterInput!) {
        getMultipleImageSellerOms(filter: $filter, pageSize: 200, currentPage: 1) {
            items {
                company_code
                logo
                vendor_code
                vendor_id
                vendor_name
            }
        }
    }
`;

// END CHAT RELATED SCHEMA

export const getCustomRewardPointsTransaction = gql`
    query getCustomRewardPointsTransaction($page_size: Int, $current_page: Int) {
        getCustomRewardPointsTransaction(pageSize: $page_size, currentPage: $current_page) {
            balance
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
            transaction {
                adjusment_balance
                adjusment_point
                adjustment_type
                comment
                transaction_date
                transaction_id
            }
        }
    }
`;

export const getInboxNotificationList = gql`
    {
        getInboxNotificationList(pageSize: 4) {
            inboxNotification {
                created_at
                id
                status_read
                subject
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

export const getAwHelpdesk2TicketList = gql`
    query getAwHelpdesk2TicketList($pageSize: Int, $currentPage: Int, $sort: awHelpdesk2TicketSortInput) {
        awHelpdesk2TicketList(pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            items {
                agent {
                    id
                    name
                }
                created_at
                customer {
                    email
                    id
                    name
                }
                customer_rating
                department {
                    current_storefront_label {
                        content
                        store_id
                    }
                    id
                    name
                    options {
                        current_storefront_label {
                            content
                            store_id
                        }
                        id
                        is_required
                        sort_order
                        storefront_labels {
                            content
                            store_id
                        }
                        type
                        values {
                            current_storefront_label {
                                content
                                store_id
                            }
                            id
                            option_id
                            sort_order
                            storefront_labels {
                                content
                                store_id
                            }
                        }
                    }
                    storefront_labels {
                        content
                        store_id
                    }
                }
                entity_id
                external_link
                external_url
                messages {
                    attachments {
                        file_name
                        file_path
                        file_url
                        id
                    }
                    author_name
                    content
                    created_at
                    id
                    type
                }
                order {
                    channel_order_status
                    created_at
                    grand_total
                    id
                    increment_id
                }
                priority {
                    id
                    label
                }
                status {
                    id
                    label
                }
                store_id
                subject
                tag_names
                uid
                updated_at
                vendor_code
            }
            page_info {
                current_page
                page_size
            }
            total_count
        }
    }
`;

export const getTicketById = gql`
    query getTicketById($entity_id: Int!) {
        awHelpdesk2TicketById(entity_id: $entity_id) {
            agent {
                id
                name
            }
            can_submit_rating
            created_at
            customer {
                email
                id
                name
            }
            customer_rating
            department {
                current_storefront_label {
                    content
                    store_id
                }
                id
                name
                options {
                    current_storefront_label {
                        content
                        store_id
                    }
                    id
                    is_required
                    sort_order
                    storefront_labels {
                        content
                        store_id
                    }
                    type
                    values {
                        current_storefront_label {
                            content
                            store_id
                        }
                        id
                        option_id
                        sort_order
                        storefront_labels {
                            content
                            store_id
                        }
                    }
                }
                storefront_labels {
                    content
                    store_id
                }
            }
            entity_id
            external_link
            external_url
            messages {
                attachments {
                    file_name
                    file_path
                    file_url
                    id
                }
                author_name
                content
                created_at
                id
                type
            }
            order {
                channel_order_status
                created_at
                grand_total
                id
                increment_id
            }
            priority {
                id
                label
            }
            status {
                id
                label
            }
            store_id
            subject
            tag_names
            uid
            updated_at
            vendor_code
        }
    }
`;

export const addTicketRate = gql`
    mutation addTicketRate($key: String!, $rating: Int!) {
        awHelpdesk2TicketRate(key: $key, rating: $rating) {
            agent {
                id
                name
            }
            created_at
            customer {
                email
                id
                name
            }
            customer_rating
            department {
                id
                name
                options {
                    current_storefront_label {
                        content
                        store_id
                    }
                    id
                    is_required
                    sort_order
                    storefront_labels {
                        content
                        store_id
                    }
                    type
                    values {
                        current_storefront_label {
                            content
                            store_id
                        }
                        id
                        option_id
                        sort_order
                        storefront_labels {
                            content
                            store_id
                        }
                    }
                }
            }
            entity_id
            external_link
            external_url
            messages {
                attachments {
                    file_name
                    file_path
                    file_url
                    id
                }
                author_name
                content
                created_at
                id
                type
            }
            order {
                channel_order_status
                created_at
                grand_total
                id
                increment_id
            }
            priority {
                id
                label
            }
            status {
                id
                label
            }
            store_id
            subject
            tag_names
            uid
            updated_at
            vendor_code
        }
    }
`;

export const ticketEscalate = gql`
    mutation ticketEscalate($key: String!, $message: String!) {
        awHelpdesk2TicketEscalate(key: $key, message: $message)
    }
`;

export const ticketReply = gql`
    mutation ticketReply($key: String!, $content: String!, $attachments: [awHelpdesk2TicketAttachmentInput]) {
        awHelpdesk2TicketReply(key: $key, content: $content, attachments: $attachments) {
            status {
                id
                label
            }
        }
    }
`;

export const ticketClose = gql`
    mutation ticketClose($key: String!) {
        awHelpdesk2TicketClose(key: $key) {
            status {
                id
                label
            }
        }
    }
`;
export const ticketReOpen = gql`
      mutation ticketReOpen($key: String!) {
        awHelpdesk2TicketReopen(key: $key) {
            status {
                id
                label
            }
        }
    }
`;

export const getCustomerGuideStatus = gql`
    {
        customer {
            guide {
                homepage
                homepage_login
                plp
                pdp
                cart
                checkout
            }
        }
    }
`;

export const COMPLETE_GUIDE = gql`
    mutation completeGuide($page: String) {
        complateGuide(page: $page)
    }
`;

export const GET_CUSTOMER_GUIDE_CONFIG = gql`
    query getCustomerGuideConfig($page: String!) {
        getCustomerGuideConfig(filter: { page: { eq: $page } }) {
            items {
                element
                intro
                page
                position
            }
        }
    }
`;

export const getCustomerVoucher = gql`
    query($page_size: Int, $current_page: Int) {
        customer {
            coupons(pageSize: $page_size, currentPage: $current_page) {
                sales_rules {
                    name
                    description
                    seller_name
                    coupon_code
                    start_date
                    end_date
                }
                total_count
                page_info {
                    current_page
                    page_size
                    total_pages
                }
            }
        }
    }
`;

export const getDownloadBase64 = gql`
mutation getDownloadBase64($input: String!) {
    getDownloadBase64(input: $input) {
        base64
        file_name
        type
    }
}
`;
