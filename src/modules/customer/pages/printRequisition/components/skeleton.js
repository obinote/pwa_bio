/* eslint-disable linebreak-style */
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@src_modules/customer/pages/printRequisition/components/style';
import classNames from 'classnames';

const SkeletonLoader = (props) => {
    const { t } = props;
    const styles = useStyles();
    return (
        <>
            <div className={classNames(styles.detailRequisitionWrapper, 'detail-requisition-wrapper')}>
                <div className="detail-requisition">
                    <div className="detail-requisition-content">
                        <div className="header-middle__left">
                            <div className="box header-middle__logo">
                                <Skeleton animation="wave" variant="text" width="60%" height={25} />
                            </div>
                        </div>
                        <div className="detail-requisition-header" style={{ display: 'block' }}>
                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                        </div>
                        <TableContainer component={Paper} className={styles.tableContainer}>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow className={styles.tableRowHead}>
                                        <TableCell align="left">{t('customer:detailRequisition:tableProduct')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tablePrice')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tableQty')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tableSubtotal')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={styles.tableRowResponsive}>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                            <Skeleton animation="wave" variant="text" width="60%" height={25} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonLoader;
