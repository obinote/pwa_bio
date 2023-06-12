/* eslint-disable react/no-unescaped-entities */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@common_typography';
import Alert from '@material-ui/lab/Alert/Alert';
// import Layout from '@layout_customer';
import Skeleton from '@core_modules/notification/pages/list/components/skeleton';
import useStyles from '@src_modules/notification/pages/list/components/style';
import classNames from 'classnames';
import Pagination from '@common_pagination';
import { useEffect } from 'react';
import formatDate from '@helper_date';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@layout_customer'), { ssr: false });

const NotificationList = (props) => {
    const {
        t, data, handleItemClick, loading, error,
    } = props;

    // custom pageination handle ======
    const pageSize = 10;
    const [page, setPage] = React.useState(1);
    const [dataPerPage, setDataPerPage] = React.useState([]);
    const paginationCount = Math.ceil(data?.customerNotificationList?.items?.length / pageSize);
    const handleChange = (event, value) => {
        const sliceData = data.customerNotificationList.items.slice(pageSize * (value - 1), pageSize * value);
        setPage(value);
        setDataPerPage(sliceData);
    };
    useEffect(() => {
        if (data) {
            const sliceData = data.customerNotificationList.items.slice(pageSize * (page - 1), pageSize * page);
            setDataPerPage(sliceData);
        }
    }, [data]);
    // =================================

    const styles = useStyles();

    if (loading || (dataPerPage.length === 0 && data?.customerNotificationList.items.length !== 0)) return <Layout {...props}><Skeleton /></Layout>;
    if (error) return <Layout {...props}><Alert severity="error">{`Error: ${error.message}`}</Alert></Layout>;
    if (!data) return <Layout {...props}><Alert severity="error">{t('notification:not_found')}</Alert></Layout>;

    if (data.customerNotificationList.items.length === 0) {
        return (
            <Layout {...props}>
                <Alert severity="error">
                    {t('notification:empty')}
                </Alert>
            </Layout>
        );
    }

    return (
        <Layout {...props}>
            <div className={classNames(styles.wrapperNotificationList, 'container')} style={{ paddingTop: 0 }}>
                <div className="title-column hidden-mobile">
                    <div className="col col-time">{t('notification:notificationList:noTicket')}</div>
                    <div className="col col-subject">{t('notification:notificationList:subject')}</div>
                </div>
                <List>
                    {dataPerPage.map((item, i) => (
                        <ListItem key={i} divider button onClick={() => handleItemClick(item)}>
                            <ListItemText
                                className="item-text-notif"
                                primary={(
                                    <Typography variant="label" type="regular" size="14">
                                        {formatDate(item.createdAt, 'MMMM DD, YYYY hh:mm:ss')}
                                    </Typography>
                                )}
                                secondary={(
                                    <Typography variant="label" type="regular" className={item.unread ? 'unread' : ''} size="14">
                                        {item.subject}
                                    </Typography>
                                )}
                            />
                        </ListItem>
                    ))}
                    <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                        {paginationCount > 1 && (
                            <Pagination count={paginationCount} page={page} onChange={handleChange} />
                        )}
                    </div>
                </List>
            </div>
        </Layout>
    );
};

export default NotificationList;
