/* eslint-disable no-unused-vars */
import React from 'react';
import gqlService from '@src_modules/customer/services/graphql';
import classNames from 'classnames';
import useStyles from '@src_modules/customer/pages/quote/view/components/shipping/style';
import { createCustomerAddress } from '@core_modules/checkout/services/graphql';
import Skeleton from '@common_skeleton';
// import NewAddressFormDialog from '@plugin_addressform';
// import Button from '@material-ui/core/Button';
// import CustomModalAddress from '@src_modules/customer/pages/quote/view/components/modal';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Typography from '@common_typography';
// import Radio from '@material-ui/core/Radio';

const Shipping = (props) => {
    const { uid, t, can_update } = props;
    const styles = useStyles();
    const [openNewAddressDialog, setNewAddressDialog] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [success] = React.useState(false);
    const [selectedShipping, setSelectedShipping] = React.useState(false);
    const { data, loading, refetch: refetchShipping } = gqlService.getQuoteShippingAddress({
        variables: {
            uid,
        },
    });
    const billing_address = data?.negotiableQuote?.billing_address;
    const shipping_addresses = data?.negotiableQuote?.shipping_addresses;
    const { data: dataAddress, loading: loadingAddress, refetch: refetchAddress } = gqlService.getCustomerAddress();
    const [setNegotiableQuoteBillingAddress, { error: errorSetAddress }] = gqlService.setNegotiableQuoteBillingAddress();
    const [addAddress, { data: dataNewAddress, error: errorNewAddress }] = createCustomerAddress();

    const handleNewAddressDialog = () => {
        setNewAddressDialog(true);
    };

    // eslint-disable-next-line no-shadow
    const handleSubmitNewAddress = async (dataNewAddress) => {
        await addAddress({
            variables: {
                ...dataNewAddress,
            },
        });

        if (errorNewAddress) {
            window.toastMessage({
                open: true,
                text: errorSetAddress.message,
                variant: 'error',
            });
            return;
        }

        if (dataNewAddress) {
            window.toastMessage({
                open: true,
                text: 'Alamat berhasil di tambahkan',
                variant: 'success',
            });
        }
        refetchAddress();
        setNewAddressDialog(false);
        refetchShipping();
    };

    const handleSelectAddress = async () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleChangeSelectShipping = ({ target }) => {
        setSelectedShipping(parseInt(target.value, 10));
    };

    const handleApproveSelectAddress = async () => {
        if (!selectedShipping) {
            window.toastMessage({
                open: true,
                text: t('customer:quote:shipping:noAddressSelected'),
                variant: 'error',
            });
            return;
        }

        const getAddress = dataAddress.customer.addresses.find((ad) => ad.id === selectedShipping);

        const variables = {
            variables: {
                quote_uid: uid,
                billing_address: {
                    address: {
                        company: getAddress.company ?? '',
                        firstname: getAddress.firstname,
                        lastname: getAddress.lastname,
                        street: getAddress.street,
                        city: getAddress.city,
                        postcode: getAddress.postcode,
                        region_id: getAddress.region_id,
                        country_code: getAddress.country_code,
                        telephone: getAddress.telephone,
                        // region: 'ID',
                    },
                    use_for_shipping: true,
                },
            },
        };

        await setNegotiableQuoteBillingAddress(variables);

        if (errorSetAddress) {
            window.toastMessage({
                open: true,
                text: errorSetAddress.message,
                variant: 'error',
            });
            return;
        }

        if (data) {
            window.toastMessage({
                open: true,
                text: t('customer:quote:shipping:updateSuccess'),
                variant: 'success',
            });
        }
        refetchAddress();
        handleModalClose();
    };

    if (loading || loadingAddress) {
        return (
            <div className={classNames(styles.wrapper)}>
                <Skeleton variant="rounded" width={150} />
                <div className={classNames(styles.shippingContainer)}>
                    <div className={classNames(styles.column, 'loading')}>
                        <div className={classNames(styles.shippingAddr, styles.shippingDesc)}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="80%" />
                        </div>
                    </div>
                    <div className={classNames(styles.column, 'loading')}>
                        <div className={classNames(styles.shippingAddr, styles.shippingDesc)}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="80%" />
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.btnContainer, 'loading')}>
                    <Skeleton variant="rounded" width={100} />
                    <Skeleton variant="rounded" width={100} />
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(styles.wrapper)}>
            <h2>{t('customer:quote:shipping:title')}</h2>

            <div className={classNames(styles.shippingContainer)}>
                <div className={classNames(styles.column)}>
                    <h4 className={classNames(styles.shippingTitle)}>{t('customer:quote:shipping:defaultShiping')}</h4>
                    <address className={classNames(styles.shippingAddr, styles.shippingDesc)}>
                        {shipping_addresses.length === 0 && t('customer:quote:shipping:noShippingAddress')}
                        {shipping_addresses.length > 0
                            && shipping_addresses.map((addr, shipping_idx) => (
                                <div key={shipping_idx}>
                                    {`${addr.firstname} ${addr.lastname}`}
                                    <br />
                                    {addr.street.map((st, stidx) => (
                                        <span key={stidx}>
                                            {st}
                                            <br />
                                        </span>
                                    ))}
                                    {addr.city}
                                    <br />
                                    {`${addr.region.label} ${addr.postcode}`}
                                    {addr.country.label}
                                    <br />
                                    {`Telephone: ${addr.telephone}`}
                                </div>
                            ))}
                    </address>
                </div>

                <div className={classNames(styles.column, styles.columnRight)}>
                    <h4 className={classNames(styles.shippingTitle)}>{t('customer:address:shippingMethod')}</h4>
                    <p className={classNames(styles.shippingDesc)}>{t('customer:quote:shipping:noShippingInfo')}</p>
                </div>
            </div>

            {/* <div className={classNames(styles.btnContainer)}>
                <Button disableRipple className={classNames(styles.btn)} disabled={!can_update} onClick={handleSelectAddress}>
                    {t('customer:address:selectTitle')}
                </Button>
                <Button disableRipple onClick={handleNewAddressDialog} className={classNames(styles.btn)} disabled={!can_update}>
                    {t('customer:address:addTitle')}
                </Button>
            </div> */}

            {/* <NewAddressFormDialog
                t={t}
                onSubmitAddress={(d, type) => {
                    handleSubmitNewAddress(d, type);
                }}
                success={success}
                open={openNewAddressDialog}
                setOpen={() => {
                    setNewAddressDialog(!openNewAddressDialog);
                }}
            />

            <CustomModalAddress title={t('customer:address:selectTitle')} modalOpen={modalOpen} handleModalClose={handleModalClose}>
                {dataAddress.customer.addresses === null || dataAddress.customer.addresses.length === 0 ? (
                    <p>{t('customer:quote:shipping:emptyAddress')}</p>
                ) : (
                    dataAddress.customer.addresses.map((address, addrIdx) => (
                        <RadioGroup name="select_shipping" key={addrIdx} value={selectedShipping} onChange={handleChangeSelectShipping}>
                            <FormControlLabel
                                className={[styles.address_shipping].join(' ')}
                                value={address.id}
                                active={selectedShipping === address.id}
                                control={<Radio color="primary" size="small" className={styles.select_button} />}
                                label={(
                                    <div className={styles.address_wrapper}>
                                        <Typography variant="h3">{address.address_label}</Typography>
                                        <Typography variant="h3">{`${address.firstname} ${address.lastname}`}</Typography>
                                        <Typography variant="h3">{address.street}</Typography>
                                        <Typography variant="h3">
                                            {address.city !== '' && `${address.city}, `}
                                            {address.region !== '' && `${address.region.region || ''}, `}
                                            {address.country !== '' && `${address.country.label || ''}, `}
                                            {address.postcode !== '' && address.postcode}
                                        </Typography>
                                        <Typography className={[styles.address_text].join(' ')} variant="p">
                                            {address.telephone}
                                        </Typography>
                                    </div>
                                )}
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    ))
                )}

                <div className={classNames(styles.btnModalWrapper)}>
                    <Button onClick={handleModalClose} className={classNames(styles.btnCancel)}>
                        {t('common:button:cancel')}
                    </Button>
                    <Button className={classNames(styles.btnApprove)} onClick={handleApproveSelectAddress}>
                        {t('common:button:confirm')}
                    </Button>
                </div>
            </CustomModalAddress> */}
        </div>
    );
};

export default Shipping;
