/* eslint-disable no-unused-vars */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import useStyles from '@core_modules/customer/pages/address/components/style';
import Button from '@common_button';
import classNames from 'classnames';
import ConfirmationDialog from '@common_confirmdialog';

const ItemAddress = (props) => {
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
        removeAddress,
        cancelApproval,
        requestApproval,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        first,
        can_edit,
        can_delete,
        can_cancel_request,
        can_request,
        can_view_status,
        handleOpenStatus,
        addressId,
        isCompanyAdmin,
    } = props;
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);

    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
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
            <div className="column">
                <div className={[styles.address_content, first ? styles.address_content_first : ''].join(' ')}>
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="secondary" size="small" />}
                            label={(
                                <>
                                    <Typography className={[styles.address_text].join(' ')} variant="p">
                                        {`${firstname} ${lastname}`}
                                    </Typography>
                                    <Typography className={[styles.address_text].join(' ')} variant="p">
                                        {street}
                                        ,
                                    </Typography>
                                    <Typography className={[styles.address_text].join(' ')} variant="p">
                                        {city !== '' && `${city}, `}
                                        {region !== '' && `${region}, `}
                                        {country !== '' && `${country.full_name_locale || ''}, `}
                                        {postcode !== '' && postcode}
                                    </Typography>
                                    <Typography className={[styles.address_text].join(' ')} variant="p">
                                        {telephone}
                                    </Typography>
                                </>
                            )}
                            labelPlacement="end"
                        />
                    </RadioGroup>
                    <div className={styles.btnActionMobile}>
                        {can_view_status ? (
                            <Button
                                variant="text"
                                align="left"
                                className={classNames(styles.generalButton)}
                                onClick={() => handleOpenStatus(addressId)}
                            >
                                <Typography variant="p" type="normal">
                                    {t('customer:address:viewStatus')}
                                </Typography>
                            </Button>
                        ) : null}
                        {can_cancel_request && isCompanyAdmin ? (
                            <Button variant="text" align="left" className={classNames(styles.generalButton)} onClick={() => setOpenCancel(true)}>
                                <Typography variant="p" type="normal">
                                    {t('customer:address:cancelRequest')}
                                </Typography>
                            </Button>
                        ) : null}

                        {can_request && isCompanyAdmin ? (
                            <Button variant="text" align="left" className={classNames(styles.generalButton)} onClick={() => setOpenRequest(true)}>
                                <Typography variant="p" type="normal">
                                    {t('customer:address:approvalRequest')}
                                </Typography>
                            </Button>
                        ) : null}

                        {can_edit && isCompanyAdmin ? (
                            <Button variant="text" align="left" className={classNames(styles.generalButton)} onClick={() => setOpen(!open)}>
                                <Typography variant="p" type="normal">
                                    {t('customer:address:editTitle')}
                                </Typography>
                            </Button>
                        ) : null}

                        {can_delete && isCompanyAdmin ? (
                            <>
                                {
                                    selectedAddressId !== addressId
                                        ? (
                                            <Button
                                                variant="text"
                                                align="left"
                                                className={classNames(styles.generalButton)}
                                                onClick={() => setOpenDelete(true)}
                                            >
                                                <Typography variant="p" type="normal">
                                                    {t('customer:address:removeTitle')}
                                                </Typography>
                                            </Button>
                                        ) : null
                                }
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
