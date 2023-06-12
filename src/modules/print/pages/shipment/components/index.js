import useStyles from '@src_modules/print/pages/shipment/components/style';
import Heading from '@src_modules/print/pages/shipment/components/Heading';
import ShippingTable from '@src_modules/print/pages/shipment/components/ShippingTable';
import OrderInfo from '@src_modules/print/pages/shipment/components/OrderInfo';

const PrintShipment = (props) => {
    const {
        t, storeConfig, printData,
    } = props;
    const styles = useStyles();

    return (
        <div style={{ color: '#414048', paddingBottom: '2rem' }}>
            <Heading t={t} storeConfig={storeConfig} printData={printData} />

            <div className={styles.contentWrapper}>
                <h2 className={styles.contentTitle}>
                    Shipment #
                    {printData.shipmentSection.shipment.shipment_number}
                </h2>
                <div style={{ borderBottom: '1px solid #ccc', marginBottom: 6 }} />

                <ShippingTable t={t} printData={printData} />

                <h3 className={styles.orderInfoTitle}>{t('order:orderInfo')}</h3>
                <div style={{ borderBottom: '1px solid #ccc', marginBottom: 18 }} />

                <OrderInfo t={t} printData={printData} />
            </div>
        </div>
    );
};

export default PrintShipment;
