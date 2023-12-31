/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Router from 'next/router';
import TagManager from 'react-gtm-module';
import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { modules } from '@config';
import { adobe } from '@helpers/adobe';
import {
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
    addProductsToCartCustom,
    writeCartProductsReportMutation,
} from '@core_modules/product/services/graphql';

const CoreSimpleOptionItem = ({
    setOpen = () => { },
    t,
    data,
    View,
    handleAddToCart: CustomAddToCart,
    loading: customLoading,
    setLoading: setCustomLoading,
    checkCustomizableOptionsValue,
    errorCustomizableOptions,
    customizableOptions,
    ...other
}) => {
    const [qty, setQty] = React.useState(1);
    let cartId = '';
    let isLogin = '';
    const {
        __typename, sku, name, categories,
        price_range, stock_status, url_key,
        is_valid,
    } = data;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [writeCartProductsReport] = writeCartProductsReportMutation([data.id]);
    const [addProductsCartCustom] = addProductsToCartCustom();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();
    let [loading, setLoading] = useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const addToCart = async () => {
        let customizable_options = [];
        const entered_options = [];
        const uids = [];

        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    const findOptions = customizable_options.find((item) => item.id === op.option_id);
                    if (findOptions) {
                        customizable_options = customizable_options.filter(
                            (item) => item.id !== op.option_id,
                        );
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: `${findOptions.value_string},${op.value}`,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: `${findOptions.value_string},${op.value}`,
                            });
                        }
                    } else if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                if (customizable_options.length === 0) {
                    if (op.__typename === 'CustomizableFieldValue'
                        || op.__typename === 'CustomizableAreaValue'
                        || op.__typename === 'CustomizableDateValue'
                    ) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        uids.push(op.uid);
                    }
                }
                return op;
            });
        }

        if (CustomAddToCart && typeof CustomAddToCart === 'function') {
            CustomAddToCart({
                ...data,
                qty: parseFloat(qty),
                customizable_options,
            });
        } else {
            setLoading(true);
            const errorMessage = {
                variant: 'error',
                text: t('product:failedAddCart'),
                open: true,
            };
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                } else if (cartUser.data && cartUser.data.customerCart) {
                    const token = cartUser.data.customerCart.id || '';
                    cartId = token;
                    setCartId(token);
                }
            }
            if (__typename === 'SimpleProduct') {
                const variables = {
                    cartItems: [
                        {
                            quantity: parseFloat(qty),
                            sku,
                        },
                    ],
                };

                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addToCart',
                        eventLabel: name,
                        ecommerce: {
                            currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                            add: {
                                products: [{
                                    name,
                                    id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    category: categories.length > 0 ? categories[0].name : '',
                                    list: categories.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    dimensions4: stock_status,
                                }],
                            },
                        },
                    },
                });

                addProductsCartCustom({
                    variables,
                })
                    .then((res) => {
                        if (res?.data?.addProductsToCartCustom?.user_errors.length === 0) {
                            window.reloadCartQty = true;
                            window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                            writeCartProductsReport();

                            // publish to adobe
                            adobe.publish.addToCart({
                                cartId,
                                sku,
                                quantity: parseFloat(qty),
                                price_range,
                            });
                        } else {
                            const message = res?.data?.addProductsToCartCustom?.user_errors[0].message ?? 'Failed add to cart';
                            window.toastMessage({ variant: 'error', text: message, open: true });
                        }

                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                            Router.push(`/${url_key}`);
                        }

                        setLoading(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message || errorMessage.text,
                        });
                    });
            }
        }
    };

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                addToCart();
            }
        } else {
            addToCart();
        }
    };

    const handleRegisterDistributor = () => {
        Router.push('customer/account/distributor');
    };

    return (
        <View
            qty={qty}
            setQty={setQty}
            maxQty={data.max_sale_qty}
            handleAddToCart={handleAddToCart}
            handleRegisterDistributor={handleRegisterDistributor}
            t={t}
            loading={loading}
            disabled={stock_status === 'OUT_OF_STOCK'}
            is_valid={is_valid}
            {...other}
        />
    );
};

export default CoreSimpleOptionItem;
