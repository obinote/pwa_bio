/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/Accordion';
import MuiExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import MuiExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import Arrow from '@material-ui/icons/ArrowDropDown';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import TravelokaPayForm from '@core_modules/checkout/pages/default/components/payment/components/TravelokaPayForm';
import FieldPoint from '@core_modules/checkout/components/fieldcode';
import Radio from '@common_forms/Radio';
import RadioItem from '@core_modules/checkout/components/radioitempayment';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { ExpanDetailStyle, ExpanPanelStyle, ExpanSummaryStyle } from './style';

const ExpansionPanel = withStyles(ExpanPanelStyle)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(ExpanSummaryStyle)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(ExpanDetailStyle)(MuiExpansionPanelDetails);

const PO = 'purchaseorder';
const PaypalCode = 'paypal_express';
const travelokapay = 'travelokapay';
const snapbilling = 'snapbilling';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const RegularCredits = ({ vendor, checkout }) => {
    const grandTotal = checkout?.data?.cart?.prices?.grand_total.value;
    const styles = useStyles();
    const dataVendor = vendor.map((itemVendor, itemIndex) => (
        <div key={itemIndex} className={styles.creditVendor}>
            <strong>{itemVendor.vendor_name}</strong>
            <span>{itemVendor.regular_credit_amount_formatted}</span>

            {grandTotal > itemVendor.regular_credit_amount ? (
                <Typography className={styles.exceedLimit} variant="p">
                    Credit anda kurang dari jumlah pesanan.
                </Typography>
            ) : (
                ''
            )}

            <Typography className={styles.topInfo} variant="p">
                {`Tenor ${itemVendor.top} Hari`}
            </Typography>
        </div>
    ));
    return dataVendor;
};

