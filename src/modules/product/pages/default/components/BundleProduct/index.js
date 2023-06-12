import React from 'react';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/product/pages/default/components/BundleProduct/style';
import classNames from 'classnames';
import Typography from '@common_typography';
import { getPromoRecommendation, addProductsToCartCustom, writeCartProductsReportMutation } from '@core_modules/product/services/graphql';
import Loader from '@core_modules/product/pages/default/components/BundleProduct/loader';
import { formatPrice } from '@helper_currency';

const Button = dynamic(() => import('@common_button'), { ssr: true });

const BundleProduct = (props) => {
    const { t, data } = props;
    const styles = useStyles();
    const [addProductsCartCustom] = addProductsToCartCustom();
    const [writeCartProductReport] = writeCartProductsReportMutation([data.id]);
    const { data: promoRecommendation, loading, error } = getPromoRecommendation({
        variables: {
            sku: data.sku,
        },
    });

    const handleAddToCart = (sku, qty) => {
        const variables = {
            cartItems: [
                {
                    quantity: parseFloat(qty),
                    sku,
                },
            ],
        };
        window.backdropLoader(true);
        addProductsCartCustom({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res?.data?.addProductsToCartCustom?.user_errors.length === 0) {
                    window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                    window.reloadCartQty = true;
                    writeCartProductReport();
                } else {
                    const message = res?.data?.addProductsToCartCustom?.user_errors[0].message ?? 'Failed add to cart';
                    window.toastMessage({ variant: 'error', text: message, open: true });
                }
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage(e.message);
            });
    };

    // eslint-disable-next-line valid-typeof
    if (loading || typeof error === undefined) {
        return <Loader />;
    }

    if (!promoRecommendation) {
        return <></>;
    }

    return (
        <div className={classNames(styles.root)}>
            {promoRecommendation.getPromoRecommendation.length > 0 ? (
                <>
                    {promoRecommendation.getPromoRecommendation.map((datapromo) => (
                        <>
                            {datapromo.type !== 'ampromo_product' ? (
                                <>
                                    <div className={classNames(styles.wrapper)}>
                                        <div className={classNames(styles.bundleWrapper)}>
                                            <Typography
                                                className={styles.bundleTitle}
                                                variant="p"
                                                type="bold"
                                                letter="capitalize"
                                                size="18"
                                                color="#414048"
                                            >
                                                {datapromo.title}
                                            </Typography>
                                            {datapromo.products.map((val, index) => (
                                                <>
                                                    <div key={index} className={classNames(styles.promoDetail)}>
                                                        <div className={classNames(styles.productImage, 'col-lg-2 col-xs-4')}>
                                                            <img src={val.small_image} alt={val.name} />
                                                        </div>
                                                        <div className={classNames(styles.productDetail, 'col-lg-5 col-xs-6')}>
                                                            <Typography className={styles.productName} variant="span" size="14">
                                                                {val.name}
                                                            </Typography>
                                                            {!val.is_free ? (
                                                                <div className={classNames(styles.priceWrapper)}>
                                                                    {datapromo.type === 'buy_xy_get_discount' ? (
                                                                        <>
                                                                            <Typography
                                                                                variant="span"
                                                                                className={styles.finalPrice}
                                                                                type="bold"
                                                                                size="14"
                                                                                color="#414048"
                                                                            >
                                                                                {formatPrice(Math.round(val.final_price ?? 0))}
                                                                            </Typography>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {val.final_price === val.price ? (
                                                                                <></>
                                                                            ) : (
                                                                                <Typography
                                                                                    className={styles.oldPrice}
                                                                                    variant="span"
                                                                                    size="14"
                                                                                    color="#7B9AAF"
                                                                                >
                                                                                    {formatPrice(Math.round(val.price))}
                                                                                </Typography>
                                                                            )}
                                                                            <Typography
                                                                                variant="span"
                                                                                className={styles.finalPrice}
                                                                                type="bold"
                                                                                size="14"
                                                                                color="#414048"
                                                                            >
                                                                                {formatPrice(Math.round(val.final_price ?? 0))}
                                                                            </Typography>

                                                                        </>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <Typography
                                                                    variant="span"
                                                                    className={styles.finalPrice}
                                                                    type="bold"
                                                                    size="14"
                                                                    color="#414048"
                                                                    letter="uppercase"
                                                                >
                                                                    {t('product:bundleProduct:free')}
                                                                </Typography>
                                                            )}
                                                        </div>
                                                        <div className={classNames(styles.qty, 'col-lg-2 col-xs-1')}>
                                                            {datapromo.type === 'bundling' ? (
                                                                <>
                                                                    <Typography className="label" variant="span" size="12" color="#7B9AAF">
                                                                        Qty
                                                                    </Typography>
                                                                    <input className="item-count" type="number" value={val.qty} min={1} />
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                        <div className={classNames(styles.action, 'col-lg-3 col-xs-1')}>
                                                            <div className={classNames(styles.btnAddToCardContainer)}>
                                                                {!val.is_free ? (
                                                                    <Button
                                                                        className={classNames(styles.btnAddToCard)}
                                                                        onClick={() => handleAddToCart(val.sku, val.qty)}
                                                                        loading={loading}
                                                                    >
                                                                        <Typography
                                                                            align="center"
                                                                            color="white"
                                                                            variant="inherit"
                                                                            className={styles.textBtnAddToCard}
                                                                        >
                                                                            {t('product:addToCart')}
                                                                        </Typography>
                                                                    </Button>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            {!datapromo.is_free ? (
                                                <div className={classNames(styles.total)}>
                                                    <Typography className={styles.labelTotal} variant="p" size="14">
                                                        {t('product:bundleProduct:total')}
                                                    </Typography>
                                                    {datapromo.type === 'buy_xy_get_discount' ? (
                                                        <>
                                                            <Typography
                                                                variant="span"
                                                                className={styles.totalOldPrice}
                                                                size="14"
                                                                color="#414048"
                                                            >
                                                                {formatPrice(Math.round(datapromo.total))}
                                                            </Typography>
                                                            <Typography
                                                                className={styles.totalPrice}
                                                                variant="p"
                                                                type="bold"
                                                                size="14"
                                                                color="#414048"
                                                            >
                                                                {formatPrice(Math.round(datapromo.final_total))}
                                                            </Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography
                                                                className={styles.totalPrice}
                                                                variant="p"
                                                                type="bold"
                                                                size="14"
                                                                color="#414048"
                                                            >
                                                                {formatPrice(Math.round(datapromo.total))}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={classNames(styles.wrapper)}>
                                    {datapromo.products.map((val, index) => (
                                        <>
                                            {val.is_free ? (
                                                <>
                                                    <div className={classNames(styles.bundleWrapper)}>
                                                        <Typography
                                                            className={styles.bundleTitle}
                                                            variant="p"
                                                            type="bold"
                                                            letter="capitalize"
                                                            size="18"
                                                            color="#414048"
                                                        >
                                                            {datapromo.title}
                                                        </Typography>
                                                        <div key={index} className={classNames(styles.promoDetailInfo)}>
                                                            <div className={classNames(styles.productImage, 'col-lg-2 col-xs-3')}>
                                                                <img src={val.small_image} alt={val.name} />
                                                            </div>
                                                            <div className={classNames(styles.productDetailInfo, 'col-lg-10 col-xs-9')}>
                                                                {t('product:bundleProduct:buy')}
                                                                {' '}
                                                                {data.name}
                                                                {' '}
                                                                {t('product:bundleProduct:plusProduct')}
                                                                {' '}
                                                                {formatPrice(
                                                                    parseFloat(datapromo.subtotal_amount)
                                                                    - parseFloat(data.price_range.minimum_price.final_price.value),
                                                                )}
                                                                {' '}
                                                                {t('product:bundleProduct:get')}
                                                                <strong>
                                                                    {' '}
                                                                    {t('product:bundleProduct:free')}
                                                                    {' '}
                                                                    {data.name}
                                                                </strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}
                                        </>
                                    ))}
                                </div>
                            )}
                        </>
                    ))}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default BundleProduct;
