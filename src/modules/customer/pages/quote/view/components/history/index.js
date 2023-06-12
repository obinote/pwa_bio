import { useEffect, useState } from 'react';
import { getNegotiableQuoteHistory } from '@core_modules/customer/services/graphql';
import useStyles from '@core_modules/customer/pages/quote/view/components/history/style';
import ButtonUnstyled from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';

const History = ({ quote, t }) => {
    const dateTimeFormat = 'DD MMMM YYYY, H:mm:ss';
    const [existing, setExisting] = useState([]);
    const [page, setPage] = useState(1);
    const styles = useStyles();
    const { loading, data, fetchMore } = getNegotiableQuoteHistory({
        variables: {
            uid: quote.uid,
            currentPage: page,
            pageSize: 3,
        },
    });

    const loadPrevious = () => {
        setPage(page + 1);
        fetchMore({
            variables: {
                currentPage: page,
            },
        });
    };

    const mergeData = (incoming) => {
        const old = existing.reverse();
        const merge = old.concat(incoming);
        setExisting(merge.reverse());
    };

    const validateProp = (prop) => {
        if (prop !== null && typeof prop === 'object') {
            const keys = Object.keys(prop);
            for (let index = 0; index < keys.length; index += 1) {
                const field = keys[index];
                if (field !== '__typename') {
                    const value = prop[field];

                    if (value !== null && value !== '' && value.length !== 0) {
                        return prop;
                    }
                }
            }
        }

        return null;
    };

    const getChangesValue = (obj, key) => {
        let title = '';
        let text = '';

        if (key === 'total') {
            const newPrice = formatPrice(obj.new_price.value, obj.new_price.currency);
            const oldPrice = formatPrice(obj?.old_price?.value || 0, obj?.old_price?.currency ?? undefined);

            title = 'Quote Subtotal';
            text = (
                <div className={classNames(styles.changesContainer)}>
                    <span className={classNames(styles.oldValue)}>{oldPrice || ''}</span>
                    {newPrice || ''}
                </div>
            );
        }

        if (key === 'statuses') {
            title = 'Status';
            text = obj.changes.map((item, index) => (
                <div className={classNames(styles.changesContainer)} key={`history_${index}`}>
                    {item.old_status && <span className={classNames(styles.oldValue)}>{t(`customer:quote:status:${item.old_status}`)}</span>}
                    {t(`customer:quote:status:${item.new_status}`) || ''}
                </div>
            ));
        }

        if (key === 'expiration') {
            const isNever = obj.new_expiration && obj.new_expiration === 'Never';

            title = t('customer:quote:history:expirationDate');
            text = (
                <div className={classNames(styles.changesContainer)}>
                    {obj.old_expiration && <span className={classNames(styles.oldValue)}>{formatDate(obj.old_expiration, dateTimeFormat)}</span>}
                    {isNever && obj.new_expiration}
                    {!isNever && formatDate(obj.new_expiration, dateTimeFormat)}
                </div>
            );
        }

        if (key === 'custom_changes') {
            title = obj.title;
            text = (
                <div className={classNames(styles.changesContainer)}>
                    <span className={classNames(styles.oldValue)}>{obj.old_value || ''}</span>
                    {obj.new_value || ''}
                </div>
            );
        }

        if (key === 'comment_added') {
            title = t('customer:quote:history:comment');
            text = <div className={classNames(styles.changesContainer)}>{`"${obj.comment}"`}</div>;
        }

        const result = {
            title,
            text,
        };

        return result;
    };

    useEffect(() => {
        if (data?.getNegotiableQuoteHistory?.items) {
            mergeData(data.getNegotiableQuoteHistory.items);
        }
    }, [data]);

    if (loading && page < 2) {
        return (
            <div>
                <div className={classNames(styles.commentContainer)}>
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                </div>
                <div className={classNames(styles.commentContainer)}>
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                </div>
            </div>
        );
    }

    return (
        <div>
            {!loading && page < data?.getNegotiableQuoteHistory?.page_info?.total_pages && (
                <div className={classNames(styles.loaderContainer)}>
                    <ButtonUnstyled onClick={loadPrevious} loading size="small" className={classNames(styles.loadPrevious)}>
                        {t('customer:quote:history:seePreviousHistory')}
                    </ButtonUnstyled>
                </div>
            )}
            {loading && page > 1 && (
                <div className={classNames(styles.loaderContainer)}>
                    <CircularProgress color="inherit" size={18} />
                </div>
            )}
            {existing.map((item) => {
                const name = `${item.author.firstname} ${item.author.lastname}`.replace(/\s+$/, '');
                const objChanges = item.changes;

                return (
                    <div className={classNames(styles.commentContainer)}>
                        <div className={classNames(styles.title)}>
                            {`${formatDate(item.created_at, dateTimeFormat)} (${name}) `}
                            <span className={classNames(styles.typeContainer)}>{`${item.change_type} quote`}</span>
                        </div>
                        <div>
                            {Object.keys(objChanges).map((prop) => {
                                const changesData = objChanges[prop];
                                const result = validateProp(changesData);
                                if (result !== null) {
                                    const value = getChangesValue(result, prop);
                                    return (
                                        <div className={classNames(styles.historyContainer)}>
                                            <div className={classNames(styles.title)}>{value.title}</div>
                                            {value.text}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default History;
