/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable linebreak-style */
// import Layout from '@layout_customer';
import useStyles from '@src_modules/customer/pages/dashboard/components/style';
import classNames from 'classnames';
import Typography from '@common_typography';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';
// import LinearProgress from '@material-ui/core/LinearProgress'; di hide dulu
// import { formatPrice } from '@helper_currency'; di hide dulu
// import { breakPointsUp } from '@helper_theme'; di hide dulu
import Skeleton from '@material-ui/lab/Skeleton';

const DashboardDetailPage = (props) => {
    const {
        t, 
        dataVoucher, 
        dataNotif, 
        dataPoint, 
        // dataMember, di hide dulu
        // dataOrderSummary, di hide dulu 
        dataCustomer, 
        loadingCustomer,
    } = props;
    const styles = useStyles();
    // const desktop = breakPointsUp('sm'); di hide dulu

    return (
        <>
            <div className={classNames(styles.wrapperDashboard, 'container')}>
                {!loadingCustomer ? (
                    <div className="wrapper-header-dashboard">
                        <div className="header-dashboard-title">
                            <Typography variant="h1" type="bold" className="dashboard-title">
                                {dataCustomer?.customer?.firstname}
                                {' '}
                                {dataCustomer?.customer?.lastname}
                            </Typography>
                        </div>
                        <div className="header-dashboard-subtitle">
                            <div className="header-dashboard-email">
                                <Typography variant="h4" type="bold" className="vendor-title">
                                    {dataCustomer?.customer?.company_name}
                                </Typography>
                                <div className="header-dashboard-email-content">
                                    <Typography variant="h4" type="normal">
                                        {dataCustomer?.customer?.email}
                                    </Typography>
                                    <Link href="profile">
                                        <a className="header-edit">
                                            <div className="icon-header-edit" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="header-dashboard-point-voucher">
                                <Link href="point" key="point">
                                    <a className="header-dashboard-point">
                                        <div className="dashboard-point" />
                                        <div className="dashboard-point-content">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF' }}>
                                                {t('customer:dashboard:point')}
                                            </Typography>
                                            <Typography variant="span" type="bold" className="span-point">
                                                {dataPoint?.getCustomRewardPointsTransaction?.balance}
                                                {' '}
                                                {t('customer:dashboard:pointBack')}
                                            </Typography>
                                        </div>
                                    </a>
                                </Link>
                                <Link href="voucher" key="voucher">
                                    <a className="header-dashboard-voucher">
                                        <div className="dashboard-voucher" />
                                        <div className="dashboard-voucher-content">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF' }}>
                                                {t('customer:dashboard:voucher')}
                                            </Typography>
                                            <Typography variant="span" type="bold" className="span-point">
                                                {dataVoucher?.customer?.coupons?.total_count}
                                                {' '}
                                                {t('customer:dashboard:voucherBack')}
                                            </Typography>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : <Skeleton animation="wave" variant="text" width="100%" height={124} /> }

                {/* Section Member Level hide sementara */}

                {/* <div className={`wrapper-level ${dataMember?.customer?.member_level?.current_level_name}`}>
                    <div className="level-content">
                        <div className="level-content-left">
                            <div className="level-icon-big" />
                            <div className="level-name">
                                <Typography variant="span" type="normal" size="12" className="inner-normal">
                                    {t('Level')}
                                </Typography>
                                <Typography variant="span" className="inner-bold">
                                    {dataMember?.customer?.member_level?.current_level_name}
                                    {' '}
                                    {t('Member')}
                                </Typography>
                            </div>
                        </div>
                        <div className="level-content-right">
                            <div className="level-name">
                                <Typography variant="span" type="normal" size="12" className="inner-normal">
                                    {t('customer:dashboard:transactionInstruction1')}
                                    {' '}
                                    {dataMember?.customer?.member_level?.next_level_value
                                        ? formatPrice(dataMember?.customer?.member_level?.next_level_value)
                                        : ' '}
                                    {' '}
                                    {t('customer:dashboard:transactionInstruction2')}
                                </Typography>
                                <div className="level-progress">
                                    <LinearProgress variant="determinate" value={dataMember?.customer?.member_level?.percentage_to_next_level} />
                                    <div className="level-icon-small">
                                        <Typography variant="span" type="bold" className="progress-name">
                                            {dataMember?.customer?.member_level?.next_level_name}
                                        </Typography>
                                    </div>
                                </div>
                                <Link href="/membership-program">
                                    <a className="membership-program">
                                        <Typography variant="span" type="normal" size="12">
                                            {t('customer:dashboard:viewMembershipProgram')}
                                        </Typography>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Section Report di hide sementara */}

                {/* <div className="wrapper-report-dashboard">
                    <div className="report-dashboard-header">
                        <Typography variant="span" type="bold" className="report-title">
                            {t('customer:dashboard:report')}
                        </Typography>
                        {desktop ? (
                            <Link href="#">
                                <a className="report-seeall-report">
                                    <Typography variant="span" type="normal" size="14">
                                        {t('customer:dashboard:reportSeeAll')}
                                    </Typography>
                                </a>
                            </Link>
                        ) : null}
                    </div>
                    <div className="report-dashboard-content">
                        {desktop ? (
                            <List className="dashboard-content">
                                <ListItem>
                                    <div className="inner">
                                        <div className="inner-header">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF', display: 'block' }}>
                                                {t('customer:dashboard:reportSpend')}
                                            </Typography>
                                            <Typography variant="span" className="inner-bold">
                                                {formatPrice(dataOrderSummary?.customer?.order_summary?.total_purchase)}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="inner">
                                        <div className="inner-header">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF', display: 'block' }}>
                                                {t('customer:dashboard:reportDiscount')}
                                            </Typography>
                                            <Typography variant="span" className="inner-bold">
                                                {formatPrice(dataOrderSummary?.customer?.order_summary?.total_discount)}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="inner">
                                        <div className="inner-header">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF', display: 'block' }}>
                                                {t('customer:dashboard:reportOrderTotal')}
                                            </Typography>
                                            <Typography variant="span" className="inner-bold">
                                                {dataOrderSummary?.customer?.order_summary?.total_order_qty}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="inner">
                                        <div className="inner-header">
                                            <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF', display: 'block' }}>
                                                {t('customer:dashboard:reportOrderNotPay')}
                                            </Typography>
                                            <Typography variant="span" className="inner-bold">
                                                {dataOrderSummary?.customer?.order_summary?.total_unpaid_order_qty}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                        ) : (
                            <List className="dashboard-content">
                                <ListItem>
                                    <div className="inner">
                                        <div className="inner-header">
                                            <Typography variant="p" type="normal" size="12" style={{ color: '#7B9AAF', display: 'block' }}>
                                                {t('customer:dashboard:reportMobile')}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                        )}
                    </div>
                </div> */}
                
                <div className="wrapper-notification-dashboard">
                    <div className="notification-dashboard-header">
                        <Typography variant="span" type="bold" className="notification-title">
                            {t('customer:dashboard:notifTitle')}
                        </Typography>
                        <Link href="/inboxnotification/notification">
                            <a className="seeall-notification">
                                <Typography variant="span" type="normal" size="14" style={{ color: '#F58732', display: 'block' }}>
                                    {t('customer:dashboard:notifSeeAll')}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                    <div className="notification-dashboard-content">
                        {dataNotif?.getInboxNotificationList?.inboxNotification.length > 0 ? (
                            <List className="dashboard-content">
                                {dataNotif?.getInboxNotificationList?.inboxNotification.map((dt, index) => (
                                    <ListItem key={`notif-${index}`}>
                                        <div className="inner">
                                            <div className="inner-header">
                                                <Typography variant="span" type={dt.status_read ? 'bold' : 'regular'} className="inner-normal">
                                                    {dt.subject}
                                                </Typography>
                                                <Typography variant="span" align="right" size="12" style={{ color: '#7B9AAF', fontWeight: 400 }}>
                                                    {dt.created_at}
                                                </Typography>
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Alert style={{ marginTop: '20px' }} severity="warning">
                                {t('customer:dashboard:tableNotFoundNotif')}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardDetailPage;
