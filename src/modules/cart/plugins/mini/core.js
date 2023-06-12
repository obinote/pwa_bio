/* eslint-disable radix */
import { useMutation } from '@apollo/client';
import cartEventBus, { UPDATE_CART_ITEM } from '@core_modules/cart/helpers/cartEventBus';
import { getCartCustomLazy } from '@core_modules/cart/services/graphql';
import * as Schema from '@core_modules/cart/services/graphql/schema';

const countItems = (cartObj) => {
    let totalItems = 0;
    if (cartObj.length > 0) {
        cartObj.forEach((it) => {
            totalItems += it.items.length;
        });
    }
    return totalItems;
};

const MiniCart = (props) => {
    const {
        Content, open, setOpen, t, storeConfig,
    } = props;
    const [cart, setCart] = React.useState([]);
    const [qtyUpdate, setQtyUpdate] = React.useState(null);
    const [errorCart, setErrorCart] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);
    let loadingCart = false;
    let dataCart = null;
    let getCartData = () => {};
    const [actDeleteItem, delCart] = useMutation(Schema.deleteCartitem, {
        context: {
            request: 'internal',
        },
    });
    const [actUpdateItem, update] = useMutation(Schema.updateCartitemCustom, {
        context: {
            request: 'internal',
        },
    });

    const [getCart, data] = getCartCustomLazy();
    if (typeof window !== 'undefined' && open) {
        getCartData = () => getCart({
            variables: {
                vendor_code: '',
            },
        });
        loadingCart = data.loading;
        if (!data.loading && data.data && data.data.customerQuotes) {
            dataCart = data.data.customerQuotes;
        }
    }

    React.useMemo(() => {
        if (data.error) {
            const errorList = [];
            if (data.error && data.error.graphQLErrors && data.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < data.error.graphQLErrors.length; idx += 1) {
                    const { message } = data.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
        }
    }, [data]);

    React.useMemo(() => {
        if (dataCart) {
            setCart(dataCart);
            setCounter(countItems(data.data.customerQuotes));
        }
    }, [loadingCart]);

    React.useMemo(() => {
        if (!update.loading && update.data) {
            setCart(update.data.updateCartItemsCustom);
        }
    }, [update.loading]);

    React.useMemo(() => {
        if (!delCart.loading && delCart.data) {
            setCart(delCart.data.removeItemFromCart.quote_data);
            setCounter(countItems(delCart.data?.removeItemFromCart?.quote_data));
        }
    }, [delCart.loading]);

    if (!loadingCart && update.loading) {
        loadingCart = update.loading;
    }

    if (!loadingCart && delCart.loading) {
        loadingCart = delCart.loading;
    }

    React.useMemo(() => {
        if (open && typeof window !== 'undefined') {
            setCart([]);
            setErrorCart([]);
            setQtyUpdate(null);
            getCartData();
            loadingCart = true;
        }
    }, [open]);

    // update items
    const updateCart = (cartId, id, qty) => {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(qty)) {
            setQtyUpdate({ id, qty: '' });
            return;
        }
        window.backdropLoader(true);
        setLoadingUpdate(true);
        setQtyUpdate({ id, qty });
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
                quantity: qty,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                cartEventBus.emit(UPDATE_CART_ITEM, { cartId, itemId: id, qty });
                window.backdropLoader(false);
                setLoadingUpdate(false);
                if (qty === 0) {
                    window.reloadCartQty = true;
                }
                window.toastMessage({
                    open: true,
                    text: t('common:cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                setLoadingUpdate(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    const deleteCart = async (cartId, id) => {
        window.backdropLoader(true);
        await actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
            },
            context: {
                request: 'internal',
            },
        })
            .then((del) => {
                window.reloadCartQty = true;
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('common:cart:deleteSuccess'),
                    variant: 'success',
                });
                console.log(del);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    return (
        <Content
            open={open}
            setOpen={setOpen}
            count={counter}
            loading={loadingCart}
            data={cart}
            deleteCart={deleteCart}
            updateCart={updateCart}
            errorCart={errorCart}
            t={t}
            storeConfig={storeConfig}
            qtyUpdate={qtyUpdate}
            isLoadingUpdate={isLoadingUpdate}
        />
    );
};

export default MiniCart;
