/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import { getCartId, setCartId, removeCartId } from '@helper_cartid';
import dynamic from 'next/dynamic';
import { getLoginInfo } from '@helper_auth';
import { useQuery } from '@apollo/client';
import propTypes from 'prop-types';
import { getCartIdUser } from '@core_modules/cart/services/graphql/schema';
import { getCountCart, getCartCustomLazy } from '@core_modules/cart/services/graphql';

const MiniCart = dynamic(() => import('@plugin_minicart'), { ssr: false });

const ShoppingBagIcon = ({
    withLink, WihtLinkView, WithoutLinkView, storeConfig, automation_id
}) => {
    let isLogin = 0;
    let cartId = '';
    const [counter, setCounter] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        skip: !isLogin,
    });

    if (isLogin && (cartId === '' || !cartId || cartId === undefined)) {
        if (cartUser.data) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
    }
    const {
        loading: getQtyLoading,
        data: getQtyData,
        error: getQtyError,
    } = getCountCart(cartId);

    const reloadCartQty = typeof window !== 'undefined' && window && window.reloadCartQty;
    const [getCart, RespondCart] = getCartCustomLazy();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    React.useEffect(() => {
        if (isLogin && getCart && !RespondCart.called) {
            getCart({
                variables: {
                    vendor_code: '',
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (RespondCart && RespondCart.data && RespondCart.data.customerQuotes) {
            let countItem = 0;
            const dataCart = RespondCart.data.customerQuotes;
            dataCart.forEach((carItem) => {
                countItem += carItem.items.length;
            });
            setCounter(countItem);
        }
    }, [RespondCart]);

    React.useEffect(() => {
        if (reloadCartQty) {
            getCart({
                variables: {
                    vendor_code: '',
                },
            });
            window.reloadCartQty = false;
        }
    }, [reloadCartQty]);

    // remove cart id if invalid
    if (!getQtyLoading && (!getQtyData || getQtyError)) {
        removeCartId();
    }

    const cartData = counter;
    const handleLink = () => {
        setOpen(true);
    };
    if (withLink) {
        return (
            <>
                {typeof window !== 'undefined'
                    ? <MiniCart storeConfig={storeConfig} open={open} setOpen={() => setOpen(!open)} count={cartData} /> : null}
                <WihtLinkView
                    cartData={cartData}
                    handleLink={handleLink}
                    automation_id={automation_id}
                />
            </>
        );
    }
    return (
        <>
            {typeof window !== 'undefined' && cartData > 0
                ? <MiniCart storeConfig={storeConfig} open={open} setOpen={() => setOpen(!open)} count={cartData} /> : null}
            <WithoutLinkView cartData={cartData} />
        </>
    );
};

ShoppingBagIcon.propTypes = {
    withLink: propTypes.bool,
    WihtLinkView: propTypes.func.isRequired,
    WithoutLinkView: propTypes.func.isRequired,
};

export default ShoppingBagIcon;
