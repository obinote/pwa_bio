/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// import Layout from '@layout_customer';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@common_pagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/quote/components/style';
import Link from 'next/link';
import classNames from 'classnames';

const MyQuotePage = (props) => {
    const {
        t, data, handleChangePage, handleChangeRowsPerPage, handleChangePageSize, pageSize, page,
    } = props;
    const styles = useStyles();
    const paginationCount = Math.ceil(data.negotiableQuotes.total_count / pageSize);

    return (
        <>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableName')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableCreated')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableShipTo')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableStatus')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableLastUpdated')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableQuoteTotal')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:quote:tableAction')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.negotiableQuotes.items.length > 0 ? (
                            <>
                                {data.negotiableQuotes.items.map((val, index) => (
                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableName')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{val.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableCreated')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{formatDate(val.created_at, 'M/DD/YYYY')}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableShipTo')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>
                                                    {val.buyer.firstname}
                                                    {' '}
                                                    {val.buyer.lastname}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableStatus')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{t(`customer:quote:status:${val.status}`)}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableLastUpdated')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{formatDate(val.updated_at, 'M/DD/YYYY')}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:quote:tableQuoteTotal')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>
                                                    {formatPrice(Math.round(val.prices?.grand_total.value ?? 0))}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <Link href={{
                                                    pathname: '/customer/account/quote/view/[uid]',
                                                    query: { uid: val.uid },
                                                }}
                                                >
                                                    <a>
                                                        <Typography
                                                            variant="span"
                                                            type="normal"
                                                            size="14"
                                                            className={styles.linkRequistion}
                                                        >
                                                            {t('customer:quote:tableView')}
                                                        </Typography>
                                                    </a>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Alert severity="warning">{t('customer:quote:tableNotFound')}</Alert>
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

export default MyQuotePage;
