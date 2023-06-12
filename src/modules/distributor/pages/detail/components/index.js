/* eslint-disable linebreak-style */
/* eslint-disable react/no-danger */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import useStyles from '@core_modules/distributor/pages/detail/components/style';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProductList from '@plugin_productlist';
import Tooltip from '@material-ui/core/Tooltip';
import { breakPointsUp } from '@helper_theme';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import _ from 'lodash';
import ProductItem from '@plugin_productitem';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';
import Review from '@core_modules/distributor/pages/detail/components/review';
import VoucherDistributor from '@core_modules/distributor/pages/detail/components/voucher';
import Skeleton from '@material-ui/lab/Skeleton';
import { RatingStar } from '@core_modules/distributor/pages/detail/components/review/index';
import { getLoginInfo } from '@helper_auth';
import Carousell from '@core_modules/distributor/pages/detail/components/carousell';

const initTab = (tab) => {
    if (tab === undefined) {
        return 2;
    }

    if (tab === 'about') {
        return 1;
    }

    return 0;
};

/**
 * Load image with placeholder
 * @param {object} props -
 * @param {string} props.src - source image url
 * @param {string} props.placeholder - image placeholder url
 * @param {string} props.alt - alt name
 * @param {string} props.className - classname for loaded image
 * @param {string} props.placeholderClassName - classname for placeholder
 * @returns jsx
 */
const LoadImage = (props) => {
    const {
        alt, placeholder, placeholderClassName, className,
    } = props;
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
        <>
            {!imageLoaded && (
                <img
                    alt={alt}
                    {...{
                        ...props,
                        src: placeholder,
                        className: placeholderClassName ?? className,
                    }}
                />
            )}
            <img
                alt={alt}
                onLoad={() => {
                    setImageLoaded(true);
                }}
                onError={() => {
                    setImageLoaded(false);
                }}
                {...props}
                style={{ display: !imageLoaded ? 'none' : 'block' }}
            />
        </>
    );
};

