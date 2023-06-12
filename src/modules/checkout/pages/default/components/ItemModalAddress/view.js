import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import React from 'react';
import AddressFormDialog from '@plugin_addressform';
import useStyles from '@core_modules/checkout/pages/default/components/ItemModalAddress/style';

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
        address_label = '',
        value = '',
        checked = false,
        loading,
        open,
        setOpen,
        handleSave,
        success,
        t,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const styles = useStyles();
    const checkoutListItemAddressId = 'checkoutListItemAddress';

    /**
     * Set radio's attribute data label that will be used
     * for displaying translated label on style.js
     */
    const setRadioDataLabel = () => {
        const divRadioElems = document.querySelectorAll(`#${checkoutListItemAddressId} .MuiIconButton-label div:last-child`);
        divRadioElems.forEach((elem) => {
            // eslint-disable-next-line no-param-reassign
            elem.dataset.label = t('checkout:address:use');
        });
    };

    React.useEffect(() => {
        setRadioDataLabel();
    }, []);

    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleSave}
                loading={loading}
                success={success}
                setOpen={() => setOpen(false)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div className={styles.addressColumn} id={checkoutListItemAddressId}>
                <div className={[styles.address_content].join(' ')}>
                    <FormControlLabel
                        className={[styles.address_shipping].join(' ')}
                        value={value}
                        checked={checked}
                        control={<Radio color="primary" size="small" className={styles.select_button} />}
                        label={(
                            <div className={styles.address_wrapper}>
                                <Typography className={[styles.address_text].join(' ')} variant="h3">
                                    {address_label}
                                </Typography>
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
                            </div>
                        )}
                        labelPlacement="end"
                    />
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
