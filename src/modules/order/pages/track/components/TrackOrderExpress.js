import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/track/style';
import classNames from 'classnames';
import Button from '@common_button';
import Image from 'next/image';

const TrackOrderExpress = (props) => {
    const { t, data } = props;
    const styles = useStyles();

    const redirectLink = (link) => {
        if (link !== '-') {
            window.open(link, '_blank');
        }
    };
    return (
        <>
            <div className={classNames(styles.trackOrderExpress)}>
                <div className={styles.leftTrackDetail}>
                    <div className={styles.senderAndRecipient}>
                        <Typography letter="capitalize" variant="h3" className={styles.titleSender}>
                            {t('trackingorder:receiverName')}
                        </Typography>
                        <Typography variant="span" type="bold">
                            {data.receipientName || '-'}
                        </Typography>
                        <Typography variant="span">
                            {data.receipientAddr || '-'}
                        </Typography>
                        <Typography variant="span" type="bold">
                            {data.receipientPhone || '-'}
                        </Typography>
                    </div>
                    <div className={styles.senderAndRecipient}>
                        <Typography letter="capitalize" variant="h3" className={styles.titleSender}>
                            {t('trackingorder:shipperName')}
                        </Typography>
                        <Typography variant="span" type="bold">
                            {data.senderName || '-'}
                        </Typography>
                        <Typography variant="span">
                            {data.senderCompany || '-'}
                        </Typography>
                        <Typography variant="span">
                            {data.senderAddr || '-'}
                        </Typography>
                        <Typography variant="span" type="bold">
                            {data.senderPhone || '-'}
                        </Typography>
                    </div>
                </div>
                <div className={styles.rightTrackDetail}>
                    <div className="track-detail-title">
                        <Image
                            src="/assets/img/img-delivery.png"
                            className={styles.img}
                            width={350}
                            height={150}
                            alt="image tracking order"
                        />
                        <Typography variant="h2" type="bold" letter="capitalize" className={styles.titleTrack}>
                            {data.copyWriting || '-'}
                        </Typography>
                    </div>
                    <div className={styles.trackDetailInformation}>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:service')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.service || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:driverName')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.courierName || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:receiptNumber')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.awb_num || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:driverPhone')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.courierPhone || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:estimateTimeArrival')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.grab_eta || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:vehicleType')}
                            </Typography>
                            <Typography variant="span" size="14" type="bold">
                                {data.vehicle || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:status')}
                            </Typography>
                            <Typography variant="span" letter="uppercase" size="14" type="bold">
                                {data.status || '-'}
                            </Typography>
                        </div>
                        <div className={styles.trackInformation}>
                            <Typography letter="capitalize" className={styles.titleInformation}>
                                {t('trackingorder:vehicleNumber')}
                            </Typography>
                            <Typography variant="span" letter="uppercase" size="14" type="bold">
                                {data.vehiclePlate || '-'}
                            </Typography>
                        </div>
                    </div>
                    <Button className={styles.btnTrack} align="right" disabled={data.url === '-'} onClick={() => redirectLink(data.url)}>
                        <Typography size="14" color="white" letter="capitalize">
                            {t('trackingorder:liveTracking')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </>
    );
};
export default TrackOrderExpress;
