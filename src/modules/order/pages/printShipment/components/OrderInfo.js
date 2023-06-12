import { useTranslation } from '@i18n';
import useStyles from '@core_modules/order/pages/printShipment/style';
import Box from '@material-ui/core/Box';

const OrderInfo = ({ details }) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div className={styles.orderInfo}>
            <div>
                <h4>{t('order:shippingAddress')}</h4>
                <p>
                    {details.shipping_address.firstname}
                    {' '}
                    {details.shipping_address.lastname}
                    <br />
                    {details.shipping_address.street}
                    <br />
                    {details.shipping_address.city}
                    <br />
                    {details.shipping_address.region}
                    <br />
                    {details.shipping_address.telephone}
                    <br />
                    {details.shipping_address.postcode}
                </p>
            </div>

            <div>
                <h4>{t('order:segmentCustomer')}</h4>
                <p>{details.customer_group}</p>
            </div>

            <div>
                <h4>{t('order:shippingMethod')}</h4>
                <p>{details.shipping_method}</p>

                <Box component="p" mt="1.5rem">
                    <b>
                        {details.shipments[0].tracking[0].title}
                        {' '}
                    </b>
                    {details.shipments[0].tracking[0].number}
                </Box>
            </div>

            <div>
                <h4>{t('order:billingAddress')}</h4>
                <p>
                    {details.billing_address.firstname}
                    {' '}
                    {details.shipping_address.lastname}
                    <br />
                    {details.billing_address.street}
                    <br />
                    {details.billing_address.city}
                    <br />
                    {details.billing_address.region}
                    <br />
                    {details.billing_address.telephone}
                    <br />
                    {details.billing_address.postcode}
                </p>
            </div>

            <div>
                <h4>{t('order:paymentMethod')}</h4>
                <p>{details.payment_methods[0].name}</p>
            </div>
        </div>
    );
};

export default OrderInfo;
