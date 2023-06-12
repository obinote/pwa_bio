import React, { useEffect, useState } from 'react';
import OtpCheckoutView from '@core_modules/checkout/pages/default/components/OtpCheckout/view';
import gqlService from '@core_modules/checkout/services/graphql';

const OtpCheckout = (props) => {
    const {
        t, checkout, formik, handleOpenMessage, setCheckout,
    } = props;
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [generateOtp] = gqlService.generateCheckoutOtp({ onError: () => {} });
    const [validateOtp] = gqlService.validateCheckoutOtp({ onError: () => {} });
    const customerEmail = checkout?.data?.cart?.apoteker_email ?? null;

    const onGenerateOtp = async () => {
        const state = {
            ...checkout,
        };
        state.selected.checkoutOtp = false;

        setLoadingOtp(true);
        setCheckout(state);

        if (!customerEmail) {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:checkoutOtp:validation:emailInvalid'),
            });

            setLoadingOtp(false);

            return;
        }

        const result = await generateOtp({
            variables: {
                email: customerEmail,
            },
        });

        if (result?.data) {
            state.status.otpReady = true;
            setCheckout(state);
        }

        if (result?.errors?.message) {
            handleOpenMessage({
                variant: 'error',
                text: result.errors.message,
            });
        }

        setLoadingOtp(false);
    };

    useEffect(() => {
        const state = {
            ...checkout,
        };
        const otp = formik.values.checkoutOtp;
        const validate = setTimeout(async () => {
            if (otp && otp.toString().length === 6) {
                const result = await validateOtp({
                    variables: {
                        email: customerEmail,
                        otp: otp.toString(),
                    },
                });

                if (result?.data) {
                    state.selected.checkoutOtp = otp;
                    setCheckout(state);
                }

                if (result?.errors) {
                    state.status.otpReady = false;
                    state.selected.checkoutOtp = false;
                    setCheckout(state);

                    if (result.errors?.message) {
                        handleOpenMessage({
                            variant: 'error',
                            text: result.errors.message,
                        });
                    }
                }
            } else {
                state.selected.checkoutOtp = false;
                setCheckout(state);
            }
        }, 500);

        return () => clearTimeout(validate);
    }, [formik.values.checkoutOtp]);

    const contentProps = {
        t,
        formik,
        checkout,
        loadingOtp,
        onGenerateOtp,
    };
    return <OtpCheckoutView {...contentProps} />;
};

export default OtpCheckout;
