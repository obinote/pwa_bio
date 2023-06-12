import React from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import useStyles from '@common_mobile_menu/style';
import Button from '@material-ui/core/Button';
import Typography from '@common_typography';
import { getCategoryById } from '@core_modules/theme/services/graphql';
import { HomeIcon, CategoryIcon, AccountIcon } from '@common_mobile_menu/components/icon/';
import dynamic from 'next/dynamic';
import userAgent from '@helper_useragent';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { ORANGE } from '@theme_color';
import useHasItemsInCart from '@helpers/useHasItemsInCart';

// import ShopCategoryPopup from '@common_mobile_menu/components/shop_category';

const StyledBadge = withStyles({
    badge: { backgroundColor: ORANGE },
})(Badge);

const ShoppingBagIcon = ({ active }) => (
    <>
        <span
            className="icon-cart"
            style={{
                fontSize: 22,
                color: active ? '#42929d' : '#7b9aaf',
            }}
        />
        <span
            style={{
                opacity: active ? 1 : 0,
                position: 'absolute',
                bottom: 1.5,
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: 10,
                height: 8,
                backgroundColor: ORANGE,
                clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
            }}
        />
    </>
);

const MobileMenu = (props) => {
    const {
        t, isLogin, storeConfig, pageConfig, showPopUp,
    } = props;
    const active = pageConfig.bottomNav;
    const styles = useStyles();
    const homeActive = Router.route === '/';
    const [popupCategory, setPopupCategory] = React.useState(false);
    const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];
    const ShopCategoryPopup = dynamic(() => import('@common_mobile_menu/components/shop_category'), { ssr: false });

    // get category data
    const { data: dataCategory } = getCategoryById(115);

    const hasItemsInCart = useHasItemsInCart();

    // eslint-disable-next-line consistent-return,no-shadow
    const processData = (dataCategory) => {
        if (dataCategory) {
            const children = [];
            // insert icons to category
            const tempCat = [
                { id: 131, icons: '/assets/img/category-cosmetic.svg' },
                { id: 140, icons: '/assets/img/category-device.svg' },
                { id: 120, icons: '/assets/img/category-medicine.svg' },
                { id: 127, icons: '/assets/img/category-herbal.svg' },
                { id: 134, icons: '/assets/img/category-vaccine.svg' },
                { id: 116, icons: '/assets/img/category-otc.svg' },
            ];

            dataCategory.category.children.map((cat) => {
                const temp = { ...cat };
                const check = tempCat.find((find) => cat.id === find.id);
                if (check) {
                    temp.icons = check.icons;
                }
                children.push(temp);
                return cat;
            });

            return {
                vesMenu: {
                    items: [
                        { name: t('common:header:menu:categories'), include_in_menu: true, children },
                        {
                            name: t('common:header:menu:distributor'),
                            link: '/distributor',
                            include_in_menu: true,
                            children: [],
                        },
                        {
                            name: t('common:header:menu:promotion'),
                            link: '/promotion',
                            include_in_menu: true,
                            children: [],
                        },
                        {
                            name: t('common:header:menu:aboutus'),
                            link: '/about-us',
                            include_in_menu: true,
                            children: [],
                        },
                        {
                            name: t('common:header:menu:howtoshop'),
                            link: '/how-to-shop',
                            include_in_menu: true,
                            children: [],
                        },
                    ],
                },
            };
        }

        if (!dataCategory) return {};
    };
    const data = processData(dataCategory);

    // eslint-disable-next-line no-nested-ternary
    const menu = storeConfig.pwa.ves_menu_enable ? data?.vesMenu?.items : data?.categoryList ? data?.categoryList[0]?.children : [] ?? [];

    const homeHandler = () => {
        if (Router.route !== '/') {
            Router.push('/');
        }
    };

    const categoryHandler = () => {
        setPopupCategory(!popupCategory);
    };

    const cartHandler = () => {
        const redirect = isLogin ? '/checkout/cart' : '/customer/account/login';
        Router.push(redirect);
    };

    const accountHandler = () => {
        const redirect = isLogin ? '/customer/account/dashboard' : '/customer/account/login';
        Router.push(redirect);
    };

    React.useEffect(() => {
        if (popupCategory) {
            window.document.body.style.overflow = 'hidden';
        } else {
            window.document.body.style.overflow = 'auto';
        }
    }, [popupCategory]);

    return (
        <>
            <div className="spacer" />
            <ShopCategoryPopup popupCategory={popupCategory} data={menu} cmsPages={cmsPages} showPopUp={showPopUp} />

            <div
                id="mm"
                className={classNames(styles.wrapper)}
                style={{
                    display: active === 'none' ? 'none' : 'block',
                    paddingBottom: userAgent.isIosApps() && 25,
                }}
            >
                <div className={classNames(styles.container, 'row')}>
                    <div className={classNames(styles.col, 'col-sm-3 col-xs-3')}>
                        <Button
                            className={styles.btn}
                            disableRipple
                            onClick={() => {
                                homeHandler();
                            }}
                        >
                            <HomeIcon active={homeActive && !popupCategory} />
                            <Typography variant="span" className={classNames(styles.btnText)}>
                                {t('common:header:menu:home')}
                            </Typography>
                        </Button>
                    </div>

                    <div id="navigation-mobile" className={classNames(styles.col, 'col-sm-3 col-xs-3')}>
                        <Button
                            className={styles.btn}
                            disableRipple
                            onClick={() => {
                                categoryHandler();
                            }}
                        >
                            <CategoryIcon active={popupCategory} />
                            <Typography variant="span" className={classNames(styles.btnText)}>
                                {t('common:button:shop')}
                            </Typography>
                        </Button>
                    </div>

                    <div className={classNames(styles.col, 'col-sm-3 col-xs-3')} id="shopping-bag-mobile">
                        <Button
                            className={styles.btn}
                            disableRipple
                            onClick={() => {
                                cartHandler();
                            }}
                        >
                            <Box width={40} height={40} display="flex" justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
                                <StyledBadge variant="dot" invisible={!hasItemsInCart}>
                                    <ShoppingBagIcon active={active === 'cart' && !popupCategory} />
                                </StyledBadge>
                            </Box>
                            <Typography variant="span" className={classNames(styles.btnText)}>
                                {t('common:cart:myCart')}
                            </Typography>
                        </Button>
                    </div>

                    <div id="auth-container-mobile" className={classNames(styles.col, 'col-sm-3 col-xs-3')}>
                        <Button
                            className={styles.btn}
                            disableRipple
                            onClick={() => {
                                accountHandler();
                            }}
                        >
                            <AccountIcon active={(active === 'account') && !popupCategory} />
                            <Typography variant="span" className={classNames(styles.btnText)}>
                                {t('common:menu:myaccount')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
