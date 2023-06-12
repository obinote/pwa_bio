/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// import Layout from '@layout_customer';
import useStyles from '@src_modules/customer/pages/point/components/style';
import classNames from 'classnames';
import Typography from '@common_typography';
import Pagination from '@common_pagination';
import formatDate from '@helper_date';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

const PointDetailPage = (props) => {
    const {
        t, data, page, pageSize, handleChangePage, dataCmsBlock,
    } = props;
    const styles = useStyles();
    const paginationCount = Math.ceil(data?.getCustomRewardPointsTransaction?.total_count / pageSize);

    const handleColors = (adjusment_point) => {
        if (adjusment_point > 0) return 'amount-green';
        if (adjusment_point < 0) return 'amount-red';
        return 'amount-orange';
    };

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className={classNames(styles.wrapperPoint, 'container')}>
                <div>
                    <div className="wrapper-header-point">
                        <div className="header-point">
                            <div className="header-token" />
                            <div className="header-content">
                                <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF' }}>
                                    {t('customer:point:youHave')}
                                </Typography>
                                <Typography variant="span" type="bold" style={{ color: '#414048' }} className="span-point">
                                    {data?.getCustomRewardPointsTransaction?.balance}
                                    {' '}
                                    {t('customer:point:youHavePoint')}
                                    <IconButton className={styles.infoButton} onClick={() => setOpen(true)}>
                                        <InfoOutlined style={{ fontSize: 20, color: '#AACBE6' }} />
                                    </IconButton>
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-content">
                        <div className="content-point">
                            <Typography variant="h2" type="bold" className="span-point-title">
                                {t('customer:point:historyTransaction')}
                            </Typography>
                            {data?.getCustomRewardPointsTransaction?.transaction.length > 0 ? (
                                <div>
                                    <>
                                        {data?.getCustomRewardPointsTransaction?.transaction.map((dt) => (
                                            <div className="history-points">
                                                <div className="history-point">
                                                    <div className="history">
                                                        <Typography variant="span" className="span-history">
                                                            {dt.comment}
                                                        </Typography>
                                                        <div className="history-status">
                                                            <div className={handleColors(dt.adjusment_point)}>
                                                                <Typography variant="span" className="span-status">
                                                                    {dt.adjustment_type === 'plus' ? t('customer:point:getPoint') : t('customer:point:changePoint')}
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="span" className="span-date">
                                                                {`|   ${formatDate(dt.transaction_date, 'DD MMMM YYYY')}`}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="point">
                                                        <div className={handleColors(dt.adjusment_point)}>
                                                            <Typography variant="span" type="bold" className="span-value">
                                                                {dt.adjustment_type === 'plus' ? '+' : null}
                                                                {dt.adjusment_point}
                                                            </Typography>
                                                            <div className="history-token" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    <div className={classNames(styles.pointPagination, 'point-pagination')}>
                                        {paginationCount > 1 && (
                                            <Pagination
                                                count={paginationCount}
                                                page={page}
                                                onChange={handleChangePage}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Alert style={{ marginTop: '20px' }} severity="warning">{t('customer:point:tableNotFound')}</Alert>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)} className={styles.wrapperDialog}>
                <DialogTitle>
                    {t('customer:dashboard:point')}
                    <IconButton className={classNames(styles.closeButton, 'close-button')} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div dangerouslySetInnerHTML={{ __html: dataCmsBlock }} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PointDetailPage;