const Content = ({
    loading,
    data,
    checkout,
    handlePayment,
    handlePurchaseOrder,
    handlePurchaseOrderSubmit,
    selected,
    paypalTokenData,
    paypalHandlingProps,
    initialOptionPaypal,
    travelokaPayRef,
    vendor,
    storeConfig,
}) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(null);
    const [expandedActive, setExpandedActive] = useState(true);
    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        setExpandedActive(false);
    };

    if (loading.payment || loading.addresses || loading.setshipping || loading.all) {
        return <Loader />;
    }

    if (data.cart.prices.grand_total.value === 0) {
        return <Typography variant="p">{t('checkout:noNeedPayment')}</Typography>;
    }

    if (data.paymentMethod.length !== 0) {
        let paymentConfig = JSON.parse(`${storeConfig.payments_configuration}`);
        const groups = paymentConfig ? Object.keys(paymentConfig) : [];
        // create grouping by config
        paymentConfig = groups.map((key) => {
            const groupData = [];
            let config = paymentConfig[key];
            config = config.split(',');
            for (let idx = 0; idx < data.paymentMethod.length; idx++) {
                const element = data.paymentMethod[idx];
                for (let idc = 0; idc < config.length; idc++) {
                    if (config[idc] === element.code) {
                        groupData.push(element);
                    }
                }
            }
            let active = false;
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                if (selected.payment) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        if (element.code === selected.payment) {
                            active = true;
                        }
                    }
                }
            }
            return {
                group: key,
                data: groupData,
                active,
            };
        });

        // check if have active on group data by default selected if
        let itemActive = false;
        if (paymentConfig) {
            for (let idx = 0; idx < paymentConfig.length; idx += 1) {
                const element = paymentConfig[idx];
                if (element.active) {
                    itemActive = true;
                }
            }
        }

        return (
            <div>
                {paymentConfig && (
                    <div className={styles.paymentExpansionContainer}>
                        {paymentConfig.map((item, index) => {
                            if (item.data.length !== 0) {
                                return (
                                    <ExpansionPanel
                                        expanded={
                                            expanded === index // if key index same with expanded active
                                            || (item.active && expandedActive) // expand if item active and not change expand
                                            || (!itemActive && expandedActive && index === 0)
                                        } // if dont have item active, set index 0 to active
                                        onChange={handleChange(index)}
                                        key={index}
                                    >
                                        <ExpansionPanelSummary
                                            aria-controls="panel1d-content"
                                            id={`panel-${item.group}`}
                                            expandIcon={<Arrow className={styles.icon} />}
                                        >
                                            <div className={styles.labelSummary}>
                                                <Typography letter="capitalize" variant="span" type="bold" size="14">
                                                    {t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)
                                                    === `paymentGrouping.${item.group.replace('pg-', '')}`
                                                        ? item.group.replace('pg-', '')
                                                        : t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)}
                                                </Typography>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Grid container>
                                                {item.data.length !== 0 ? (
                                                    <Grid item xs={12}>
                                                        <Radio
                                                            value={selected.payment}
                                                            onChange={handlePayment}
                                                            valueData={item.data}
                                                            CustomItem={RadioItem}
                                                            ComponentOptional={(item) => {
                                                                const isPurchaseOrder = item.code === PO && selected.payment === PO;
                                                                const isPaypal = item.code === PaypalCode && selected.payment === PaypalCode;
                                                                /* eslint-disable-next-line max-len */
                                                                const isTravelokaPay = item.code === travelokapay && selected.payment === travelokapay;
                                                                const isSnapBilling = item.code === snapbilling;

                                                                if (isPurchaseOrder) {
                                                                    return (
                                                                        <Grid item xs={12}>
                                                                            <FieldPoint
                                                                                id="purchase-order"
                                                                                name="purchase-order"
                                                                                placeholder={t('checkout:purchaseOrderNumber')}
                                                                                action={handlePurchaseOrderSubmit}
                                                                                onChange={handlePurchaseOrder}
                                                                                value={checkout.selected.purchaseOrderNumber || ''}
                                                                                disabled={checkout.loading.purchaseOrderNumber}
                                                                                loading={checkout.loading.purchaseOrderNumber}
                                                                                styleFrame={{ marginTop: 0, marginBottom: 0 }}
                                                                                styleFrameText={{ marginTop: 0, marginBottom: 0 }}
                                                                                styleTextField={{ marginTop: 0, marginBottom: 0 }}
                                                                            />
                                                                        </Grid>
                                                                    );
                                                                }
                                                                if (
                                                                    isPaypal
                                                                    && !paypalTokenData.loading
                                                                    && initialOptionPaypal['data-order-id'] !== ''
                                                                ) {
                                                                    return (
                                                                        <Grid item xs={12} lg="3" md="4">
                                                                            <PayPalScriptProvider defer options={initialOptionPaypal}>
                                                                                <PayPalButtons
                                                                                    style={{ layout: 'horizontal' }}
                                                                                    {...paypalHandlingProps}
                                                                                />
                                                                            </PayPalScriptProvider>
                                                                        </Grid>
                                                                    );
                                                                }
                                                                if (isTravelokaPay) {
                                                                    return (
                                                                        <TravelokaPayForm
                                                                            checkout={checkout}
                                                                            payment_travelokapay_bin_whitelist={
                                                                                storeConfig.payment_travelokapay_bin_whitelist
                                                                            }
                                                                            payment_travelokapay_public_key={
                                                                                storeConfig.payment_travelokapay_public_key
                                                                            }
                                                                            payment_travelokapay_user_id={storeConfig.payment_travelokapay_user_id}
                                                                            travelokaPayRef={travelokaPayRef}
                                                                        />
                                                                    );
                                                                }

                                                                if (isSnapBilling) {
                                                                    return <RegularCredits vendor={vendor} checkout={checkout} />;
                                                                }

                                                                return null;
                                                            }}
                                                            propsItem={{
                                                                borderBottom: false,
                                                                RightComponent: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                ) : null}
                                            </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    }

    if (checkout.selected.delivery === 'pickup') {
        return <Typography variant="p">{t('checkout:noPaymentPickup')}</Typography>;
    }

    return <Typography variant="p">{t('checkout:noPayment')}</Typography>;
};

export default Content;
