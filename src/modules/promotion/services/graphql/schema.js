/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const promotionOutput = `
    sales_rules {
        name 
        description
        seller_name
        coupon_code
        start_date
        end_date
    }
`;

export const customerPromotionList = gql`
    query getCustomerSalesRule {
        getCustomerSalesRule {
            ${promotionOutput}
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

export default {
    customerPromotionList, getCmsBlocks,
};
