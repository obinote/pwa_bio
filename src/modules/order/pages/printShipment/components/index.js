import { useTranslation } from '@i18n';
import useStyles from '@core_modules/order/pages/printShipment/style';
import ShippingTable from './ShippingTable';
import 'dayjs/locale/id';
import Heading from './Heading';
import OrderInfo from './OrderInfo';

const PrintOrder = ({ storeConfig, details }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const shipment = details.shipments[0];

    return (
        <div style={{ color: '#414048', paddingBottom: '2rem' }}>
            <Heading storeConfig={storeConfig} details={details} />

            <div className={styles.contentWrapper}>
                <h2 className={styles.contentTitle}>
                    Shipment #
                    {shipment.number}
                </h2>
                <div style={{ borderBottom: '1px solid #ccc', marginBottom: 6 }} />

                <ShippingTable details={details} />

                <h3 className={styles.orderInfoTitle}>{t('order:orderInfo')}</h3>
                <div style={{ borderBottom: '1px solid #ccc', marginBottom: 18 }} />

                <OrderInfo details={details} />
            </div>
        </div>
    );
};

export default PrintOrder;
