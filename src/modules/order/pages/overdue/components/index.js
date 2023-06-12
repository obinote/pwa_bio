/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
// import Layout from '@layout_customer';
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
import Link from 'next/link';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/overdue/components/style';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import RemoveIcon from '@material-ui/icons/Remove';
import TotalPiutang from './totalPiutang';

const RenderContent = (props) => {
    const styles = useStyles();

    const {
        data, t, page, paginationCount,
        handleChangePage, loadMore,
        handleOpenModalFilter, handleCloseModalFilter, openModalFilter,
        formikFilter, formikSearch, storeConfig, handleChangeFilter, handleSubmitFilter,
    } = props;

    return (
        <div>
            <div>
                <TotalPiutang {...props} />
            </div>
            <div>
                <div className={classNames('row', styles.rowFilter)}>
                    <div className="col-md-8 col-xs-8">
                        <div className={styles.filterSearch}>
                            <form onSubmit={formikSearch.handleSubmit}>
                                <div className="search-box">
                                    <SearchIcon style={{ fill: '#7B9AAF' }} />
                                    <TextField
                                        className="search-input"
                                        name="search"
                                        type="text"
                                        placeholder={t('order:placeholderSearch')}
                                        onChange={formikSearch.handleChange}
                                        value={formikSearch.values.search}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <div className={styles.filter}>
                            <Button onClick={handleOpenModalFilter} variant="outlined">
                                <img src="/assets/img/icon-filter.svg" alt="Icon Filter" />
                                {' '}
                                {t('order:filter')}
                            </Button>
                            <Modal
                                open={openModalFilter}
                                onClose={handleCloseModalFilter}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <div className={styles.paperModalBody}>
                                    <div className="modal-top">
                                        <h2 id="simple-modal-title">{t('order:filter')}</h2>
                                        <Button onClick={handleCloseModalFilter}>
                                            <CloseIcon style={{ color: '#2E2E2E' }} />
                                        </Button>
                                    </div>
                                    <form onSubmit={formikFilter.handleSubmit} onChange={handleChangeFilter}>
                                        <div className="modal-body" id="simple-modal-description">
                                            <div className="item">
                                                <div className="label">{t('order:orderDate')}</div>
                                                <div className={styles.datePickerField}>
                                                    <TextField
                                                        name="dateFrom"
                                                        type="date"
                                                        value={formikFilter.values.dateFrom}
                                                        error={!!(formikFilter.errors.dateFrom || formikFilter.touched.dateFrom)}
                                                        helperText={(formikFilter?.errors?.dateFrom) || ''}
                                                    />
                                                    <RemoveIcon style={{ color: '#707070' }} fontSize="small" />
                                                    <TextField
                                                        name="dateTo"
                                                        type="date"
                                                        value={formikFilter.values.dateTo}
                                                        error={!!(formikFilter.touched.dateTo || formikFilter.errors.dateTo)}
                                                        helperText={formikFilter?.errors?.dateTo ?? ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={!(formikFilter?.values?.dateFrom !== '' && formikFilter?.values?.dateTo !== '')}
                                                disableElevation
                                                onClick={handleSubmitFilter}
                                                className={styles.btnSubmit}
                                            >
                                                {t('order:apply')}
                                            </Button>
                                            <Button color="primary" onClick={handleCloseModalFilter}>{t('order:modalComplete:btnCancel')}</Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell className={styles.tableCellResponsive}>
                                <Typography className={styles.typographyTableHead}>
                                    {t('order:overdue:orderNumber')}
                                </Typography>
                            </TableCell>
                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:overdue:orderDate')}</Typography></TableCell>
                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:overdue:dueDate')}</Typography></TableCell>
                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:overdue:orderTotal')}</Typography></TableCell>
                            <TableCell className={styles.tableCellResponsive}>
                                {
                                    storeConfig.fine_management_status == 1
                                        ? <Typography className={styles.typographyTableHead}>{t('order:overdue:totalFine')}</Typography>
                                        : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                }
                            </TableCell>
                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:status')}</Typography></TableCell>
                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:overdue:sellerConfirmation')}</Typography></TableCell>
                            <TableCell className={styles.tableCellResponsive}>
                                <Typography className={styles.typographyTableHead}>{t('order:overdue:action')}</Typography>
                                {' '}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loadMore ? (
                                <TableRow>
                                    <TableCell colSpan={8} rowSpan={10}>
                                        <SkeletonContent />
                                    </TableCell>
                                </TableRow>
                            )
                                : data && data.items.length > 0
                                    ? (
                                        <>
                                            {
                                                data.items.map((val, index) => (
                                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                    {`${t('order:overdue:orderNumber')}`}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:overdue:orderNumber')}`}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography className={styles.valueOverdue}>
                                                                        {val.number}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:orderDate')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:overdue:orderDate')}`}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography className={styles.valueOverdue}>
                                                                        {formatDate(val.order_date, 'DD/MM/YY')}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:dueDate')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:overdue:dueDate')}`}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography className={styles.valueOverdue}>
                                                                        {formatDate(val.due_date, 'DD/MM/YY')}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:orderTotal')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {t('order:overdue:orderTotal')}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography className={styles.valueOverdue}>
                                                                        {formatPrice(val.total.grand_total.value, val.total.grand_total.currency || 'IDR')}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:totalFine')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            {
                                                                storeConfig.fine_management_status == 1
                                                                    ? (
                                                                        <div className={styles.displayFlexRow}>
                                                                            <div className={styles.mobLabel}>
                                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                    {t('order:overdue:totalFine')}
                                                                                    :
                                                                                </Typography>
                                                                            </div>
                                                                            <div className={styles.value}>
                                                                                <Typography variant="overline" letter="capitalize">
                                                                                    {val.fine === null ? 'Rp. 0' : formatPrice(val.fine)}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                    {t('order:status')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {t('order:status')}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography letter="capitalize" className={styles.valueOverdue}>
                                                                        {val.status}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:sellerConfirmation')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={styles.mobLabel}>
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:overdue:sellerConfirmation')}`}
                                                                        :
                                                                    </Typography>
                                                                </div>
                                                                <div className={styles.value}>
                                                                    <Typography className={styles.valueOverdue}>
                                                                        {val.is_confirm}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className={styles.tableCellResponsive}
                                                            align="left"
                                                            data-th={(
                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                    {t('order:overdue:action')}
                                                                </Typography>
                                                            )}
                                                        >
                                                            <div className={styles.displayFlexRow}>
                                                                <div className={classNames(styles.value, styles.action)}>
                                                                    <Link
                                                                        href="/sales/order/view/order_id/[id]"
                                                                        as={`/sales/order/view/order_id/${val.number}`}
                                                                    >
                                                                        <a>
                                                                            <Typography className={styles.valueOverdueAction}>
                                                                                {t('order:overdue:view')}
                                                                            </Typography>
                                                                        </a>
                                                                    </Link>
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
            <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                {paginationCount > 1 && (
                    <Pagination
                        count={paginationCount}
                        page={page}
                        onChange={handleChangePage}
                    />
                )}
            </div>
        </div>
    );
};

const Content = (props) => {
    const {
        data, loading, pageSize, Skeleton,
    } = props;
    const paginationCount = (data?.total_count) ? Math.ceil(data.total_count / pageSize) : 1;

    return (
        <>
            {
                (loading || !data)
                    ? <Skeleton />
                    : <RenderContent {...props} paginationCount={paginationCount} />
            }
        </>
    );
};

export default Content;
