/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import useStyles from '@src_modules/customer/pages/creditlimit/components/style';
import Typography from '@common_typography';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import Pagination from '@common_pagination';
import Alert from '@material-ui/lab/Alert';
import { formatPriceCreditLimit } from '@helper_currency';
import formatDate from '@helper_date';

const CreditRegulerHistory = (props) => {
    const {
        t, dataHistory,
    } = props;
    const styles = useStyles();

    // custom pagination handle ======
    const pageSize = 10;
    const [page, setPage] = React.useState(1);
    const [dataPerPage, setDataPerPage] = React.useState([]);
    const paginationCount = Math.ceil(dataHistory?.getCustomerRegularCreditHistory?.data?.length / pageSize);
    const handleChange = (event, value) => {
        const sliceData = dataHistory?.getCustomerRegularCreditHistory?.data?.slice(pageSize * (value - 1), pageSize * value);
        setPage(value);
        setDataPerPage(sliceData);
    };
    React.useEffect(() => {
        if (dataHistory) {
            const sliceData = dataHistory?.getCustomerRegularCreditHistory?.data?.slice(pageSize * (page - 1), pageSize * page);
            setDataPerPage(sliceData);
        }
    }, [dataHistory]);
    // =================================

    const handleColors = (amount) => {
        if (amount > 0) return 'amount-green';
        if (amount < 0) return 'amount-red';
        return 'amount-orange';
    };

    return (
        <div>
            {dataPerPage.length > 0 ? (
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left" style={{ fontSize: 14, paddingLeft: 0 }}>{t('customer:creditReguler:distributor')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:actor')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:dateAndTime')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:amount')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:action')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:orderId')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:billingNumber')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <>
                                {dataPerPage.map((dt) => (
                                    <TableRow className={styles.tableRowResponsive}>
                                        <TableCell align="left" className={styles.tableCellResponsive} style={{ paddingLeft: 0 }}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:distributor')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14">
                                                            {dt.company_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:actor')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14" style={{ textTransform: 'uppercase' }}>
                                                            {dt.actor}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:dateAndTime')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14">
                                                            {formatDate(dt.created_at, 'DD/MM/YY HH:MM')}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:amount')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={handleColors(dt.amount)}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14" style={{ whiteSpace: 'pre' }}>
                                                            {formatPriceCreditLimit(dt.amount)}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:action')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14" style={{ textTransform: 'uppercase' }}>
                                                            {dt.action_type}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:orderId')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14">
                                                            {dt.order_increment_id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:creditReguler:billingNumber')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>
                                                        <Typography align="center" type="normal" letter="capitalize" size="14">
                                                            {dt.billing_increment_id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Alert severity="warning">{t('customer:creditReguler:historyTableNotFound')}</Alert>
            )}
            <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                {paginationCount > 1 && (
                    <Pagination
                        count={paginationCount}
                        page={page}
                        onChange={handleChange}
                    />
                )}
            </div>

        </div>
    );
};

export default CreditRegulerHistory;
