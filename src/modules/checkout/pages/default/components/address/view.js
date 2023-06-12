/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-danger */
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AddressFormDialog from '@plugin_addressform';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '@core_modules/checkout/pages/default/components/ModalAddress';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import { getLocalStorage } from '@helpers/localstorage';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';

const CLOSE_ADDRESS_DIALOG = 100;

const Loader = () => (
    <>
        <Skeleton width="100%" variant="text" animation="wave" height={30} />
    </>
);

const AddressView = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const {
        data,
        checkout,
        setAddress,
        setCheckout,
        t,
        dialogProps,
        loading,
        address,
        content,
        contentBilling,
        manageCustomer,
        isOnlyVirtualProductOnCart,
        showEmptyPinpoint,
        ...other
    } = props;

    const pwaConfig = getLocalStorage('pwa_config');
    const gmapKey = pwaConfig && pwaConfig.icube_pinlocation_gmap_key ? pwaConfig.icube_pinlocation_gmap_key : null;
    const { formik } = other;

    const [openAddress, setOpenAddress] = React.useState(false);

    if (checkout.error.shippingAddress) {
        router.push('/customer/account/companyprofile');
    }

    return (
        <div className={styles.blockAddress} id="checkoutAddress">
            <style jsx>
                {`
                    .alert-empty-pin-point :global(.MuiAlert-icon) {
                        font-size: 16px;
                    }
                `}
            </style>

            <div className={styles.addressEmailContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="capitalize">
                        {t('checkout:emailAddress')}
                    </Typography>
                    <div className={styles.margin}>{loading.addresses || loading.all ? <Loader /> : checkout.data.customer.email}</div>
                </div>
            </div>

            <ModalAddress
                open={openAddress}
                setOpen={(status) => setOpenAddress(status)}
                t={t}
                checkout={checkout}
                setAddress={setAddress}
                setCheckout={setCheckout}
                manageCustomer={manageCustomer}
                {...other}
            />
            <div id="addressWrapper" className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="capitalize">
                        {t('checkout:billingAddress')}
                    </Typography>
                    <div className={styles.margin}>
                        {contentBilling}
                    </div>
                </div>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="capitalize">
                        {isOnlyVirtualProductOnCart ? t('checkout:billingAddress') : t('checkout:shippingAddress')}
                    </Typography>
                    <div className={styles.margin}>
                        {content}
                    </div>
                    <div className="manageAddress">
                        <AddressFormDialog
                            t={t}
                            onSubmitAddress={async (dataAddress) => {
                                const { cart } = checkout.data;
                                let state = { ...checkout };

                                await setAddress(dataAddress, cart);
                                state.status.addresses = true;
                                setCheckout({
                                    ...state,
                                    pickup_location_code: null,
                                });

                                _.delay(() => {
                                    state = { ...checkout };
                                    state.status.openAddressDialog = false;
                                    state.status.addresses = false;
                                    setCheckout(state);
                                }, CLOSE_ADDRESS_DIALOG);
                            }}
                            loading={checkout.loading.addresses}
                            success={checkout.status.addresses}
                            open={checkout.status.openAddressDialog}
                            disableDefaultAddress
                            setOpen={() => {
                                setCheckout({
                                    ...checkout,
                                    status: {
                                        ...checkout.status,
                                        openAddressDialog: false,
                                    },
                                });
                            }}
                            pageTitle={t('checkout:address:addTitle')}
                            {...other}
                            {...dialogProps}
                        />
                        {loading.addresses || loading.all || (!checkout.selected.billing && !checkout.selected.address) ? null : (
                            <Button
                                variant={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail ? 'contained' : 'text'}
                                disabled={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail}
                                // href={data.isGuest ? null : '/customer/account/address'}
                                onClick={
                                    data.isGuest
                                        ? () => {
                                            setCheckout({
                                                ...checkout,
                                                status: {
                                                    ...checkout.status,
                                                    openAddressDialog: true,
                                                },
                                            });
                                        }
                                        : () => setOpenAddress(true)
                                }
                                className={styles.btnAddAddress}
                            >
                                <Typography variant="p" type="bold" letter="uppercase" size="14" className={styles.colorPrimary}>
                                    {data.isGuest && !address
                                        ? t('common:button:addAddress')
                                        : t(_.isNull(address) ? 'common:button:manageAddress' : 'common:button:changeAddress')}
                                </Typography>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="alert-empty-pin-point">
                {showEmptyPinpoint && gmapKey && (
                    <Alert style={{ fontSize: 10 }} severity="warning">
                        {t('customer:address:emptyPinPointMessage')}
                    </Alert>
                )}
                {checkout.error.shippingAddress && (
                    <Alert style={{ fontSize: 10 }} severity="error">
                        {t('checkout:address:invalidAddress')}
                    </Alert>
                )}
            </div>
            <style jsx global>
                {`
                    .alert-empty-pin-point {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                `}
            </style>
        </div>
    );
};

export default AddressView;
