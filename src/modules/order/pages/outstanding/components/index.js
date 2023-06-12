/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import Typography from '@common_typography';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@common_pagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { formatPrice } from '@helper_currency';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/outstanding/components/style';
import classNames from 'classnames';
import { Button, Box } from '@root/node_modules/@material-ui/core/index';
import PendingBilling from './pendingBilling';
import SnapBilling from './snapBilling';
import TotalPiutang from './totalPiutang';

const Content = (props) => {
    const {
        dataOrderOutstanding, t, page, checked, setChecked = () => { }, handleCreateBilling = () => { }, open, setOpen = () => { },
        pageSize, handleChangePage, loadMore, pageOrder, storeConfig,
    } = props;
    const styles = useStyles();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const paginationCount = (dataOrderOutstanding?.total_count) ? Math.ceil(dataOrderOutstanding.total_count / pageSize) : 1;

    // Checkbox
    const [checkedAll, setCheckedAll] = React.useState(false);

    const toggleCheckbox = (value) => {
        if (checked.includes(value)) {
            setChecked([...checked.filter((check) => check !== value)]);
        } else {
            setChecked([...checked, value]);
        }
    };

    const toggleCheckBoxAll = () => {
        if (checkedAll) {
            setChecked([]);
            setCheckedAll(false);
        } else {
            const invoiceIds = dataOrderOutstanding.items.map((item) => item.invoices[0].number);
            setChecked(invoiceIds);
            setCheckedAll(true);
        }
    };

    return (
        <>
            {/* Snap Billing */
                pageOrder !== 1 && (
                    <div>
                        <SnapBilling {...props} />
                        <br />
                    </div>
                )
            }
            {/* table billing */
                pageOrder === 1 && (
                    <>
                        <div>
                            <TotalPiutang {...props} />
                        </div>
                        {/* table Pending Billing */}
                        <div>
                            <PendingBilling {...props} />
                        </div>
                        {/* table outstanding */}
                        <div>
                            <TableContainer component={Paper} className={styles.tableContainerOutstanding}>
                                <div className={styles.boxCreateBilling}>
                                    <div>
                                        <Typography className={styles.createBillingDescription} variant="subtitle2">{t('order:outstanding:createBillingDescription')}</Typography>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={handleOpen}
                                            type="primary"
                                            className={styles.buttonCreateBilling}
                                        >
                                            <Typography className={styles.buttonCreateBillingText} variant="subtitle2" type="bold">
                                                {t('order:outstanding:createBilling')}
                                            </Typography>
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box className={styles.outstandingModal}>
                                                <Typography variant="title" type="bold" align="center">{t('order:outstanding:createBilling')}</Typography>
                                                <Typography variant="title" align="center" className={styles.createBillingDescriptionModal}>{t('order:outstanding:createBillingModalDescription')}</Typography>
                                                <Button onClick={handleCreateBilling} type="primary" className={styles.buttonCreateBillingModal}><Typography variant="subtitle2">{t('order:outstanding:saveCreateBilling')}</Typography></Button>
                                                <Button onClick={handleClose} type="primary" className={styles.buttonCanceleBilling}><Typography variant="subtitle2" type="bold">{t('order:outstanding:cancelCreateBilling')}</Typography></Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <Table className={styles.table} size="medium" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow className={styles.tableRowHeadOutstanding}>
                                            <TableCell align="center" size="medium" padding="checkbox" className={styles.tableCellCheckbox}>
                                                <FormControlLabel
                                                    className={styles.formControlCheckBox}
                                                    control={(
                                                        <Checkbox
                                                            // intedeterminate
                                                            checked={checkedAll}
                                                            onChange={toggleCheckBoxAll}
                                                            className={styles.checkBox}
                                                        />
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className={styles.tableCellResponsive}>
                                                <Typography className={styles.typographyTableHead}>
                                                    {t('order:outstanding:invoiceNumber')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className={styles.tableCellResponsive}>
                                                <Typography className={styles.typographyTableHead}>
                                                    {t('order:outstanding:orderNumber')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:outstanding:orderTotal')}</Typography></TableCell>
                                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:outstanding:invoiceDate')}</Typography></TableCell>
                                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:outstanding:orderQty')}</Typography></TableCell>
                                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:outstanding:dueDate')}</Typography></TableCell>
                                            <TableCell className={styles.tableCellResponsive}>
                                                {
                                                    storeConfig.fine_management_status == 1
                                                        ? <Typography className={styles.typographyTableHead}>{t('order:outstanding:totalFine')}</Typography>
                                                        : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                                }
                                            </TableCell>
                                            <TableCell className={styles.tableCellResponsive}><Typography className={styles.typographyTableHead}>{t('order:outstanding:status')}</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            loadMore ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} rowSpan={10}>
                                                        <SkeletonContent />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                                : dataOrderOutstanding && dataOrderOutstanding.items.length > 0
                                                    ? (
                                                        <>
                                                            {
                                                                dataOrderOutstanding.items.map((val, index) => (
                                                                    <TableRow className={styles.tableRowResponsiveOutstanding} key={index}>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <Checkbox
                                                                                    checked={checked.includes(val.invoices[0].number)}
                                                                                    onChange={() => toggleCheckbox(val.invoices[0].number)}
                                                                                    className={styles.checkBox}
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {`${t('order:outstanding:InvoiceNumber')}`}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {`${t('order:outstanding:invoiceNumber')}`}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={classNames(styles.value, 'highlighted')}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {val.invoices[0].number}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {`${t('order:outstanding:orderNumber')}`}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {`${t('order:outstanding:orderNumber')}`}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={classNames(styles.value, 'highlighted')}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {val.order_number}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:orderTotal')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {t('order:outstanding:orderTotal')}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {formatPrice(val.grand_total || 'IDR')}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:invoiceDate')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {`${t('order:outstanding:invoiceDate')}`}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {formatDate(val.created_at, 'DD/MM/YY hh:mm:ss')}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:orderQty')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {t('order:outstanding:orderQty')}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {val.items[0].quantity_ordered}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:dueDate')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {`${t('order:outstanding:dueDate')}`}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {formatDate(val.due_date, 'DD/MM/YY hh:mm:ss')}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:totalFine')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            {
                                                                                storeConfig.fine_management_status == 1
                                                                                    ? (
                                                                                        <div className={styles.displayFlexRow}>
                                                                                            <div className={styles.mobLabel}>
                                                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                                    {t('order:outstanding:totalFine')}
                                                                                                    :
                                                                                                </Typography>
                                                                                            </div>
                                                                                            <div className={styles.value}>
                                                                                                <Typography variant="overline" letter="capitalize">
                                                                                                    {val.fine === null ? 'Rp. 0' : formatPrice(val.fine)}
                                                                                                </Typography>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                    : <Typography className={styles.tableCellResponsiveNone}>aaa</Typography>
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={styles.tableCellResponsive}
                                                                            align="left"
                                                                            data-th={(
                                                                                <Typography align="center" type="bold" letter="capitalize">
                                                                                    {t('order:outstanding:status')}
                                                                                </Typography>
                                                                            )}
                                                                        >
                                                                            <div className={styles.displayFlexRow}>
                                                                                <div className={styles.mobLabel}>
                                                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                                        {t('order:outstanding:status')}
                                                                                        :
                                                                                    </Typography>
                                                                                </div>
                                                                                <div className={styles.value}>
                                                                                    <Typography variant="overline" letter="capitalize">
                                                                                        {val.status_billing === 'Pending Payment' ? t('order:outstanding:pending') : t('order:outstanding:unpaid')}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                    : (
                                                        <TableRow>
                                                            <TableCell colSpan={10}>
                                                                <Alert severity="warning">{t('order:notFound')}</Alert>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                        }
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
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Content;
