/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
// import { useState } from 'react';
// import Layout from '@layout_customer';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TablePagination from '@material-ui/core/TablePagination';
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/distributor/components/style';
import Link from 'next/link';
// import classNames from 'classnames';
import RegisterDistributorDialog from '@core_modules/customer/plugins/RegisterDistributorDialog';

const DistributorListPage = (props) => {
    const {
        t,
        data,
        page,
        pageSize,
        handleChangePage,
        handleChangeRowsPerPage,
        customerData,
        onClickRegister,
        handleRegister,
        setOpenRegister,
        openRegister,
        sellerData,
    } = props;
    const styles = useStyles();
    // const handlePage = (event) => {
    //     handleChangePage(parseInt(event.target.value));
    // };

    // const handleRowsPerPage = (event) => {
    //     handleChangeRowsPerPage(parseInt(event.target.value, 10));
    // };
    const ListDistributor = ({ value, index }) => {
        const { approval_status } = value;
        let approvalStatus;
        let color;
        if (approval_status === 'pending') {
            approvalStatus = t('customer:distributor:statusPending');
            color = '#f82e2c';
        } else if (approval_status === 'not registered') {
            approvalStatus = t('customer:distributor:statusNotRegistered');
            color = '#7b9aaf';
        } else if (approval_status === 'approved') {
            approvalStatus = t('customer:distributor:statusRegistered');
            color = '#414048';
        } else {
            approvalStatus = approval_status;
            color = '#000';
        }
        return (
            <TableRow className={styles.tableRowResponsive} key={index}>
                <TableCell align="left" className={styles.tableCellResponsive}>
                    <div className={styles.displayBlock}>
                        <div className={styles.displayBlock}>
                            <div className={styles.value} style={{ margin: 5, fontSize: 14, fontWeight: 500 }}>{value.company_name}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell align="left" className={styles.tableCellResponsive}>
                    <div className={styles.displayFlexRow}>
                        <div className={styles.displayBlock}>
                            <div className={styles.value} style={{ margin: 5, color }}>{approvalStatus}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell align="left" className={styles.tableCellResponsive}>
                    <div className={styles.displayFlexRow}>
                        {approval_status && approval_status === 'not registered' && (
                            <div className={styles.displayBlock}>
                                {customerData && customerData?.customer?.company_status === 'active' ? (
                                    <a onClick={() => onClickRegister(value)}>
                                        <Typography
                                            variant="span"
                                            type="normal"
                                            size="14"
                                            className={styles.linkRequistion}
                                        >
                                            {t('customer:distributor:register')}
                                        </Typography>
                                    </a>
                                ) : (
                                    <Link href="/customer/application_type">
                                        <a>
                                            <Typography
                                                variant="span"
                                                type="normal"
                                                size="14"
                                                className={styles.linkRequistion}
                                            >
                                                {t('customer:distributor:register')}
                                            </Typography>
                                        </a>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Typography className={styles.distributorAvailable} align="center" type="bold">
                    {t('customer:distributor:distributoraAvailable')}
                </Typography>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" style={{ fontSize: 14, fontWeight: 600 }}>{t('customer:distributor:distributor')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14, fontWeight: 600 }}>{t('customer:distributor:tableStatus')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14, fontWeight: 600 }}>{t('')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.getSellerByKecamatan?.seller.length > 0 ? (
                            <>
                                {data?.getSellerByKecamatan?.seller.map((val, index) => (
                                    <ListDistributor value={val} index={index} />
                                ))}
                                {/* <TableRow className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                                    <TablePagination
                                        component="div"
                                        rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                                        colSpan={4}
                                        count={data?.negotiableQuotes?.items.length}
                                        rowsPerPage={pageSize}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handlePage}
                                        onChangeRowsPerPage={handleRowsPerPage}
                                    />
                                </TableRow> */}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Alert severity="warning">{t('customer:distributor:tableNotFound')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <RegisterDistributorDialog
                open={openRegister}
                handleCancel={() => setOpenRegister(!openRegister)}
                handleYes={handleRegister}
                titleMessage={t('customer:distributor:titleConfirmRegister')}
                message={t('customer:distributor:confirmRegister')}
                confirmationMessage={sellerData?.company_name}
            />
        </>
    );
};

export default DistributorListPage;
