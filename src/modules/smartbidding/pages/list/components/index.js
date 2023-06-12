/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
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
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import formatDate from '@helper_date';
import Link from 'next/link';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/smartbidding/pages/list/components/style';

const Content = (props) => {
    const {
        data, t, handleChangePage, loadMore,
        page, pageSize,
    } = props;
    const styles = useStyles();
    const paginationCount = data?.total_count ? Math.ceil(data.total_count / pageSize) : 1;

    return (
        <Layout t={t}>
            <div>
                <div className={styles.addButton}>
                    <Button
                        className="button"
                        href="/customer/account/bidding/create"
                    >
                        <AddIcon style={{ color: '#F58732' }} />
                        <span>{t('smartbidding:list:newList')}</span>
                    </Button>
                </div>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left"><Typography variant="subtitle2" type="bold">{t('smartbidding:list:headerName')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="subtitle2" type="bold">{t('smartbidding:list:headerItem')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="subtitle2" type="bold">{t('smartbidding:list:headerStatus')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="subtitle2" type="bold">{t('smartbidding:list:headerCreate')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="subtitle2" type="bold">{t('smartbidding:list:headerEnd')}</Typography></TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">{t('smartbidding:action')}</Typography>
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
                                    : data && data.data.length > 0
                                        ? (
                                            <>
                                                {
                                                    data.data.map((val, index) => (
                                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('smartbidding:list:headerName')}`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={classNames(styles.mobLabel, 'hidden')}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('smartbidding:list:headerName')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.nameDesc} style={{ flexDirection: 'column' }}>
                                                                        <div className={classNames(styles.value, 'name')}>
                                                                            <Typography variant="overline" letter="capitalize" className="lelangName">
                                                                                {val.name}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className={classNames(styles.value, 'desc')}>
                                                                            <Typography variant="overline" letter="capitalize">
                                                                                {val.deskripsi}
                                                                            </Typography>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {t('smartbidding:list:headerItem')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('smartbidding:list:headerItem')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.items.length}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('smartbidding:list:headerStatus')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {t('smartbidding:list:headerStatus')}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {val.status}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('smartbidding:list:headerCreate')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {t('smartbidding:list:headerCreate')}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {(formatDate(val.created_at, 'DD-MM-YYYY'))}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                        {t('smartbidding:list:headerEnd')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                            {`${t('smartbidding:list:headerEnd')}`}
                                                                            :
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="overline" letter="capitalize">
                                                                            {formatDate(val.due_date, 'DD-MM-YYYY')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('smartbidding:action')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={classNames(styles.value, styles.action)}>
                                                                        {val.status === 'draft'
                                                                            && (
                                                                                <Link
                                                                                    href={`/customer/account/bidding/editdraft/${val.id}`}
                                                                                >
                                                                                    <a>
                                                                                        <Typography variant="overline" type="regular" style={{ color: '#f58732' }}>
                                                                                            {t('smartbidding:edit')}
                                                                                        </Typography>
                                                                                    </a>
                                                                                </Link>
                                                                            )}
                                                                        {val.status !== 'draft'
                                                                            && (
                                                                                <Link
                                                                                    href={`/customer/account/bidding/view/${val.id}`}
                                                                                >
                                                                                    <a>
                                                                                        <Typography variant="overline" type="regular" style={{ color: '#f58732' }}>
                                                                                            {t('smartbidding:detail')}
                                                                                        </Typography>
                                                                                    </a>
                                                                                </Link>
                                                                            )}
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
                                                <TableCell colSpan={6}>
                                                    <Alert severity="warning">{t('smartbidding:notFound')}</Alert>
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
        </Layout>
    );
};

export default Content;
