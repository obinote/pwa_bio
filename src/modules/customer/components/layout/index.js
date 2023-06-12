import React from 'react';
import { modules } from '@config';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Typography from '@common_typography';
import useStyles from '@layout_customer/style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import CompletionInfo from '@layout_customer/components/completion_info';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import useLogout from '@helpers/useLogout';

const Layout = (props) => {
    const {
        children, t, title, activeMenu, hideTitle = false,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const styles = useStyles();
    const router = useRouter();
    const logout = useLogout();

    const [active, setActive] = React.useState(false);
    let titlePage = '';

    const menu = [
        // MENU DISTRIBUTOR
        { href: '/', title: t('customer:menu:home'), class: 'label-menu menu-dahsboard' },
        { href: '/customer/account/dashboard', title: t('customer:menu:dashboard') },
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('customer:menu:notification'),
        }),
        // MENU TRANSACTION
        { href: '/', title: '', class: 'divider' },
        { href: '/', title: t('customer:menu:transaction'), class: 'label-menu menu-transaction' },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/customer/account/outstanding', title: t('customer:menu:myOutstanding') },
        { href: '/customer/account/overdue', title: t('customer:menu:myOverdue') },
        // MENU FEATURE
        { href: '/', title: '', class: 'divider' },
        { href: '/', title: t('customer:menu:feature'), class: 'label-menu menu-feature' },
        { href: '/customer/account/quote', title: t('customer:menu:myQuote') },
        // { href: '/customer/account/bidding', title: t('customer:menu:smartBidding') },
        { href: '/customer/account/requisition', title: t('customer:menu:myRequisition') },
        ...pushIf(modules.wishlist.enabled, {
            href: '/wishlist',
            title: t('customer:wishlist:pageTitle'),
        }),
        { href: '/customer/account/distributor', title: t('customer:menu:distributorList') },
        { href: '/customer/account/report', title: t('customer:menu:report') },
        // MENU PROFILE
        { href: '/', title: '', class: 'divider' },
        { href: '/', title: t('customer:menu:profile'), class: 'label-menu menu-profile' },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        { href: '/customer/account/creditlimit', title: t('customer:menu:creditLimit') },
        { href: '/customer/account/point', title: t('customer:menu:point') },
        { href: '/customer/account/voucher', title: t('customer:menu:voucher') },
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        { href: '/customer/account/companyprofile', title: t('customer:menu:companyProfile') },
        { href: '/customer/account/companyusers', title: t('customer:menu:companyUsers') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        // MENU CUSTOMER SUPPORT
        { href: '/', title: '', class: 'divider' },
        { href: '/', title: t('customer:menu:customerSupport'), class: 'label-menu menu-customer' },
        { href: '/customer/account/tickets', title: t('customer:menu:myTickets') },
        // MENU SETTINGS
        { href: '/', title: '', class: 'divider' },
        { href: '/', title: t('customer:menu:settings'), class: 'label-menu menu-settings' },
        { href: '/customer/newsletter', title: t('customer:menu:newsletter') },
        { href: '#', title: t('common:menu:signout'), class: 'log-out' },
    ];
    for (let index = 0; index < menu.length; index += 1) {
        const item = menu[index];
        if (item.href === router.asPath) {
            titlePage = item.title;
        }
    }
    const menuTitle = menu.find((itm) => itm.href === activeMenu || router.asPath === itm.href)?.title ?? menu[0].title;
    const handleChange = (panel) => (event, isExpanded) => {
        setActive(isExpanded ? panel : false);
    };
    const AccordionSummary = withStyles({
        root: {
            backgroundColor: '#42929D',
            marginBottom: -1,
            minHeight: 0,
            height: 45,
            padding: '0px 15px',
            '&$expanded': {
                minHeight: 0,
                height: 45,
            },
        },
        content: {
            '&$expanded': {
                margin: 0,
            },
        },
        expanded: {},
    })(MuiAccordionSummary);

    return (
        <div>
            <div className={classNames(styles.navMobileContainer, 'hidden-desktop')} style={{ zIndex: 81 }}>
                <div className={styles.listMenuMobileContainer}>
                    <Accordion elevation={0} expanded={active === 'dashboard'} onChange={handleChange('dashboard')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ fill: '#fffff' }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <p className={styles.titleNavMobile}>{menuTitle}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul className={styles.listMenuMobile}>
                                {menu.map((val, idx) => (
                                    <li
                                        key={idx}
                                        className={
                                            router.asPath === val.href || val.href === activeMenu
                                                ? classNames(styles.listMenuItem, styles.listMenuItemActive)
                                                : styles.listMenuItem
                                        }
                                    >
                                        {val.class === 'log-out' ? (
                                            <button className={val.class} onClick={logout} type="button">
                                                {val.title}
                                            </button>
                                        ) : (
                                            <Link href={val.href}>
                                                <a className={val.class}>{val.title}</a>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={classNames(styles.listMenuDesktop, 'row')}>
                    <div className={classNames(styles.sideBar, 'col-md-3 col-sm-3 col-xs-12 hidden-mobile')}>
                        <div className={styles.listMenuContainer}>
                            <ul className={styles.listMenu}>
                                {menu.map((val, idx) => (
                                    <li
                                        key={idx}
                                        className={
                                            router.asPath === val.href || val.href === activeMenu
                                                ? classNames(styles.listMenuItem, styles.listMenuItemActive)
                                                : styles.listMenuItem
                                        }
                                    >
                                        {val.class === 'log-out' ? (
                                            <button className={val.class} onClick={logout} type="button">
                                                {val.title}
                                            </button>
                                        ) : (
                                            <Link href={val.href}>
                                                <a className={val.class} id={
                                                    val.href === '/customer/account/requisition' ? 'profile_requestList' : 
                                                        val.href === '/wishlist' ? 'profile_wishlist' : null}>
                                                    {val.title}
                                                </a>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={classNames(styles.mainContent, 'col-md-9 col-xs-12 col-sm-9')} style={{ position: 'relative' }}>
                        <CompletionInfo t={t} />

                        {title === t('customer:menu:companyProfile') || titlePage === t('customer:menu:companyProfile') ? (
                            <div className={styles.companyTitle}>
                                <Typography
                                    variant="h1"
                                    type="bold"
                                    letter="capitalize"
                                    className={classNames(styles.titleContent, styles.titleCompany)}
                                >
                                    {title || titlePage}
                                </Typography>
                                <Button
                                    variant="contained"
                                    className={classNames(styles.button, 'edit-profile')}
                                    href="/customer/account/companyprofile/edit"
                                >
                                    {t('customer:companyProfile:button')}
                                </Button>
                            </div>
                        ) : (
                            <>
                                {!hideTitle && (
                                    <Typography
                                        id={titlePage === t('customer:wishlist:pageTitle') ? 'h1_daftar_keinginan' : null}
                                        variant="h1"
                                        type="bold"
                                        letter="capitalize"
                                        className={classNames(styles.titleContent)}
                                        style={{
                                            fontSize: '30px', marginLeft: '0', fontWeight: 'bold', color: '#414048',
                                        }}
                                    >
                                        {title || titlePage}
                                    </Typography>
                                )}
                            </>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
