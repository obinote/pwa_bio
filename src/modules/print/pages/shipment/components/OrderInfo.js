import useStyles from '@core_modules/print/pages/shipment/components/style';
import Box from '@material-ui/core/Box';

const OrderInfo = ({ t, printData }) => {
    const styles = useStyles();

    return (
        <div className={styles.orderInfo}>
            <div>
                <h4>{t('order:shippingAddress')}</h4>
                <p>
                    {printData.shipmentSection.shipping_address.firstname}
                    {' '}
                    {printData.shipmentSection.shipping_address.lastname}
                    <br />
                    {printData.shipmentSection.shipping_address.street}
                    <br />
                    {printData.shipmentSection.shipping_address.city}
                    <br />
                    {printData.shipmentSection.shipping_address.region}
                    <br />
                    {printData.shipmentSection.shipping_address.telephone}
                    <br />
                    {printData.shipmentSection.shipping_address.postcode}
                </p>
            </div>

            <div>
                <h4>{t('order:segmentCustomer')}</h4>
                <p>{printData.shipmentSection.customer_group}</p>
            </div>

            <div>
                <h4>{t('order:shippingMethod')}</h4>
                <p>{printData.shipmentSection.shipping_methods}</p>

                <Box component="p" mt="1.5rem">
                    <b>
                        {printData.shipmentSection.shipment.tracking.title}
                        {' '}
                    </b>
                    {printData.shipmentSection.shipment.tracking.number}
                </Box>
            </div>

            <div>
                <h4>{t('order:billingAddress')}</h4>
                <p>
                    {printData.shipmentSection.billing_address.firstname}
                    {' '}
                    {printData.shipmentSection.shipping_address.lastname}
                    <br />
                    {printData.shipmentSection.billing_address.street}
                    <br />
                    {printData.shipmentSection.billing_address.city}
                    <br />
                    {printData.shipmentSection.billing_address.region}
                    <br />
                    {printData.shipmentSection.billing_address.telephone}
                    <br />
                    {printData.shipmentSection.billing_address.postcode}
                </p>
            </div>

            <div>
                <h4>{t('order:paymentMethod')}</h4>
                <p>{printData.shipmentSection.payment_methods.name}</p>
            </div>
        </div>
    );
};

export default OrderInfo;
