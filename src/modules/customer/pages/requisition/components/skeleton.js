import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Typography from '@common_typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@src_modules/customer/pages/requisition/components/style';

const SkeletonLoader = (props) => {
    const { t } = props;
    const styles = useStyles();
    return (
        <>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableName')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableItems')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableLatest')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 0 }}>{t('customer:requisition:tableAction')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={styles.tableRowResponsive}>
                            <TableCell align="left">
                                <Typography variant="span" letter="capitalize" className={styles.tableSpan}>
                                    <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="span" letter="capitalize" className={styles.tableSpan}>
                                    <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="span" letter="capitalize" className={styles.tableSpan}>
                                    <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="span" letter="capitalize" className={styles.tableSpan}>
                                    <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SkeletonLoader;
