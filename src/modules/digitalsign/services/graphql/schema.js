import { gql } from '@apollo/client';

const getOrderLetter = gql`
    query getOrderLetter($increment_id: String!) {
        getOrderLetter(increment_id: $increment_id) {
            companyName
            apotekerName
            letterNumber
            orderDate
        }
    }
`;

export default { getOrderLetter };
