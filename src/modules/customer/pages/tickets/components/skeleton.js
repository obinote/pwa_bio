import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@src_modules/customer/pages/tickets/components/style';

const SkeletonLoader = (props) => {
    const { t } = props;
    const styles = useStyles();
    const data = [1, 2, 3, 4, 5];
    return (
        <>
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
                            <TableCell align="left" className={styles.tableHeadTitle}>{t('customer:tickets:latestUpdate')}</TableCell>
                            <TableCell align="left" className={styles.tableHeadTitle}>{t('customer:tickets:status')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((i) => (
                            <TableRow key={i} className={styles.tableRowResponsive}>
                                <TableCell align="left" style={{ paddingLeft: 0 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                                <TableCell align="left" style={{ paddingLeft: 10 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                                <TableCell align="left" style={{ paddingLeft: 10 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                                <TableCell align="left" style={{ paddingLeft: 10 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                                <TableCell align="left" style={{ paddingLeft: 10 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                                <TableCell align="left" style={{ paddingLeft: 10 }}>
                                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SkeletonLoader;
