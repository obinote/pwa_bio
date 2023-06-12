/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import Typography from '@common_typography';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { getHost } from '@helper_config';
import Breadcrumb from '@common_breadcrumb';
import { breakPointsUp } from '@helper_theme';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/product/pages/default/components/style';
import OptionItem from '@core_modules/product/pages/default/components/OptionItem';
import SharePopup from '@core_modules/product/pages/default/components/SharePopup';
import ModalPopupImage from '@core_modules/product/pages/default/components/ModalPopupImage';
import { formatPrice } from '@helper_currency';
import Countdown from '@core_modules/catalog/pages/category/components/Countdown/Countdown';
import Upcoming from '@core_modules/catalog/pages/category/components/Countdown/Upcoming';
// const PromoBannersLite = dynamic(() => import('@core_modules/product/pages/default/components/PromoBannersLite'), { ssr: false });
// const ExpandDetail = dynamic(() => import('@core_modules/product/pages/default/components/ExpandDetail'), { ssr: false });
// const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });
// const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });
import Intro from '@core_modules/customer/plugins/Guide';
import userAgent from '@helper_useragent';

const Button = dynamic(() => import('@common_button'), { ssr: true });
const Banner = dynamic(() => import('@common_sliderpromoswiper/BannerThumbnail'), { ssr: true });
const DesktopOptions = dynamic(() => import('@core_modules/product/pages/default/components/OptionItem/DesktopOptions'), { ssr: true });
const ShippingEta = dynamic(() => import('@core_modules/product/pages/default/components/ShippingEta'), { ssr: false });
const TabsView = dynamic(() => import('@core_modules/product/pages/default/components/DesktopTabs'), { ssr: false });
const PriceFormat = dynamic(() => import('@common_priceformat'), { ssr: true });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });
const UpsellDrawer = dynamic(() => import('@core_modules/product/pages/default/components/RightDrawer'), { ssr: false });
const RelatedProductCaraousel = dynamic(() => import('@core_modules/product/pages/default/components/RelatedProductCaraousel'), { ssr: false });
const ModalCreate = dynamic(() => import('@plugin_optionitem/components/Requisition/ModalCreate'), { ssr: false });
const AugmentedReality = dynamic(() => import('@core_modules/product/pages/default/components/AR'), { ssr: false });
const BundleProduct = dynamic(() => import('@core_modules/product/pages/default/components/BundleProduct'), { ssr: false });

