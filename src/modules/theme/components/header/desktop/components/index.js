/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
/* eslint-disable indent */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import VoiceRecognition from '@core_modules/theme/components/header/desktop/components/voicerecognition';
import NotificationBell from '@plugin_notificationbell';
import ShoppingBagIcon from '@plugin_shoppingbag';
import ProductCompareIcon from '@core_modules/catalog/plugins/ProductCompare';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DesktopInstallApp from '@core_modules/theme/components/custom-install-popup/desktop';
import Menu from '@core_modules/theme/components/header/desktop/components/mcategory';
import TopMenu from '@core_modules/theme/components/header/desktop/components/mtop';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import SearchByImageView from '@src_modules/theme/components/header/desktop/components/searchbyimage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@common_typography';

const ViewTopNavigation = (props) => {
    const {
        storeConfig,
        handleSearch,
        searchByClick,
        setValue,
        value,
        data,
        // loading,
        t,
        isLogin,
        customer,
        handleLogout,
        app_cookies,
        showGlobalPromo,
        modules,
        // vesMenuConfig,
        appName = 'Swift PWA',
        installMessage = 'Install',
        enablePopupInstallation = false,
        showAccountMenu,
        setShowAccountMenu,
        enableVoice,
        voiceClickHandler,
        searchPlaceholder,
        dataCategory,
        categoryExpanded,
        handleExpandCategory,
    } = props;

    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const router = useRouter();

    let headerMenu = storeConfig.pwa.ves_menu_enable ? data?.vesMenu?.items : data?.categoryList[0]?.children || [];
    if (!headerMenu) {
        headerMenu = [];
    }
    const categoryMenu = headerMenu.find((menuItem) => !menuItem?.link);

    const menu = [
        { href: '/customer/account/dashboard', title: t('common:menu:myaccount') },
        { href: '/sales/order/history', title: t('common:menu:myOrder') },
        { href: '/customer/account/quote', title: t('common:menu:myQuote') },
        { href: '/customer/account/requisition', title: t('common:menu:myRequisition') },
        ...pushIf(modules.wishlist.enabled, {
            href: '/wishlist',
            title: t('common:menu:mywishlist'),
        }),
        { href: '', title: t('common:menu:signout'), class: 'log-out' },
    ];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
    }

    let name = `${customer?.customer?.firstname} ${customer?.customer?.lastname}`;
    if (name.length > 15) {
        name = `${name.substring(0, 15)}...`;
    }

    /* Handle Search by Image */
    const [searchByImageIsOpen, setSearchByImageIsOpen] = React.useState(false);
    const [imageSearch, setImageSearch] = React.useState(false);
    const [imageUuid, setImageUuid] = React.useState(false);
    const handleSearchByImage = () => {
        setSearchByImageIsOpen(true);
    };

    // wrap to properties
    const searchImageAction = {
        searchByImageIsOpen,
        setSearchByImageIsOpen,
        handleSearchByImage,
        imageSearch,
        setImageSearch,
        imageUuid,
        setImageUuid,
    };

    return (
        <div id="header">
            <div className="row header-top">
                <main className="header-top-main" style={{ width: '97%' }}>
                    {enablePopupInstallation ? <DesktopInstallApp appName={appName} installMessage={installMessage} /> : null}
                    <TopMenu t={t} isLogin={isLogin} data={customer} handleLogout={handleLogout} app_cookies={app_cookies} />
                </main>
            </div>
            <main style={{ width: '100%', maxWidth: 'unset', borderBottom: '1px solid #e7f3ff' }}>
                <div className="header-main">
                    <div className="header-middle">
                        <div className="header-middle__left">
                            <div className="box header-middle__logo">
                                <Link href="/">
                                    <img
                                        className="header-middle__logo-link"
                                        src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="header-middle__center">
                            {categoryMenu && categoryMenu?.include_in_menu && (
                                <div className="header-middle__category" onClick={handleExpandCategory}>
                                    <span>{categoryMenu.name}</span>
                                    {categoryExpanded ? (
                                        <div style={{ alignItems: 'center', display: 'flex', margin: '0 7px' }}>
                                            <ExpandLessIcon style={{ fontSize: 17, color: '#575757' }} />
                                        </div>
                                    ) : (
                                        <div style={{ alignItems: 'center', display: 'flex', margin: '0 7px' }}>
                                            <ExpandMoreIcon style={{ fontSize: 17, color: '#575757' }} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="header-middle__search" id="searchbar">
                                <VoiceRecognition enableVoice={enableVoice} clickHandler={voiceClickHandler} />

                                <Autocomplete
                                    setValue={setValue}
                                    handleSearch={handleSearch}
                                    OptionsItem={OptionAutocomplete}
                                    width="100%"
                                    placeholder={searchPlaceholder}
                                    forcePopupIcon={false}
                                    enableVoice={enableVoice}
                                    dataCategory={dataCategory}
                                    searchImageAction={searchImageAction}
                                />

                                <div className="search-icon">
                                    <IconButton id="search_button" disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                        <SearchIcon style={{ fill: '#f58732' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className="header-middle__right">
                            <div className="box">
                                <div className="header-middle__icons row" id="username-container">
                                    {!isLogin ? (
                                        <div className="row" id="auth-container">
                                            <div style={{ marginRight: '5px' }}>
                                                <a className="signin" id="home_button_masuk" href="/customer/account/login/">
                                                    {t('common:menu:sign')}
                                                </a>
                                            </div>
                                            <div style={{ marginRight: '10px' }}>
                                                <a className="register" href="/company/account/create/">
                                                    {t('common:menu:register')}
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div id="auth-container">
                                                <a onClick={() => setShowAccountMenu(!showAccountMenu)} className="row" style={{ alignItems: 'center' }}>
                                                    {customer.customer ? (
                                                        <>
                                                            <Typography
                                                                variant="span"
                                                                type="regular"
                                                                size="16"
                                                                style={{
                                                                marginTop: '3px', marginRight: 2, letterSpacing: 0, fontWeight: '400',
                                                            }}
                                                            >
                                                                {t('common:header:welcome').replace('!', ',')}
                                                            </Typography>
                                                            <strong className="customer-name">
                                                                &nbsp;
                                                                {name}
                                                            </strong>
                                                            {showAccountMenu ? (
                                                                <div style={{ alignItems: 'center', display: 'flex', margin: '0 7px' }}>
                                                                    <ExpandLessIcon style={{ fontSize: 15, color: '#42929d' }} />
                                                                </div>
                                                            ) : (
                                                                <div style={{ alignItems: 'center', display: 'flex', margin: '0 7px' }}>
                                                                    <ExpandMoreIcon style={{ fontSize: 15, color: '#42929d' }} />
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </a>
                                                <div className="account-menu" style={{ display: showAccountMenu ? 'block' : 'none' }}>
                                                    {/* <ul>
                                                        <li>
                                                            <Link href="/customer/account">
                                                                <a className="account-menu-item">{t('common:menu:myaccount')}</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/wishlist">
                                                                <a className="account-menu-item">
                                                                    {t('common:menu:mywishlist')}
                                                                    {' '}
                                                                    (
                                                                    {data.wishlist ? data.wishlist.items.length : 0}
                                                                    {' '}
                                                                    items )
                                                                    {' '}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={handleLogout} className="account-menu-item">
                                                                {t('common:menu:signout')}
                                                            </a>
                                                        </li>
                                                    </ul> */}
                                                    <ul>
                                                        {menu.map((val, idx) => (
                                                            <li key={idx} className={'account-menu-item'}>
                                                                {val.class === 'log-out' ? (
                                                                    <a role="button" tabIndex={0} className={val.class} onClick={handleLogout}>
                                                                        {val.title}
                                                                    </a>
                                                                ) : (
                                                                    <Link href={val.href}>
                                                                        <a className={val.class}>{val.title}</a>
                                                                    </Link>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="notification" id="notification">
                                                <NotificationBell withLink />
                                            </div>
                                        </>
                                    )}
                                    {modules.productcompare.enabled && (
                                        <div className="shopping-bag">
                                            <ProductCompareIcon withLink isLogin={isLogin} />
                                        </div>
                                    )}
                                    <div className="shopping-bag" id="shopping-bag">
                                        <ShoppingBagIcon automation_id="button_cart_icon" withLink storeConfig={storeConfig} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-category">
                        <div className={`row menu-category ${categoryExpanded ? 'expanded' : ''}`}>
                            <div className="col-xs-12 menu-middle" id="navigation">
                                <Menu data={data} storeConfig={storeConfig} forcedShowMenu={categoryExpanded} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SearchByImageView searchImageAction={searchImageAction} t={t} isLogin={isLogin} maxSize={storeConfig.max_size} />
            {/* <div className="header-tab">
                <div className="row menu-category">
                    <div className="col-xs-12">{loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}</div>
                </div>
                <div className="header-small__menu">
                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                </div>
            </div> */}
            <style jsx>
                {`
                    .account-menu {
                        background-color: #fff;
                        position: absolute;
                        padding: 0;
                        border: 0;
                        box-shadow: 0 0 4px rgb(0 0 0 / 20%);
                        min-width: 180px;
                        z-index: 999;
                        right: 0;
                        margin-top: 10px;
                        border-radius: 8px;
                    }
                    .icon-menu {
                        color: '#42929d';
                        marginLeft: '7px';
                    }
                    .account-menu-item a {
                        padding: 2px 16px;
                        font-size: 16px;
                        display: flex;
                        min-height: 30px;
                        align-items: center;
                        line-height: normal;
                    }
                    .account-menu-item a:hover {
                        background: #F2F9FF;
                    }
                    .customer-name {
                        color: #42929d;
                        font-size: 16px;
                    }
                    ul {
                        list-style-type: none;
                    }
                    .header-main {
                        max-width: 1280px;
                        width: 97%;
                        margin: 0 auto;
                    }
                    @media (min-width: 768px) {
                        #header {
                            position: fixed;
                            width: 100%;
                            background: white;
                            z-index: 82;
                            top: ${showGlobalPromo ? '45px' : '0'};
                            transition: top 1s ease;
                            height: unset;
                        }
                    }
                    .header-top-main {
                        max-width: 1280px;
                    }
                    @media only screen and (max-width: 1023px) and (min-width: 768px) {
                        .header-top {
                            height: unset;
                            padding-top: 0;
                        }
                    }
                    .header-middle {
                        height: 75px;
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    @media only screen and (max-width: 1023px) and (min-width: 768px) {
                        .header-middle__center, .header-middle__left{
                            width: 25%
                        }
                        .header-middle__right{
                            width: 50%
                        }
                        .customer-name {
                            max-width: 55px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                    @media only screen and (max-width: 1920px) and (min-width: 1024px) {
                        .customer-name {
                            max-width: 115px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                    @media (min-width: 1300px) {
                        .header-middle > div {
                            width: 33.33%
                        }
                    }
                    .header-small__menu {
                        display: none;
                    }
                    .header-middle img {
                        width: 120px;
                    }
                    .header-middle__logo-link {
                        cursor: pointer;
                    }
                    .header-middle__icons {
                        float: right;
                        padding-left: 4px;
                        padding-right: 16px;
                        align-items: center;
                    }
                    .header-middle__icons > div {
                        margin-right: -5px;
                        margin-left: 0px;
                        position: relative;
                    }
                    .header-middle__center {
                        width: calc(100%/3);
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }
                    .header-middle__category {
                        display: none;
                    }
                    .header-category {
                        display: flex;
                        justify-content: center;
                    }
                    .signin {
                        height: 32px;
                        background: #f58732;
                        color: #fff;
                        display: table-cell;
                        width: 100%;
                        vertical-align: middle;
                        padding: 0 20px;
                        border-radius: 40px;
                        text-decoration: none;
                        transition: all .15s ease-in;
                    }
                    .register {
                        height: 32px;
                        background: #ffffff;
                        color: #F58732;
                        border: 1px solid #F58732;
                        display: table-cell;
                        width: 100%;
                        vertical-align: middle;
                        padding: 0 20px;
                        border-radius: 40px;
                        text-decoration: none;
                        transition: all .15s ease-in;
                    }
                    .signin, {
                    .register
                        font-weight: 500;
                        letter-spacing: 0;
                    }
                    .search-icon {
                        position: absolute;
                        right: 0;
                        z-index: 9;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        flex: 1;
                    }
                    .menu-category {
                        width: fit-content;
                        display: block;
                    }
                    .global-promo {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                        background-color: red;
                    }
                `}
            </style>
            <style global jsx>
                {`
                    .header-small .header-top {
                        display: none;
                    }
                    .header-top {
                        width: 100%;
                        background-color: #42929d;
                        display: flex;
                        align-items: center;
                        padding: 5px 0;
                        margin: 0;
                        height: 34px;
                    }
                    .MuiInput-underline::after {
                        border-bottom: 0 !important;
                    }
                    .mobile-search .MuiFormControl-marginNormal {
                        margin: 0;
                    }
                    @media (min-width: 1250px) {
                        .header-small .header-small__menu {
                            display: block;
                        }
                        .header-middle__center {
                            display: flex !important;
                        }
                        .header-tab {
                            display: none;
                        }
                        .header-small .header-middle__category {
                            display: flex;
                            cursor: pointer;
                            color: #575757;
                            font-weight: bold;
                        }
                        .haeder-small .header-middle__category p {
                            color: #575757;
                            font-weight: bold;
                        }
                        .header-small .menu-category {
                            display: none;
                        }
                        .header-small .menu-category.expanded {
                            display: block;
                        }
                    }
                    @media (max-width: 767px) {
                        header .hidden-desktop div {
                            display: block;
                        }
                        .header-logo .header-logo-link {
                            max-width: 140px;
                        }
                        .header-top {
                            padding: 0;
                        }
                        .mobile-search .MuiAutocomplete-input {
                            width: 100% !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ViewTopNavigation;
