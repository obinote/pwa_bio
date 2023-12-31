import { gql } from '@apollo/client';

export const getBannerSlider = gql`
    {
        getHomepageSlider {
            slider_id
            images {
                image_id
                image_url
                mobile_image_url
                thumb_image_url 
                url_redirection
            }
        }
    }
`;

export const getFeaturedProducts = (config = {}) => gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                path
                image_path
                url_path
                products {
                    items {
                        __typename
                        id
                        name
                        sku
                        url_key
                        new_from_date
                        new_to_date
                        canonical_url
                        small_image {
                            url,
                        }
                        ${config?.pwa?.label_weltpixel_enable ? `
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
                        ` : ''}
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
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                        special_from_date
                        special_to_date
                    }
                }
            }
            children_count
        }
    }
`;

export const getCategoryList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                description
                image_path
                url_path
            }
            children_count
        }
    }
`;

export const getCmsPageConfig = gql`
    {
        storeConfig {
            pwa {
                use_cms_page_enable
                use_cms_page_identifier
            }
        }
    }
`;

export const getHomePageConfig = `
{
    storeConfig {
        pwa {
            use_cms_page_enable
            use_cms_page_identifier
            banner_slider_enable
            banner_slider_title
            category_list_enable
            category_list_url_key            
            category_list_image_size_desktop_height
            category_list_image_size_desktop_width
            category_list_image_size_mobile_height
            category_list_image_size_mobile_width
            features_product_enable
            features_product_url_key
        }
    }
}
`;

export default {
    getBannerSlider,
    getCategoryList,
    getFeaturedProducts,
    getCmsPageConfig,
};
