/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import Alert from '@material-ui/lab/Alert/Alert';
// import Layout from '@layout_customer';
import Skeleton from '@core_modules/notification/pages/detail/components/skeleton';
import useStyles from '@src_modules/notification/pages/detail/components/style';
import classNames from 'classnames';
import Link from 'next/link';
import formatDate from '@helper_date';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@layout_customer'), { ssr: false });

const NotificationData = (props) => {
    const {
        t, loading, error, data,
    } = props;
    if (loading) return <Layout {...props}><Skeleton /></Layout>;
    if (error) return <Layout {...props}><Alert severity="error">{`Error: ${error.message}`}</Alert></Layout>;
    if (!data) return <Layout {...props}><Alert severity="error">{t('notification:not_found')}</Alert></Layout>;

    const item = data.readNotification.items[0];
    const styles = useStyles();
    return (
        <Layout {...props} activeMenu="/inboxnotification/notification">
            <div className={classNames(styles.wrapperNotificationDetail, 'container')}>
                <Typography variant="h1" type="bold">
                    {item.subject}
                </Typography>
                <Typography variant="p" style={{ marginBottom: 16 }} size="14" type="regular" className="time">
                    {formatDate(item.createdAt, 'MMMM DD, YYYY hh:mm:ss')}
                </Typography>
                <div className="content-detail" dangerouslySetInnerHTML={{ __html: item.content }} />

                <div className="back">
                    <Link href="/inboxnotification/notification">
                        <a>
                            {t('notification:back')}
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default NotificationData;
