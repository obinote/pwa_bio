import { gql } from '@apollo/client';

export const getCustomerMisteryBoxAvailable = gql`
    query{
        getCustomerMisteryBoxAvailable {
            is_valid
            remaining_misterybox
        }
    }
`;

export const getPrize = gql`
    mutation{
        getPrize {
            coupon_code
            coupon_id
            point_amount
            salesrule_description
            salesrule_name
            type
        }
    }
`;

export default {
    getCustomerMisteryBoxAvailable,
    getPrize,
};
