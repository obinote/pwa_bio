/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/no-unknown-property */
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
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/companyusers/components/style';
import classNames from 'classnames';
import Button from '@common_button';
import Pagination from '@common_pagination';
import Add from '@material-ui/icons/Add';
import ModalAction from '@src_modules/customer/pages/companyusers/modalAction';

const CompanyUserPage = (props) => {
    const {
        t,
        refetch,
        currentPage,
        pageSize,
        totalData,
        totalPage,
        dataList,
        formikCompanyUser,
        handleChangePage,
        handleClickOpen,
        handleClickClose,
        showFieldCompanyUser = false,
        ModalCreateUser,
    } = props;
    const styles = useStyles();

    return (
        <>
            <div className={styles.customModal}>
                <Button variant="text" className={classNames(styles.customButtonModal, 'custom-button-modal')} onClick={handleClickOpen}>
                    <Add fontSize="small" />
                    <Typography variant="p" type="normal" color="white">
                        {t('customer:companyUser:buttonAdd')}
                    </Typography>
                </Button>

                <ModalCreateUser
                    styles={styles}
                    formikCompanyUser={formikCompanyUser}
                    handleClickClose={handleClickClose}
                    showFieldCompanyUser={showFieldCompanyUser}
                    t={t}
                />
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" style={{ fontSize: 14, paddingLeft: 0 }}>
                                {t('customer:companyUser:tableID')}
                            </TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>
                                {t('customer:companyUser:tableName')}
                            </TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>
                                {t('customer:companyUser:tableEmail')}
                            </TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>
                                {t('customer:companyUser:tableStatus')}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 14 }}>
                                {t('customer:companyUser:tableAction')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.length > 0 ? (
                            <>
                                {dataList.map((val, index) => (
                                    <TableRow id={val.id} className={styles.tableRowResponsive} key={index}>
                                        <TableCell align="left" className={styles.tableCellResponsive} style={{ paddingLeft: 0 }}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:companyUser:tableID')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value} style={{ fontSize: 14, maxWidth: '450px' }}>
                                                    {val.id}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:companyUser:tableName')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>
                                                    {val.firstname}
                                                    {' '}
                                                    {val.lastname}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:companyUser:tableEmail')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{val.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:companyUser:tableStatus')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.value}>{t(`customer:companyUser:status:${val.status}`)}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className={classNames(styles.tableCellResponsive, styles.actionBtn)}>
                                            <ModalAction initialValue={val} t={t} currentPage={currentPage} pageSize={pageSize} refetch={refetch} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Alert severity="warning">{t('customer:companyUsers:tableNotFound')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                {totalData > 1 ? (
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={(e, selectedPage) => {
                            handleChangePage(selectedPage);
                        }}
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default CompanyUserPage;