const ProductPage = (props) => {
    const styles = useStyles();
    const {
        t,
        data,
        openOption,
        // handleOption,
        setOpenOption,
        setBanner,
        setPrice,
        openShare,
        setOpenShare,
        route,
        banner,
        openDrawer,
        setOpenDrawer,
        breadcrumbsData,
        price,
        handleWishlist,
        wishlist,
        expandData,
        openImageDetail,
        handleOpenImageDetail,
        stockStatus,
        additionalPrice,
        smartProductTabs,
        isLogin,
        enablePopupImage,
        storeConfig,
        requisitionAction,
        handleChatDistributor = () => { },
        handleLogin,
        dataPrivateEvent,
    } = props;
    // reviewValue,
    // handleSetCompareList,
    const desktop = breakPointsUp('sm');

    const manufacture = useMemo(() => data.more_info.find((item) => item.code === 'manufacture_name'), [data]);
    const noNie = useMemo(() => data.more_info.find((item) => item.code === 'no_nie'), [data]);
    const nieExpiredDate = useMemo(() => data.more_info.find((item) => item.code === 'valid_to_nie'), [data]);

    const { setRequisitionAnchor, modalRequisition, setModalRequisition } = requisitionAction;
    const handlePopoverOpen = (event) => {
        setRequisitionAnchor(event.currentTarget);
    };
    const handleModalClose = () => {
        setModalRequisition(false);
        setRequisitionAnchor(null);
    };
    // contdown
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;

    const startTimer = () => {
        if (dataPrivateEvent?.getProductPrivateEvent.status === 'open') {
            const endDate = new Date(`${dataPrivateEvent?.getProductPrivateEvent?.end_date}+07:00`);
            const endDateUTCTime = new Date(endDate.toUTCString()).getTime();

            interval = setInterval(() => {
                const currentDate = new Date();
                const currentDateUTCTime = new Date(currentDate.toUTCString()).getTime();

                const actualInterval = endDateUTCTime - currentDateUTCTime;
                const days = Math.floor(actualInterval / (24 * 60 * 60 * 1000));
                const hours = Math.floor((actualInterval % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
                const minutes = Math.floor((actualInterval % (60 * 60 * 1000)) / (1000 * 60));
                const seconds = Math.floor((actualInterval % (60 * 1000)) / 1000);

                if (actualInterval <= 0) {
                    // Stop Timer
                    clearInterval(interval.current);
                } else {
                    // Update Timer
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                }
            });
        }
    };

    useEffect(() => {
        startTimer();
    });
    // ========

    return (
        <>
            {isLogin ? <Intro page="pdp" /> : null}
            <div className="hidden-mobile">
                <UpsellDrawer
                    open={openDrawer}
                    setOpen={() => setOpenDrawer(!openDrawer)}
                    t={t}
                    dataProduct={data}
                    isLogin={isLogin}
                    storeConfig={storeConfig}
                />
                {enablePopupImage && (
                    <ModalPopupImage open={openImageDetail} setOpen={handleOpenImageDetail} banner={banner} storeConfig={storeConfig} />
                )}
            </div>
            <OptionItem {...props} open={openOption} setOpen={() => setOpenOption(!openOption)} setBanner={setBanner} setPrice={setPrice} />
            <SharePopup open={openShare} setOpen={() => setOpenShare(!openShare)} link={getHost() + route.asPath} {...props} />
            <div className={classNames(styles.container, 'row')}>
                <div className="col-lg-12 hidden-mobile">
                    <Breadcrumb data={breadcrumbsData} variant="text" />
                </div>

                <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-4')}>
                    <Banner
                        data={banner}
                        noLink
                        thumbnail
                        showArrow={false}
                        pagination
                        contentWidth="auto"
                        autoPlay={false}
                        actionImage={desktop && enablePopupImage ? handleOpenImageDetail : () => { }}
                        customProduct={styles.bannerProduct}
                        storeConfig={storeConfig}
                    >
                        {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                            <WeltpixelLabel t={t} weltpixel_labels={data.weltpixel_labels || []} categoryLabel={false} withThumbnailProduct />
                        )}
                    </Banner>
                    <div className="hidden-desktop">
                        <UpsellDrawer open={openDrawer} setOpen={() => setOpenDrawer(!openDrawer)} t={t} dataProduct={data} isLogin={isLogin} />
                    </div>
                    <AugmentedReality {...props} />
                </div>

                <div className={classNames(styles.body, 'col-xs-12 col-lg-8')}>
                    <div className={classNames(styles.titleContainer, styles.breadcrumbStyle, 'hidden-desktop')}>
                        <Breadcrumb data={breadcrumbsData} variant="text" />
                    </div>
                    {dataPrivateEvent?.getProductPrivateEvent
                        && (dataPrivateEvent?.getProductPrivateEvent.status === 'open'
                            || dataPrivateEvent?.getProductPrivateEvent.status === 'upcoming') && (
                            <div className={styles.privateEvent}>
                                <div className="label">
                                    <div className="icon">
                                        <img src="/assets/img/icon-flashsale.svg" alt="Flash Sale Icon" />
                                    </div>
                                    <div className="caption">{t('catalog:flashSale:caption')}</div>
                                </div>
                                {dataPrivateEvent?.getProductPrivateEvent && dataPrivateEvent?.getProductPrivateEvent.status === 'open' && (
                                    <Countdown
                                        t={t}
                                        timerDays={timerDays}
                                        timerHours={timerHours}
                                        timerMinutes={timerMinutes}
                                        timerSeconds={timerSeconds}
                                    />
                                )}
                                {dataPrivateEvent?.getProductPrivateEvent && dataPrivateEvent?.getProductPrivateEvent.status === 'upcoming' && (
                                    <Upcoming t={t} dataPrivateEvent={dataPrivateEvent} />
                                )}
                            </div>
                        )}
                    <div className={styles.titleContainer}>
                        <span className={classNames('icon-distributor-o', styles.vendorIcon)} />
                        <Typography variant="h4" type="bold" className={classNames(styles.vendorName, 'clear-margin-padding')}>
                            {data.vendor_name}
                        </Typography>
                    </div>
                    <div className={styles.titleContainer}>
                        <Typography
                            id="h1_productName"
                            variant="title"
                            type="bold"
                            letter="capitalize"
                            className={classNames(styles.title, 'clear-margin-padding')}
                        >
                            {data.name}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="p" type="400" size="14" className={styles.desc}>
                            {data.short_description.html ? <span dangerouslySetInnerHTML={{ __html: data.short_description.html }} /> : null}
                        </Typography>
                    </div>

                    <div className={classNames('hidden-mobile')}>
                        <Typography className={styles.stock} variant="p" type="bold" letter="capitalize" size="14" color="#414048">
                            {t(`product:stock:${stockStatus}`)}
                        </Typography>
                        <div className={classNames(styles.detailRow)}>
                            <div className={classNames(styles.detailRowCol)}>
                                <table className={styles.detailTable}>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{t('common:product:sku')}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>{data.sku || ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{manufacture.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {manufacture.value || '-'}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className={classNames(styles.detailRowCol)}>
                                <table className={styles.detailTable}>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{noNie.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {noNie.value || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{nieExpiredDate.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {nieExpiredDate.value || '-'}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={classNames('hidden-mobile', styles.titleContainer)}>
                        <div className={classNames(styles.divider)} />
                    </div>
                    {isLogin ? (
                        <div className={classNames([styles.titleContainer, styles.priceSection])}>
                            <div className={classNames(styles.mobilePrice)}>
                                <div className={classNames(styles.titlePriceContainer)}>
                                    <PriceFormat {...price} additionalPrice={additionalPrice} />
                                </div>
                                {isLogin ? (
                                    <div className={classNames(styles.mobileActionBlock)}>
                                        <div id="action-mobile" className={styles.actionMobile}>
                                            <span className={styles.btnAction} onClick={handleChatDistributor}>
                                                <i className={classNames('icon-chat', styles.iconChat)} />
                                                <span className={styles.btnActionText}>{t('product:chatDistributor')}</span>
                                            </span>
                                            <span className={styles.btnAction} onClick={handleWishlist}>
                                                {wishlist ? (
                                                    <i className={classNames('icon-wishlisted', styles.iconMoon)} />
                                                ) : (
                                                    <i className={classNames('icon-wishlist', styles.iconMoon)} />
                                                )}
                                                <span className={styles.btnActionText}>{t('product:wishlist')}</span>
                                            </span>
                                            <span className={styles.btnAction} onClick={handlePopoverOpen} id="popover-requisition">
                                                <i className={classNames('icon-requisition', styles.iconMoon)} />
                                                <span className={styles.btnActionText}>{t('product:requisitionList')}</span>
                                            </span>
                                        </div>
                                        <ModalCreate {...props} modalRequisition={modalRequisition} handleModalClose={handleModalClose} />
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={styles.priceTiersContainer}>
                                {price.priceTiersCustom.length > 0
                                    && price.priceTiersCustom.map((tiers, index) => {
                                        const priceTiers = {
                                            quantity: tiers.quantity,
                                            currency: tiers.final_price.currency,
                                            amount: formatPrice(tiers.discount.amount_off),
                                            percent: tiers.discount.percent_off,
                                            customer_group: tiers.customer_group,
                                        };
                                        if (priceTiers.percent) {
                                            if (priceTiers.customer_group) {
                                                return (
                                                    <Typography variant="p" type="regular" key={index}>
                                                        {t('product:priceTiersCustomerGroupPercent', { priceTiers })}
                                                    </Typography>
                                                );
                                            }
                                            return (
                                                <Typography variant="p" type="regular" key={index}>
                                                    {t('product:priceTiersPercent', { priceTiers })}
                                                </Typography>
                                            );
                                        }
                                        if (priceTiers.customer_group) {
                                            return (
                                                <Typography variant="p" type="regular" key={index}>
                                                    {t('product:priceTiersCustomerGroupAmount', { priceTiers })}
                                                </Typography>
                                            );
                                        }
                                        return (
                                            <Typography variant="p" type="regular" key={index}>
                                                {t('product:priceTiersAmount', { priceTiers })}
                                            </Typography>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className={classNames('hidden-desktop')}>
                        <Typography className={styles.stock} variant="p" type="bold" letter="capitalize" size="14" color="#414048">
                            {t(`product:stock:${stockStatus}`)}
                        </Typography>
                        <div className={classNames(styles.detailRow)}>
                            <div className={classNames(styles.detailRowCol)}>
                                <table className={styles.detailTable}>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{t('common:product:sku')}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>{data.sku || ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{manufacture.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {manufacture.value || '-'}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className={classNames(styles.detailRowCol)}>
                                <table className={styles.detailTable}>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{noNie.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {noNie.value || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classNames(styles.detailTableRowData)}>{nieExpiredDate.label}</td>
                                        <td className={classNames(styles.detailTableRowData, styles.detailSecondCol)}>
                                            {nieExpiredDate.value || '-'}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={classNames('hidden-mobile')}>
                            <DesktopOptions
                                {...props}
                                setOpen={setOpenOption}
                                setBanner={setBanner}
                                setPrice={setPrice}
                                handleWishlist={handleWishlist}
                                wishlist={wishlist}
                                requisitionAction={requisitionAction}
                            />
                        </div>
                    </div>

                    {isLogin && data.is_valid ? (
                        <div className={classNames(styles.defaultContainer, styles.shippingEta)}>
                            <ShippingEta t={t} data={data} {...props} />
                        </div>
                    ) : (
                        <></>
                    )}

                    {isLogin ? <BundleProduct {...props} /> : null}

                    <div className={styles.defaultContainer}>
                        <TabsView
                            {...props}
                            dataInfo={expandData}
                            t={t}
                            smartProductTabs={
                                smartProductTabs || {
                                    tab_2: {
                                        label: null,
                                        content: null,
                                    },
                                }
                            }
                        />
                    </div>
                </div>

                <RelatedProductCaraousel t={t} dataProduct={data} isLogin={isLogin} storeConfig={storeConfig} />
                {isLogin ? (
                    <div className={classNames(styles.footer, 'hidden-desktop')} style={{ paddingBottom: userAgent.isIosApps() && 25 }}>
                        <DesktopOptions
                            {...props}
                            setOpen={setOpenOption}
                            setBanner={setBanner}
                            setPrice={setPrice}
                            handleWishlist={handleWishlist}
                            wishlist={wishlist}
                            requisitionAction={requisitionAction}
                        />
                    </div>
                ) : (
                    <div className={classNames(styles.footer, 'hidden-desktop')} style={{ paddingBottom: userAgent.isIosApps() && 25 }}>
                        <Typography variant="span" className={classNames(styles.textLoginInfo)}>
                            {t('catalog:loginToShopping')}
                        </Typography>
                        <Button className={classNames(styles.btnAddToCard, styles.btnAddToCard)} onClick={handleLogin}>
                            <Typography align="center" variant="inherit" className={styles.textBtnAddToCard}>
                                {t('catalog:login')}
                            </Typography>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductPage;
