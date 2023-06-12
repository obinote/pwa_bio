import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Typography from '@common_typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@src_modules/customer/pages/creditlimit/components/style';

const SkeletonLoader = (props) => {
    const { t } = props;
    const styles = useStyles();
    const data = [1, 2, 3];
    return (
        <>
            <div className={styles.creditWrapper}>
                <div className="credit-remaining">
                    <Typography variant="h4" type="bold">
                        {t('customer:creditReguler:remaining')}
                    </Typography>
                    <TableContainer component={Paper} className={styles.tableContainer}>
                        <Table className={styles.table}>
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell
                                        align="left"
                                        style={{ fontSize: 14, paddingLeft: 0 }}
                                    >
                                        {t('customer:creditReguler:distributor')}
                                    </TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:saldo')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:termOfPayment')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((i) => (
                                    <TableRow key={i} className={styles.tableRowResponsive}>
                                        <TableCell align="left" style={{ paddingLeft: 0 }}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="10%" height={25} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="credit-transaction">
                    <Typography variant="h4" type="bold">
                        {t('customer:creditReguler:history')}
                    </Typography>
                    <TableContainer component={Paper} className={styles.tableContainer}>
                        <Table className={styles.table}>
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell
                                        align="left"
                                        style={{ fontSize: 14, paddingLeft: 0 }}
                                    >
                                        {t('customer:creditReguler:distributor')}
                                    </TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:actor')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:dateAndTime')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:amount')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:action')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:orderId')}</TableCell>
                                    <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:creditReguler:billingNumber')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((i) => (
                                    <TableRow key={i} className={styles.tableRowResponsive}>
                                        <TableCell align="left" style={{ paddingLeft: 0 }}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default SkeletonLoader;
