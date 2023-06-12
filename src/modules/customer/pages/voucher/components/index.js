/* eslint-disable linebreak-style */
// import Layout from '@layout_customer';
import useStyles from '@src_modules/customer/pages/voucher/components/style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';
import Button from '@material-ui/core/Button';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Pagination from '@common_pagination';

const VoucherDetailPage = (props) => {
    const {
        t, data, localDateString, handleChangePage, page, pageSize,
    } = props;
    const styles = useStyles();
    const paginationCount = Math.ceil(data?.customer?.coupons?.total_count / pageSize);
    return (
        <>
            <div className={classNames(styles.wrapperPromotion, 'container')}>
                {data?.customer?.coupons?.sales_rules?.length > 0 ? (
                    <div className="coupon-section">
                        <List className="coupon-items">
                            {data?.customer?.coupons?.sales_rules?.map((item, i) => (
                                <ListItem key={i}>
                                    <div className="inner">
                                        <div className={`inner-header ${item.seller_name}`}>
                                            <div className="item coupon-name">
                                                <Typography>{item.name}</Typography>
                                            </div>
                                            <div className="inner-icon" />
                                        </div>
                                        <div className="inner-content">
                                            <div
                                                className={classNames(
                                                    !item.description && !item.seller_name ? styles.displayNone : null, 'item desc',
                                                )}
                                            >
                                                <Typography>
                                                    {item.description}
                                                    {' '}
                                                    {item.seller_name ? `${t('customer:voucher:in')} ${item.seller_name}` : null}
                                                </Typography>
                                            </div>
                                            <div className="item coupon-period">
                                                <div className="label">
                                                    {t('customer:voucher:promoPeriod')}
                                                    :
                                                </div>
                                                <Typography>
                                                    {localDateString(item.start_date)}
                                                    {' '}
                                                    {item.end_date ? `- ${localDateString(item.end_date)}` : null}
                                                </Typography>
                                            </div>
                                            {item.coupon_code && (
                                                <div className="item coupon-code">
                                                    {/* <div className="label">{t('customer:voucher:promoCode')}</div> */}
                                                    <div className="value">
                                                        <div className="box"><Typography>{item.coupon_code}</Typography></div>
                                                        <div className="action">
                                                            <FileCopyOutlinedIcon />
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => navigator.clipboard.writeText(item.coupon_code)}
                                                            >
                                                                {t('customer:voucher:copy')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                        <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                            {paginationCount > 1 && (
                                <Pagination count={paginationCount} page={page} onChange={handleChangePage} />
                            )}
                        </div>
                    </div>
                ) : (
                    <Alert style={{ marginTop: '20px' }} severity="warning">{t('customer:voucher:tableNotFound')}</Alert>
                )}
            </div>
        </>
    );
};

export default VoucherDetailPage;
