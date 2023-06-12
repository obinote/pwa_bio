import useStyles from '@core_modules/order/pages/printInvoice/style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from '@i18n';
import { modules } from '@config';
import Typography from '@common_typography';
import get from 'lodash/get';
import detail from '../../detail/index';
import { forEach } from 'lodash';

const Summary = ({ details, showFine }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [expandedTax, setExpandedTax] = useState(true);

    function handleTaxExpandClick() {
        setExpandedTax(!expandedTax);
    }

    const { currency } = details.total.grand_total;
    const isUseRewardPoint = get(details, 'detail[0].aw_reward_points.is_use_reward_points') ?? false;
    const rewardPointAmount = get(details, 'detail[0].aw_reward_points.reward_points_amount') ?? 0;
    const isShowRewardPoint = isUseRewardPoint && rewardPointAmount !== 0;
    let adminfee = details.total.adminfee?.amount?.value ?? 0;
    let isCreditCard = false;

    if (details && details.payment_methods) {
        details.payment_methods.map(payment => {
            isCreditCard = payment.type === 'cc' ? true : false;
        });
    }

    adminfee = isCreditCard ? adminfee : 0;

    return (
        <div className={styles.summary}>
            <b>Subtotal</b>
            <span>{formatPrice(details.total.subtotal.value, details.total.subtotal.currency)}</span>

            {/* {details.total?.discounts_custom?.items && <b>Discount</b>}
            {details.total?.discounts_custom.items.map((val, index) => (
                <span key={index}>
                    {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                </span>
            ))} */}

            {details.total?.discounts_custom.items ? (
                <div className="promo-wrapper">
                    <div className="promo-item">
                        <b>{t('order:discount')}</b>
                        {details.total?.discounts_custom.items.map((val, index) => (
                            <div>
                                <Typography key={index} variant="span" letter="capitalize" className={styles.labelSummary}>
                                    {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <Typography variant="span" letter="capitalize">
                        -
                        {formatPrice(details.total?.discounts_custom.amount.value, currency)}
                    </Typography>
                </div>
            ) : null}

            {details.tier_discount.amount && (
                <>
                    <b>{t('order:tierDiscount')}</b>
                    <span>
                        -
                        {formatPrice(details.tier_discount?.amount, currency)}
                    </span>
                </>
            )}

            {details.tier_discount.nett && (
                <>
                    <b>{t('order:nett')}</b>
                    <span>{formatPrice(details.tier_discount?.nett, currency)}</span>
                </>
            )}

            {isShowRewardPoint && (
                <>
                    <b>{t('order:rewardPoint')}</b>
                    <span>{formatPrice(rewardPointAmount, currency)}</span>
                </>
            )}

            {parseFloat(details.flash_sale) > 0 && (
                <>
                    <b>{t('order:discountFlashSale')}</b>
                    <span>
                        -
                        {formatPrice(parseFloat(details.flash_sale), currency)}
                    </span>
                </>
            )}

            {details.total.total_tax && (
                <>
                    <b>{t('order:tax')}</b>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span style={{ display: 'inline-block' }}>
                            {formatPrice(details.total.total_tax.value, details.total.total_tax.currency)}
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

            {details.total.taxes.map((tax) => (
                <>
                    <b className={classNames(!expandedTax && styles.hidden, styles.showInPrint)}>
                        {tax.title}
                        {' '}
                        (
                        {tax.rate}
                        %)
                    </b>
                    <span className={classNames(!expandedTax && styles.hidden, styles.showInPrint)}>
                        {formatPrice(tax.amount.value, tax.amount.currency)}
                    </span>
                    {' '}
                </>
            ))}

            <b>{t('order:shipping')}</b>
            <span>{formatPrice(details.total.total_shipping.value, details.total.total_shipping.currency)}</span>

            {showFine && (
                <>
                    <b>{t('order:fine')}</b>
                    <span>{formatPrice(details.invoice.fine, currency)}</span>
                </>
            )}

            {details.aw_store_credit?.is_use_store_credit && (
                <>
                    <b>{t('order:credit')}</b>
                    <span>{formatPrice(details.aw_store_credit.store_credit_amount, currency)}</span>
                </>
            )}

            {modules.giftcard.enabled && details && details.aw_giftcard.giftcard_amount && (
                <>
                    <b>
                        {t('order:giftcard')}
                        {' '}
                        (
                        {details.aw_giftcard.giftcard_details.giftcard_code}
                        )
                    </b>
                    <span>{formatPrice(-details.aw_giftcard.giftcard_amount, currency)}</span>
                </>
            )}

            {details.applied_extra_fee && (
                <>
                    <b>{details.applied_extra_fee.title}</b>
                    <span>{formatPrice(details.applied_extra_fee.extrafee_value.value, details.applied_extra_fee.extrafee_value.currency)}</span>
                </>
            )}

            {isCreditCard && adminfee && (
                <>
                    <b>{t('order:adminfee')}</b>
                    <span>{formatPrice(adminfee, details.total.adminfee.amount.currency)}</span>
                </>
            )}

            <b>Grand Total</b>
            <b>{formatPrice(details.total.grand_total.value + adminfee, details.total.grand_total.currency)}</b>
        </div>
    );
};

export default Summary;
