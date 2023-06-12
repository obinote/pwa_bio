import { gql } from '@apollo/client';

export const getArProduct = gql`
  query getArProduct($url_key: String!){
    products(search:"", filter: {
      url_key: {
        eq: $url_key
      }
    }){
      items{
        ar_gltf
        name
      }
      total_count
    }
  }
`;

export default {
    getArProduct,
};
