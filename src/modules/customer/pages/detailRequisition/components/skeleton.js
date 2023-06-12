/* eslint-disable linebreak-style */
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@common_typography';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <>
            <div className="detail-requisition">
                <div className="detail-requisition-header">
                    <div className="detail-requisition-header-title">
                        <Typography variant="h1" letter="capitalize">
                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                        </Typography>
                    </div>
                    <Typography variant="span" type="normal" size="14" letter="capitalize">
                        <Skeleton animation="wave" variant="text" width="60%" height={25} />
                    </Typography>
                </div>
                <div className="detail-requisition-content">
                    <div className="detail-requisition-content-wrapper">
                        <Skeleton animation="wave" variant="text" width="60%" height={25} />
                        <div className="detail-requisition-content-table">
                            <TableContainer component={Paper} className={styles.tableContainer}>
                                <Table className={styles.table}>
                                    <TableHead>
                                        <TableRow className={styles.tableRowHead}>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                            <TableCell align="left"><Skeleton animation="wave" variant="text" width="60%" height={25} /></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow className={styles.tableRowResponsive}>
                                            <TableCell colSpan={6}>
                                                <Skeleton animation="wave" variant="text" height={25} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonLoader;
