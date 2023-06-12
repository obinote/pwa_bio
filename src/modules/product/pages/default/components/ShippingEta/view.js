/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '@core_modules/product/pages/default/components/ShippingEta/style';
import Typography from '@common_typography';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { formatPrice } from '@helper_currency';

const View = (props) => {
    const {
        open, handleClose, handleOpen, t, formattedData, globalCurrency,
    } = props;
    const { dataShipping, mainText } = formattedData;
    const styles = useStyles();
    const estimateTime = mainText?.estimation ?? null;
    const estimateTimeMethod = mainText?.method ?? null;

    let estimateTimeText;
    if (estimateTime === 'hari ini atau besok') {
        estimateTimeText = t('product:shipping_eta:estimate_time_sameday');
    } else if (estimateTime && estimateTime.includes('hari')) {
        const splitDayParent = estimateTime.split('hari');
        estimateTimeText = splitDayParent[0] + t('product:shipping_eta:day');
    } else if (estimateTime && estimateTime.includes('Jam')) {
        const splitHourParent = estimateTime.split('Jam');
        estimateTimeText = splitHourParent[0] + t('product:shipping_eta:hour');
    } else if (estimateTime && estimateTimeMethod.includes('In House Delivery')) {
        if (estimateTime > 1) {
            estimateTimeText = estimateTime + t('product:shipping_eta:inHouseDays');
        } else {
            estimateTimeText = estimateTime + t('product:shipping_eta:inHouseDay');
        }
    } else {
        estimateTimeText = estimateTime;
    }

    if (dataShipping && dataShipping.length === 0) {
        return null;
    }

    const RenderCarrierName = ({ d }) => d.map((value, i_carrier) => (
        <>
            <Typography variant="p" type="bold" size="14" key={i_carrier} letter="capitalize" className={classNames(styles.carrierGroup)}>
                {value?.carrierName}
            </Typography>
            {value?.data.map((carrier_child, idx_child) => {
                let estimationShipping = '';
                if (carrier_child.estimation !== 'hari ini atau besok' && carrier_child.estimation !== null) {
                    if (carrier_child.estimation.includes('hari')) {
                        const splitDay = carrier_child.estimation.split('hari');
                        estimationShipping = splitDay[0] + t('product:shipping_eta:day');
                    } else if (carrier_child.estimation.includes('Jam')) {
                        const splitHour = carrier_child.estimation.split('Jam');
                        estimationShipping = splitHour[0] + t('product:shipping_eta:hour');
                    } else if (estimateTimeMethod.includes('In House Delivery')) {
                        if (carrier_child.estimation > 1) {
                            estimationShipping = carrier_child.estimation + t('product:shipping_eta:inHouseDays');
                        } else {
                            estimationShipping = carrier_child.estimation + t('product:shipping_eta:inHouseDay');
                        }
                    } else {
                        estimationShipping = carrier_child.estimation;
                    }
                } else {
                    estimationShipping = carrier_child.estimation === 'hari ini atau besok'
                        ? t('product:shipping_eta:estimate_time_sameday') : carrier_child.estimation;
                }
                return (
                    <div key={carrier_child.carrier + idx_child}>
                        <Typography variant="p" type="400" size="14" className={classNames(styles.carrierMethod)}>
                            <span className={classNames(styles.carrierLabel)}>{carrier_child.label} - </span>
                            {formatPrice(carrier_child.price, globalCurrency)} <br />
                            {t('product:shipping_eta:estimate_time')} {estimationShipping}
                        </Typography>
                    </div>
                );
            })}
        </>
    ));
    return (
        <div className={styles.root}>
            <Typography variant="p" type="bold" size="14" className={styles.popupTitle}>
                {t('product:shipping_eta:title')}
            </Typography>
            <div className={classNames(styles.container)}>
                <div className={styles.iconShipping} />
                <div className={styles.textWrapper}>
                    <Typography variant="p" size="14" className={styles.textDetail}>
                        {t('product:shipping_eta:estimate_courrier')}
                        <span className={classNames(styles.carrierLabel)}> {mainText?.carrier} - </span>
                        {formatPrice(mainText?.price, globalCurrency)}
                        <br />
                        {t('product:shipping_eta:estimate_time')} {estimateTimeText}
                    </Typography>

                    <Typography variant="span" className={styles.textAction} onClick={handleOpen}>
                        {t('product:shipping_eta:other_shipping')}
                    </Typography>
                </div>
            </div>

            {!open ? (
                <></>
            ) : (
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={styles.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={styles.popup}>
                                <div className={styles.popupHeader}>
                                    <Typography variant="p" type="bold" size="14" className={styles.popupTitle}>
                                        {t('product:shipping_eta:title')}
                                    </Typography>
                                    <div className={styles.btnClose} onClick={handleClose}>
                                        <CloseOutlinedIcon />
                                    </div>
                                </div>
                                <div className={styles.popupBody}>
                                    <RenderCarrierName d={dataShipping} />
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default View;
