import Header from '@common_headermobile';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';
import RadioGroup from '@material-ui/core/RadioGroup';
import ItemAddress from '@core_modules/checkout/pages/default/components/ItemModalAddress';
import useStyles from '@core_modules/checkout/pages/default/components/ModalAddress/style';

const AddressView = (props) => {
    const {
        t,
        open,
        setOpen,
        loading,
        success,
        address,
        selectedAddressId,
        loadingAddress,
        handleChange,
        handleCloseDiff,
        handleOpenNew,
        updateAddress,
        manageCustomer,
        storeConfig,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative',
        headerBackIcon: 'close',
        countAddress: address.length,
    };
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const getItemAddress = () => {
        let content;
        if (loading) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (!address) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = address.map((item) => (
                <ItemAddress
                    {...item}
                    selectedAddressId={selectedAddressId}
                    checked={item.id === selectedAddressId}
                    key={item.id}
                    addressId={item.id}
                    firstname={item.firstname}
                    lastname={item.lastname}
                    telephone={item.telephone}
                    address_label={item.address_label}
                    postcode={item.postcode}
                    region={item.region.region}
                    city={item.city}
                    country={{
                        id: item.country.code,
                        full_name_locale: item.country.label,
                    }}
                    street={item.street.join(' ')}
                    value={item.id}
                    defaultBilling={item.default_billing}
                    defaultShipping={item.default_shipping}
                    loadingAddress={loadingAddress}
                    success={success}
                    t={t}
                    handleOpenNew={handleOpenNew}
                    manageCustomer={manageCustomer}
                    updateAddress={updateAddress}
                    handleChange={handleChange}
                    handleCloseDiff={handleCloseDiff}
                />
            ));
        }

        return content;
    };

    return (
        <>
            <Dialog open={open} className={[styles.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
                <div className={styles.container} id="checkoutListAddress">
                    <Header
                        showCenterComponent
                        isFixed={false}
                        RightComponent={<></>}
                        showTopMenu={false}
                        pageConfig={headerConfig}
                        LeftComponent={{
                            onClick: () => {
                                setOpen(false);
                            },
                        }}
                        className={styles.pageTitle}
                        storeConfig={storeConfig}
                    />
                    <div className={[styles.address_form].join(' ')}>
                        <div>
                            <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                                {getItemAddress()}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddressView;
