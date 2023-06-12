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
// import TablePagination from '@material-ui/core/TablePagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/history/style';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@common_textfield';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@common_pagination';

const DefaultView = (props) => {
    const {
        data,
        t,
        page,
        reOrder,
        pageSize,
        handleChangePage,
        // handleChangePageSize,
        loadMore,
        handleOpenModalFilter,
        handleCloseModalFilter,
        openModalFilter,
        formikFilter,
        formikSearch,
    } = props;
    const styles = useStyles();
    const paginationCount = data?.total_count ? Math.ceil(data.total_count / pageSize) : 1;

    return (
        <>
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
                                    variant="outlined"
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
                                        <CloseIcon />
                                    </Button>
                                </div>
                                <form onSubmit={formikFilter.handleSubmit}>
                                    <div className="modal-body" id="simple-modal-description">
                                        <div className="item">
                                            <div className="label">{t('order:orderDate')}</div>
                                            <TextField
                                                name="dateFrom"
                                                type="date"
                                                variant="outlined"
                                                onChange={formikFilter.handleChange}
                                                value={formikFilter.values.dateFrom}
                                            />
                                            <span>-</span>
                                            <TextField
                                                name="dateTo"
                                                type="date"
                                                variant="outlined"
                                                onChange={formikFilter.handleChange}
                                                value={formikFilter.values.dateTo}
                                            />
                                        </div>
                                        <div className="item">
                                            <div className="label">{t('order:orderStatusModal')}</div>
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('pending')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="pending"
                                                    />
                                                )}
                                                label={t('order:labelStatus:pending')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('pending_payment')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="pending_payment"
                                                    />
                                                )}
                                                label={t('order:labelStatus:pending_payment')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('processing')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="processing"
                                                    />
                                                )}
                                                label={t('order:labelStatus:processing')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('order_shipped')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="order_shipped"
                                                    />
                                                )}
                                                label={t('order:labelStatus:order_shipped')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('order_delivered')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="order_delivered"
                                                    />
                                                )}
                                                label={t('order:labelStatus:order_delivered')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('complete')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="complete"
                                                    />
                                                )}
                                                label={t('order:labelStatus:complete')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('refunded')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="refunded"
                                                    />
                                                )}
                                                label={t('order:labelStatus:refunded')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('partially_refunded')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="partially_refunded"
                                                    />
                                                )}
                                                label={t('order:labelStatus:partially_refunded')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('canceled')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="canceled"
                                                    />
                                                )}
                                                label={t('order:labelStatus:canceled')}
                                            />
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={!!formikFilter.values.status.includes('rejected')}
                                                        name="status"
                                                        color="primary"
                                                        onChange={formikFilter.handleChange}
                                                        value="rejected"
                                                    />
                                                )}
                                                label={t('order:labelStatus:rejected')}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <Button variant="contained" color="primary" disableElevation type="submit">
                                            {t('order:apply')}
                                        </Button>
                                        <Button color="primary" onClick={handleCloseModalFilter}>
                                            {t('order:modalRating:btnCancel')}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className={styles.totalOrder}>{`${t('order:totalOrder')} (${data?.total_count ?? 0})`}</div>

            <div className={styles.orderList}>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="right">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:no')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {`${t('order:no')} ${t('order:order')}`}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:date')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:createdBy')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:orderTotal')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:status')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('order:action')}
                                    </Typography>
                                    {' '}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadMore ? (
                                <TableRow>
                                    <TableCell colSpan={6} rowSpan={10}>
                                        <SkeletonContent />
                                    </TableCell>
                                </TableRow>
                            ) : data && data.items.length > 0 ? (
                                <>
                                    {data.items.map((val, index) => (
                                        <TableRow className={styles.tableRowResponsive} key={val.id}>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                        {t('order:no')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('order:no')} `}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {(page - 1) * pageSize + index + 1}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {`${t('order:order')} #`}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('order:no')} ${t('order:order')}`}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {val.order_number}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                        {t('order:date')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('order:date')}`}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {formatDate(val.order_date, 'D/M/YYYY')}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                        {t('order:createdBy')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('order:createdBy')}`}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {val.customer_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('order:orderTotal')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {t('order:orderTotal')}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
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
                                                        <Typography variant="overline" letter="capitalize">
                                                            {t(`order:labelStatus:${val.status}`)}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('order:action')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={classNames(styles.value, styles.action)}>
                                                        <Link
                                                            href="/sales/order/view/order_id/[id]"
                                                            as={`/sales/order/view/order_id/${val.order_number}`}
                                                        >
                                                            <a>
                                                                <Typography variant="overline" type="regular" style={{ color: '#f58732' }}>
                                                                    {t('order:view')}
                                                                </Typography>
                                                            </a>
                                                        </Link>
                                                        <a onClick={() => reOrder(val.items)}>
                                                            <Typography variant="overline" type="regular" style={{ color: '#f58732' }}>
                                                                {t('order:reorder')}
                                                            </Typography>
                                                        </a>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Alert severity="warning">{t('order:notFound')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                    {paginationCount > 1 && <Pagination count={paginationCount} page={page} onChange={handleChangePage} />}
                </div>
            </div>
        </>
    );
};

export default DefaultView;
