import gqlService from '@core_modules/checkout/services/graphql';
import Typography from '@common_typography';

const DiscountSection = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        PromoView,
    } = props;
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => { } });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => { } });
    let errorMessage = '';

    const handlePromo = async () => {
        let cart;
        const state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: true,
                extraFee: false,
                order: true,
            },
        };
        state.loading.coupon = true;
        setCheckout(state);
        const isApplied = !state.data.isCouponAppliedToCart;

        let cartId = '';
        if (checkout && checkout.data && checkout.data.cart && checkout.data.cart.id) {
            cartId = checkout.data.cart.id;
        }

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId, coupon: formik.values.coupon } });
            if (result && result.data && result.data.applyCouponToCart && result.data.applyCouponToCart.cart) {
                cart = {
                    ...state.data.cart,
                    ...result.data.applyCouponToCart.cart,
                };
            }

            if (result && result.errors && result.errors.message) {
                errorMessage = result.errors.message;
            }

            if (cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponApplied'),
                });
            }
        } else {
            const result = await removeCouponFromCart({ variables: { cartId } });
            if (result && result.data && result.data.removeCouponFromCart && result.data.removeCouponFromCart.cart) {
                cart = result && {
                    ...state.data.cart,
                    ...result.data.removeCouponFromCart.cart,
                };
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponRemoved'),
                });
            }
        }

        state.loading.coupon = false;

        if (cart) {
            state.data.cart = cart;
            state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;
        } else {
            let transMessage = 'checkout:message:couponError';
            switch (errorMessage) {
            case 'Coupon has expired':
                transMessage = 'checkout:message:couponExpired';
                break;
            case 'You have reached your coupon usage limit':
                transMessage = 'checkout:message:couponUserLimit';
                break;
            case 'Coupon reached usage limit':
                transMessage = 'checkout:message:couponLimited';
                break;
            default:
                transMessage = 'checkout:message:couponError';
                break;
            }
            await formik.setFieldError('coupon', t(transMessage));
        }

        const finalState = {
            ...state,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
            },
        };
        setCheckout(finalState);
    };

    return (
        <>
            <Typography className="promolabel" variant="p" type="bold" letter="capitalize" size="14">
                {t('checkout:labelPromoCode')}
            </Typography>
            <PromoView
                id="coupon"
                name="coupon"
                placeholder="Masukan kode promo"
                action={handlePromo}
                onChange={formik.handleChange}
                value={formik.values.coupon}
                disabled={checkout.loading.coupon || !checkout.data.cart}
                toggleField={checkout.data.isCouponAppliedToCart}
                loading={checkout.loading.coupon}
                error={!!formik.errors.coupon}
                errorMessage={formik.errors.coupon}
            />
        </>
    );
};

export default DiscountSection;
