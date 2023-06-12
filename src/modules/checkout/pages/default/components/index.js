/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import Delivery from '@core_modules/checkout/pages/default/components/delivery';
import Email from '@core_modules/checkout/pages/default/components/email';
import Summary from '@core_modules/checkout/pages/default/components/summary';
import Address from '@core_modules/checkout/pages/default/components/address';
import Shipping from '@core_modules/checkout/pages/default/components/shipping';
import PaymentList from '@core_modules/checkout/pages/default/components/payment';
import Promo from '@core_modules/checkout/pages/default/components/promo';
import GiftCard from '@core_modules/checkout/pages/default/components/giftcard';
import RewardPoint from '@core_modules/checkout/pages/default/components/rewardpoint';
import Credit from '@core_modules/checkout/pages/default/components/credit';
import PickupInfo from '@core_modules/checkout/pages/default/components/PickupInformation';
import ExtraFee from '@core_modules/checkout/pages/default/components/ExtraFee';
import PromoModalItem from '@core_modules/checkout/pages/default/components/PromoModalItem';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import InStorePickup from '@core_modules/checkout/pages/default/components/instorepickup';
import OrderFileUpload from '@core_modules/checkout/pages/default/components/OrderFileUpload';
import Signature from '@core_modules/checkout/pages/default/components/Signature';
import OtpCheckout from '@core_modules/checkout/pages/default/components/OtpCheckout';
import Confirmation from '@core_modules/checkout/pages/default/components/Confirmation';
import Referral from '@src_modules/checkout/pages/default/components/referral';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Modal from '@common_confirmdialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OrderComment from '@core_modules/checkout/pages/default/components/OrderComment';

