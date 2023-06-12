/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import Router from 'next/router';
// import IconArrow from '@material-ui/icons/ArrowForwardIos';
// import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit';
// import { modules } from '@config';
// import dayjs from 'dayjs';
// import { formatPrice } from '@helper_currency';
import Button from '@common_button';
import Typography from '@common_typography';
import formatDate from '@helper_date';
import useStyles from '@core_modules/thanks/pages/default/components/style';
import QrGenerator from '@core_modules/thanks/pages/default/components/qrCode';
import classNames from 'classnames';

const View = (props) => {
    const {
        t,
        isLogin,
        checkoutData,
        handleCotinue,
        ordersFilter,
        handleDetailOrder,
        handleConfirmPayment,
        paymentInformation,
        storeConfig,
        handleDetailSign,
    } = props;
    const styles = useStyles();
    const useOtp = ordersFilter?.data[0]?.validateWithOtp ?? false;
    const imgIcon = '/assets/img/icon-thank-you.svg';

    const { protocol, host } = window.location;
    const baseUrl = `${protocol}//${host}`;

    // const goToRegisterPage = () => {
    //     const registerLink = `/customer/account/create?order_id=${checkoutData.order_id}`;
    //     Router.push(registerLink);
    // };

    // const [openXendit, setOpenXendit] = React.useState(false);
    // const registerGuestEnabled = storeConfig.weltpixel_thankyoupage_create_account_enable;
    // const displayModalXendit = () => ordersFilter
    //     && paymentInformation
    //     && paymentInformation.OrderPaymentInformation
    //     && paymentInformation.OrderPaymentInformation.invoice_url && (
    //     <ModalXendit
    //         open={openXendit}
    //         setOpen={() => setOpenXendit(!openXendit)}
    //         iframeUrl={paymentInformation.OrderPaymentInformation.invoice_url}
    //         order_id={checkoutData?.order_number}
    //         payment_code={paymentInformation.OrderPaymentInformation.method_code}
    //         amount={ordersFilter.data[0].detail[0].grand_total}
    //         mode={paymentInformation.OrderPaymentInformation.xendit_mode}
    //         xendit_qrcode_external_id={paymentInformation.OrderPaymentInformation.xendit_qrcode_external_id}
    //     />
    // );
    // const checkoutXendit = () => {
    //     return (ordersFilter
    //         && ordersFilter.data[0]
    //         && (ordersFilter.data[0].status === 'pending' || ordersFilter.data[0].status === 'pending_payment')
    //         && paymentInformation.OrderPaymentInformation.invoice_url
    //         && (paymentInformation.OrderPaymentInformation.due_date !== null
    //             ? dayjs().isBefore(dayjs(paymentInformation.OrderPaymentInformation.due_date))
    //             : true)
    //         && (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(paymentInformation.OrderPaymentInformation.method_code)
    //             || paymentInformation.OrderPaymentInformation.method_code === 'qr_codes') && (
    //         <div className={styles.info}>
    //             <Typography variant="span" className={styles.dateOver} letter="none">
    //                 {t('thanks:onboarding')}
    //             </Typography>
    //             <Typography variant="span" className={styles.dateOver} letter="none">
    //                 {t('thanks:paymentMethod')}
    //                 {' : '}
    //                 <b className={styles.payment}>{paymentInformation.OrderPaymentInformation.method_title}</b>
    //             </Typography>
    //             {paymentInformation.OrderPaymentInformation.is_virtual_account && paymentInformation.OrderPaymentInformation.virtual_account && (
    //                 <Typography variant="span" className={styles.dateOver} letter="none">
    //                     {t('thanks:virtualAccount')}
    //                     {' : '}
    //                     <b className={styles.payment}>{paymentInformation.OrderPaymentInformation.virtual_account}</b>
    //                 </Typography>
    //             )}
    //             {paymentInformation.OrderPaymentInformation.xendit_retail_outlet && paymentInformation.OrderPaymentInformation.payment_code && (
    //                 <Typography variant="span" className={styles.dateOver} letter="none">
    //                     {t('thanks:paymentCode')}
    //                     {' : '}
    //                     <b className={styles.payment}>{paymentInformation.OrderPaymentInformation.payment_code}</b>
    //                 </Typography>
    //             )}
    //             {paymentInformation.OrderPaymentInformation.due_date && (
    //                 <Typography variant="span" className={styles.dateOver} letter="none">
    //                     {t('thanks:duedate')}
    //                     {' : '}
    //                     <b className={styles.payment}>{paymentInformation.OrderPaymentInformation.due_date}</b>
    //                 </Typography>
    //             )}
    //             {paymentInformation.OrderPaymentInformation.instructions && (
    //             // eslint-disable-next-line react/no-danger
    //                 <div dangerouslySetInnerHTML={{ __html: paymentInformation.OrderPaymentInformation.instructions }} />
    //             )}
    //             <Button onClick={() => setOpenXendit(!openXendit)} className={styles.btnConfirm} align="center">
    //                 <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
    //                     {t('thanks:paynow')}
    //                 </Typography>
    //             </Button>
    //         </div>
    //     ));
    // }

    return (
        <div className={styles.container}>
            {/* {displayModalXendit()} */}

            <div className={styles.info}>
                <img className={styles.imgIcon} src={imgIcon} alt="success" />
                <Typography variant="h1" type="bold" letter="none" align="center" className={styles.title}>
                    {t('thanks:thanks')}
                    <br />
                    {t('thanks:placeInfo')}
                </Typography>
            </div>

            <div className={styles.info}>
                <Typography variant="span" className={styles.infoOrderId} letter="none">
                    {`${t('thanks:yourOrderId')}`}
                </Typography>
                <Typography variant="span" className={styles.infoOrderId} letter="none">
                    {isLogin && isLogin === 1 ? (
                        <>
                            <a onClick={handleDetailOrder} className={styles.link}>
                                <b>
                                    #
                                    {checkoutData?.order_number}
                                </b>
                            </a>
                        </>
                    ) : (
                        <b>
                            #
                            {checkoutData?.order_number}
                        </b>
                    )}
                </Typography>

                {useOtp && (
                    <div className={[styles.info, styles.signContainer].join(' ')}>
                        <Typography variant="span" className={styles.infoOrderId} letter="none">
                            {`${t('thanks:digitalSign')}`}
                        </Typography>

                        <div>
                            <QrGenerator
                                value={`${baseUrl}/digitalsign/${checkoutData.order_number}`}
                                orderid={checkoutData?.order_number}
                                logoImage={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                            />
                        </div>

                        <Button className={styles.buttonOrderId} onClick={handleDetailSign} disableRipple>
                            <Typography variant="span" className={classNames(styles.baseText)}>
                                {t('thanks:checkSign')}
                            </Typography>
                        </Button>
                    </div>
                )}

                <Typography variant="p" className={classNames(styles.baseText, styles.detailInfo)}>{t('thanks:thanksDetail')}</Typography>
                <Button className={styles.buttonOrderId} onClick={handleDetailOrder} disableRipple>
                    <Typography variant="span" className={classNames(styles.baseText)}>{t('thanks:checkOrder')}</Typography>
                </Button>
            </div>

            {/* {checkoutXendit()} */}

            {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                <div className={styles.info}>
                    <Typography variant="span" className={styles.dateOver} letter="none">
                        {t('thanks:bankInfo').split('$')[0]}
                        <b className={styles.payment}>{`${ordersFilter.data[0].detail[0].payment.payment_additional_info.method_title},`}</b>
                        {t('thanks:bankInfo').split('$')[1]}
                    </Typography>
                    <Typography variant="span" className={styles.dateOver}>
                        {ordersFilter
                            && paymentInformation
                            && paymentInformation.OrderPaymentInformation
                            && paymentInformation.OrderPaymentInformation.due_date && (
                            <>
                                {`${t('thanks:bankInfo2')} `}
                                {formatDate(paymentInformation.OrderPaymentInformation.due_date, 'dddd, DD MMM HH:mm WIB')}
                            </>
                        )}
                    </Typography>
                </div>
            ) : null}

            <div className={classNames(styles.info, 'hidden-mobile')}>
                {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                    <>
                        <Button onClick={handleConfirmPayment} className={classNames(styles.btnConfirmFirst, styles.generalButton)} align="center">
                            <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                                {t('thanks:paymentConfirmation')}
                            </Typography>
                        </Button>
                        <Button className={classNames(styles.generalButton, styles.btnConfirm)} onClick={handleCotinue}>
                            <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                                {t('thanks:continue')}
                            </Typography>
                        </Button>
                    </>
                ) : (
                    <Button className={classNames(styles.generalButton, styles.btnConfirm)} onClick={handleCotinue}>
                        <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                            {t('thanks:continue')}
                        </Typography>
                    </Button>
                )}
            </div>

            {/* GUEST CHECKOUT */}
            {/* {registerGuestEnabled && !isLogin ? (
                <div className={styles.wrapperRegister}>
                    <AccountCircleIcon className={styles.btnAccountIcon} />
                    <Typography variant="p" color="black" align="center">
                        {t('thanks:registerInfo')}
                    </Typography>
                    <Typography variant="p" color="black" align="center">
                        {t('thanks:emailInfo')}
                        {' '}
                        {checkoutData.email}
                    </Typography>
                    <Button className={styles.generalButton} fullWidth={false} onClick={() => goToRegisterPage()} align="center">
                        <Typography color="white" variant="span" type="bold" letter="uppercase">
                            {t('login:registerTitle')}
                        </Typography>
                    </Button>
                </div>
            ) : null} */}

            <div className={classNames(styles.footer, 'hidden-desktop')}>
                {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                    <>
                        <Button onClick={handleConfirmPayment} className={[styles.generalButton, styles.btnConfirmFirst].join(' ')}>
                            <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                                {t('thanks:paymentConfirmation')}
                            </Typography>
                        </Button>
                        <Button className={classNames(styles.generalButton, styles.btnConfirm)} onClick={handleCotinue}>
                            <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                                {t('thanks:continue')}
                            </Typography>
                        </Button>
                    </>
                ) : (
                    <Button className={classNames(styles.generalButton, styles.btnConfirm)} onClick={handleCotinue}>
                        <Typography className="button-label" variant="span" type="bold" letter="none" color="white">
                            {t('thanks:continue')}
                        </Typography>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default View;
