/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';

export const getCategories = `
    {
        categoryList {
            children_count
            children {
                id
                level
                name
                path
                url_path
                url_key
                include_in_menu
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    image
                    image_path
                    children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                        children {
                            id
                            level
                            name
                            path
                            url_path
                            url_key
                        }
                    }
                }
            }
        }
    }
`;

export const getVesMenu = `
    query getVesMenu($alias: String!) {
        vesMenu(alias: $alias) {
            menu_id
            name
            items {
                id
                name
                link
                content_type
                link_type
                category_id
                menu_id
                children {
                    id
                    name
                    link
                    link_type
                    category_id
                    children {
                        id
                        name
                        link
                        link_type
                        category_id
                        children {
                            id
                            name
                            link
                            link_type
                            category_id
                        }
                    }
                }
            }
        }
    }
`;

export const storeConfig = `
{
    storeConfig {
      secure_base_media_url
      secure_base_static_url
      customer_password_minimum_password_length
      customer_password_required_character_classes_number
      base_media_url
      base_static_url
      base_url
      base_currency_code
      code
      catalog_search_engine
      copyright
      catalog_default_sort_by
      category_url_suffix
      cms_page
      default_title
      default_keywords
      default_description
      default_display_currency_code
      date_of_birth
      environment_id
      fine_management_status
      gender
      header_logo_src
      head_shortcut_icon
      icube_pinlocation_gmap_key
      icube_pinlocation_geocoding_key
      locale
      logo_alt
      logo_width
      logo_height
      shipments_configuration
      payments_configuration
      store_group_code
      website_code
      store_code
      pwa {
        add_to_cart_enable
        app_name
        cms_contact_identifiers
        cms_social_media_link_identifer
        configurable_options_enable
        custom_install_app_enable
        default_robot
        drawer_filter_on_desktop_enable
        facebook_app_id
        facebook_meta_id_app_id
        facebook_meta_id_enable
        footer_desktop
        footer_mobile
        home_slider_desktop_height
        home_slider_desktop_width
        home_slider_mobile_height
        home_slider_mobile_width
        icon_apple_touch
        image_category_height
        image_category_width
        image_product_height
        image_product_width
        install_message
        label_enable
        label_new_enable
        label_sale_enable
        label_weltpixel_enable
        magezon_slider_desktop_height
        magezon_slider_desktop_width
        magezon_slider_mobile_height
        magezon_slider_mobile_width
        page_size
        paypal_debug
        paypal_enable
        paypal_merchant_id
        popup_detail_image_enable
        promo_banner_lite_after_width
        promo_banner_lite_label_width
        promo_banner_lite_top_width
        quick_view_enable
        rating_enable
        recaptcha_contact_enable
        recaptcha_enable
        recaptcha_login_enable
        recaptcha_register_enable
        recaptcha_server_key_dev
        recaptcha_server_key_local
        recaptcha_server_key_prod
        recaptcha_server_key_stage
        recaptcha_site_key_dev
        recaptcha_site_key_local
        recaptcha_site_key_prod
        recaptcha_site_key_stage
        remove_decimal_price_enable
        share_icon_email
        share_icon_facebook
        share_icon_line
        share_icon_linkedin
        share_icon_pinterest
        share_icon_telegram
        share_icon_twitter
        ves_menu_alias
        ves_menu_enable
      }
      store_name
      welcome
      timezone
      title_prefix
      title_suffix
      title_separator
      website_id
      weight_unit
      oauth_access_token_lifetime_customer
      pwa_checkout_debug_enable
      snap_client_key
      allow_guest_checkout
      snap_is_production
      pickup_store
      cookie_restriction
      login_phone_password
      forgot_password_phone
      global_promo {
        enable
        text_color
        background_color
      }
      pin_location_latitude
      pin_location_longitude
      minimum_order_amount
      minimum_order_enable
    }
  }  
`;

export const GET_RECAPTCHA_SITE_KEY = (appEnv) => gql`
    {
        storeConfig {
            pwa {
                recaptcha_site_key_${appEnv}
            }
        }
    }
`;

export const getCmsList = `
{
  storeConfig {
    cms_page  
  }
}
`;
