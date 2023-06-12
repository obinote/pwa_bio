/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
import Link from 'next/link';
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
import useStyles from '@src_modules/customer/pages/tickets/components/style';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import formatDate from '@helper_date';

const TicketsListPage = (props) => {
    const {
        t,
        data,
        page,
        pageSize,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSort,
        sort,
        handleCreateTicket,
    } = props;
    const styles = useStyles();
    const paginationCount = Math.ceil(data?.awHelpdesk2TicketList?.total_count / pageSize);
    const translateStatusLabel = (label) => {
        const statusLabelMapping = {
            new: t('customer:tickets:statusLabel:new'),
            open: t('customer:tickets:statusLabel:open'),
            closed: t('customer:tickets:statusLabel:closed'),
            'waiting for a customer': t('customer:tickets:statusLabel:waitingForCustomer'),
        };
        return statusLabelMapping[label.toLowerCase()];
    };
    // const handlePage = (event) => {
    //     handleChangePage(parseInt(event.target.value));
    // };

    // const handleRowsPerPage = (event) => {
    //     handleChangeRowsPerPage(parseInt(event.target.value, 10));
    // };
    const ListTicket = ({ value, index }) => (
        <TableRow className={styles.tableRowResponsive} key={index}>
            <TableCell align="left" className={styles.tableCellResponsive} style={{ paddingLeft: 0 }}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:id')}
                        </Typography>
                    </div>
                    <div className={styles.value} style={{ fontSize: 14 }}>{value.uid}</div>
                </div>
            </TableCell>
            <TableCell align="left" className={styles.tableCellResponsive}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:subject')}
                        </Typography>
                    </div>
                    <div className={styles.valueAnchor} style={{ fontSize: 14 }}>
                        <Link href={`/customer/account/tickets/view/${value.entity_id}`}>
                            {value.subject}
                        </Link>
                    </div>
                </div>
            </TableCell>
            <TableCell align="left" className={styles.tableCellResponsive}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:orderNo')}
                        </Typography>
                    </div>
                    <div className={styles.valueAnchor} style={{ fontSize: 14 }}>
                        <Link href={`/sales/order/view/order_id/${value.order.increment_id}`}>
                            {value.order.increment_id}
                        </Link>
                    </div>
                </div>
            </TableCell>
            <TableCell align="left" className={styles.tableCellResponsive}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:requestType')}
                        </Typography>
                    </div>
                    <div className={styles.value} style={{ fontSize: 14 }}>{value.department.name}</div>
                </div>
            </TableCell>
            <TableCell align="left" className={styles.tableCellResponsive}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:latestUpdate')}
                        </Typography>
                    </div>
                    <div className={styles.value}>{formatDate(value.updated_at, 'DD/MM/YY HH.mm')}</div>
                </div>
            </TableCell>
            <TableCell align="left" className={styles.tableCellResponsive}>
                <div className={styles.displayFlexRow}>
                    <div className={styles.mobLabel}>
                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                            {t('customer:tickets:status')}
                        </Typography>
                    </div>
                    <div className={styles.value}>{translateStatusLabel(value.status.label)}</div>
                </div>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <div className={styles.createTicket}>
                <Button variant="text" className={classNames(styles.buttonCreateTicket, 'custom-button')} onClick={handleCreateTicket}>
                    <Typography variant="p" type="normal" color="white">
                        {t('customer:tickets:createTicket')}
                    </Typography>
                </Button>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" className={styles.tableHeadTitle} style={{ paddingLeft: 0 }}>
                                {t('customer:tickets:id')}
                            </TableCell>
                            <TableCell align="left" className={styles.tableHeadTitle}>{t('customer:tickets:subject')}</TableCell>
                            <TableCell align="left" className={styles.tableHeadTitle}>{t('customer:tickets:orderNo')}</TableCell>
                            <TableCell align="left" className={styles.tableHeadTitle}>{t('customer:tickets:requestType')}</TableCell>
                            <TableCell align="left" className={styles.tableHeadTitle} style={{ flexDirection: 'row' }}>
                                <div
                                    onClick={handleSort}
                                    style={{
                                        display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content',
                                    }}
                                >
                                    {t('customer:tickets:latestUpdate')}
                                    {sort === 'ASC' ? (
                                        <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                        <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell align="left" style={{ fontSize: 14, fontWeight: 600 }}>{t('customer:tickets:status')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data?.awHelpdesk2TicketList?.items.length > 0 ? (
                            <>
                                {data?.awHelpdesk2TicketList?.items.map((val, index) => (
                                    <ListTicket value={val} index={index} />
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Alert severity="warning">{t('customer:tickets:noData')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
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
        </>
    );
};

export default TicketsListPage;
