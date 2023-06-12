/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import useStyles from '@core_modules/cart/pages/default/components/block/style';

const CartBlock = (props) => {
    const styles = useStyles();

    // prettier-ignore
    const {
        t, dataCart, applyCoupon, removeCoupon,
    } = props;
    const [value, setValue] = useState((dataCart.applied_coupons && dataCart.applied_coupons[0].code && dataCart.applied_coupons[0].code) || '');
    const [loading, setLoading] = useState(false);
    const [couponApplied, setCouponApplied] = useState(!!(dataCart.applied_coupons && dataCart.applied_coupons[0].code));

    const handleOpenMessage = async ({ variant, text }) => {
        window.toastMessage({
            open: true,
            variant,
            text,
        });
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // add and remove code handler
    const handleAddRemovePromo = async () => {
        setLoading(true);
        if (!couponApplied) {
            if (value) {
                await window.backdropLoader(true);
                const result = await applyCoupon({ variables: { cartId: dataCart.id, coupon: value } });
                await window.backdropLoader(false);
                const cartResult = result?.data?.applyCouponToCart?.cart;
                if (cartResult) {
                    handleOpenMessage({
                        variant: 'success',
                        text: t('checkout:message:couponApplied'),
                    });
                    setCouponApplied(true);
                } else {
                    let transMessage = 'checkout:message:couponError';
                    switch (result?.errors?.message) {
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

                    handleOpenMessage({
                        variant: 'error',
                        text: t(transMessage),
                    });
                }
            }
        } else {
            await window.backdropLoader(true);
            const result = await removeCoupon({ variables: { cartId: dataCart.id } });
            await window.backdropLoader(false);
            if (result?.data?.removeCouponFromCart?.cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponRemoved'),
                });
                setCouponApplied(false);
                setValue('');
            }
        }
        setLoading(false);
    };

    return (
        <div className={styles.cartDiscount}>
            <div className={styles.blockDiscount}>
                <div className={styles.blockTitle}>
                    <strong className={styles.blockTitleLabel}>
                        {t('cart:applyDiscountCode')}
                    </strong>
                </div>
                <div className={styles.blockContent}>
                    <div className={styles.blockControl}>
                        <input
                            type="text"
                            className={styles.discountInput}
                            placeholder={t('cart:enterDiscountCode')}
                            onChange={handleChange}
                            disabled={couponApplied}
                            value={value}
                        />
                    </div>
                    <div className={styles.actionToolbar}>
                        <button
                            type="button"
                            className={styles.discountButton}
                            onClick={handleAddRemovePromo}
                            disabled={loading}
                        >
                            <span>{couponApplied ? t('cart:cancelDiscount') : t('cart:applyDiscount')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartBlock;
