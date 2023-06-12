import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from '@core_modules/checkout/pages/default/components/OtpCheckout/style';

const OtpCheckoutView = (props) => {
    const {
        t,
        onGenerateOtp,
        formik,
        loadingOtp,
        checkout: {
            status: { otpReady },
        },
    } = props;
    const styles = useStyles();
    const maxLength = 6;

    const handleOtpChange = (e) => {
        const { value } = e.target;
        if (value.length <= maxLength) {
            formik.handleChange(e);
        }
    }

    return (
        <>
            <div id="otp-checkout" className={styles.otpContainer}>
                <div className="center" style={{ marginTop: 48, marginBottom: 50 }}>
                    <Typography variant="p" letter="capitalize" type="bold" align="center" size="18" className={[styles.otpTitle]}>
                        {t('checkout:checkoutOtp:verification')}
                    </Typography>
                    <Typography variant="p" letter="capitalize" type="regular" align="center" size="12" className={[styles.otpDescription]}>
                        {t('checkout:checkoutOtp:description')}
                    </Typography>
                    {otpReady === false && (
                        <Button
                            id="button_generate_otp"
                            className={[styles.otpBtn, styles.mt_20].join(' ')}
                            onClick={onGenerateOtp}
                            loading={loadingOtp}
                        >
                            <Typography variant="span" letter="capitalize" type="regular" size="14" className={[styles.otpBtnLable]}>
                                {t('checkout:checkoutOtp:generateOtp')}
                            </Typography>
                        </Button>
                    )}
                    {otpReady === true && (
                        <Grid container justifyContent="center" alignContent="center" alignItems="center" className={styles.mt_20}>
                            <Grid item xs={12} md={12}>
                                <div className={styles.otpInputContainer}>
                                    <TextField
                                        id="checkout_otp_field"
                                        type="number"
                                        variant="outlined"
                                        name="checkoutOtp"
                                        inputProps={{ style: { padding: 10, letterSpacing: 5 } }}
                                        onChange={handleOtpChange}
                                        value={formik.values.checkoutOtp}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </div>
        </>
    );
};

export default OtpCheckoutView;
