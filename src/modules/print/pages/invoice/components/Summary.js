import React from 'react';
import { useTranslation } from '@i18n';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useStyles from '@src_modules/print/pages/invoice/components/style';

const Summary = ({ printData, currency, showFine }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [expandedTax, setExpandedTax] = React.useState(true);

    function handleTaxExpandClick() {
        setExpandedTax(!expandedTax);
    }

    const isUseRewardPoint = printData?.invoiceSection?.reward_points?.is_use_reward_points;
    const rewardPointAmount = printData?.invoiceSection?.reward_points?.reward_points_amount;
    const isShowRewardPoint = isUseRewardPoint && rewardPointAmount !== 0;

    return (
        <div className={styles.summary}>
            <b>Subtotal</b>
            <span>{formatPrice(printData.orderSection.subtotal, currency)}</span>

            {printData.orderSection.discounts_custom?.items && (
                <>
                    <b>Discount</b>
                    {printData.orderSection.discounts_custom?.items.map((val, index) => (
                        <span key={index}>
                            {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                        </span>
                    ))}
                </>
            )}

            {printData.orderSection.discounts_custom.items ? (
                <div className="promo-wrapper">
                    <div className="promo-item">
                        <b>{t('order:discount')}</b>
                        {printData.orderSection.discounts_custom?.items?.map((val, index) => (
                            <div>
                                <Typography key={index} variant="span" letter="capitalize" className={styles.labelSummary}>
                                    {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <Typography variant="span" letter="capitalize">
                        -
                        {formatPrice(printData.orderSection.discounts_custom.amount.value, currency)}
                    </Typography>
                </div>
            ) : null}

            {printData.orderSection.tier_discount.amount && (
                <>
                    <b>{t('order:tierDiscount')}</b>
                    <span>
                        -
                        {formatPrice(printData.orderSection.tier_discount?.amount, currency)}
                    </span>
                </>
            )}

            {printData.orderSection.tier_discount.nett && (
                <>
                    <b>{t('order:nett')}</b>
                    <span>{formatPrice(printData.orderSection.tier_discount.nett, currency)}</span>
                </>
            )}

            {isShowRewardPoint && (
                <>
                    <b>{t('order:rewardPoint')}</b>
                    <span>{formatPrice(rewardPointAmount, currency)}</span>
                </>
            )}

            {parseFloat(printData.orderSection.flash_sale) > 0 && (
                <>
                    <b>{t('order:discountFlashSale')}</b>
                    <span>
                        -
                        {formatPrice(parseFloat(printData.orderSection.flash_sale), currency)}
                    </span>
                </>
            )}

            {printData.orderSection.total_tax && (
                <>
                    <b>{t('order:tax')}</b>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span style={{ display: 'inline-block' }}>
                            {formatPrice(printData.orderSection.total_tax, currency)}
                        </span>
                        <span style={{ display: 'inline-block', height: 20, marginRight: '-0.5rem' }}>
                            <IconButton size="small" style={{ marginTop: -5 }} onClick={() => handleTaxExpandClick()} className={styles.hideInPrint}>
                                <ExpandMoreIcon
                                    style={{ ...(expandedTax && { transform: expandedTax && 'rotate(180deg)' }), transitionProperty: 'transform' }}
                                />
                            </IconButton>
                        </span>
                    </span>
                </>
            )}

            {printData.orderSection.taxes.map((tax) => (
                <>
                    <b className={classNames(!expandedTax && styles.hidden, styles.showInPrint)}>
                        {tax.title}
                        {' '}
                        (
                        {tax.rate}
                        %)
                    </b>
                    <span className={classNames(!expandedTax && styles.hidden, styles.showInPrint)}>
                        {formatPrice(tax.amount, currency)}
                    </span>
                    {' '}
                </>
            ))}

            <b>{t('order:shipping')}</b>
            <span>{formatPrice(printData.orderSection.total_shipping, currency)}</span>

            {showFine && (
                <>
                    <b>{t('order:fine')}</b>
                    <span>{formatPrice(printData.invoiceSection.fine, currency)}</span>
                </>
            )}
            <b>Grand Total</b>
            <b>{formatPrice(printData.orderSection.grandtotal, currency)}</b>
        </div>
    );
};

export default Summary;
