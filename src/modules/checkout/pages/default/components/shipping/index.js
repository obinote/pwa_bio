import _ from 'lodash';
import React from 'react';
import TagManager from 'react-gtm-module';
import gqlService from '@core_modules/checkout/services/graphql';

const Shipping = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        updateFormik,
        handleOpenMessage,
        storeConfig,
        isOnlyVirtualProductOnCart,
        ShippingView,
        checkoutTokenState,
        setCheckoutTokenState,
        loadingShippingAddress,
        setLoadingShippingAddress,
    } = props;

    const { loading, data, selected } = checkout;
    const [setShippingMethod] = gqlService.setShippingMethod();
    const { data: shippingMethodList } = gqlService.getCheckoutConfigurations();
    const [onGetSicepatsInsurance, { data: getSicepatsInsuranceData }] = gqlService.getSicepatsInsurance();
    const [insuranceChecked, setInsuranceChecked] = React.useState(false);
    const [insurancePrice, setInsurancePrice] = React.useState(0);
    const [insuranceDisabled, setInsuranceDisabled] = React.useState(false);
    const mount = React.useRef();
    const defaultSicepats = React.useRef();
    const cartId = checkout?.data?.cart?.id;
    const selectedBillingAddress = checkout?.selected?.billing;

    React.useEffect(() => {
        mount.current = true;

        return () => {
            mount.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (mount.current) {
            const onShippingInsuranceInit = async () => {
                if (cartId !== undefined && selectedBillingAddress) {
                    await onGetSicepatsInsurance({
                        variables: {
                            cart_id: cartId,
                        },
                    }).then(() => {
                        // eslint-disable-next-line no-console
                        console.log('Successfully get insurance data');
                    }).catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(`Failed get insurance data with error: ${err}`);
                    });
                }
            };

            onShippingInsuranceInit();
        }
    }, [selectedBillingAddress]);

    React.useEffect(() => {
        if (mount.current && getSicepatsInsuranceData) {
            const sicepatsInsurance = getSicepatsInsuranceData?.getSicepatsInsurance?.sicepats_insurance;

            if (sicepatsInsurance) {
                const {
                    sicepats_insurance_status,
                    sicepats_insurance_value,
                    sicepats_insurance_optional,
                } = sicepatsInsurance;
                const state = { ...checkout };

                if (sicepats_insurance_status === true) {
                    state.selected.shipping_insurance = true;
                    setInsuranceChecked(true);

                    if (!sicepats_insurance_optional) {
                        setInsuranceDisabled(true);
                    } else {
                        setInsuranceDisabled(false);
                    }
                } else {
                    state.selected.shipping_insurance = false;
                    setInsuranceChecked(false);
                    setInsuranceDisabled(false);
                }

                setInsurancePrice(sicepats_insurance_value);

                const sicepatsShippings = state.data.shippingMethods.filter((shippingMethod) => shippingMethod.carrier_code === 'sicepats');

                defaultSicepats.current = {
                    shippings: JSON.stringify(sicepatsShippings),
                    insurance: state.selected.shipping_insurance,
                };

                /**
                 * UPDATE SHIPPING IN SUMMARY
                 */
                if (checkout?.data?.cart?.shipping_addresses[0]?.selected_shipping_method !== null) {
                    let updatedAmountValue = null;

                    state.data.cart.shipping_addresses.map((address) => address.available_shipping_methods.map((method) => {
                        const shippingCode = `${method.carrier_code}_${method.method_code}`;

                        if (state.selected.shipping === shippingCode) {
                            updatedAmountValue = method.amount.value;
                        }

                        return updatedAmountValue;
                    }));

                    const updatedCart = {
                        ...checkout,
                        data: {
                            ...checkout.data,
                            cart: {
                                ...checkout.data.cart,
                                shipping_addresses: checkout.data.cart.shipping_addresses.map((address) => ({
                                    ...address,
                                    selected_shipping_method: {
                                        ...address.selected_shipping_method,
                                        amount: {
                                            ...address.selected_shipping_method.amount,
                                            value: updatedAmountValue,
                                        },
                                    },
                                })),
                            },
                        },
                    };

                    setCheckout(updatedCart);
                }
                /**
                 * END OF UPDATE SHIPPING IN SUMMARY
                 */
            }
        }
    }, [getSicepatsInsuranceData]);

    const handleShipping = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            const [carrier_codes, method_codes, method_optional] = val.split('_');
            let method_code;
            let carrier_code = carrier_codes;
            if (method_optional) {
                method_code = `${method_codes}_${method_optional}`;
            } else {
                method_code = method_codes;
            }

            if (val === 'ihd_sameday_ihd_sameday') {
                carrier_code = 'ihd_sameday';
                method_code = 'ihd_sameday';
            }

            let state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: true,
                    extraFee: true,
                    order: true,
                    setshipping: true,
                },
            };

            state.selected.shipping = val;

            setCheckout(state);

            let updatedCart = {};
            await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code,
                    useInsurance: state.selected.shipping_insurance === true,
                },
            }).then((res) => {
                updatedCart = res;
            }).catch((err) => {
                updatedCart = err;
            });

            state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    payment: false,
                    extraFee: false,
                    order: false,
                    setshipping: false,
                },
            };
            setCheckout(state);

            if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                updatedCart = {
                    ...checkout.data.cart,
                    ...updatedCart.data.setShippingMethodsOnCart.cart,
                };
                updateFormik(updatedCart);

                const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));

                state = { ...checkout };
                state.data.paymentMethod = paymentMethod;
                state.data.cart = updatedCart;

                if (state.selected.shipping.includes('sicepats')) {
                    state.data.shippingMethods.forEach((shippingMethod) => {
                        if (shippingMethod.carrier_code === 'sicepats' && !insuranceDisabled) {
                            const currentShipping = JSON.parse(
                                defaultSicepats.current.shippings,
                            ).find((shipping) => shipping.value === shippingMethod.value);

                            const updatedShippingMethod = { ...shippingMethod };

                            if (state.selected.shipping_insurance) {
                                updatedShippingMethod.label = `${_.upperCase(updatedShippingMethod.method_code)
                                } + Insurance -  ${
                                    updatedShippingMethod.carrier_title}`;
                                updatedShippingMethod.amount.value = !defaultSicepats.current.insurance
                                    ? currentShipping.amount.value + insurancePrice
                                    : currentShipping.amount.value;
                                updatedShippingMethod.price_incl_tax.value = !defaultSicepats.current.insurance
                                    ? currentShipping.price_incl_tax.value + insurancePrice
                                    : currentShipping.price_incl_tax.value;
                            } else {
                                updatedShippingMethod.label = updatedShippingMethod.label.replace(' + Insurance', '');
                                updatedShippingMethod.amount.value = defaultSicepats.current.insurance
                                    ? currentShipping.amount.value - insurancePrice
                                    : currentShipping.amount.value;
                                updatedShippingMethod.price_incl_tax.value = defaultSicepats.current.insurance
                                    ? currentShipping.price_incl_tax.value - insurancePrice
                                    : currentShipping.price_incl_tax.value;
                            }

                            Object.assign(shippingMethod, updatedShippingMethod);
                        }
                    });
                }

                setCheckout(state);
                const selectedShipping = data.shippingMethods.filter((item) => item.method_code === method_code);
                const dataLayer = {
                    event: 'checkout',
                    ecommerce: {
                        checkout: {
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout' },
                            products: cart.items.map(({ quantity, product, prices }) => ({
                                name: product.name,
                                id: product.sku,
                                price: JSON.stringify(prices.price.value),
                                category: product.categories.length > 0 ? product.categories[0].name : '',
                                list: product.categories.length > 0 ? product.categories[0].name : '',
                                quantity: JSON.stringify(quantity),
                                dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                dimension5: '',
                                dimension6: '',
                                dimension7: prices.discount ? 'YES' : 'NO',
                            })),
                        },
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                    },
                };
                const dataLayerOption = {
                    event: 'checkoutOption',
                    ecommerce: {
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                        checkout_option: {
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout_option' },
                        },
                    },
                };
                TagManager.dataLayer({
                    dataLayer,
                });
                TagManager.dataLayer({
                    dataLayer: dataLayerOption,
                });
            } else {
                state.selected.shipping = null;
                if (updatedCart.message.includes('Token is wrong.')) {
                    setCheckoutTokenState(!checkoutTokenState);
                } else {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                }
            }
        }
    };

    const handleInsurance = async () => {
        const newState = !insuranceChecked;
        const state = { ...checkout };

        // Handle checkbox checked or not
        if (newState) {
            setInsuranceChecked(true);
            state.selected.shipping_insurance = true;
        } else {
            setInsuranceChecked(false);
            state.selected.shipping_insurance = false;
        }

        setCheckout(state);
        handleShipping(state.selected.shipping);
    };

    return (
        <ShippingView
            checkout={checkout}
            storeConfig={storeConfig}
            t={t}
            shippingMethodList={shippingMethodList}
            handleShipping={handleShipping}
            handleInsurance={handleInsurance}
            loading={loading}
            selected={selected}
            data={data}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
            insuranceChecked={insuranceChecked}
            insurancePrice={insurancePrice}
            insuranceDisabled={insuranceDisabled}
            loadingShippingAddress={loadingShippingAddress}
            setLoadingShippingAddress={setLoadingShippingAddress}
        />
    );
};

export default Shipping;
