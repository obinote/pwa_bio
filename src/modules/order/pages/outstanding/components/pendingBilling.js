/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
import { Container } from '@root/node_modules/@material-ui/core/index';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@common_pagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/outstanding/components/style';

const PendingBillingTable = (props) => {
    const {
        t, page, dataPending, handlePendingBilling = () => { },
        pageSize, handleChangePageAvailableBilling, loadMore, storeConfig,
    } = props;
    const styles = useStyles();
    const paginationCount = (dataPending?.total_count) ? Math.ceil(dataPending.total_count / pageSize) : 1;

    return (
        <Container className={styles.container}>
            {/* Table Pending Billing */}
            <div>
                <TableContainer component={Paper} className={styles.tableContainerPendingBilling}>
                    <Typography variant="subtitle2" type="bold" className={styles.createBillingTableTitle}>{t('order:outstanding:createBillingTableTitle')}</Typography>
                    <Table className={styles.tablePending} aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHeadPendingBilling}>
                                <TableCell className={styles.tableCellResponsivePendingBilling}>
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:outstanding:billingId')}
                                    </Typography>
                                </TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}>
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:outstanding:billingNumber')}
                                    </Typography>
                                </TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}><Typography variant="subtitle2" type="bold">{t('order:outstanding:invoiceList')}</Typography></TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}><Typography variant="subtitle2" type="bold">{t('order:outstanding:expiredAt')}</Typography></TableCell>
                                <TableCell className={styles.tableCellResponsive}>
                                    {
                                        storeConfig.fine_management_status == 1
                                            ? <Typography className={styles.typographyTableHead}>{t('order:outstanding:totalFine')}</Typography>
                                            : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                    }
                                </TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}><Typography variant="subtitle2" type="bold">{t('order:outstanding:orderTotal')}</Typography></TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}><Typography variant="subtitle2" type="bold">{t('order:outstanding:bankName')}</Typography></TableCell>
                                <TableCell className={styles.tableCellResponsivePendingBilling}>
                                    <Typography variant="subtitle2" type="bold">{t(' ')}</Typography>
                                    {' '}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loadMore ? (
                                    <TableRow>
                                        <TableCell colSpan={6} rowSpan={10}>
                                            <SkeletonContent />
                                        </TableCell>
                                    </TableRow>
                                )
                                    : dataPending && dataPending.billing_detail.length > 0
                                        ? (
                                            <>
                                                {
                                                    dataPending.billing_detail.map((val, index) => (
                                                        <TableRow className={styles.tableRowResponsivePendingBilling} key={index}>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:outstanding:billingId')}`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:outstanding:billingId')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.valuePending}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.id}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:outstanding:billingNumber')}`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:outstanding:billingNumber')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.billing_number}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:outstanding:invoiceList')}`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:outstanding:invoiceList')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" className={classNames('invoice-list')} letter="capitalize">
                                                                            {val.invoice_ids[0].number}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {t('order:outstanding:expiredAt')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:outstanding:expiredAt')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.expired_at === null ? '-' : formatDate(val.expired_at, 'DD/MM/YY hh:mm:ss')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:outstanding:totalFine')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                {
                                                                    storeConfig.fine_management_status == 1
                                                                        ? (
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {t('order:outstanding:totalFine')}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {val.total_fine === 0 ? 'Rp. 0' : formatPrice(val.total_fine || 'IDR')}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                        : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:outstanding:orderTotal')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {t('order:outstanding:orderTotal')}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {formatPrice(val.grand_total || 'IDR')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:outstanding:bankName')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {t('order:outstanding:bankName')}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.expired_at === null ? '-' : val.bank_name}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsivePendingBilling}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:outstanding:action')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={classNames(styles.valueButtonPending, styles.action)}>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handlePendingBilling(val)}
                                                                            disabled={val.status === 'paid'}
                                                                            className={styles.buttonPaymentPendingBilling}
                                                                        >
                                                                            <a>
                                                                                <Typography variant="overline" type="regular">
                                                                                    {val.status === 'pending' ? t('order:outstanding:view') : t('order:outstanding:paid')}
                                                                                </Typography>
                                                                            </a>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </>
                                        )
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                                </TableCell>
                                            </TableRow>
                                        )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classNames(styles.tabelPendingPagination, 'tabel-pagination')}>
                    {paginationCount > 1 && (
                        <Pagination
                            count={paginationCount}
                            page={page}
                            onChange={handleChangePageAvailableBilling}
                        />
                    )}
                </div>
            </div>
        </Container>
    );
};

export default PendingBillingTable;
