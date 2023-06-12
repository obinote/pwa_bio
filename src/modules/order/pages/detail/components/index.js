/* eslint-disable no-plusplus */
/* eslint-disable radix */
import { useState } from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
// import Layout from '@layout_customer';
import { modules } from '@config';
import useStyles from '@core_modules/order/pages/detail/style';
import ItemProduct from '@core_modules/order/pages/detail/components/product';
import Paper from '@material-ui/core/Paper';
import TableListProduct from '@core_modules/order/pages/detail/components/TableListItem';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import OrderStatusIcon from '@core_modules/order/pages/detail/components/OrderStatusIcon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import RequisitionPopover from '@core_modules/order/pages/detail/components/Requisition';
import Modal from '@core_modules/order/pages/detail/components/Requisition/Modal';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ModalComplete from '@core_modules/order/pages/detail/components/OrderComplete/ModalComplete';
import ModalRating from '@core_modules/order/pages/detail/components/OrderComplete/ModalRating';
import BlockRating from '@core_modules/order/pages/detail/components/OrderComplete/BlockRating';
import Rating from '@material-ui/lab/Rating';
import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit';
import Button from '@common_button';
import dayjs from 'dayjs';
import { setCheckoutData } from '@helper_cookies';
import ImageReviewModal from '@core_modules/distributor/pages/detail/components/review/modal';
import useDateFormatter from '@helpers/useDateFormatter';
import get from 'lodash/get';

