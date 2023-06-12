/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@material-ui/core/IconButton';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import { modules } from '@config';
import Link from '@material-ui/core/Link';
import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import classNames from 'classnames';
import useStyles from '@plugin_productitem/style';
import { getLoginInfo } from '@helper_auth';
import { useTranslation } from '@i18n';

const LoginHandler = ({ isLogin, is_valid }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    if (isLogin) {
        return (
            <div className="req-register">
                {!is_valid && (
                    <Link href="/distributor">
                        <a className={styles.loginRegister}>{t('catalog:registerNow')}</a>
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="req-login">
            <Link href="/customer/account/login">
                <a className={styles.loginRegister}>{t('catalog:loginToShopping')}</a>
            </Link>
        </div>
    );
};

const Detail = (props) => {
    const {
        t,
        spesificProduct,
        handleClick,
        name,
        vendor_name,
        valid_to_nie,
        no_nie,
        is_valid,
        manufacture_name,
        handleFeed,
        ratingValue,
        __typename,
        price_range,
        price_tiers,
        feed,
        id,
        special_from_date,
        special_to_date,
        enableWishlist,
        handleSetCompareList,
        enableRating,
        enablePrice = true,
        enableProductCompare,
        storeConfig = {},
    } = props;
    const styles = useStyles();
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const showWishlist = typeof enableWishlist !== 'undefined' ? enableWishlist : modules.wishlist.enabled;
    const showRating = typeof enableRating !== 'undefined' ? enableRating : storeConfig?.pwa?.rating_enable;
    const isLogin = getLoginInfo() === 1;

    const isNieExpired = (nieDate) => {
        const nie = new Date(nieDate).getTime();
        const now = new Date().getTime();
        return nie < now;
    };

    return (
        <div className={styles.descItem}>
            {showWishlist && (
                <Button className={styles.btnFeed} onClick={handleFeed}>
                    {feed ? <Favorite className={classFeedActive} /> : <FavoriteBorderOutlined className={styles.iconFeed} />}
                </Button>
            )}
            {enableProductCompare && (
                <Button className={styles.btnCompare} onClick={() => handleSetCompareList(id)}>
                    <CompareArrowsIcon className={styles.iconCompare} />
                </Button>
            )}
            <Typography variant="p" className={styles.vendor} letter="capitalize">
                <span className="icon-distributor-o" />
                { vendor_name || '-' }
            </Typography>
            <Link onClick={handleClick} className={styles.productLinkButton}>
                <Typography id="p_productName" variant="p" className={`${styles.productTitle} product-name`} letter="capitalize">
                    {name}
                </Typography>
            </Link>
            {enablePrice && isLogin && is_valid && (
                <PriceFormat
                    // eslint-disable-next-line camelcase
                    priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                    // eslint-disable-next-line camelcase
                    priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                    productType={__typename}
                    specialFromDate={special_from_date}
                    specialToDate={special_to_date}
                />
            )}
            <Typography variant="p" className={styles.manufacture} letter="capitalize">
                {manufacture_name || '-'}
            </Typography>
            {isNieExpired(valid_to_nie) ? (
                <Typography variant="p" className={classNames(styles.manufacture, 'product-nie')} letter="capitalize">
                    {t('catalog:product:nieExpired')}
                </Typography>
            ) : (
                <Typography variant="p" className={classNames(styles.nie, 'product-nie')} letter="capitalize">
                    {`No. NIE ${no_nie}`}
                </Typography>
            )}
            {showRating && <RatingStar value={ratingValue} />}
            <LoginHandler isLogin={isLogin} is_valid={is_valid} />
        </div>
    );
};

export default Detail;
