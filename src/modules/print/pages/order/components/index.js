import Typography from '@common_typography';
import classNames from 'classnames';
import { formatPrice } from '@helper_currency';
import useStyles from '@src_modules/print/pages/order/components/style';
import Table from '@src_modules/print/pages/order/components/TableListItem';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useTranslation } from '@i18n';

// import get from 'lodash/get';

const PrintOrder = (props) => {
    const {
        t, storeConfig, currency, printData,
    } = props;
    const { i18n } = useTranslation();
    const styles = useStyles();
    let items = [];

    if (printData.itemSection.length > 0) {
        const configurableProduct = [];
        printData.itemSection.forEach((item) => {
            if (item.parent_item_id == null) {
                const tmp = {};
                const child = printData.itemSection.filter((childItem) => childItem.parent_item_id === item.item_id);
                tmp.name = child.length ? child[0].name : item.name;
                configurableProduct.push({ ...item, ...tmp });
            }
        });
        const simpleProduct = printData.itemSection.filter((item) => !configurableProduct.find(({ sku }) => item.sku === sku) && item);
        items = [...configurableProduct, ...simpleProduct];
    }
    const isUseRewardPoint = printData?.invoiceSection?.reward_points?.is_use_reward_points;
    const rewardPointAmount = printData?.invoiceSection?.reward_points?.reward_points_amount;
    const isShowRewardPoint = isUseRewardPoint && rewardPointAmount !== 0;
    const date = i18n.language === 'id' ? dayjs(new Date()).locale(i18n.language).format('DD MMMM YYYY') : dayjs(new Date()).format('MMMM DD, YYYY');
    const generateLabel = (label) => t(`order:labelStatus:${label}`);

    return (
        <>
            <div className={classNames('column', styles.blockContainer)}>
                <div className={classNames(styles.blockHeader)}>
                    <div className="header-middle__left">
                        <div className="box header-middle__logo">
                            <Link href="/">
                                <img
                                    className="header-middle__logo-link"
                                    alt="Logo"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <Typography
                            variant="h1"
                            letter="uppercase"
                            type="semiBold"
                            className={classNames('clear-margin-padding', styles.headerTitle)}
                        >
                            {t('order:order')}
                            {' #'}
                            {printData.order_number || ''}
                        </Typography>
                        <Typography id="status_label" variant="span" size="14" letter="uppercase">
                            {generateLabel(printData?.order_status) || ''}
                        </Typography>
                    </div>
                    <Typography variant="span" className="clear-margin-padding">
                        {date}
                    </Typography>
                </div>
                <div className={classNames(styles.block)}>
                    <div className={styles.wrapper}>
                        <div className="col-xs-12">
                            <div>
                                <Table t={t} items={items} currency={currency} {...props} />
                            </div>
                        </div>
                        <div className="row end-xs end-sm end-md">
                            <div className="col-md-4 col-sm-4">
                                {printData?.orderSection?.subtotal && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:subtotal')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(printData.orderSection?.subtotal, currency)}
                                        </Typography>
                                    </div>
                                )}

                                { printData.orderSection?.discountDetail.length > 0 ? (
                                    <>
                                        <div className={styles.listSummary}>
                                            <div className="promo-item">
                                                <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                                    {t('order:discount')}
                                                </Typography>
                                            </div>
                                            <Typography variant="span" letter="capitalize">
                                                -
                                                {formatPrice(printData.orderSection.discountAmount, currency)}
                                            </Typography>
                                        </div>

                                        {printData.orderSection?.discountDetail.map((val, index) => (
                                            <div className={styles.wrapperSummaryDiscountDetail}>
                                                <Typography
                                                    key={index}
                                                    variant="span"
                                                    letter="capitalize"
                                                    className={styles.labelSummaryDiscountDetail}
                                                >
                                                    {val}
                                                </Typography>
                                            </div>
                                        ))}
                                    </>
                                ) : null}

                                {printData?.orderSection?.tier_discount?.amount && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:tierDiscount')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            -
                                            {formatPrice(printData?.orderSection?.tier_discount?.amount, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {printData?.orderSection?.tier_discount?.nett && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:nett')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(printData?.orderSection?.tier_discount?.nett, currency)}
                                        </Typography>
                                    </div>
                                )}

                                {isShowRewardPoint && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:rewardPoint')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(rewardPointAmount, currency)}
                                        </Typography>
                                    </div>
                                )}

                                {parseFloat(printData?.orderSection?.flash_sale) > 0 && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:discountFlashSale')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            -
                                            {formatPrice(parseFloat(printData?.orderSection?.flash_sale), currency)}
                                        </Typography>
                                    </div>
                                )}

                                {printData.orderSection.total_tax !== undefined && (
                                    <>
                                        <div className={styles.listSummary} role="presentation">
                                            <Typography variant="span" letter="capitalize" className={styles.labelSummaryTax}>
                                                {t('common:tax')}
                                            </Typography>
                                            <Typography variant="span" letter="capitalize">
                                                {formatPrice(printData?.orderSection?.total_tax, currency)}
                                            </Typography>
                                        </div>
                                    </>
                                )}

                                {printData?.orderSection?.total_shipping !== undefined && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:shipping')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(printData?.orderSection?.total_shipping, currency)}
                                        </Typography>
                                    </div>
                                )}
                                <div className={styles.listSummary}>
                                    <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                                        {t('order:grandTotal')}
                                    </Typography>
                                    <Typography variant="title" type="bold" letter="capitalize">
                                        {printData?.orderSection?.grandtotal && formatPrice(printData?.orderSection?.grandtotal, currency)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.block)}>
                    <div className="row start-xs start-sm start-sm start-md start-lg">
                        <div className="col-xs-12">
                            <Typography
                                variant="span"
                                letter="capitalize"
                                type="regular"
                                className={classNames('clear-margin-padding', styles.blockLabel)}
                            >
                                {t('order:orderInfo')}
                            </Typography>
                            <hr />
                        </div>
                        {Object.keys(printData.orderSection.shipping_address).length > 0 && (
                            // shipped to block
                            <div className="col-xs-12 col-xs-print-4 col-sm-4 col-md-4">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {printData.orderSection.pickup_store && printData.orderSection.pickup_store.is_use_pickup_store
                                        ? t('order:pickupAt')
                                        : t('order:shippedTo')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {printData.orderSection.shipping_address.firstname || ''}
                                    {' '}
                                    {printData.orderSection.shipping_address.lastname || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.street || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.city || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.region || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.country_id || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.telephone || ''}
                                    <br />
                                    {printData.orderSection.shipping_address.postcode || ''}
                                </Typography>
                            </div>
                        )}
                        {printData.orderSection.pickup_store && printData.orderSection.pickup_store.is_use_pickup_store && (
                            // pickup store
                            <div className="col-xs-12 col-xs-print-3 col-sm-3 col-md-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:pickupBy')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {printData.orderSection.pickup_store.pickup_person_name}
                                    <br />
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {`Hp : ${printData.orderSection.pickup_store.pickup_person_phone}`}
                                    <br />
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {`Email : ${printData.orderSection.pickup_store.pickup_person_email}`}
                                    <br />
                                </Typography>
                            </div>
                        )}
                        {/* shipping method */}
                        {Object.keys(printData.orderSection.shipping_address).length > 0 && (
                            <div className="col-xs-3 col-xs-print-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:shippingMethod')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {printData.orderSection.shipping_methods || ''}
                                </Typography>
                            </div>
                        )}
                        {/* billing address */}
                        <div className="col-xs-12 col-xs-print-3 col-sm-3 col-md-3">
                            <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                {t('order:billingAddress')}
                            </Typography>
                            <Typography variant="span" className="clear-margin-padding">
                                {printData.orderSection.billing_address.firstname || ''}
                                {' '}
                                {printData.orderSection.billing_address.lastname || ''}
                                <br />
                                {printData.orderSection.billing_address.street || ''}
                                <br />
                                {printData.orderSection.billing_address.city || ''}
                                <br />
                                {printData.orderSection.billing_address.region || ''}
                                <br />
                                {printData.orderSection.billing_address.country_id || ''}
                                <br />
                                {printData.orderSection.billing_address.telephone || ''}
                                <br />
                                {printData.orderSection.billing_address.postcode || ''}
                            </Typography>
                        </div>
                        <div className="col-xs-12 col-xs-print-2 col-sm-2 col-md-2">
                            <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                {t('order:paymentMethod')}
                            </Typography>
                            {printData.orderSection.payment_info && (
                                <Typography variant="span" className="clear-margin-padding">
                                    {printData.orderSection.payment_info.method_title}
                                    <br />
                                    {printData.orderSection.payment_info.virtual_account}
                                </Typography>
                            )}
                        </div>
                        <div className="col-xs-12 col-xs-print-2 col-sm-2 col-md-2">
                            <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                {t('order:segmentCustomer')}
                            </Typography>
                            <Typography variant="span" className="clear-margin-padding">
                                {printData.customer_group || ''}
                            </Typography>
                        </div>
                    </div>
                </div>

            </div>
            <style jsx>
                {`
                    .header-middle__logo-link {
                        cursor: pointer;
                        width: 120px;
                    }
                    .header-middle__left {
                        padding-bottom: 30px;
                    }

                    @media only print {
                        .col-xs-print-4 {
                            flex-basis: 33.333333%;
                            max-width: 33.333333%;
                        }
                        .col-xs-print-3 {
                            flex-basis: 25%;
                            max-width: 25%;
                        }
                        .col-xs-print-2 {
                            flex-basis: 16.666666%;
                            max-width: 16.666666%;
                        }
                        .chat-plugin {
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default PrintOrder;
