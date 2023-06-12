import { formatPrice } from '@helper_currency';
import config from '@config';
import propTypes from 'prop-types';

const CoreSummary = (props) => {
    const {
        DesktopView, MobileView, isDesktop, dataCart, globalCurrency = 'IDR',
        storeConfig, ...other
    } = props;
    const { t } = other;
    const { modules } = config;
    let dataSummary = [];
    let dataSummaryTax = [];
    let total = 0;
    let totalTax = 0;
    const maxSize = storeConfig.max_size;
    const {
        prices = {},
        items = [],
        applied_store_credit = {},
        applied_reward_points = {},
        shipping_addresses = [],
        applied_extra_fee = {},
        selected_payment_method = {},
    } = dataCart;

    let {
        applied_giftcard = {},
    } = dataCart;

    if (modules.giftcard.useCommerceModule) {
        applied_giftcard = dataCart.applied_gift_cards;
    }

    if (dataCart && items) {
        let subtotal;
        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            subtotal = formatPrice(Math.round(prices.subtotal_excluding_tax.value), prices.subtotal_excluding_tax.currency || globalCurrency);
        } else {
            subtotal = formatPrice(Math.round(prices.subtotal_including_tax.value), prices.subtotal_including_tax.currency || globalCurrency);
            if (prices.grand_total.value === 0) {
                subtotal = formatPrice(Math.round(prices.subtotal_excluding_tax.value), prices.subtotal_excluding_tax.currency || globalCurrency);
            }
        }

        total = prices.grand_total;
        const [shipping] = shipping_addresses;

        dataSummary.push({ item: 'Subtotal', value: subtotal });

        if (modules.checkout.extraFee.enabled && applied_extra_fee && applied_extra_fee.extrafee_value) {
            dataSummary.push({
                item: applied_extra_fee.title || '',
                value: formatPrice(Math.round(applied_extra_fee.extrafee_value.value) || 0, globalCurrency),
            });
        }

        if (prices && prices.tier_price && Object.keys(prices.tier_price).length) {
            const tierPrice = {
                item: prices.tier_price.label,
                value: formatPrice(Math.round(prices.tier_price.amount.value), prices.tier_price.amount.currency),
            };
            dataSummary = dataSummary.concat(tierPrice);
        }

        if (prices && prices.discounts && prices.discounts.length) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(Math.round(disc.amount.value), disc.amount.currency);
                return { item: `${t('cart:discount')} (${disc.label})`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(discounts);
        }

        if (prices && prices.flash_sale && prices.flash_sale.amount) {
            const flashSaleDiscount = {
                // prices.flash_sale.label
                item: t('cart:discountFlashSale'),
                value: formatPrice(Math.round(prices.flash_sale.amount.value), prices.flash_sale.amount.currency),
            };
            dataSummary = dataSummary.concat(flashSaleDiscount);
        }

        if (prices && prices.nett && Object.keys(prices.nett).length) {
            const nett = {
                item: prices.nett.label,
                value: formatPrice(Math.round(prices.nett.amount.value), prices.nett.amount.currency),
            };
            dataSummary = dataSummary.concat(nett);
        }

        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            const taxes = prices.applied_taxes.reduce(
                (prev, curr) => ({
                    value: prev.value + curr.amount.value,
                    currency: curr.amount.currency,
                    percent: curr.percent,
                }),
                { value: 0 },
            );
            const taxesAll = prices.applied_taxes.map((tax) => {
                const price = formatPrice(Math.round(tax.amount.value), tax.amount.currency);
                return { item: `${tax.label} (${tax.percent}%)`, value: price };
            });

            const price = formatPrice(Math.round(taxes.value), taxes.currency);
            totalTax = price;
            dataSummaryTax = dataSummaryTax.concat(taxesAll);
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            const price = formatPrice(Math.round(shippingMethod.amount.value), shippingMethod.amount.currency);
            dataSummary.push({ item: `Shipping (${shippingMethod.carrier_title} - ${shippingMethod.method_title})`, value: price });
        }

        if (modules.storecredit.enabled) {
            let price = '';
            if (modules.storecredit.useCommerceModule && applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
                price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency);
            } else if (applied_store_credit.is_use_store_credit) {
                price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
            }
            if (price !== '') dataSummary.push({ item: ' ', value: `-${price}` });
        }

        if (modules.rewardpoint.enabled && applied_reward_points.is_use_reward_points) {
            const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
            dataSummary.push({ item: `${t('common:summary:rewardPoint')} `, value: `-${price}` });
        }

        if (modules.giftcard.enabled && applied_giftcard) {
            let giftCards = [];
            if (modules.giftcard.useCommerceModule) {
                if (applied_giftcard && applied_giftcard.length > 0) {
                    giftCards = applied_giftcard.map((item) => {
                        const price = formatPrice(Math.abs(item.applied_balance.value), globalCurrency);
                        return { item: `${t('common:summary:giftCard')} (${item.code}) - ${price}`, value: `-${price}` };
                    });
                }
            } else {
                giftCards = applied_giftcard.giftcard_detail.map((item) => {
                    const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                    return { item: `${t('common:summary:giftCard')} (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                });
            }
            dataSummary = dataSummary.concat(giftCards);
        }

        // if (modules.promo.enabled && applied_coupons && applied_coupons.length > 0) {
        //     dataSummary.push({
        //         item: `Promo (${applied_coupons[0].code})`,
        //         value: '',
        //     });
        // }

        if (selected_payment_method && selected_payment_method.code && selected_payment_method.code === "cc") {
            if (prices && prices.adminfee && Object.keys(prices.adminfee).length) {
                const adminfee = {
                    item: prices.adminfee.label,
                    value: formatPrice(Math.round(prices.adminfee.amount.value), prices.adminfee.amount.currency),
                };
                dataSummary = dataSummary.concat(adminfee);
            }
        }
    }

    if (isDesktop) {
        return (
            <DesktopView
                items={items}
                summary={
                    {
                        total,
                        totalTax,
                        data: dataSummary,
                        dataTax: dataSummaryTax,
                    }
                }
                isDesktop={isDesktop}
                {...other}
                dataCart={dataCart}
                maxSize={maxSize}
            />
        );
    }

    return (
        <MobileView
            items={items}
            summary={
                {
                    total,
                    totalTax,
                    data: dataSummary,
                    dataTax: dataSummaryTax,
                }
            }
            {...other}
            t={t}
            dataCart={dataCart}
            maxSize={maxSize}
        />
    );
};

CoreSummary.propTypes = {
    deleteCart: propTypes.func,
    updateCart: propTypes.func,
    withAction: propTypes.bool,
};

CoreSummary.defaultProps = {
    deleteCart: () => { },
    updateCart: () => { },
    withAction: false,
};

export default CoreSummary;
