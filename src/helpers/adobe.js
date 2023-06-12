/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
import { getAppEnv } from '@root/core/helpers/env';
import { HOST } from '@root/swift.config.js';

const appEnv = getAppEnv();
const getHost = HOST[appEnv] ? HOST[appEnv] : HOST.dev;

// https://github.com/adobe/magento-storefront-event-collector/blob/main/example/index.js
// https://github.com/adobe/magento-storefront-event-collector/blob/main/example/index.html
// https://www.npmjs.com/package/@magento/recommendations-js-sdk
export const adobe = {
    publish: {
        addToCart: ({
            cartId,
            sku,
            quantity,
            price_range,
        }) => {
            const mse = window.magentoStorefrontEvents;
            const dataCart = {
                id: cartId,
                items: [{
                    product: { sku, quantity },
                    prices: {
                        price: {
                            value: price_range?.maximum_price?.final_price?.value,
                            currency: null,
                        },
                    },
                }],
            };
            mse.context.setShoppingCart(dataCart);
            mse.publish.addToCart();
        },
        // end: add to cart
        placeOrder: (cart) => {
            const mse = window.magentoStorefrontEvents;
            const dataOrder = {
                appliedCouponCode: cart?.applied_coupons,
                email: cart?.email,
                grandTotal: cart?.prices?.grand_total?.value,
                orderId: cart?.id,
                orderType: null,
                otherTax: 0.0,
                paymentMethodCode: cart?.selected_payment_method?.code,
                paymentMethodName: cart?.selected_payment_method?.title,
                payments: [],
                salesTax: 0.0,
                subtotalExcludingTax: cart?.prices?.subtotal_excluding_tax?.value,
                subtotalIncludingTax: cart?.prices?.subtotal_including_tax?.value,
                shipping: {
                    shippingAmount: cart?.shipping_addresses[0]?.selected_shipping_method?.amount?.value,
                    shippingMethod: `${cart?.shipping_addresses[0]?.selected_shipping_method?.method_title} - ${cart?.shipping_addresses[0].selected_shipping_method?.carrier_title}`,
                },
            };
            mse.context.setOrder(dataOrder);
            mse.publish.placeOrder();
        },
        // end: place order
        productView: (product) => {
            if (window !== 'undefined') {
                const productItems = product?.items;
                if (productItems?.length > 0) {
                    const mse = window.magentoStorefrontEvents;
                    const productItem = productItems[0];
                    const categories = [];
                    for (const productItemIndex in productItem?.categories) {
                        const productItemCategory = productItem?.categories[productItemIndex];
                        categories.push(productItemCategory?.name);
                    }
                    const dataProduct = {
                        productId: productItem?.id,
                        name: productItem?.name,
                        sku: productItem?.sku,
                        topLevelSku: productItem?.sku,
                        specialToDate: productItem?.special_to_date,
                        specialFromDate: productItem?.special_from_date,
                        newToDate: null,
                        newFromDate: null,
                        createdAt: null,
                        updatedAt: null,
                        manufacturer: null,
                        countryOfManufacture: null,
                        categories,
                        productType: productItem?.__typename,
                        pricing: {
                            minimalPrice: productItem?.price_range?.minimal_price?.final_price?.value ?? 0,
                            regularPrice: productItem?.price_range?.maximum_price?.regular_price?.value ?? 0,
                            maximalPrice: productItem?.price_range?.maximum_price?.final_price?.value ?? 0,
                            specialPrice: productItem?.price_range?.maximum_price?.discount?.amount_off ?? 0,
                            currencyCode: productItem?.price_range?.maximum_price?.final_price?.currency,
                            tierPricing: productItem?.price_tiers,
                        },
                        canonicalUrl: `${getHost}/${productItem?.url_key}`,
                        mainImageUrl: productItem?.small_image?.url,
                    };
                    mse.context.setProduct(dataProduct);
                    mse.publish.productPageView({
                        commerce: {
                            productViews: { value: 1 },
                        },
                    });
                }
            }
        },
        // end: product view
    },
};

/* const userViewHistory = [{
    "date": "2023-03-14T07:29:07.450Z",
    "sku": "2212-11001741"
}]; */
/*
* set context before publish to adobe
const mse = window.magentoStorefrontEvents;
const storeInstanceParams = {
    "storeUrl":"http:\/\/localhost:3000\/",
    "websiteId":1,
    "websiteCode":"base",
    "storeId":1,
    "storeCode":"main_website_store",
    "storeViewId":2,
    "storeViewCode":"biofarma_id",
    "websiteName":"Main Website",
    "storeName":"Main Website Store",
    "storeViewName":"ID",
    "baseCurrencyCode":"IDR",
    "storeViewCurrencyCode":"IDR",
    "catalogExtensionVersion":"101.4.0",
    "environmentId":"a3df3aad-a414-4310-b7d6-bb64cfd11525",
    "environment":"Testing"
};
console.log('storeInstanceParams', storeInstanceParams);
mse.context.setStorefrontInstance(storeInstanceParams);
mse.context.setMagentoExtension({
    magentoExtensionVersion: "7.0.13",
});
mse.context.setDataServicesExtension({
    version: "7.0.13",
});
mse.context.setPage({
    pageType: "Default"
});
mse.context.setContext("pageExtended", {
    action: "page-view"
});
mse.context.setPage({
    pageType: "Product"
});
mse.context.setContext("pageExtended", {
    action: "product-view"
});
mse.context.setProduct({
    "productId":4553,
    "name":"HAVRIX",
    "sku":"34301-P0002",
    "topLevelSku":"34301-P0002",
    "specialFromDate":null,
    "specialToDate":null,
    "newFromDate":"2022-08-30 21:52:54",
    "newToDate":null,
    "createdAt":"2022-08-30 10:07:31",
    "updatedAt":"2022-10-24 04:25:03",
    "categories":["135","199"],
    "productType":"simple",
    "pricing":{"regularPrice":289200,"minimalPrice":null,"specialPrice":null},
    "canonicalUrl":"https:\/\/biofarma-p3.testingnow.me\/catalog\/product\/view\/id\/4553\/s\/havrix\/?___store=biofarma_id",
    "mainImageUrl":"https:\/\/biofarma-p3.testingnow.me\/media\/catalog\/product\/6\/3\/6311cb66cd6c9.jpg"
});
* publish example : window.magentoStorefrontEvents.publish.recsUnitView('34301-P0002');
*/