const Component = (props) => {
    const {
        t,
        loading,
        seller,
        tab,
        vendorCode,
        loadingReview,
        handleLoadMoreReview,
        pageInfoReview,
        reviewList,
        handleChangeSortReview,
        valueSortReview,
        baseSort,
        loadingFetchmoreReview,
        handleFilterRating,
        totalReviewer,
        loadingPromoList,
        handleChangePage,
        pageVoucher,
        pageSizeVoucher,
        ratingRefetch,
        dataCustomer,
        loadingCustomer,
        dataPromoProduct,
        categoryPath,
    } = props;
    const isLogin = getLoginInfo() === 1;
    const { handleChangePage: handleChangePageVoucher, ...contentProps } = props;
    const initActiveTab = initTab(tab);
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const [activeTab, setActiveTab] = useState(initActiveTab);
    const [tooltip, setTooltip] = useState(false);

    const addressIcon = '/assets/img/icon-location.svg';
    const tlpIcon = '/assets/img/icon-phone.svg';
    const emailIcon = '/assets/img/icon-mail.svg';
    const webIcon = '/assets/img/icon-web.svg';
    const clockIcon = '/assets/img/icon-clock.svg';

    const igIcon = '/assets/img/social_media/instagram.svg';
    const fbIcon = '/assets/img/social_media/facebook.svg';
    const twIcon = '/assets/img/social_media/twitter.svg';
    const ttIcon = '/assets/img/social_media/tiktok.svg';
    const waIcon = '/assets/img/social_media/whatsapp.svg';

    const fullAddress = `${seller?.company_street}, ${seller?.company_city}`;
    const avgRating = _.get(seller, 'ratings.average_rating') ?? 0;

    const d = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const indoWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = weekday[d.getDay()];

    const onChangeActiveTab = (event, value) => {
        let tabSlug = null;

        if (value === 1) {
            tabSlug = '/about';
        }

        if (value === 0) {
            tabSlug = '/highlight';
        }

        Router.push({ pathname: `/distributor/${vendorCode}${tabSlug || ''}` }, undefined, { scroll: false });
        setActiveTab(value);
    };

    const onChangeTooltip = () => setTooltip(!tooltip);

    const SocialMediaItem = ({ url, icon }) => (
        <a className={classNames(styles.socialMediaWrapper)} target="_blank" href={url} rel="noreferrer">
            <img src={icon} alt="icon-instagram" className={classNames(styles.socialMediaIcon)} />
        </a>
    );

    const SocialMediaSection = () => {
        const socialMediaList = _.get(seller, 'company_social_media') ?? [];

        return (
            <div className={classNames(styles.sellerSocialMedia)}>
                {socialMediaList.map((item) => {
                    let socialMediaIcon = '';
                    const name = _.get(item, 'name') ?? '';
                    const url = _.get(item, 'value') ?? '';
                    if (name.includes('instagram')) {
                        socialMediaIcon = igIcon;
                    } else if (name.includes('facebook')) {
                        socialMediaIcon = fbIcon;
                    } else if (name.includes('twitter')) {
                        socialMediaIcon = twIcon;
                    } else if (name.includes('tiktok')) {
                        socialMediaIcon = ttIcon;
                    } else if (name.includes('wa')) {
                        socialMediaIcon = waIcon;
                    }

                    return <SocialMediaItem url={url} icon={socialMediaIcon} />;
                })}
            </div>
        );
    };

    const InfoItem = ({ icon, value, isTooltip = false }) => {
        const isWebLink = value?.includes('http');

        if (isTooltip) {
            const openingHours = value ?? [];
            const todayData = openingHours.find((itm) => itm?.day === today);
            const todayOpenClose = todayData?.open_at ? `${todayData?.open_at} - ${todayData?.close_at}` : t('distributor:close');

            return (
                <Tooltip
                    classes={{ tooltip: styles.tooltipContainer }}
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={onChangeTooltip}
                    open={tooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="bottom-center"
                    title={(
                        <>
                            <div>
                                {indoWeek.map((wk) => {
                                    const item = openingHours.find((itm) => itm?.day === wk);
                                    const dayName = _.get(item, 'day') ?? '';
                                    const openAt = _.get(item, 'open_at');
                                    const closeAt = _.get(item, 'close_at');
                                    const openClose = openAt ? `${openAt} - ${closeAt}` : t('distributor:close');

                                    return (
                                        <div className={classNames(styles.tooltipList)}>
                                            <div className={classNames(styles.tooltipItem)}>
                                                {dayName === today ? (
                                                    <strong>
                                                        {' '}
                                                        {t(`distributor:${dayName.toLowerCase()}`)}
                                                        {' '}
                                                    </strong>
                                                ) : (
                                                    t(`distributor:${dayName.toLowerCase()}`)
                                                )}
                                            </div>
                                            <div className={classNames(styles.tooltipItemHour)}>
                                                {dayName === today ? (
                                                    <strong>
                                                        {' '}
                                                        {openClose}
                                                        {' '}
                                                    </strong>
                                                ) : openClose}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                >
                    <div className={classNames(styles.infoItem, styles.infoItemTooltip)} onClick={onChangeTooltip} aria-hidden="true">
                        <span className={classNames('infoIcon')}>
                            <img src={icon} alt="icon" />
                        </span>
                        {loading ? (
                            <Skeleton variant="rounded" height={18} width="100%" />
                        ) : (
                            <div className={classNames(styles.infoValue)}>
                                {`${t('distributor:openingHours')} (${todayOpenClose})`}
                                <div className={classNames(styles.infoIconCenter)}>
                                    {tooltip ? <ExpandLessIcon style={{ fontSize: 20 }} /> : <ExpandMoreIcon style={{ fontSize: 20 }} />}
                                </div>
                            </div>
                        )}
                    </div>
                </Tooltip>
            );
        }

        return (
            <div className={classNames(styles.infoItem)}>
                <span className={classNames(styles.infoIcon)}>
                    <img src={icon} alt="icon" />
                </span>
                {loading ? (
                    <Skeleton variant="rounded" height={18} width="100%" />
                ) : (
                    <span className={classNames(styles.infoValue)}>
                        {isWebLink ? (
                            <a className={styles.infoItemLink} rel="noreferrer" target="_blank" href={value}>
                                {value}
                            </a>
                        ) : (
                            value ?? '-'
                        )}
                    </span>
                )}
            </div>
        );
    };

    const ActiveTabView = () => {
        if (activeTab === 0) {
            const productHighlight = _.get(seller, 'product_highlight') ?? [];
            const carousell = _.get(seller, 'carousell') ?? [];
            const productLength = _.size(productHighlight);

            return (
                <div className={classNames(styles.tabContentContainer)}>
                    <Carousell images={carousell} />
                    <div className={classNames('highlightSection')}>
                        <div className={classNames(styles.highlightLabel)}>
                            <h3 className={classNames(styles.highlightH3)}>{t('distributor:highlightProduct')}</h3>
                        </div>
                        <div className={classNames(styles.highlightProductArea)}>
                            {loading && <ProductListSkeleton />}
                            {!loading && productLength < 1 && <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />}

                            {!loading && productLength > 0 && (
                                <>
                                    {productHighlight.map((itm) => (
                                        <div className={classNames(styles.highlightProductItem)}>
                                            <ProductItem {...itm} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        if (activeTab === 1) {
            return (
                <div className={classNames(styles.tabContentContainer)}>
                    <div className={classNames(styles.aboutDistributor)}>
                        <div className={classNames(styles.aboutDistributor)}>
                            <div className={classNames(styles.aboutDistributor)}>
                                <div dangerouslySetInnerHTML={{ __html: seller?.description ?? '' }} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (activeTab === 2) {
            return (
                <>
                    <div className={classNames(styles.tabContentContainer, styles.productList)}>
                        <ProductList {...contentProps} />
                    </div>
                </>
            );
        }
        if (activeTab === 3) {
            return (
                <>
                    <div className={classNames(styles.tabContentContainer)}>
                        <Review
                            t={t}
                            reviewList={reviewList}
                            ratingRefetch={ratingRefetch}
                            loadingReview={loadingReview}
                            avgRating={avgRating}
                            totalReviewer={totalReviewer}
                            handleLoadMoreReview={handleLoadMoreReview}
                            pageInfoReview={pageInfoReview}
                            handleChangeSortReview={handleChangeSortReview}
                            valueSortReview={valueSortReview}
                            baseSort={baseSort}
                            loadingFetchmoreReview={loadingFetchmoreReview}
                            handleFilterRating={handleFilterRating}
                            dataCustomer={dataCustomer}
                            loadingCustomer={loadingCustomer}
                        />
                    </div>
                </>
            );
        }

        if (activeTab === 4) {
            return (
                <>
                    <div className={classNames(styles.tabContentContainer)}>
                        <VoucherDistributor
                            t={t}
                            handleChangePage={handleChangePage}
                            pageVoucher={pageVoucher}
                            pageSizeVoucher={pageSizeVoucher}
                            loadingPromoList={loadingPromoList}
                            dataPromoProduct={dataPromoProduct}
                            categoryPath={categoryPath}
                        />
                    </div>
                </>
            );
        }

        return <></>;
    };

    return (
        <div className={classNames('container-seller-detail', styles.containerSellerDetail)}>
            <div className={classNames('seller-banner', styles.sellerBanner)}>
                <LoadImage
                    className={classNames(styles.sellerBannerImg)}
                    src={seller?.banner}
                    alt={seller?.company_name ?? ''}
                    title={seller?.company_name}
                    placeholder="/assets/img/distributor-banner-placeholder-min.jpeg"
                />
            </div>
            <div className={classNames('seller-info', styles.sellerInfo)}>
                <div className={classNames(styles.sellerInfoContainer)}>
                    <div className={classNames('seller-logo', styles.sellerLogo)}>
                        <LoadImage
                            src={seller?.logo}
                            alt={seller?.company_name ?? ''}
                            className={classNames(styles.sellerLogoImg)}
                            placeholderClassName={classNames(styles.sellerLogoImg, 'placeholder')}
                            placeholder="/assets/img/distributor-logo-placeholder.svg"
                        />
                    </div>
                    <div className={classNames(styles.sellerInfoDesc)}>
                        <div className="sellerInfoDescription">
                            {loading ? (
                                <Skeleton variant="text" height={40} width="50%" />
                            ) : (
                                <h2 className={classNames(styles.h2)}>{seller?.company_name}</h2>
                            )}
                        </div>
                        <div className={classNames(styles.inlineContainerCenter)}>
                            {loading ? (
                                <Skeleton variant="text" height={30} width="60%" />
                            ) : (
                                <div className={styles.ratingBox}>
                                    <RatingStar avgRating={avgRating} />
                                    <strong className={styles.scoreLabel}>{avgRating}</strong>
                                    <span>{t('distributor:fromReview', { total: totalReviewer })}</span>
                                </div>
                            )}
                            <SocialMediaSection />
                        </div>
                        <div className={classNames(styles.dividerAbsolute)} />
                        <div className={classNames(styles.divider)} />
                        <div className={styles.inlineContainer}>
                            <InfoItem icon={addressIcon} value={fullAddress ?? '-'} />
                            <InfoItem icon={tlpIcon} value={seller?.no_telp ?? '-'} />
                            <InfoItem icon={emailIcon} value={seller?.email ?? '-'} />
                            <InfoItem icon={webIcon} value={seller?.website ?? '-'} />
                            <InfoItem icon={clockIcon} value={seller?.location_operational_time} isTooltip />
                        </div>
                    </div>
                </div>
            </div>

            <div className={classNames('seller-content-section', styles.sellerContentSection)}>
                <div className={classNames(styles.tabsWrapper)}>
                    <div className={classNames(styles.tabsContainer)}>
                        <div className={classNames(styles.tabs)}>
                            <Tabs
                                classes={{ indicator: styles.tabIndicator }}
                                value={activeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={onChangeActiveTab}
                                aria-label="distributor tabs"
                                variant={desktop ? 'standard' : 'fullWidth'}
                            >
                                <Tab label={t('distributor:highlight')} />
                                <Tab label={t('distributor:aboutDistributor')} />
                                <Tab label={t('distributor:product')} />
                                <Tab label={t('distributor:review')} />
                                {isLogin && <Tab label={t('distributor:tabVoucher')} />}
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.tabsContent)}>
                    <ActiveTabView />
                </div>
            </div>
        </div>
    );
};

export default Component;
