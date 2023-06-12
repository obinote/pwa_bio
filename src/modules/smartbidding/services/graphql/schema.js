/* eslint-disable linebreak-style */
import { gql } from '@apollo/client';

export const getBiddingList = gql`
    query getBiddingList(
        $filter: BiddingFilterInput,
        $pageSize: Int,
        $currentPage: Int,
        $sort: BiddingSortInput
    ){
        getBiddingList(
            filter: $filter,
            pageSize: $pageSize,
            currentPage: $currentPage,
            sort: $sort,
        ) {
            data {
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
                created_at
                id
                product_name
                qty
                updated_at
            }
            name
            quotation {
                id
            }
            status
            updated_at
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

export const createBiddingList = gql`
    mutation createBiddingListSaveSubmit(
        $due_date: String!,
        $items: [BiddingItemInput],
        $status: String!,
        $surat_lelang: [SuratLelangInput],
        $name: String,
        $deskripsi: String
    ) {
        createBiddingListSaveSubmit(
            input: {
                due_date: $due_date,
                items: $items,
                status: $status,
                surat_lelang: $surat_lelang,
                name: $name,
                deskripsi: $deskripsi,
            }
        ) {
            result {
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
                product_name
                qty
            }
            name
            status
            updated_at
            }
        }
    }
`;

export const createBiddingDraft = gql`
    mutation createBiddingListSaveDraft(
        $due_date: String!,
        $items: [BiddingItemInput],
        $status: String!,
        $surat_lelang: [SuratLelangInput],
        $name: String,
        $deskripsi: String
    ) {
        createBiddingListSaveDraft(
            input: {
                due_date: $due_date,
                items: $items,
                status: $status,
                surat_lelang: $surat_lelang,
                name: $name,
                deskripsi: $deskripsi,
            }
        ) {
            result {
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
                product_name
                qty
            }
            name
            status
            updated_at
            }
        }
    }
`;

export const saveBiddingList = gql`
    mutation createBiddingListSaveSubmit(
        $due_date: String!,
        $items: [BiddingItemInput],
        $status: String!,
        $bidding_id: Int,
        $name: String,
        $deskripsi: String
    ) {
        createBiddingListSaveSubmit(
            input: {
                due_date: $due_date,
                items: $items,
                status: $status,
                bidding_id: $bidding_id
                name: $name,
                deskripsi: $deskripsi,
            }
        ) {
            result {
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
                product_name
                qty
            }
            name
            status
            updated_at
            }
        }
    }
`;

export const saveBiddingDraft = gql`
    mutation createBiddingListSaveDraft(
        $due_date: String!,
        $items: [BiddingItemInput],
        $status: String!,
        $bidding_id: Int,
        $name: String,
        $deskripsi: String
    ) {
        createBiddingListSaveDraft(
            input: {
                due_date: $due_date,
                items: $items,
                status: $status,
                bidding_id: $bidding_id
                name: $name,
                deskripsi: $deskripsi,
            }
        ) {
            result {
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
                product_name
                qty
            }
            name
            status
            updated_at
            }
        }
    }
`;

export const getBiddingDetails = gql`
    query getBidding($id: Int!){
        getBidding(id: $id){
            company_email
            company_name
            created_at
            customer_id
            deskripsi
            due_date
            id
            items {
            created_at
            id
            product_name
            qty
            updated_at
            }
            name
            quotation {
            created_at
            created_by
            id
            quote_name
            status
            total_price
            uid
            updated_at
            }
            status
            surat_lelang {
                filename
                url
            }
            updated_at
        }
    }
`;

export const cancelBidding = gql`
    mutation cancelBidding ($id: Int!){
        cancelBidding(id: $id){
            message
            success
        }
    }
`;

export default {
    getBiddingList,
    createBiddingList,
    createBiddingDraft,
    saveBiddingList,
    saveBiddingDraft,
    getBiddingDetails,
    cancelBidding,
};
