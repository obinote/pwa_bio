import { gql } from '@apollo/client';

export const searchByImage = gql`
    query products($uuid: String!) {
        products(uuid: $uuid, search: "") {
            items {
            __typename
            id
            sku
            name
            is_valid
            vendor_name
            valid_to_nie
            no_nie
            manufacture_name
            url_key
            stock_status
            short_description {
                __typename
                html
            }
            small_image {
                __typename
                url
                label
            },
            categories {
                name
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
            discount{
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
            discount{
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
        special_from_date
        special_to_date
        new_from_date
        new_to_date
        }
    image_search
    total_count
    }
}
`;

export default {
    searchByImage,
};
