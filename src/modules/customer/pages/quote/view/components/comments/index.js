import { useEffect, useState } from 'react';
import { getNegotiableQuoteComments } from '@core_modules/customer/services/graphql';
import useStyles from '@core_modules/customer/pages/quote/view/components/comments/style';
import ButtonUnstyled from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import formatDate from '@helper_date';
import classNames from 'classnames';
import userAgent from '@helper_useragent';

// import { downloadfile } from '@helper_downloadfile';
// const downloadHandler = async (link) => {
//     const res = await downloadfile(link);

//     if (!res.status) {
//         window.toastMessage({
//             open: true,
//             variant: 'error',
//             text: res.message,
//         });
//         return;
//     }
//     const el = document.createElement('a');
//     el.href = res.data.blobUrl;
//     el.download = res.data.fullFileName;
//     el.click();
// };

const Comments = ({ quote, t }) => {
    const [existing, setExisting] = useState([]);
    const [page, setPage] = useState(1);
    const styles = useStyles();
    const { loading, data, fetchMore } = getNegotiableQuoteComments({
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

    const postMessageDownloadAttachment = (attachment) => {
        if (window !== undefined && window.ReactNativeWebView !== undefined) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ url: attachment, type: 'DOWNLOAD_ATTACHMENT' }));
        }
    };

    useEffect(() => {
        if (data) {
            mergeData(data.getNegotiableQuoteComments.items);
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
            {!loading && page < data.getNegotiableQuoteComments.page_info.total_pages && (
                <div className={classNames(styles.loaderContainer)}>
                    <ButtonUnstyled onClick={loadPrevious} loading size="small" className={classNames(styles.loadPrevious)}>
                        {t('customer:quote:comments:seePreviousReplies')}
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

                return (
                    <div className={classNames(styles.commentContainer)}>
                        <div className={classNames(styles.title)}>{`${formatDate(item.created_at, 'DD MMMM YYYY, H:mm:ss')} (${name})`}</div>
                        <div className={classNames(styles.text)}>{item.text}</div>
                        {item.attachment ? (
                            userAgent.isMobileApps() ? (
                                <div className={classNames(styles.attachment)}>
                                    <a onClick={() => postMessageDownloadAttachment(item.attachment)} rel="noreferrer">
                                        {t('customer:quote:comments:downloadAttachtment')}
                                    </a>
                                </div>
                            ) : (
                                <div className={classNames(styles.attachment)}>
                                    <a href={item.attachment} target="_blank" download rel="noreferrer">
                                        {t('customer:quote:comments:downloadAttachtment')}
                                    </a>
                                </div>
                            )
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default Comments;
