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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/requisition/components/style';
import Link from 'next/link';
import classNames from 'classnames';
import Button from '@common_button';
import TextField from '@common_textfield';
import Pagination from '@common_pagination';
import CloseIcon from '@material-ui/icons/Close';
import formatDate from '@helper_date';
import Add from '@material-ui/icons/Add';

const RequistionPage = (props) => {
    const {
        t, data, handleClickOpen, handleClickClose, showFieldRequisition = false, formikRequisition, page,
        pageSize,
        handleChangePage,
    } = props;
    const styles = useStyles();
    const paginationCount = Math.ceil(data.getRequisitionList.total_count / pageSize);

    return (
        <>
            <div className={styles.customModal}>
                <Button variant="text" className={classNames(styles.customButtonModal, 'custom-button-modal')} onClick={handleClickOpen}>
                    <Add fontSize="small" style={{ color: 'white' }} />
                    <Typography variant="p" type="normal" color="white">
                        {t('customer:requisition:buttonAdd')}
                    </Typography>
                </Button>
                <Dialog className={classNames(styles.customFormsModal, 'custom-forms-modal')} open={showFieldRequisition} onClose={handleClickClose}>
                    <DialogTitle>{t('customer:requisition:modalTitle')}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={formikRequisition.handleSubmit} className="custom-form-modal">
                            <Typography variant="span" type="bold" color="black" size="14">
                                {t('customer:requisition:modalName')}
                                {' '}
                                <span className="required">*</span>
                            </Typography>
                            <CloseIcon
                                onClick={handleClickClose}
                                style={{
                                    cursor: 'pointer', position: 'absolute', top: '15px', right: '20px',
                                }}
                            />
                            <TextField
                                name="name"
                                type="text"
                                maxlength="40"
                                onChange={formikRequisition.handleChange}
                                value={formikRequisition.values.name}
                                error={!!(formikRequisition.touched.name && formikRequisition.errors.name)}
                                errorMessage={(formikRequisition.touched.name && formikRequisition.errors.name) || null}
                                id="requisitionName"
                            />

                            <Typography variant="span" type="bold" color="black" size="14">
                                {t('customer:requisition:modalDescription')}
                                {' '}
                                <span className="required">*</span>
                            </Typography>
                            <TextField
                                id="description"
                                multiline
                                rows={3}
                                defaultValue=""
                                onChange={formikRequisition.handleChange}
                                value={formikRequisition.values.description}
                                error={!!(formikRequisition.touched.description && formikRequisition.errors.description)}
                                errorMessage={(formikRequisition.touched.description && formikRequisition.errors.description) || null}
                            />
                            <div className="button-wrapper">
                                <Button
                                    className={classNames(styles.generalButton, 'btn-submit')}
                                    type="submit"
                                    align="left"
                                >
                                    <Typography variant="span" type="normal" color="white" size="14">
                                        {t('customer:requisition:modalButtonSubmit')}
                                    </Typography>
                                </Button>
                                <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleClickClose}>
                                    <Typography variant="p" type="normal">
                                        {t('customer:requisition:modalButtonCancel')}
                                    </Typography>
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableName')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableItems')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableLatestActivity')}</TableCell>
                            <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:requisition:tableAction')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.getRequisitionList?.data.length > 0 ? (
                            <>
                                {data?.getRequisitionList?.data.map((dt) => (
                                    <TableRow className={styles.tableRowResponsive}>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFullBlock}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:requisition:tableName')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayFullBlock}>
                                                    <div className={styles.value} style={{ margin: '5px 0', fontSize: 18, fontWeight: 600 }}>{dt.name}</div>
                                                    <div className={styles.value} style={{ margin: '5px 0', fontSize: 14, maxWidth: '450px' }}>{dt.description}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:requisition:tableItems')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>{dt.total_count}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:requisition:tableLatest')}
                                                    </Typography>
                                                </div>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.value}>{formatDate(dt.updated_at, 'DD/MM/YYYY')}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.displayFlexRow}>
                                                <div className={styles.displayBlock}>
                                                    <Link href={`/customer/account/requisition/view/${dt.entity_id}`}>
                                                        <a id="requestList_lihatDetail">
                                                            <Typography
                                                                variant="span"
                                                                type="normal"
                                                                size="14"
                                                                className={styles.linkRequistion}
                                                            >
                                                                {t('customer:requisition:tableView')}
                                                            </Typography>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <Alert style={{ marginTop: '20px' }} severity="warning">{t('customer:requisition:tableNotFound')}</Alert>
                        )}
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
        </>
    );
};

export default RequistionPage;
