/* eslint-disable linebreak-style */
import useStyles from '@src_modules/customer/pages/creditlimit/components/style';
import Typography from '@common_typography';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatPriceCreditLimit } from '@helper_currency';

const CreditRegulerLimit = (props) => {
    const {
        t, dataLimit,
    } = props;
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell align="left" style={{ fontSize: 14, paddingLeft: 0 }}>{t('customer:creditReguler:distributor')}</TableCell>
                        <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:saldo')}</TableCell>
                        <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:termOfPayment')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <>
                        {dataLimit?.getRegularCredit?.regularCredits?.map((dt) => (
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
                                                    {dt.vendor_name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="left" className={styles.tableCellResponsive}>
                                    <div className={styles.displayFlexRow}>
                                        <div className={styles.mobLabel}>
                                            <Typography align="center" type="bold" letter="capitalize" size="14">
                                                {t('customer:creditReguler:saldo')}
                                            </Typography>
                                        </div>
                                        <div className={styles.displayBlock}>
                                            <div className={styles.value}>
                                                <Typography align="center" type="normal" letter="capitalize" size="14">
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
                                                {t('customer:creditReguler:termOfPayment')}
                                            </Typography>
                                        </div>
                                        <div className={styles.displayBlock}>
                                            <div className={styles.value}>
                                                <Typography align="center" type="normal" letter="capitalize" size="14">
                                                    {dt.top}
                                                    {' '}
                                                    {t('customer:creditReguler:termOfPaymentDays')}
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
    );
};

export default CreditRegulerLimit;