const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        containerStyle,
        checkout,
        storeConfig,
        CashbackInfoView,
        chasbackMessage,
        DeliveryView,
        DeliverySkeleton,
        formik,
        t,
        setCheckout,
        isOnlyVirtualProductOnCart,
        handleOpenMessage,
        EmailView,
        config,
        updateFormik,
        AddressView,
        ShippingView,
        PromoView,
        GiftCardView,
        SummaryView,
        RewardPointView,
        StoreCreditView,
        modules,
        HeaderView,
        manageCustomer,
        ExtraFeeView,
        cartId,
        PromoModalItemView,
        paypalTokenData,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
        refetchDataCart,
        refetchItemCart,
        ConfirmationView,
        checkoutTokenState,
        setCheckoutTokenState,
        OrderCommentView,
        loadingShippingAddress,
        setLoadingShippingAddress,
    } = props;

    const styles = useStyles();
    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    const useOtp = checkout?.data?.cart?.needOtpValidation ?? false;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;
    const travelokaPayRef = React.useRef();

    const [displayHowToPay, setDisplayHowToPay] = useState(false);

    /**
     * [METHOD] handle click for place order
     */
    const handleClick = () => {
        if (SummaryRef.current) {
            SummaryRef.current.handlePlaceOrder();
        }
    };

    /**
     * [VIEW]
     */

    const [boxes, setBoxes] = useState([]);

    const handleChange = (e) => {
        // Destructure the children from the parent of
        // the element that was changed (ie all the input elements)
        const {
            parentNode: { children },
        } = e.target;

        // Find the index of the box that was changed
        const index = [...children].indexOf(e.target);

        // Copy the state
        const newState = [...boxes];

        // Toggle the boolean at the index of
        // the `newState` array
        newState[index] = !newState[index];

        // Set the state with the updated array
        setBoxes(newState);

        if (useOtp) {
            if (newState[index] && !checkout?.selected?.checkoutOtp) {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:otpValidation'),
                });
            }
        } else if (!checkout?.data?.cart?.signature_base64 && newState[index]) {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:signatureValidation'),
            });
        }
    };

    const isDisabled = () => {
        const len = boxes.filter((box) => box).length;

        if (useOtp) {
            if (!checkout?.selected?.checkoutOtp) {
                return true;
            }
        } else {
            if (!checkout?.data?.cart?.signature_base64) {
                return true;
            }

            return len === 0 || len > 1;
        }
    };

    return (
        <div id="checkout" className={classNames(styles.mobileBottomSpace, styles.checkoutBox, 'row between-lg')}>
            <div className={styles.stickyCheckoutHeader}>
                <HeaderView storeConfig={storeConfig} />
            </div>
            <div className={styles.contentWrapper}>
                <Modal
                    open={checkoutTokenState}
                    handleYes={() => {
                        setCheckoutTokenState(!checkoutTokenState);
                        Router.reload();
                    }}
                    handleCancel={() => {
                        setCheckoutTokenState(!checkoutTokenState);
                        Router.push('/checkout/cart');
                    }}
                    yesNo
                    message={`${t('checkout:invalidToken')}`}
                    confirmationMessage={`${t('checkout:invalidTokenConfirmation')}`}
                />
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 center">
                    {checkout && checkout.data && checkout.data.cart && checkout.data.cart.promoBanner.length > 0 && (
                        <GimmickBanner data={checkout.data.cart.promoBanner || []} />
                    )}
                </div>
                <div className={styles.contentBoxWrapper}>
                    <div className={styles.contentDetail} style={containerStyle || {}}>
                        <div className={classNames(styles.title)}>
                            <Typography id="h2_checkout" variant="h2" className="title-checkout" type="regular" letter="capitalize">
                                {t('checkout:pageTitle')}
                            </Typography>
                        </div>
                        {modules.checkout.cashback.enabled && checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                            <CashbackInfoView
                                message={chasbackMessage}
                                price={checkout.data.cart.applied_cashback.data[0].amount}
                                currency={storeConfig.base_currency_code}
                                promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                            />
                        )}

                        {/* {modules.checkout.inStorePickup.enabled && (
                            <div className="row col-xs-12">
                                <div className="col-xs-6">
                                    <Button onClick={() => setInStore(false)}>Shipping</Button>
                                </div>
                                <div className="col-xs-6">
                                    <Button onClick={() => setInStore(true)}>In Store Pickup</Button>
                                </div>
                            </div>
                        )} */}

                        <>
                            {modules.checkout.pickupStore.enabled || modules.checkout.inStorePickup.enabled ? (
                                <Delivery
                                    t={t}
                                    DeliveryView={DeliveryView}
                                    Skeleton={DeliverySkeleton}
                                    formik={formik}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    storeConfig={storeConfig}
                                    isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                                    checkoutTokenState={checkoutTokenState}
                                    setCheckoutTokenState={setCheckoutTokenState}
                                />
                            ) : null}
                            <Email
                                t={t}
                                formik={formik}
                                EmailView={EmailView}
                                checkout={checkout}
                                config={config}
                                setCheckout={setCheckout}
                                handleOpenMessage={handleOpenMessage}
                                cartId={cartId}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                            />
                            {/* eslint-disable */}
                            {checkout.selected.delivery === 'home' ? (
                                <Address
                                    checkout={checkout}
                                    t={t}
                                    setCheckout={setCheckout}
                                    defaultAddress={checkout.data.defaultAddress}
                                    defaultBillingAddress={checkout.data.defaultBillingAddress}
                                    updateFormik={updateFormik}
                                    AddressView={AddressView}
                                    manageCustomer={manageCustomer}
                                    storeConfig={storeConfig}
                                    formik={formik}
                                    isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                                    refetchDataCart={refetchDataCart}
                                    refetchItemCart={refetchItemCart}
                                    checkoutTokenState={checkoutTokenState}
                                    setCheckoutTokenState={setCheckoutTokenState}
                                    setLoadingShippingAddress={setLoadingShippingAddress}
                                    loadingShippingAddress={loadingShippingAddress}
                                />
                            ) : checkout.selected.delivery === 'pickup' ? (
                                <PickupInfo t={t} formik={formik} checkout={checkout} setCheckout={setCheckout} />
                            ) : (
                                <InStorePickup handleOpenMessage={handleOpenMessage} t={t} checkout={checkout} setCheckout={setCheckout} />
                            )}
                            <Email
                                t={t}
                                formik={formik}
                                EmailView={EmailView}
                                checkout={checkout}
                                config={config}
                                setCheckout={setCheckout}
                                handleOpenMessage={handleOpenMessage}
                                cartId={cartId}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                            />

                            <Shipping
                                t={t}
                                checkout={checkout}
                                setCheckout={setCheckout}
                                updateFormik={updateFormik}
                                formik={formik}
                                handleOpenMessage={handleOpenMessage}
                                storeConfig={storeConfig}
                                ShippingView={ShippingView}
                                isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                                loadingShippingAddress={loadingShippingAddress}
                                setLoadingShippingAddress={setLoadingShippingAddress}
                            />

                            <div className={classNames(styles.block)}>
                                <Typography variant="title" type="bold" letter="capitalize">
                                    {t('checkout:Referral')}
                                </Typography>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                        <Referral checkout={checkout} setCheckout={setCheckout} />
                                    </div>
                                </div>
                            </div>

                            <div className={classNames(styles.block)}>
                                <Typography variant="title" type="bold" letter="capitalize">
                                    {modules.rewardpoint.enabled && storeConfig.pwa.reward_point_enable
                                        ? t('checkout:usePointsAndVouchers')
                                        : t('checkout:useVouchers')}
                                </Typography>
                                <div className="row">
                                    {modules.rewardpoint.enabled && storeConfig.pwa.reward_point_enable ? (
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-6">
                                            <RewardPoint
                                                t={t}
                                                checkout={checkout}
                                                setCheckout={setCheckout}
                                                handleOpenMessage={handleOpenMessage}
                                                formik={formik}
                                                storeConfig={storeConfig}
                                                RewardPointView={RewardPointView}
                                            />
                                        </div>
                                    ) : null}
                                    {modules.checkout.extraFee.enabled ? (
                                        <ExtraFee
                                            checkout={checkout}
                                            setCheckout={setCheckout}
                                            updateFormik={updateFormik}
                                            handleOpenMessage={handleOpenMessage}
                                            t={t}
                                            storeConfig={storeConfig}
                                            ExtraFeeView={ExtraFeeView}
                                        />
                                    ) : null}
                                    {modules.promo.enabled ? (
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 nopadding">
                                            <Promo
                                                t={t}
                                                checkout={checkout}
                                                setCheckout={setCheckout}
                                                handleOpenMessage={handleOpenMessage}
                                                formik={formik}
                                                storeConfig={storeConfig}
                                                PromoView={PromoView}
                                            />
                                        </div>
                                    ) : null}
                                    {modules.giftcard.enabled ? (
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                            <GiftCard
                                                t={t}
                                                checkout={checkout}
                                                setCheckout={setCheckout}
                                                handleOpenMessage={handleOpenMessage}
                                                formik={formik}
                                                storeConfig={storeConfig}
                                                GiftCardView={GiftCardView}
                                            />
                                        </div>
                                    ) : null}
                                    {modules.storecredit.enabled ? (
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                            <Credit
                                                t={t}
                                                checkout={checkout}
                                                setCheckout={setCheckout}
                                                handleOpenMessage={handleOpenMessage}
                                                formik={formik}
                                                storeConfig={storeConfig}
                                                StoreCreditView={StoreCreditView}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className={classNames(styles.block)}>
                                <Typography variant="title" type="bold" letter="capitalize">
                                    {t('checkout:orderCommentTitle')}
                                </Typography>
                                <OrderComment
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    OrderCommentView={OrderCommentView}
                                />
                            </div>

                            <PaymentList
                                checkout={checkout}
                                setCheckout={setCheckout}
                                updateFormik={updateFormik}
                                handleOpenMessage={handleOpenMessage}
                                t={t}
                                storeConfig={storeConfig}
                                modules={modules}
                                paypalTokenData={paypalTokenData}
                                paypalHandlingProps={paypalHandlingProps}
                                setInitialOptionPaypal={setInitialOptionPaypal}
                                initialOptionPaypal={initialOptionPaypal}
                                setTokenData={setTokenData}
                                travelokaPayRef={travelokaPayRef}
                                displayHowToPay={displayHowToPay}
                                setDisplayHowToPay={setDisplayHowToPay}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                            />

                            <Confirmation t={t} checkout={checkout} setCheckout={setCheckout} storeConfig={storeConfig} ConfirmationView={ConfirmationView} />

                            <div className={classNames([styles.block])}>
                                <OrderFileUpload t={t} checkout={checkout} setCheckout={setCheckout} />
                                
                                {!useOtp && (
                                    <div className={classNames([styles.block, styles.boxSignature])}>
                                        <Typography variant="title" type="bold" letter="capitalize">
                                            {t('checkout:Signature')}
                                        </Typography>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                                <Signature t={t} checkout={checkout} setCheckout={setCheckout} formik={formik} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {useOtp && (
                                    <div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                                <OtpCheckout t={t} checkout={checkout} setCheckout={setCheckout} formik={formik} handleOpenMessage={handleOpenMessage}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                        <div className={`hidden-mobile center ${styles.block}`}>
                            <FormControlLabel
                                onChange={handleChange}
                                control={<Checkbox id="checkout_agrrement_checkbox" className="checkout-checkbox" name="privacytrue" color="primary" size="small" />}
                                className={styles.checkboxPrivacy}
                                label={
                                    <Typography variant="p" size="14">
                                        {t('Dengan ini saya setuju untuk mengikuti syarat dan ketentuan yang berlaku.')}
                                    </Typography>
                                }
                            />
                            <Button
                                id="button_Buat_Pesanan"
                                customRootStyle={{ marginBottom: 80, marginTop: 50 }}
                                onClick={handleClick}
                                fullWidth
                                loading={loading}
                                disabled={
                                    disabled ||
                                    checkout.error.shippingAddress ||
                                    (isSelectedPurchaseOrder && !isPurchaseOrderApply) ||
                                    (storeConfig.minimum_order_enable && checkout.data.cart.prices.grand_total.value < storeConfig.minimum_order_amount) ||
                                    isDisabled()
                                }
                                className={styles.placeOrderDesktop}
                            >
                                <Typography variant="span" letter="capitalize" type="regular">
                                    {t('checkout:placeOrder')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                    <div className={styles.contentSummary}>
                        <PromoModalItem
                            t={t}
                            storeConfig={storeConfig}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            PromoModalItemView={PromoModalItemView}
                        />
                        <Summary
                            {...props}
                            loading={loading}
                            disabled={disabled}
                            checkout={checkout}
                            updateFormik={updateFormik}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            SummaryView={SummaryView}
                            // eslint-disable-next-line no-return-assign
                            refSummary={SummaryRef}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            travelokaPayRef={travelokaPayRef}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
