/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/track/style';
import Layout from '@layout_customer';
import TrackOrderStatus from '@core_modules/order/pages/track/components/TrackOrderStatus';
import TrackOrderExpress from '@core_modules/order/pages/track/components/TrackOrderExpress';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TrackOrderView = (props) => {
    const { t, trackingOrder } = props;
    const styles = useStyles();
    return (
        <Layout t={t} activeMenu="/sales/order/track">
            <div className={styles.trackOrderWrapper}>
                <Typography variant="h1" type="bold" letter="capitalize" className={styles.title}>
                    {t('order:trackShipping')}
                    {' # '}
                    {trackingOrder.increment_id}
                </Typography>
                {trackingOrder.courier !== 'GRAB' ? (
                    <div className={styles.trackOrderView}>
                        <div className={styles.leftTrackView}>
                            <Image
                                src="/assets/img/img-delivery.png"
                                className={styles.img}
                                width={350}
                                height={150}
                                alt="image tracking order"
                            />
                            <div className={styles.trackOrderInformation}>
                                <div className={styles.orderInformation}>
                                    <Typography letter="capitalize" className={styles.titleInformation}>
                                        {t('trackingorder:awbNumber')}
                                    </Typography>
                                    <Typography variant="span" size="16" type="bold">
                                        {trackingOrder.awb_num}
                                    </Typography>
                                </div>
                                <div className={styles.orderInformation}>
                                    <Typography letter="capitalize" className={styles.titleInformation}>
                                        {t('trackingorder:shippingMethod')}
                                    </Typography>
                                    <Typography variant="span" size="16" type="bold">
                                        {trackingOrder.shipping_method}
                                    </Typography>
                                </div>
                                <div className={styles.orderInformation}>
                                    <Typography letter="capitalize" className={styles.titleInformation}>
                                        {t('trackingorder:driverName')}
                                    </Typography>
                                    <Typography variant="span" size="16" type="bold">
                                        {trackingOrder.courier}
                                    </Typography>
                                </div>
                                <div className={styles.orderInformation}>
                                    <Typography letter="capitalize" className={styles.titleInformation}>
                                        {t('trackingorder:shippingDate')}
                                    </Typography>
                                    <Typography variant="span" size="16" type="bold">
                                        {trackingOrder.shipping_date}
                                    </Typography>
                                </div>
                                <div className={styles.orderInformation}>
                                    <Typography letter="capitalize" className={styles.titleInformation}>
                                        {t('trackingorder:estimateTimeArrival')}
                                    </Typography>
                                    <Typography variant="span" size="16" type="bold">
                                        {trackingOrder.eta}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightTrackView}>
                            <TrackOrderStatus histories={trackingOrder} />
                        </div>
                    </div>
                )
                    : <TrackOrderExpress data={trackingOrder} {...props} />}
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${trackingOrder.increment_id}`} className="link-back-order">
                    <a className={styles.linkBack}>
                        {t('trackingorder:backToDetail')}
                    </a>
                </Link>
            </div>
        </Layout>
    );
};
export default TrackOrderView;
