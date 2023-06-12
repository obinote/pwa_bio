/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable radix */

import { useEffect, useState } from 'react';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Layout from '@layout';
import {
    addWishlist as mutationWishlist, getCartItemLazy,
    deleteCartItem, updateCartitemCustom, addProductToCartPromo, applyCouponToCart, removeCouponFromCart, cancelAndReOrder,
    updateCartitemBulk, getRequisitionList, addRequisition, addItemToRequisitionList, addQtyToRequisitionListItem,
    getCartCustomLazy,
} from '@core_modules/cart/services/graphql';
import _, { cloneDeep, debounce } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { breakPointsUp } from '@helper_theme';
import cartEventBus, { DELETE_CART_ITEM, UPDATE_CART_ITEM } from '@core_modules/cart/helpers/cartEventBus';
import useMessageTranslator from '@helpers/messageTranslator';
import { EventBus, DELETE_FROM_CART } from '@helpers/EventBus';
import Skeleton from './components/skeleton';

export const CartPageContext = React.createContext({});

const Cart = (props) => {
    const {
        t, token, isLogin, EmptyView, pageConfig, Content, storeConfig, ...other
    } = props;
    const __ = useMessageTranslator();

    const router = useRouter();
    const { paymentFailed, orderId, cart_id: failedCartId } = router.query;
    const [cart, setCart] = React.useState(null);
    const [requisitionList, setRequisitionList] = useState([]);
    const [errorCart, setErrorCart] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);
    const [editQtyBulk, setEditQtyBulk] = React.useState([]);
    const [editQtyItem, setEditQtyItem] = React.useState([]);
    const [openTooltip, setOpenTooltip] = React.useState(null);
    const [openModalAddItemReq, setOpenModalAddItemReq] = React.useState(false);
    const [openModalAddQtyReq, setOpenModalAddQtyReq] = React.useState(false);
    const [addQtyReqInput, setAddQtyReqInput] = React.useState(null);
    const [addQtyReqDesc, setAddQtyReqDesc] = React.useState('');
    const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);
    const desktop = breakPointsUp('sm');

    const config = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: 'cart',
        pageType: 'cart',
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem, deleteData] = deleteCartItem();
    const [actUpdateItem, update] = updateCartitemCustom();
    const [actUpdateItemBulk, updateBulk] = updateCartitemBulk();

    // reorder
    const [cancelAndReorderMutation, cancelAndReorderResponse] = cancelAndReOrder();

    // getCartDataLazzy
    // const [getCart, responseCart] = getCartDataLazy();

    const [getCartItem, responseCartItem] = getCartItemLazy();

    const [getCart, responseCart] = getCartCustomLazy();

    // get Requisition
    const {
        // loading: requisitionLoading,
        data: requisitionData,
        // error: requisitionError,
        refetch: getRequisition,
    } = getRequisitionList();

    // updatePromoItems
    const [mutationAddToCart, promoItems] = addProductToCartPromo();

    // apply and remove coupon
    const [applyCoupon, appliedCouponResult] = applyCouponToCart({ onError: () => { } });
    const [removeCoupon, removedCouponResult] = removeCouponFromCart({ onError: () => { } });

    // add requisition
    const [mutationAddRequisition] = addRequisition();
    const [mutationAddItemToRequisitionList] = addItemToRequisitionList();
    const [mutationAddQtyToRequisitionListItem] = addQtyToRequisitionListItem();

    React.useEffect(() => {
        function findVendorCart(masterCart, cartId) {
            return masterCart.find(({ cart_id }) => cart_id === cartId);
        }

        function setVendorCartItems(cartId, setter) {
            setCart((prevCartData) => {
                if (!findVendorCart(prevCartData, cartId)) return prevCartData;
                const clonedMasterCart = cloneDeep(prevCartData);
                const vendorCart = findVendorCart(clonedMasterCart, cartId);
                const items = setter(vendorCart.items);
                vendorCart.items = items;
                return clonedMasterCart;
            });
        }

        function deleteItemFromCart({ cartId, itemId }) {
            setVendorCartItems(cartId, (items) => items.filter(({ id }) => id !== itemId));
        }

        function updateItemFromCart({ cartId, itemId, qty }) {
            if (qty === 0) {
                deleteItemFromCart({ cartId, itemId });
                return;
            }

            setVendorCartItems(cartId, (items) => items.map((item) => {
                if (item.id === itemId) return { ...item, quantity: qty };
                return item;
            }));
        }

        // TODO use EventBus from '@helpers/EventBus'
        const unsubscribeDeleteCartItem = cartEventBus.on(DELETE_CART_ITEM, deleteItemFromCart);
        const unsubscribeUpdateCartItem = cartEventBus.on(UPDATE_CART_ITEM, updateItemFromCart);

        return () => {
            unsubscribeDeleteCartItem();
            unsubscribeUpdateCartItem();
        };
    }, []);

    React.useEffect(() => {
        if (paymentFailed && orderId) {
            if (failedCartId) {
                if (typeof window !== 'undefined') {
                    setCartId(failedCartId);
                    setTimeout(() => {
                        router.push('/checkout/cart');
                    }, 1000);
                }
            } else {
                cancelAndReorderMutation({
                    variables: {
                        order_id: orderId,
                    },
                });
            }
        } else if (getCart && !responseCart.called) {
            getCart({
                variables: {
                    vendor_code: '',
                },
            });
        } else {
            setLoadingCart(false);
        }
    }, []);

    React.useEffect(() => {
        if (cancelAndReorderResponse?.data?.cancelAndReorder?.cart_id) {
            const { cart_id } = cancelAndReorderResponse.data.cancelAndReorder;
            if (typeof window !== 'undefined') {
                if (cart_id) {
                    setCartId(cart_id);
                    if (paymentFailed && orderId) {
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    if (getCart && !responseCart.called && getCartItem && !responseCartItem.called) {
                        getCart({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                        getCartItem({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                    }
                }
            }
        }
    }, [cancelAndReorderResponse]);

    function fillEditQtyWithCustomerQuotes(customerQuotes) {
        const tempData = [];
        customerQuotes.forEach((cartItem) => {
            const { items } = cartItem;
            if (items.length) {
                items.forEach((val) => {
                    if (val) {
                        tempData.push({
                            cart_item_id: val.id,
                            quantity: val.quantity,
                        });
                    }
                });
            }
        });
        setEditQtyItem(tempData);
    }

    React.useEffect(() => {
        if (responseCart.loading) setLoadingCart(true);
        if (responseCart && responseCart.data && responseCart.data.customerQuotes) {
            setCart(responseCart.data.customerQuotes);
            fillEditQtyWithCustomerQuotes(responseCart.data.customerQuotes);
            setLoadingCart(false);
        }

        if (responseCart.error) {
            const errorList = [];
            if (responseCart.error && responseCart.error.graphQLErrors
                && responseCart.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < responseCart.error.graphQLErrors.length; idx += 1) {
                    const { message } = responseCart.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
            setLoadingCart(false);
        }
    }, [responseCart]);

    React.useEffect(() => {
        const resList = _.get(requisitionData, 'getRequisitionList.data');
        if (resList) {
            setRequisitionList(resList);
        }
    }, [requisitionData]);

    React.useEffect(() => {
        if (Array.isArray(cart)) {
            const tempData = [];
            cart.forEach((cartItem) => {
                const { items } = cartItem;
                if (items.length) {
                    items.map((val) => val && tempData.push({
                        cart_item_id: val.id,
                        quantity: val.quantity,
                    }));
                }
            });

            setEditQtyItem(tempData);
        }
    }, [cart]);

    const handleUpdateQtyBulk = (id, qty) => {
        const tempEdit = [];
        editQtyBulk.map((val) => tempEdit.push({
            cart_item_id: val.cart_item_id,
            quantity: id === val.cart_item_id ? qty : val.quantity,
        }));
        setEditQtyBulk(tempEdit);
    };

    function fetchUpdateItem(cartId, id, qty) {
        window.backdropLoader(true);
        setLoadingUpdate(true);
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
                quantity: parseInt(qty),
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                setLoadingUpdate(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                const message = e.message.split(':')[1].trim();
                const translatedMessage = message ? __(message) : t('cart:updateFailed');
                toggleEditMode();
                window.backdropLoader(false);
                setLoadingUpdate(false);
                window.toastMessage({
                    open: true,
                    text: translatedMessage,
                    variant: 'error',
                });
            });
    }

    const debouncedFetchUpdateItem = React.useCallback(debounce(fetchUpdateItem, 750), []);

    React.useEffect(() => () => debouncedFetchUpdateItem.cancel(), []);

    const handleUpdateQtyItem = (cartId, id, qty) => {
        const tempEdit = [];
        editQtyItem.map((val) => tempEdit.push({
            cart_item_id: val.cart_item_id,
            quantity: id === val.cart_item_id ? qty : val.quantity,
        }));
        setEditQtyItem(tempEdit);
        if (qty === '') {
            debouncedFetchUpdateItem.cancel();
            return;
        }

        debouncedFetchUpdateItem(cartId, id, qty);
    };

    const resetItemQty = (cartId, itemId) => {
        const { quantity } = cart.find(({ cart_id }) => cart_id === cartId).items.find((i) => i.id === itemId);

        const tempEdit = [];

        editQtyItem.forEach((val) => tempEdit.push({
            cart_item_id: val.cart_item_id,
            quantity: val.cart_item_id === itemId ? quantity : val.quantity,
        }));

        setEditQtyItem(tempEdit);
    };

    // React.useMemo(() => {
    //     if (!loadingCart && tmpData && tmpData.id) {
    //         setCart({ ...tmpData });
    //     }
    // }, [loadingCart]);

    // delete items
    const deleteItem = (cartId, itemProps) => {
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode: itemProps.prices.price.currency || storeConfig.base_currency_code,
                remove: {
                    cartItem: itemProps.id,
                    quantity: itemProps.quantity,
                    product: {
                        name: itemProps.product.name,
                        id: itemProps.product.sku,
                        price: itemProps.prices.price.value || 0,
                        dimensions4: itemProps.product.stock_status || '',
                    },
                },
            },
        };

        TagManager.dataLayer({ dataLayer });
        window.backdropLoader(true);

        setLoadingCart(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.reloadCartQty = true;
                window.toastMessage({
                    open: true,
                    text: t('cart:deleteSuccess'),
                    variant: 'success',
                });
                EventBus.emit(DELETE_FROM_CART);
            })
            .catch((e) => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // update items
    const updateItem = (itemData) => {
        window.backdropLoader(true);

        const cartId = getCartId();
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                const message = e.message.split(':')[1].trim();
                const translatedMessage = message ? __(message) : t('cart:updateFailed');
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: translatedMessage,
                    variant: 'error',
                });
            });
    };

    const updateItemBulk = () => {
        window.backdropLoader(true);
        const cartItems = [];
        editQtyBulk.map((item) => {
            if (item.quantity !== '') {
                cartItems.push({
                    cart_item_id: parseInt(item.cart_item_id),
                    quantity: parseInt(item.quantity),
                });
            }
            return true;
        });

        const cartId = getCartId();
        actUpdateItemBulk({
            variables: {
                cartId,
                cartItems,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                const message = e.message.split(':')[1].trim();
                const translatedMessage = message ? __(message) : t('cart:updateFailed');
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: translatedMessage,
                    variant: 'error',
                });
            });
    };

    // add free items handler
    const handleAddPromoItemToCart = async (params, cartId) => {
        let data = params;
        if (params.childProduct && params.parentProduct) {
            data = {
                ...params.childProduct,
                freeItemsData: params.parentProduct.freeItemsData,
            };
        }
        await window.backdropLoader(true);
        await mutationAddToCart({
            variables: {
                cart_id: cartId,
                cart_items: [
                    {
                        quantity: data.qty || 1,
                        sku: data.sku,
                        customizable_options: data.customizable_options,
                        promo_item_data: {
                            ruleId: data.freeItemsData.promo_item_data.ruleId,
                            minimalPrice: data.freeItemsData.promo_item_data.minimalPrice,
                            discountItem: data.freeItemsData.promo_item_data.discountItem,
                            isDeleted: data.freeItemsData.promo_item_data.isDeleted,
                            qtyToProcess: data.freeItemsData.promo_item_data.qtyToProcess,
                        },
                    },
                ],
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoSuccess'),
                    variant: 'success',
                });
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoFailed'),
                    variant: 'error',
                });
            });
    };

    const addRequisitionValidation = Yup.object().shape({
        name: Yup.string().required(t('validate:name:required')),
    });

    const formikAddRequisition = useFormik({
        initialValues: {
            name: '',
            description: '',
            items: [],
        },
        validationSchema: addRequisitionValidation,
        onSubmit: (values) => {
            const items = [];
            values.items.map((item) => items.push({
                sku: _.get(item, 'product.sku'),
                qty: _.get(item, 'quantity'),
            }));

            const inputAddReq = {
                name: values.name,
                description: values.description,
                items,
            };

            setOpenModalAddItemReq(false);
            window.backdropLoader(true);

            mutationAddRequisition({
                variables: {
                    input: inputAddReq,
                },
            }).then(async (res) => {
                if (res) {
                    await getRequisition();
                }

                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('cart:addRequisitionSuccess'),
                });
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('cart:addRequisitionFailed'),
                });
            });
        },
    });

    const handleAddItemToRequisition = ({ id_requisition, id_item }) => {
        let mergedCartQuotationItems = [];
        if (responseCart && responseCart.data && responseCart.data.customerQuotes) {
            responseCart.data.customerQuotes
                .map((customerQuote) => customerQuote.items)
                .forEach((items) => {
                    items.forEach((item) => { mergedCartQuotationItems.push(item); });
                });
        }

        // let mergedCartQuotationItems = cart?.items ?? [];
        const items = [];

        if (id_item !== 'all-items') {
            const theItem = mergedCartQuotationItems.filter((item) => item.id === id_item);
            mergedCartQuotationItems = theItem;
        }

        mergedCartQuotationItems.map((item) => items.push({
            sku: _.get(item, 'product.sku'),
            qty: _.get(item, 'quantity'),
        }));

        const inputAddItem = {
            id_requisition,
            items,
        };

        window.backdropLoader(true);

        mutationAddItemToRequisitionList({
            variables: {
                input: inputAddItem,
            },
        }).then(async () => {
            window.backdropLoader(false);
            setOpenTooltip(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('cart:addItemToRequisitionSuccess'),
            });
        }).catch((e) => {
            const message = e?.message ?? '';
            window.backdropLoader(false);
            setOpenTooltip(false);
            if (message.includes('is already set')) {
                let desc = '';
                const findRequisition = requisitionList.find((req) => req.entity_id === id_requisition);
                if (items.length > 1) {
                    desc = t('cart:someItemsAlready', { requisition: findRequisition?.name ?? '' });
                } else {
                    const findItem = mergedCartQuotationItems.find((item) => item.id === id_item);
                    desc = t('cart:oneItemAlready', {
                        requisition: _.get(findRequisition, 'name') ?? '',
                        item: _.get(findItem, 'product.name') ?? '',
                    });
                }
                setAddQtyReqDesc(desc);
                setAddQtyReqInput(inputAddItem);
                setOpenModalAddQtyReq(true);
            } else {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: `${t('cart:addItemToRequisitionFailed')} ${message ? ` : ${message}` : ''}`,
                });
            }
        });
    };

    const handleAddQtyToRequisitionListItem = () => {
        window.backdropLoader(true);

        mutationAddQtyToRequisitionListItem({
            variables: {
                input: addQtyReqInput,
            },
        }).then(async () => {
            window.backdropLoader(false);
            setAddQtyReqDesc('');
            setAddQtyReqInput(null);
            setOpenModalAddQtyReq(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('cart:addItemToRequisitionSuccess'),
            });
        }).catch((e) => {
            const message = e?.message ?? '';
            window.backdropLoader(false);
            setAddQtyReqDesc('');
            setAddQtyReqInput(null);
            setOpenModalAddQtyReq(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: `${t('cart:addItemToRequisitionFailed')} ${message ? ` : ${message}` : ''}`,
            });
        });
    };

    React.useMemo(() => {
        if (!update.loading && update.data && update.data.updateCartItemsCustom) {
            setCart(update.data.updateCartItemsCustom);
        }
    }, [update.loading]);

    /**
     * update Bulk
     */
    React.useMemo(() => {
        if (!updateBulk.loading && updateBulk.data && updateBulk.data.updateCartItems) {
            setCart({ ...updateBulk.data.updateCartItems.cart });
        }
    }, [updateBulk.loading]);

    React.useMemo(() => {
        if (!deleteData.loading && deleteData.data && deleteData.data.removeItemFromCart) {
            setCart(deleteData.data.removeItemFromCart.quote_data);
        }
    }, [deleteData.loading]);

    // update cart with free items data
    useEffect(() => {
        if (!promoItems.loading && promoItems.data?.addProductsToCartPromo) {
            setCart({ ...promoItems.data.addProductsToCartPromo.cart });
        }
    }, [promoItems.loading]);

    // update cart after applying coupon code
    useEffect(() => {
        if (!appliedCouponResult.loading && appliedCouponResult.data?.applyCouponToCart) {
            setCart({ ...appliedCouponResult.data.applyCouponToCart.cart });
        }
    }, [appliedCouponResult.loading]);

    // update cart after removing coupon code
    useEffect(() => {
        if (!removedCouponResult.loading && removedCouponResult.data?.removeCouponFromCart) {
            setCart({ ...removedCouponResult.data.removeCouponFromCart.cart });
        }
    }, [removedCouponResult.loading]);

    React.useMemo(() => {
        if (cart?.length > 0) {
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [cart]);

    // add to wishlist
    const [addWishlist] = mutationWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices.price.currency,
                        add: {
                            products: [
                                {
                                    name: itemProps.product.name,
                                    id: itemProps.product.sku,
                                    price: itemProps.prices.price.value || 0,
                                    category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    dimensions4: itemProps.product.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            window.backdropLoader(true);
            addWishlist({
                variables: {
                    productId: parseInt(itemProps.product.id),
                },
            })
                .then(async () => {
                    deleteItem(itemProps);
                    await window.toastMessage({ open: true, variant: 'success', text: t('cart:addWishlistSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('cart:addWishlistFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('cart:addWishlistWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return (
            <Layout pageConfig={config || pageConfig} {...props} withLayoutFooter={desktop}>
                <Skeleton />
            </Layout>
        );
    }

    const globalCurrency = storeConfig.default_display_currency_code;
    if (!cart || editQtyItem.length === 0) {
        return (
            <Layout pageConfig={config || pageConfig} {...props} withLayoutFooter={desktop}>
                <EmptyView t={t} />
            </Layout>
        );
    }
    const contentProps = {
        dataCart: cart,
        t,
        handleFeed,
        toggleEditMode,
        editMode,
        deleteItem,
        toggleEditDrawer,
        handleUpdateQtyBulk,
        handleUpdateQtyItem,
        updateItemBulk,
        editQtyBulk,
        editQtyItem,
        requisitionList,
        // crosssell,
        editItem,
        openEditDrawer,
        updateItem,
        storeConfig,
        globalCurrency,
        errorCart,
        handleAddPromoItemToCart,
        applyCoupon,
        removeCoupon,
        formikAddRequisition,
        openTooltip,
        setOpenTooltip,
        openModalAddItemReq,
        setOpenModalAddItemReq,
        handleAddItemToRequisition,
        handleAddQtyToRequisitionListItem,
        addQtyReqDesc,
        setAddQtyReqDesc,
        addQtyReqInput,
        setAddQtyReqInput,
        openModalAddQtyReq,
        setOpenModalAddQtyReq,
        isLoadingUpdate,
    };
    return (
        <Layout pageConfig={config || pageConfig} {...props} showRecentlyBar={false} withLayoutFooter={desktop}>
            <CartPageContext.Provider value={{ resetItemQty }}>
                <Content {...other} {...contentProps} />
            </CartPageContext.Provider>
        </Layout>
    );
};

export default Cart;