const DetailSummary = (props) => {
    const {
        detail, styles, openTax, currency, t, handleClickTax, fine, storeConfig, credit_memos, tabIndex
    } = props;
    const icon = '/assets/img/warning.svg';
    const { fine_management_status: isFineActive } = storeConfig || {};
    const paymentMethods = detail[0].payment_methods || [];
    const isCredit = paymentMethods.filter((item) => item.type === 'checkmo' || item.type === 'snapbilling').length > 0;
    const fineAmount = fine ?? 0;
    const isShowFine = isFineActive && isCredit && fineAmount > 0;
    let grandTotal = detail[0]?.total?.grand_total?.value ?? 0;
    let subTotal = detail[0]?.total?.subtotal.value ?? 0;
    let totalTax = detail[0].total.total_tax;
    let totalTaxes = detail[0].total.taxes;
    let totalShipping = detail[0].total.total_shipping;
    if (credit_memos && credit_memos.length > 0) {
        grandTotal = credit_memos[0]?.total?.grand_total?.value ?? 0;
        subTotal = credit_memos[0]?.total?.subtotal?.value ?? 0;
        totalTax = credit_memos[0]?.total?.total_tax;
        totalTaxes = credit_memos[0]?.total?.taxes;
        totalShipping = credit_memos[0]?.total?.total_shipping;
    }
    const grandTotalFine = grandTotal + fineAmount;
    const formatDate = useDateFormatter();
    let dueDate = formatDate(detail[0]?.due_date_order) ?? '';
    dueDate = dueDate.split(', ')[0] ?? '';

    const isUseRewardPoint = get(detail[0], 'detail[0].aw_reward_points.is_use_reward_points') ?? false;
    const rewardPointAmount = get(detail[0], 'detail[0].aw_reward_points.reward_points_amount') ?? 0;
    const isShowRewardPoint = isUseRewardPoint && rewardPointAmount !== 0;
    let  adminfee = detail[0].total?.adminfee?.amount.value ?? 0;
    let isCreditCard = false;

    if (detail[0] && detail[0].payment_methods) {
        detail[0].payment_methods.map(payment => {
            isCreditCard = payment.type === 'cc' ? true : false;
        });
    }
    adminfee = isCreditCard && tabIndex === 1 ? adminfee : 0;

    return (
        <div className={classNames('subtotal', styles.block)}>
            <div className="row end-md">
                <div className="col-xs-12 col-sm-6 col-md-7 hidden-mobile" />
                <div className="col-xs-12 col-sm-6 col-md-5">
                    {detail[0].total.subtotal && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                {t('order:subtotal')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(subTotal, currency)}
                            </Typography>
                        </div>
                    )}

                    {credit_memos && credit_memos.length === 0 && detail[0].total?.discounts_custom.items ? (
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
                            <div className={styles.listSummary}>
                                <div className="promo-item">
                                    {detail[0]?.total?.discounts_custom?.items?.map((val, index) => (
                                        <div key={index}>
                                            <Typography variant="span" letter="capitalize" className={styles.labelSummaryDiscountDetail}>
                                                {`${val.rule_name}${val.coupon_code ? ` (${val.coupon_code})` : ''}`}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : null}

                    {credit_memos && credit_memos.length === 0 && detail[0].tier_discount?.amount && (
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
                    {credit_memos && credit_memos.length === 0 && detail[0].tier_discount?.nett && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                {t('order:nett')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(detail[0].tier_discount?.nett, currency)}
                            </Typography>
                        </div>
                    )}

                    {credit_memos && credit_memos.length === 0 && isShowRewardPoint && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                {t('order:rewardPoint')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(rewardPointAmount, currency)}
                            </Typography>
                        </div>
                    )}

                    {credit_memos && credit_memos.length === 0 && parseFloat(detail[0].flash_sale) > 0 && (
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

                    {totalTax && (
                        <>
                            <div className={styles.listSummary} role="presentation" onClick={() => handleClickTax()}>
                                <Typography variant="span" letter="capitalize" className={styles.labelSummaryTax}>
                                    {t('order:tax')}
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    {formatPrice(totalTax.value, currency)}
                                </Typography>
                                <div className={styles.iconWrapper}>
                                    {openTax ? <ExpandLess className={styles.arrowIcon} /> : <ExpandMore className={styles.arrowIcon} />}
                                </div>
                            </div>
                            <Collapse in={openTax} timeout="auto">
                                {totalTaxes
                                    && totalTaxes.map((itemTax, keyTax) => (
                                        <div key={keyTax} className={styles.listSummary}>
                                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                                {`${itemTax.title} (${itemTax.rate}%)`}
                                            </Typography>
                                            <Typography variant="span" letter="capitalize">
                                                {formatPrice(itemTax.amount.value, currency)}
                                            </Typography>
                                        </div>
                                    ))}
                            </Collapse>
                        </>
                    )}
                    {totalShipping && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                {t('order:shipping')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(totalShipping.value, currency)}
                            </Typography>
                        </div>
                    )}

                    {modules.giftcard.enabled && detail[0].total.total_giftcard.value ? (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                {t('order:giftcard')}
                                {' '}
                                (
                                {/* {detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code} */}
                                )
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(-detail[0].total.total_giftcard.value, currency)}
                            </Typography>
                        </div>
                    ) : null}

                    {tabIndex === 1 && isCreditCard && (
                        <div className={classNames(styles.listSummary)}>
                            <Typography variant="title" letter="capitalize" className={styles.labelSummary}>
                                {t('order:adminfee')}
                            </Typography>
                            <Typography variant="title" letter="capitalize">
                                {formatPrice(adminfee, currency)}
                            </Typography>
                        </div>
                    )}

                    <div className={classNames(styles.listSummary, styles.grandTotal)}>
                        <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                            {isShowFine ? t('order:total') : t('order:grandTotal')}
                        </Typography>
                        <Typography variant="title" type="bold" letter="capitalize">
                            {formatPrice(grandTotal + adminfee, currency)}
                        </Typography>
                    </div>
                </div>
            </div>
            {credit_memos && credit_memos.length === 0 && isShowFine ? (
                <>
                    <div className={classNames(styles.dividerTotal)} />
                    <div className={classNames('row end-md')}>
                        <div className={classNames('col-xs-12 col-sm-6 col-md-7 hidden-mobile', styles.dueDateContainer)}>
                            <div className={classNames(styles.dueDateWrapper)}>
                                <img src={icon} alt="warning-icon" className={classNames(styles.dueDateImg)} />
                                <span className={classNames(styles.dueDateLabel)}>{`${t('order:dueDate2')} ${dueDate}`}</span>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5">
                            <div className={styles.listSummary}>
                                <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                    {t('order:fine')}
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    {formatPrice(fineAmount, currency)}
                                </Typography>
                            </div>
                            <div className={classNames(styles.listSummary, styles.grandTotal)}>
                                <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                                    {t('order:grandTotal')}
                                </Typography>
                                <Typography variant="title" type="bold" letter="capitalize">
                                    {formatPrice(grandTotalFine, currency)}
                                </Typography>
                            </div>
                        </div>
                        <div className={classNames('col-xs-12 col-sm-6 col-md-7 hidden-desktop', styles.dueDateContainer)}>
                            <div className={classNames(styles.dueDateWrapper)}>
                                <img src={icon} alt="warning-icon" className={classNames(styles.dueDateImg)} />
                                <span className={classNames(styles.dueDateLabel)}>{`${t('order:dueDate2')} ${dueDate}`}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

const ButtonPay = (props) => {
    const {
        detail, paymentInfo, paymentPrefixCodeOnSuccess, handleOpenXendit, handleOpenBriCeria, styles, t,
    } = props;

    if (
        (detail[0].status === 'pending' || detail[0].status === 'pending_payment')
        && paymentInfo
        && (paymentPrefixCodeOnSuccess.includes(paymentInfo.method_code) || paymentInfo.method_code === 'qr_codes')
        && (paymentInfo.due_date !== null ? dayjs().isBefore(dayjs(paymentInfo.due_date)) : true)
    ) {
        return (
            <Button onClick={() => handleOpenXendit()} className={classNames(styles.btnPayNow, 'btn-pay')} size="small">
                <Typography size="10" type="bold" color="white" letter="uppercase">
                    {t('order:paynow')}
                </Typography>
            </Button>
        );
    }

    if (
        (detail[0].status === 'pending' || detail[0].status === 'pending_payment')
        && paymentInfo
        && paymentInfo.method_code === 'briceriapayment'
        && (paymentInfo.due_date !== null ? dayjs().isBefore(dayjs(paymentInfo.due_date)) : true)
    ) {
        return (
            <Button onClick={() => handleOpenBriCeria()} className={styles.btnPayNow} align="left">
                <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
                    {t('order:paynow')}
                </Typography>
            </Button>
        );
    }

    return null;
};

const DetailOrder = (props) => {
    const {
        t,
        detail,
        currency,
        storeConfig,
        reOrder,
        printOrder,
        returnUrl,
        paymentInfo,
        requisitionAnchor,
        handlePopoverOpen,
        handlePopoverClose,
        handleModalOpen,
        handleModalClose,
        modalRequisition,
        requisitionAction,
        handleModalCompleteClose,
        modalComplete,
        handleModalCompleteOpen,
        orderDetailRefetch,
        modalRating,
        handleModalRatingClose,
        handleModalRatingOpen,
        orderRatingAction,
        handleOpenBriCeria,
        handleTrackShipment,
        handleOpenTicket,
        onPrintInvoiceClick,
        onPrintShipmentClick,
        onBack,
        isEditReview,
    } = props;
    const styles = useStyles();
    const {
        checkout: {
            xendit: { paymentPrefixCodeOnSuccess },
        },
    } = modules;
    const [openXendit, setOpenXendit] = React.useState(false);
    const {
        items, shipments, shipment_history, invoice, refund, credit_memos,
    } = detail[0];
    const {
        orderRating, orderRatingRefetch, valueRating, setValueRating,
    } = orderRatingAction;
    const [tabIndex, setTabIndex] = useState(0);
    const [openTax, setOpenTax] = useState(false);
    const [openImageReviewModal, setOpenImageReviewModal] = useState(false);
    const [defaultIndexImage, setDefaultIndexImage] = React.useState(1);
    const [modalData, setModalData] = React.useState({
        images: [],
    });
    const idOrder = detail[0].order_number;
    const creditMemoItems = [];
    if (credit_memos.length > 0) {
        credit_memos.forEach((creditMemo) => {
            creditMemo.items.forEach((item) => {
                creditMemoItems.push(item.order_item);
            });
        });
    }

    const handleClickTax = () => {
        setOpenTax(!openTax);
    };

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const dataRating = orderRating?.getVendorReviews?.items[0] ?? null;
    const isDataRatingAvailable = dataRating?.response !== 'failed';

    const formatDate = useDateFormatter();
    const formattedRatingDate = formatDate(dataRating?.submit_date, { removeClock: true });

    const canInputRating = detail[0].rating.can_input_rating;

    const generateLabel = (label) => t(`order:labelStatus:${label}`);
    const handleModalRatedClose = () => {
        setOpenImageReviewModal(false);
        setDefaultIndexImage(1);
    };

    const handleModalOpenImage = () => {
        setOpenImageReviewModal(true);
        setModalData({
            images: dataRating.images.map(({ value }) => value),
        });
    };

    let dataReview = {};
    if (dataRating) {
        dataReview = {
            rating: dataRating?.rating,
            rating_comment: dataRating?.content,
            rating_images: dataRating?.images,
        };
    }

    if (detail.length > 0) {
        const handleOpenXendit = () => {
            setCheckoutData({
                // email: detail[0].detail[0].customer_email,
                order_number: detail[0].order_number,
                order_id: detail[0].order_number,
            });
            setOpenXendit(!openXendit);
        };

        return (
            <>
                {paymentInfo && paymentInfo.invoice_url && (
                    <ModalXendit
                        open={openXendit}
                        setOpen={() => setOpenXendit(!openXendit)}
                        iframeUrl={paymentInfo.invoice_url}
                        order_id={detail[0].order_number}
                        payment_code={paymentInfo.method_code}
                        fromOrder
                        amount={detail[0].total.grand_total.value}
                        mode={paymentInfo.xendit_mode}
                        xendit_qrcode_external_id={paymentInfo.xendit_qrcode_external_id}
                    />
                )}
                <div className={classNames('column', styles.orderDetail)}>
                    <div className={classNames(styles.blockHeader)}>
                        <Typography variant="h1" letter="uppercase" type="bold" className={classNames('clear-margin-padding', styles.headerTitle)}>
                            {t('order:order')}
                            {' # '}
                            {detail[0].order_number || ''}
                        </Typography>
                        <Typography variant="span" className={styles.headerStatus}>
                            {generateLabel(detail[0].status)}
                        </Typography>
                    </div>
                    <div className={classNames('row', styles.containerHeaderStatus)}>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className={classNames(styles.blockHeaderStatus)}>
                                <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                    <span>{t('order:createdDate')}</span>
                                    <span>{formatDate(detail[0].order_date)}</span>
                                </Typography>
                            </div>
                            <div className={classNames(styles.blockHeaderStatus)}>
                                <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                    <span>{t('order:distributorName')}</span>
                                    <span>{detail[0].seller?.seller_name ?? null}</span>
                                </Typography>
                            </div>
                            <div className={classNames(styles.blockHeaderStatus)}>
                                <div className="status-payment-wrapper">
                                    <span>{t('order:paymentStatus')}</span>
                                    <span className="info-status">
                                        {detail[0].payment_status ? t(`order:outstanding:${detail[0].payment_status.toLowerCase()}`) : '-'}
                                    </span>
                                    <ButtonPay
                                        detail={detail}
                                        paymentInfo={paymentInfo}
                                        paymentPrefixCodeOnSuccess={paymentPrefixCodeOnSuccess}
                                        handleOpenXendit={handleOpenXendit}
                                        handleOpenBriCeria={handleOpenBriCeria}
                                        styles={styles}
                                        t={t}
                                    />
                                </div>
                            </div>
                            <div className={classNames(styles.blockHeaderStatus)}>
                                <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                    <span>{t('order:dueDate')}</span>
                                    <span>{detail[0].due_date_order ? formatDate(detail[0].due_date_order) : '-'}</span>
                                </Typography>
                            </div>
                            {detail[0].reject_reason && (
                                <div className={classNames(styles.blockHeaderStatus)}>
                                    <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                        <span>{t('order:rejectReason')}</span>
                                        <span>{detail[0].reject_reason}</span>
                                    </Typography>
                                </div>
                            )}
                        </div>
                        {(detail[0].status === 'refunded' || detail[0].status === 'partially_refunded') && (
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className={classNames(styles.blockHeaderStatus)}>
                                    <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                        <span>{t('order:refundStatus')}</span>
                                        <span>{generateLabel(detail[0].status.toLowerCase())}</span>
                                    </Typography>
                                </div>
                                <div className={classNames(styles.blockHeaderStatus)}>
                                    <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                        <span>{t('order:refundReferenceNumber')}</span>
                                        <span>{detail[0].refund.reference_no}</span>
                                    </Typography>
                                </div>
                                <div className={classNames(styles.blockHeaderStatus)}>
                                    <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                        <span>{t('order:refundDate')}</span>
                                        <span>{formatDate(detail[0].refund.refund_date)}</span>
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {(detail[0].status !== 'refunded' || detail[0].status !== 'partially_refunded')
                            && detail[0].is_process_refund === 'refund_processing' && (
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className={classNames(styles.blockHeaderStatus)}>
                                    <Typography variant="span" className={classNames('clear-margin-padding', styles.headerOrder)}>
                                        <span>{t('order:refundStatus')}</span>
                                        <span>{t('order:refundStatusProcessing')}</span>
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.blockIcon}>
                        <OrderStatusIcon status={detail[0].status} t={t} />
                    </div>
                    {detail[0].status && detail[0].status === 'order_delivered' ? (
                        <div className={styles.blockCompleteOrder}>
                            <div>
                                <Typography variant="p" type="bold">
                                    {t('order:orderDeliverdTextOne')}
                                </Typography>
                                <Typography variant="p" type="bold">
                                    {t('order:orderDeliverdTextTwo')}
                                </Typography>
                            </div>
                            <button type="button" className={styles.completeButton} onClick={handleModalCompleteOpen}>
                                <Typography id="label-reorder" variant="span" type="regular">
                                    {t('order:orderReceived')}
                                </Typography>
                            </button>
                        </div>
                    ) : null}

                    {detail[0].status
                        && (detail[0].status === 'refunded' || detail[0].status === 'partially_refunded')
                        && detail[0].is_process_refund === 'refund_complete' ? (
                            <div className={styles.blockCompleteOrder}>
                                <div>
                                    <Typography variant="p" type="bold">
                                        {t('order:orderDeliverdTextOne')}
                                    </Typography>
                                    <Typography variant="p" type="bold">
                                        {t('order:orderDeliverdTextTwo')}
                                    </Typography>
                                </div>
                                <button type="button" className={styles.completeButton} onClick={handleModalCompleteOpen}>
                                    <Typography id="label-reorder" variant="span" type="regular">
                                        {t('order:orderReceived')}
                                    </Typography>
                                </button>
                            </div>
                        ) : null}

                    {detail[0].status && !dataRating?.rating && detail[0].status === 'complete' ? (
                        <div className={styles.blockCompleteOrder}>
                            <div className={styles.blockRating}>
                                <Typography id="label-rating" variant="p">
                                    {t('order:rating')}
                                </Typography>
                                <div className={styles.blockRatingDetail}>
                                    <Rating name="rating-display" size="large" disabled />
                                    {canInputRating ? (
                                        <Typography className={styles.ratingExpiryDate} variant="span" type="regular">
                                            {t('order:ratingExpiryDate')}
                                            {' '}
                                            {detail[0]?.rating?.due_date_input_rating}
                                        </Typography>
                                    ) : null}
                                </div>
                            </div>
                            {canInputRating && (
                                <button type="button" className={styles.completeButton} onClick={handleModalRatingOpen}>
                                    <Typography id="label-reorder" variant="span" type="regular">
                                        {t('order:orderSubmitRating')}
                                    </Typography>
                                </button>
                            )}
                        </div>
                    ) : null}

                    {detail[0].status && !dataRating?.rating
                        && (detail[0].status === 'refunded' || detail[0].status === 'partially_refunded')
                        && detail[0].is_process_refund === 'order_complete' ? (
                            <div className={styles.blockCompleteOrder}>
                                <div className={styles.blockRating}>
                                    <Typography id="label-rating" variant="p">
                                        {t('order:rating')}
                                    </Typography>
                                    <div className={styles.blockRatingDetail}>
                                        <Rating name="rating-display" size="large" disabled />
                                        {canInputRating ? (
                                            <Typography className={styles.ratingExpiryDate} variant="span" type="regular">
                                                {t('order:ratingExpiryDate')}
                                                {' '}
                                                {detail[0]?.rating?.due_date_input_rating}
                                            </Typography>
                                        ) : null}
                                    </div>
                                </div>
                                {canInputRating && (
                                    <button type="button" className={styles.completeButton} onClick={handleModalRatingOpen}>
                                        <Typography id="label-reorder" variant="span" type="regular">
                                            {t('order:orderSubmitRating')}
                                        </Typography>
                                    </button>
                                )}
                            </div>
                        ) : null}

                    {dataRating && dataRating.rating ? (
                        <BlockRating
                            t={t}
                            dataRating={dataRating}
                            handleModalOpenImage={handleModalOpenImage}
                            handleModalRatingOpen={handleModalRatingOpen}
                        />
                    ) : null}

                    <div className={styles.wrapperButton}>
                        <div>
                            <button type="button" className={styles.reorderButton} onClick={() => reOrder(items)}>
                                <Typography id="label-reorder" variant="span" type="regular">
                                    {t('order:reorder')}
                                </Typography>
                            </button>
                            <button type="button" className={styles.buttonTransparent} onClick={handlePopoverOpen}>
                                <Typography id="label-requisitionList" variant="span" type="regular">
                                    {t('order:requisitionList')}
                                </Typography>
                            </button>
                            {
                                detail[0]?.can_submit_ticket && (
                                    <button type="button" className={styles.buttonTransparent} onClick={handleOpenTicket}>
                                        <Typography id="label-submitTicket" variant="span" type="regular">
                                            {t('order:submitTicket')}
                                        </Typography>
                                    </button>
                                )
                            }

                        </div>
                        <div>
                            {detail[0].status && detail[0].status === 'order_delivered' && (
                                <button type="button" className={styles.reorderButton} onClick={() => returnUrl(detail[0].order_number)}>
                                    <Typography id="label-return" variant="span" type="regular">
                                        {t('order:smReturn')}
                                    </Typography>
                                </button>
                            )}
                            {detail[0].seller && detail[0].status && detail[0].status !== 'canceled' && detail[0].status !== 'pending' ? (
                                <button
                                    id="btn-print"
                                    type="button"
                                    onClick={() => window.startChat({
                                        agentCode: detail[0].seller.seller_code,
                                        agentName: detail[0].seller.seller_name,
                                        // eslint-disable-next-line max-len
                                        initialMessage: `<pwa type="order" order_number='${detail[0].order_number}' total='${detail[0].total.grand_total.value}' currency='${detail[0].total.grand_total.currency}'></pwa>`,
                                    })}
                                >
                                    <Typography id="label-chat" variant="span" type="regular">
                                        {t('order:chatDistributor')}
                                    </Typography>
                                </button>
                            ) : null}

                            <button id="btn-print" type="button" onClick={() => printOrder(detail[0].order_number)}>
                                <Typography id="label-print" variant="span" type="regular">
                                    {t('order:printOrder')}
                                </Typography>
                            </button>
                        </div>
                    </div>
                    <Box className={styles.orderDetailItem}>
                        <Box className={styles.orderTab}>
                            <Tabs value={tabIndex} onChange={handleTabChange}>
                                <Tab className="order-tab-title" label={t('order:itemsOrdered')} />
                                {invoice?.invoice_increment_id ? <Tab className="order-tab-title" label={t('order:invoice')} /> : null}
                                {shipments.length ? <Tab className="order-tab-title" label={t('order:orderShipment')} /> : null}
                                {refund?.is_refund ? <Tab className="order-tab-title" label={t('order:refund')} /> : null}
                            </Tabs>
                        </Box>
                        <Box className={styles.orderContent} sx={{ padding: 2 }}>
                            {tabIndex === 0 && (
                                <Box>
                                    <div className={styles.block}>
                                        <div className="row center-xs start-sm start-sm start-md start-lg">
                                            <div className="col-xs-12">
                                                <div className="hidden-desktop">
                                                    {items.length > 0
                                                        && items.map((item, key) => (
                                                            <ItemProduct t={t} key={key} {...item} currency={currency} storeConfig={storeConfig} />
                                                        ))}
                                                </div>
                                                <div className="hidden-mobile">
                                                    <TableListProduct data={items} t={t} currency={currency} tabName="ordered" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DetailSummary
                                        t={t}
                                        detail={detail}
                                        credit_memos={[]}
                                        styles={styles}
                                        currency={currency}
                                        openTax={openTax}
                                        tabIndex={tabIndex}
                                        handleClickTax={handleClickTax}
                                    />
                                </Box>
                            )}
                            {tabIndex === 1 && (
                                <Box>
                                    <div className={styles.block}>
                                        <div className="col-xs-12">
                                            <div className={classNames(styles.wrapperInvoiceHeader)}>
                                                <Typography
                                                    variant="p"
                                                    letter="capitalize"
                                                    type="bold"
                                                    className={classNames('clear-margin-padding', styles.invoiceTitle)}
                                                >
                                                    {`Invoice #${invoice.invoice_increment_id}`}
                                                </Typography>
                                                <div className={classNames(styles.actionInvoice)}>
                                                    <button
                                                        type="button"
                                                        className={classNames(styles.buttonTransparent)}
                                                        onClick={() => onPrintInvoiceClick(detail[0].order_number)}
                                                    >
                                                        <Typography variant="span" type="regular">
                                                            {t('order:printInvoice')}
                                                        </Typography>
                                                    </button>
                                                    <a
                                                        href={detail[0].invoice_seller_url}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className={classNames(styles.buttonTransparent)}
                                                    >
                                                        <Typography variant="span" type="regular">
                                                            {t('order:downloadDistributorInvoice')}
                                                        </Typography>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row center-xs start-sm start-sm start-md start-lg">
                                            <div className="col-xs-12">
                                                <div className="hidden-desktop">
                                                    {items.length > 0
                                                        && items.map((item, key) => (
                                                            <ItemProduct t={t} key={key} {...item} currency={currency} storeConfig={storeConfig} />
                                                        ))}
                                                </div>
                                                <div className="hidden-mobile">
                                                    <TableListProduct data={items} t={t} currency={currency} tabName="invoice" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <DetailSummary
                                        t={t}
                                        detail={detail}
                                        credit_memos={[]}
                                        styles={styles}
                                        currency={currency}
                                        openTax={openTax}
                                        fine={invoice.fine}
                                        tabIndex={tabIndex}
                                        storeConfig={storeConfig}
                                        handleClickTax={handleClickTax}
                                    />
                                </Box>
                            )}
                            {tabIndex === 2 && (
                                <Box>
                                    <div className={styles.block}>
                                        <div className="col-xs-12">
                                            <div className={classNames(styles.wrapperInvoiceHeader)}>
                                                <Typography
                                                    variant="p"
                                                    letter="capitalize"
                                                    type="bold"
                                                    className={classNames('clear-margin-padding', styles.invoiceTitle)}
                                                >
                                                    {`Shipment #${shipments.length ? shipments[0].number : '-'}`}
                                                </Typography>
                                                <div className={classNames(styles.actionInvoice)}>
                                                    <button
                                                        type="button"
                                                        className={classNames(styles.buttonTransparent)}
                                                        onClick={() => onPrintShipmentClick(detail[0].order_number)}
                                                    >
                                                        <Typography variant="span" type="regular">
                                                            {t('order:printShipment')}
                                                        </Typography>
                                                    </button>
                                                    {detail[0].track_shipment && (
                                                        <button
                                                            type="button"
                                                            className={classNames(styles.buttonTransparent)}
                                                            onClick={handleTrackShipment}
                                                        >
                                                            <Typography variant="span" type="regular">
                                                                {t('order:trackShipping')}
                                                            </Typography>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <Typography
                                                variant="p"
                                                letter="capitalize"
                                                type="regular"
                                                className={classNames('clear-margin-padding', styles.invoiceSubTitle)}
                                            >
                                                {`${t('order:shipmentNumber')} : ${shipments.length ? shipments[0].tracking[0].number : '-'}`}
                                            </Typography>
                                        </div>
                                        <div className="row center-xs start-sm start-sm start-md start-lg">
                                            <div className="col-xs-12">
                                                <div className="hidden-desktop">
                                                    {items.length > 0
                                                        && items.map((item, key) => (
                                                            <ItemProduct t={t} key={key} {...item} currency={currency} storeConfig={storeConfig} />
                                                        ))}
                                                </div>
                                                <div className="hidden-mobile">
                                                    <TableListProduct data={items} t={t} currency={currency} tabName="shipment" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            )}
                            {tabIndex === 3 && (
                                <Box>
                                    <div className={styles.block}>
                                        <div className="row center-xs start-sm start-sm start-md start-lg">
                                            <div className="col-xs-12">
                                                <div className={classNames(styles.wrapperRefundHeader)}>
                                                    <Typography
                                                        variant="p"
                                                        letter="capitalize"
                                                        type="bold"
                                                        className={classNames('clear-margin-padding', styles.invoiceTitle)}
                                                    >
                                                        {`Refund #${refund.reference_no}`}
                                                    </Typography>
                                                </div>
                                                <div className="hidden-desktop">
                                                    {creditMemoItems.length > 0
                                                        && creditMemoItems.map((item, key) => (
                                                            <ItemProduct
                                                                t={t}
                                                                key={key}
                                                                {...item}
                                                                currency={currency}
                                                                storeConfig={storeConfig}
                                                                tabName="refund"
                                                            />
                                                        ))}
                                                </div>
                                                <div className="hidden-mobile">
                                                    <TableListProduct data={creditMemoItems} t={t} currency={currency} tabName="refund" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DetailSummary
                                        t={t}
                                        detail={detail}
                                        credit_memos={credit_memos}
                                        styles={styles}
                                        currency={currency}
                                        openTax={openTax}
                                        tabIndex={tabIndex}
                                        handleClickTax={handleClickTax}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {detail[0].order_comment && (
                        <div className={classNames(styles.block, styles.orderComment)}>
                            <div className="row center-xs start-sm start-sm start-md start-lg">
                                <div className="col-xs-12">
                                    <Typography
                                        variant="h4"
                                        letter="capitalize"
                                        type="bold"
                                        className={classNames(styles.blockLabel)}
                                    >
                                        {t('order:orderComment:title')}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        letter="normal"
                                        type="italic"
                                        size="14"
                                    >
                                        {detail[0].order_comment}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={classNames(styles.block)}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="h4"
                                    letter="capitalize"
                                    type="bold"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderStatus')}
                                </Typography>
                                <div className={styles.shipmentDetail}>
                                    <Typography variant="p" type="regular" letter="capitalize" className={styles.labelInfoStatus}>
                                        {`${t('order:shipmentNumber')} : ${shipments.length ? shipments[0].number : '-'}`}
                                    </Typography>
                                    <Typography variant="p" type="regular" letter="capitalize" className={styles.labelInfoStatus}>
                                        {`${t('order:shipmentStatus')} : ${detail[0]?.shipment_status?.shipstatus ?? '-'}`}
                                    </Typography>
                                    <Typography variant="p" type="regular" letter="capitalize" className={styles.labelInfoStatus}>
                                        {`${t('order:trackingNumber')} : ${shipments.length ? shipments[0].tracking[0].number : '-'}`}
                                    </Typography>
                                </div>
                            </div>

                            <TableContainer component={Paper} className={styles.tableContainer}>
                                <Table className={styles.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow className={styles.tableRowHead}>
                                            <TableCell align="left">
                                                <Typography variant="span" type="bold">
                                                    {t('order:infoDate')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant="span" type="bold">
                                                    {t('order:infoNotes')}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!shipment_history ? (
                                            <TableRow className={styles.tableRowResponsive}>
                                                <TableCell align="left">
                                                    <Typography variant="span" letter="capitalize">
                                                        -
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant="span" letter="capitalize">
                                                        -
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            shipment_history.map((val, index) => (
                                                <TableRow className={styles.tableRowResponsive} key={index}>
                                                    <TableCell align="left">
                                                        <Typography variant="span" letter="capitalize">
                                                            {val.date ? formatDate(val.date) : '-'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="span" letter="capitalize">
                                                            {val.history}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <div className={classNames(styles.block, styles.orderInformation)}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="h4"
                                    letter="capitalize"
                                    type="bold"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderInfo')}
                                </Typography>
                            </div>
                            <div className="col-xs-12 hidden-desktop">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:orderId')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].order_number || ''}
                                </Typography>
                                <Typography variant="p" type="bold" letter="uppercase" align="center">
                                    {t('order:date')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {formatDate(detail[0].created_at)}
                                </Typography>
                            </div>

                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:shippingAddress')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].shipping_address?.firstname || ''}
                                    {' '}
                                    {detail[0].shipping_address?.lastname || ''}
                                    <br />
                                    {detail[0].shipping_address?.street || ''}
                                    <br />
                                    {detail[0].shipping_address?.city || ''}
                                    <br />
                                    {detail[0].shipping_address?.region || ''}
                                    <br />
                                    {detail[0].shipping_address?.telephone || ''}
                                    <br />
                                    {detail[0].shipping_address?.postcode || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:segmentCustomer')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].customer_group}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:shippingMethod')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].shipping_method || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:billingAddress')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].billing_address?.firstname || ''}
                                    {' '}
                                    {detail[0].billing_address?.lastname || ''}
                                    <br />
                                    {detail[0].billing_address?.street || ''}
                                    <br />
                                    {detail[0].billing_address?.city || ''}
                                    <br />
                                    {detail[0].billing_address?.region || ''}
                                    <br />
                                    {detail[0].billing_address?.telephone || ''}
                                    <br />
                                    {detail[0].billing_address?.postcode || ''}
                                </Typography>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:paymentMethod')}
                                </Typography>
                                {paymentInfo && (
                                    <Typography variant="span" className="clear-margin-padding">
                                        {paymentInfo.method_title}
                                        <br />
                                        {paymentInfo.virtual_account}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapperButton}>
                        <button type="button" className={styles.reorderButton} onClick={onBack}>
                            <Typography id="label-back" variant="span" type="regular">
                                {t('order:button:back')}
                            </Typography>
                        </button>
                    </div>
                </div>
                <RequisitionPopover
                    requisitionAnchor={requisitionAnchor}
                    handlePopoverClose={handlePopoverClose}
                    handleModalOpen={handleModalOpen}
                    requisitionAction={requisitionAction}
                    t={t}
                    items={items}
                />
                <Modal t={t} requisitionAction={requisitionAction} modalRequisition={modalRequisition} handleModalClose={handleModalClose} />
                <ModalComplete
                    t={t}
                    orderId={detail[0].order_number}
                    modalComplete={modalComplete}
                    handleModalClose={handleModalCompleteClose}
                    orderDetailRefetch={orderDetailRefetch}
                    openRatingModal={handleModalRatingOpen}
                />
                { modalRating && (
                    <ModalRating
                        t={t}
                        orderId={idOrder}
                        modalRating={modalRating}
                        handleModalClose={handleModalRatingClose}
                        orderDetailRefetch={orderDetailRefetch}
                        orderRatingRefetch={orderRatingRefetch}
                        valueRating={valueRating}
                        setValueRating={setValueRating}
                        dataReview={dataReview}
                        isEdit={isEditReview}
                        isOrder
                        {...props}
                    />
                )}
                {isDataRatingAvailable && (
                    <ImageReviewModal
                        t={t}
                        rating={dataRating?.rating}
                        open={openImageReviewModal}
                        handleModalClose={handleModalRatedClose}
                        ratingImages={modalData.images}
                        buyer={`${detail[0].customer_company.company_name}, ${detail[0].customer_name}`}
                        date={formattedRatingDate}
                        defaultIndex={defaultIndexImage}
                        setDefaultIndex={setDefaultIndexImage}
                    />
                )}
            </>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('order:notFound')}
        </Alert>
    );
};

export default DetailOrder;
