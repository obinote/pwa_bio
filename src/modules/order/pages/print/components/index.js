import Typography from '@common_typography';
import classNames from 'classnames';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import { modules } from '@config';
import useStyles from '@core_modules/order/pages/print/style';
import Table from '@core_modules/order/pages/print/components/TableListItem';
import Link from 'next/link';
import get from 'lodash/get';
import QrGenerator from '@core_modules/order/pages/print/components/qrCode';

const PrintOrder = (props) => {
    const {
        t, detail, currency, storeConfig, paymentInfo,
    } = props;
    const styles = useStyles();
    const [baseUrl, setBaseUrl] = React.useState('');

    React.useEffect(() => {
        const { protocol, host } = window.location;
        setBaseUrl(`${protocol}//${host}`);
    }, []);

    let items = [];

    if (detail.length > 0 && detail[0].items.length) {
        const configurableProduct = [];
        detail[0].items.forEach((item) => {
            if (item.parent_item_id == null) {
                const tmp = {};
                const child = detail[0].items.filter((childItem) => childItem.parent_item_id === item.item_id);
                tmp.name = child.length ? child[0].name : item.name;
                configurableProduct.push({ ...item, ...tmp });
            }
        });
        const simpleProduct = detail[0].items.filter((item) => !configurableProduct.find(({ sku }) => item.sku === sku) && item);
        items = [...configurableProduct, ...simpleProduct];
    }

    const isUseRewardPoint = get(detail[0], 'detail[0].aw_reward_points.is_use_reward_points') ?? false;
    const rewardPointAmount = get(detail[0], 'detail[0].aw_reward_points.reward_points_amount') ?? 0;
    const isShowRewardPoint = isUseRewardPoint && rewardPointAmount !== 0;
    const useOtp = detail[0].validate_otp ?? false;

    return (
        <>
            <div className={classNames('column', styles.blockContainer)}>
                <div className={classNames(styles.blockHeader)}>
                    <div className={styles.logo_container}>
                        <div className="box header-middle__logo">
                            <Link href="/">
                                <img
                                    className="header-middle__logo-link"
                                    alt="Logo"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                        <div className="box header-middle__logo">
                            {detail[0].customer_company.logo_img_path && (
                                <img
                                    className="header-middle__logo-link"
                                    alt="Logo"
                                    src={detail[0].customer_company.logo_img_path}
                                />
                            )}
                        </div>
                    </div>
                    {/* START HEADER TITLE BLOCK */}
                    <div className={[styles.header_title_cont].join(' ')}>
                        <div className={styles.header_title_cont} style={{ alignContent: 'center' }}>
                            <Typography
                                variant="h1"
                                letter="uppercase"
                                type="semiBold"
                                className={classNames('clear-margin-padding', styles.headerTitle)}
                            >
                                {t('order:printPage:title')}
                            </Typography>
                            <Typography id="status_label" variant="span" size="14" letter="uppercase" style={{ height: 'fit-content' }}>
                                {detail[0].status_label || ''}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="p" size="14" align="right" style={{ color: '#98A2B3' }}>
                                {t('order:printPage:noSP')}
                            </Typography>
                            <Typography variant="p" size="14" align="right" type="bold" style={{ color: '#414048' }}>
                                {detail[0].sp_number || ''}
                            </Typography>
                        </div>
                    </div>
                    {/* END HEADER TITLE BLOCK */}
                </div>
                {/* START DISTRIBUTOR AND BUYER */}
                <div className={classNames(styles.block)}>
                    <div className="row start-xs start-sm start-sm start-md start-lg">
                        <div className="col-xs-12 col-xs-print-6 col-sm-6 col-md-6">
                            <Typography
                                variant="p"
                                type="bold"
                                size="14"
                                style={{ color: '#414048', marginBottom: '20px !important' }}
                                className={classNames('clear-margin-padding', 'col-xs-print-12', 'col-sm-12', 'col-md-12', 'col-xs-12')}
                            >
                                {t('order:printPage:distTitle')}
                            </Typography>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:dist')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {detail[0].distributor_name || ''}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:distCreate')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {formatDate(detail[0].order_date, 'D MMMM YYYY, HH:mm')}
                                    {' WIB'}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:distOrder')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {detail[0].order_number || ''}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-xs-12 col-xs-print-6 col-sm-6 col-md-6">
                            <Typography
                                variant="p"
                                type="bold"
                                size="14"
                                style={{ color: '#414048', marginBottom: '20px !important' }}
                                className={classNames('clear-margin-padding', 'col-xs-print-12', 'col-sm-12', 'col-md-12', 'col-xs-12')}
                            >
                                {t('order:printPage:buyerTitle')}
                            </Typography>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:buyer')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {detail[0].customer_name || ''}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:saranaName')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {detail[0].customer_company.company_name || ''}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:saranaNumber')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {detail[0].customer_company.sarana_no_izin || ''}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:printPage:buyerCreate')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    {formatDate(detail[0].order_date, 'D MMMM YYYY') || ''}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    size="14"
                                    type="regular"
                                    style={{ color: '#98A2B3' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-4', 'col-sm-4', 'col-md-4', 'col-xs-4')}
                                >
                                    {t('order:shippingAddress')}
                                </Typography>
                                <Typography
                                    variant="p"
                                    type="semiBold"
                                    size="14"
                                    style={{ color: '#414048' }}
                                    className={classNames('clear-margin-padding', 'col-xs-print-8', 'col-sm-8', 'col-md-8', 'col-xs-8')}
                                >
                                    {': '}
                                    <span>
                                        {detail[0].shipping_address.firstname || ''}
                                        {' '}
                                        {detail[0].shipping_address.lastname || ''}
                                    </span>
                                    <br />
                                    <span style={{ paddingLeft: 7 }}>
                                        {detail[0].shipping_address.telephone || ''}
                                    </span>
                                    <br />
                                    <span style={{ paddingLeft: 7, display: 'block' }}>
                                        {detail[0].shipping_address.street || ''}
                                        {' '}
                                        {detail[0].shipping_address.city || ''}
                                        {' '}
                                        {detail[0].shipping_address.region || ''}
                                        {' '}
                                        {detail[0].shipping_address.country_id || ''}
                                        {' '}
                                        {detail[0].shipping_address.postcode || ''}
                                    </span>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END DISTRIBUTOR AND BUYER */}
                <div className={classNames(styles.block)}>
                    <div className={styles.lineSeparator} />
                </div>
                {/* START DETAIL ITEM */}
                <div className={classNames(styles.block)} style={{ paddingTop: 0 }}>
                    <div>
                        <div className="col-xs-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <div>
                                <Table data={items} t={t} currency={currency} {...props} />
                            </div>
                        </div>
                        <div className="row end-xs end-sm end-md">
                            <div className="col-md-4 col-sm-4">
                                {detail[0].total.subtotal && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:subtotal')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].total.subtotal.value, currency)}
                                        </Typography>
                                    </div>
                                )}

                                {detail[0].total?.discounts_custom.items ? (
                                    <>
                                        <div className={styles.listSummary}>
                                            <div className="promo-item">
                                                <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                                    {t('order:discount')}
                                                </Typography>
                                            </div>
                                            <Typography variant="span" letter="capitalize">
                                                -
                                                {formatPrice(detail[0].total?.discounts_custom.amount.value, currency)}
                                            </Typography>
                                        </div>

                                        {detail[0].total?.discounts_custom.items.map((val, index) => (
                                            <div className={styles.wrapperSummaryDiscountDetail}>
                                                <Typography
                                                    key={index}
                                                    variant="span"
                                                    letter="capitalize"
                                                    className={styles.labelSummaryDiscountDetail}
                                                >
                                                    {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                                                </Typography>
                                            </div>
                                        ))}
                                    </>
                                ) : null}

                                {detail[0].tier_discount?.amount && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:tierDiscount')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            -
                                            {formatPrice(detail[0].tier_discount?.amount, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].tier_discount?.nett && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:nett')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].tier_discount?.nett, currency)}
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

                                {parseFloat(detail[0].flash_sale) > 0 && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:discountFlashSale')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            -
                                            {formatPrice(parseFloat(detail[0].flash_sale), currency)}
                                        </Typography>
                                    </div>
                                )}

                                {detail[0].total.total_tax && (
                                    <>
                                        <div className={styles.listSummary} role="presentation">
                                            <Typography variant="span" letter="capitalize" className={styles.labelSummaryTax}>
                                                {t('common:tax')}
                                            </Typography>
                                            <Typography variant="span" letter="capitalize">
                                                {formatPrice(detail[0].total.total_tax.value, currency)}
                                            </Typography>
                                        </div>
                                    </>
                                )}

                                {detail[0].total.total_shipping && (
                                    <div className={styles.listSummary} style={{ borderTop: '1px dashed #98A2B3' }}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:shipping')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].total.total_shipping.value, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0]?.aw_store_credit?.is_use_store_credit ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:credit')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].aw_store_credit.store_credit_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {modules.giftcard.enabled && detail[0] && detail[0].aw_giftcard.giftcard_amount ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:giftcard')}
                                            {' '}
                                            (
                                            {detail[0].aw_giftcard.giftcard_detail[0].giftcard_code}
                                            )
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(-detail[0].aw_giftcard.giftcard_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].applied_extra_fee ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {detail[0].applied_extra_fee.title}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(
                                                detail[0].applied_extra_fee.extrafee_value.value,
                                                detail[0].applied_extra_fee.extrafee_value.currency,
                                            )}
                                        </Typography>
                                    </div>
                                ) : null}
                                <div className={styles.listSummary} style={{ borderBottom: '1px dashed #98A2B3' }}>
                                    <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                                        {t('order:grandTotal')}
                                    </Typography>
                                    <Typography variant="title" type="bold" letter="capitalize">
                                        {detail[0].total.grand_total && formatPrice(detail[0].total.grand_total.value, currency)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END DETAIL ITEM */}

                <div className={classNames(styles.block)}>
                    <div className={styles.lineSeparator} />
                </div>
                {/* START PAYMENT AND DELIVERY */}
                <div className={classNames(styles.block)}>
                    <div className="row start-xs start-sm start-sm start-md start-lg">
                        {/* shipping method */}
                        {Object.keys(detail[0].shipping_address).length > 0 && (
                            <div className="col-xs-12 col-xs-print-6 col-sm-6 col-md-6">
                                <Typography variant="p" type="regular" size="14" style={{ color: '#414048' }} letter="capitalize">
                                    {t('order:shippingMethod')}
                                    {' '}
                                    :
                                </Typography>
                                <Typography variant="p" size="14" type="bold" style={{ color: '#414048' }}>
                                    {detail[0].shipping_method || ''}
                                </Typography>
                            </div>
                        )}

                        <div className="col-xs-12 col-xs-print-6 col-sm-6 col-md-6">
                            <Typography variant="p" type="regular" size="14" style={{ color: '#414048' }} letter="capitalize">
                                {t('order:paymentMethod')}
                                {' '}
                                :
                            </Typography>
                            {paymentInfo && (
                                <Typography variant="p" size="14" type="bold" style={{ color: '#414048' }}>
                                    {paymentInfo.method_title}
                                    <br />
                                    {paymentInfo.virtual_account}
                                </Typography>
                            )}
                        </div>
                    </div>
                </div>
                {/* END PAYMENT AND DELIVERY */}
                <div className={classNames(styles.block)}>
                    <div className={styles.lineSeparator} />
                </div>
                {/* START QR CODE */}
                <div className={classNames(styles.block)}>
                    {useOtp && (
                        <div>
                            <QrGenerator
                                value={`${baseUrl}/digitalsign/${detail[0].order_number}`}
                                orderid={detail[0]?.order_number}
                                size={100}
                                logoWidth={100}
                                logoImage={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                            />
                        </div>
                    )}
                    {useOtp && (
                        <div className="col-xs-12">
                            <Typography
                                variant="span"
                                size="14"
                                align="left"
                                type="semiBold"
                                style={{ color: '#414048', margin: 0 }}
                            >
                                {detail[0].customer_company.apoteker_name || ''}
                            </Typography>
                            <br />
                            <Typography
                                variant="span"
                                size="14"
                                align="left"
                                type="normal"
                                style={{ color: '#98A2B3', margin: 0 }}
                            >
                                {'No SIPA : '}
                                {' '}
                                {detail[0].customer_company.apoteker_sipa || ''}
                            </Typography>
                        </div>
                    )}
                    {!useOtp && (
                        <div>
                            <img src={detail[0].signature_img} width={130} height={90}/>
                            <Typography
                                variant="p"
                                size="14"
                                align="left"
                                type="bold"
                                style={{ color: '#414048', width: 130}}
                            >
                                {detail[0].signature_name || ''}
                            </Typography>
                        </div>
                    )}
                    <div className={styles.footer_cont} style={{ alignItems: 'end', marginTop: 24 }}>
                        <Typography
                            variant="p"
                            size="14"
                            align="left"
                            type="normal"
                            style={{ color: '#414048', maxWidth: '42%' }}
                        >
                            Surat Pesanan ini sah dan diproses oleh komputer. Silahkan scan barcode di samping untuk melihan Medbiz Digital Sign.
                        </Typography>
                        <Typography
                            variant="p"
                            size="14"
                            align="right"
                            type="normal"
                            style={{ color: '#98A2B3', maxWidth: '50%', height: 'fit-content' }}
                        >
                            {'Terakhir diperbarui: '}
                            {formatDate(detail[0].updated_at, 'D MMMM YYYY, HH:mm')}
                            {' WIB'}
                        </Typography>
                    </div>
                </div>
                {/* END QR CODE */}
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
                        .col-xs-print-6 {
                            flex-basis: 50%;
                            max-width: 50%;
                        }
                        #status_label {
                            border: 2px solid #cccccc;
                            padding: 3px;
                            margin-left: 10px !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default PrintOrder;
