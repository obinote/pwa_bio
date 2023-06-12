/* eslint-disable no-nested-ternary */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableCell from '@material-ui/core/TableCell';
import ConfirmationDialog from '@common_confirmdialog';
import useStyles from '@core_modules/customer/pages/address/components/style';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { TableBody } from '@root/node_modules/@material-ui/core/index';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const stylesGlobal = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(stylesGlobal)((props) => {
    const {
        children, classes, onClose, ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h1">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const TableAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        removeAddress,
        cancelApproval,
        requestApproval,
        addressId,
        can_edit,
        can_delete,
        can_cancel_request,
        can_request,
        can_view_status,
        approvalStatus,
        handleOpenStatus,
        openStatus,
        handleCloseStatus,
        isCompanyAdmin,
    } = props;
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
        if (openCancel) {
            setOpenCancel(false);
        }
    }, [loadingAddress]);

    const styles = useStyles();
    const handleRemoveAddress = () => {
        removeAddress(addressId);
        setOpenDelete(true);
    };

    const handleCancelApproval = async () => {
        cancelApproval(addressId);
        setOpenCancel(true);
    };

    const handleRequestApproval = () => {
        requestApproval(addressId);
        setOpenRequest(true);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItem = (selection, args) => {
        const map = {
            viewStatus: () => handleOpenStatus(args),
            cancelRequest: () => setOpenCancel(true),
            approvalRequest: () => setOpenRequest(true),
            edit: () => setOpen(true),
            remove: () => setOpenDelete(true),
        };
        map[selection]();
        setAnchorEl(null);
    };

    return (
        <>
            <ConfirmationDialog
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleRemoveAddress}
                message={t('customer:address:warningDelete')}
            />
            <ConfirmationDialog
                open={openCancel}
                handleCancel={() => setOpenCancel(!openCancel)}
                handleYes={handleCancelApproval}
                message={t('customer:address:warningCancel')}
            />
            <ConfirmationDialog
                open={openRequest}
                handleCancel={() => setOpenRequest(!openRequest)}
                handleYes={handleRequestApproval}
                message={t('customer:address:warningRequest')}
            />
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />

            <Dialog
                className={styles.popupStatus}
                onClose={handleCloseStatus}
                open={openStatus}
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
            >
                <DialogTitle className={styles.popupStatusTitle} onClose={handleCloseStatus}>
                    {t('customer:address:viewStatus')}
                </DialogTitle>
                <DialogContent className={styles.popupStatusContent}>
                    {approvalStatus.loading ? (
                        <>
                            <Skeleton variant="rect" width="100%" height={110} />
                        </>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableCell align="left" style={{ fontSize: 14, paddingLeft: 0 }}>{t('customer:address:distributor')}</TableCell>
                                <TableCell align="left" style={{ fontSize: 14 }}>{t('customer:address:status')}</TableCell>
                            </TableHead>
                            <TableBody>
                                {approvalStatus?.data?.getApprovalAddressStatus.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="left" style={{ paddingLeft: 0 }}>{`${row.vendor_code} - ${row.vendor_name}`}</TableCell>
                                        <TableCell align="left">
                                            {row.status === 'approved' ? t('customer:address:approved')
                                                : row.status === 'pending' ? t('customer:address:pending') 
                                                    : t('customer:address:rejected')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </DialogContent>
            </Dialog>

            <TableRow className={styles.tableRowResponsive}>
                <TableCell
                    className={[styles.tableCellResponsive, styles.ok].join(' ')}
                    align="left"
                >
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="primary" size="small" />}
                            label=""
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:firstname')}</b>
                        </div>
                        <div className={styles.value}>{firstname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:lastname')}</b>
                        </div>
                        <div className={styles.value}>{lastname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:street')}</b>
                        </div>
                        <div className={styles.value}>
                            {`${street}, ${city},`}
                            <br />
                            {`${region}, ${country.full_name_locale || ''}, ${postcode}`}
                        </div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:phone')}</b>
                        </div>
                        <div className={styles.value}>{telephone}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className={styles.btnActionAddress}
                        >
                            {t('customer:address:btnAction')}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={styles.popupBoxAction}
                        >
                            {can_view_status ? (
                                <MenuItem
                                    onClick={() => handleMenuItem('viewStatus', addressId)}
                                >
                                    {t('customer:address:viewStatus')}
                                </MenuItem>
                            ) : null}

                            {can_cancel_request && isCompanyAdmin ? (
                                <MenuItem
                                    onClick={() => handleMenuItem('cancelRequest')}
                                >
                                    {t('customer:address:cancelRequest')}
                                </MenuItem>
                            ) : null}

                            {can_request && isCompanyAdmin ? (
                                <MenuItem
                                    onClick={() => handleMenuItem('approvalRequest')}
                                >
                                    {t('customer:address:approvalRequest')}
                                </MenuItem>
                            ) : null}

                            {can_edit && isCompanyAdmin ? (
                                <MenuItem
                                    onClick={() => handleMenuItem('edit')}
                                >
                                    {t('customer:address:editTitle')}
                                </MenuItem>
                            ) : null}

                            {can_delete && isCompanyAdmin ? (
                                <>
                                    {
                                        selectedAddressId !== addressId
                                            ? (
                                                <MenuItem
                                                    onClick={() => handleMenuItem('remove')}
                                                >
                                                    {t('customer:address:removeTitle')}
                                                </MenuItem>
                                            ) : null
                                    }
                                </>
                            ) : null}

                        </Menu>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableAddress;
