/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import Router from 'next/router';
import getPath from '@helper_getpath';
import { setResolver, getResolver, setLocalStorage } from '@helper_localstorage';
import Link from 'next/link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { custDataNameCookie, features } from '@config';
import firebase from 'firebase/app';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import { getCategoryById, getCustomer, removeToken } from '@core_modules/theme/services/graphql';
import TabPanel from '@core_modules/theme/components/header/mobile/components/tabPanel';
import Accordion from '@core_modules/theme/components/header/mobile/components/accordion';
import firebaseApp from '@lib_firebase/index';
import 'firebase/firestore';
import ResetGuide from '@core_modules/customer/helpers/ResetGuide';
import { LIST_AUTO_TERMINATE_CHAT } from '@core_modules/customer/plugins/ChatContent/lib/constansta';

const Menu = (props) => {
    const {
        t, data: propsVesMenu, storeConfig, isLogin,
    } = props;
    const [deleteTokenGql] = removeToken();
    const client = useApolloClient();
    const [value, setValue] = React.useState(0);
    const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];

    let data = propsVesMenu;
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const { data: dataCategory } = getCategoryById(115);

    if (dataCategory) {
        data = {
            vesMenu: {
                items: [
                    {
                        name: t('common:header:menu:home'),
                        link: '/',
                        include_in_menu: true,
                        children: [],
                    },
                    { name: t('common:header:menu:categories'), include_in_menu: true, children: dataCategory?.category?.children },
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
    let menu = storeConfig.pwa.ves_menu_enable ? data?.vesMenu?.items : data?.categoryList ? data?.categoryList[0]?.children : [];
    if (!menu) {
        menu = [];
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const generateLink = (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        if (storeConfig.pwa.ves_menu_enable) {
            if (cat.link_type === 'category_link') {
                return ['/[...slug]', link];
            }
            const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
            if (cms) {
                return ['/[...slug]', link];
            }
            return [link, link];
        }
        return ['/[...slug]', link];
    };
    const handleClick = async (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        const urlResolver = getResolver();
        if (storeConfig.pwa.ves_menu_enable) {
            if (cat.link_type === 'category_link') {
                urlResolver[link] = {
                    type: 'CATEGORY',
                    id: cat.category_id,
                };
                await setResolver(urlResolver);
            } else {
                const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
                if (cms) {
                    urlResolver[link] = {
                        type: 'CMS_PAGE',
                    };
                    await setResolver(urlResolver);
                }
            }
        } else {
            urlResolver[link] = {
                type: 'CATEGORY',
                id: cat.id,
            };
            await setResolver(urlResolver);
        }
    };

    const setOfflineStatus = async () => {
        if (customerData && customerData.customer && customerData.customer.email) {
            setLocalStorage(LIST_AUTO_TERMINATE_CHAT, {});
            const db = firebaseApp.firestore();
            // set customer as offline
            const updateStatus = async () => {
                const docReference = db.collection('status').doc(customerData.customer.email);
                await docReference.update({
                    status: '0',
                });
            };
            // eslint-disable-next-line no-console
            await updateStatus().catch((e) => console.log(e));
        }
    };

    const handleLogout = async () => {
        setOfflineStatus();
        ResetGuide();
        window.backdropLoader(true);
        if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    // Sign-out successful.
                })
                .catch(() => {
                    // An error happened.
                });
        }
        await deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch(() => {
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            });
    };

    const a11yProps = (index) => ({
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tab-${index}`,
    });

    return (
        <div className="menu-wrapper" role="navigation">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs"
                TabIndicatorProps={{
                    style: { display: 'none' },
                }}
            >
                <Tab disableRipple classes="tabs-menu" label="Menu" {...a11yProps(0)} />
                <Tab disableRipple classes="tabs-menu" label="Akun" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div>
                    {menu.map((val, idx) => {
                        if ((val.include_in_menu || storeConfig.pwa.ves_menu_enable) && val.name) {
                            return (
                                <div className="menu" key={idx}>
                                    {val.link && val.children.length < 1 ? (
                                        <>
                                            <Link href={generateLink(val)[0]} as={generateLink(val)[1]}>
                                                <a
                                                    className="menu-item"
                                                    onClick={() => handleClick(val)}
                                                    dangerouslySetInnerHTML={{ __html: val.name }}
                                                />
                                            </Link>
                                        </>
                                    ) : (
                                        <Accordion data={val} generateLink={generateLink} handleClick={handleClick} />
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {isLogin ? (
                    <div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                {t('common:header:hi').replace('$', `${customerData?.customer?.firstname} ${customerData?.customer?.lastname}`)}
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                Akun Saya
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                Penawaran Saya
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                Pemesanan Saya
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                Daftar Permintaan Saya
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                Daftar Keinginan Saya
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#" onClick={handleLogout}>
                                {t('common:menu:signout')}
                            </a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="menu">
                            <a className="menu-item" href="/customer/account/login/">
                                {t('common:menu:sign')}
                            </a>
                        </div>
                        <div className="menu">
                            <a className="menu-item" href="#">
                                {t('common:menu:register')}
                            </a>
                        </div>
                    </div>
                )}
            </TabPanel>
            <style jsx global>
                {`
                    .menu {
                        padding: 14px 22px;
                        border-bottom: 1px solid rgb(209, 209, 209);
                    }
                    .menu-top {
                        padding: 14px 22px;
                    }
                    .menu-item {
                        text-transform: none;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .MuiTabs-flexContainer {
                        display: flex !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Menu;
