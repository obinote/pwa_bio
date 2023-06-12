import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import OtpBlock from '@plugin_otp';
import OtpView from '@plugin_otp/view';
import useStyles from '@core_modules/login/pages/default/components/style';
import { features } from '@config';
import Link from '@root/node_modules/next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Login = (props) => {
    const {
        formik,
        otpConfig,
        isOtp,
        setIsOtp,
        t,
        setDisabled,
        disabled,
        loading,
        formikOtp,
        toastMessage,
        socialLoginMethodData,
        socialLoginMethodLoading,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        query,
        formikPhoneEmail,
        phonePassword,
    } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    const signInOptions = [];

    if (features.firebase.config.apiKey !== '' && firebase && firebase.auth && socialLoginMethodData && socialLoginMethodData.length > 0) {
        for (let idx = 0; idx < socialLoginMethodData.length; idx += 1) {
            const code = socialLoginMethodData[idx];
            if (code.match(/google/i) && firebase.auth.GoogleAuthProvider && firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
            }

            if (code.match(/facebook/i) && firebase.auth.FacebookAuthProvider && firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);
            }

            if (code.match(/twitter/i) && firebase.auth.TwitterAuthProvider && firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
            }

            if (code.match(/github/i) && firebase.auth.GithubAuthProvider && firebase.auth.GithubAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
            }

            if (code.match(/email/i) && firebase.auth.EmailAuthProvider && firebase.auth.EmailAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);
            }
        }
    }

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions,
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };

    const [firebaseLoaded, setFirebaseLoaded] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        if (features.firebase.config.apiKey === '') {
            setFirebaseLoaded(false);
        } else {
            setFirebaseLoaded(true);
        }
    }, [firebaseLoaded]);

    return (
        <div className={styles.container}>
            {!desktop && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                <FormControlLabel
                    control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                    className={classNames(styles.selectLogin, 'hidden-desktop')}
                    label={t('login:switchPhone')}
                />
            )}
            <div className={classNames('row between-sm between-md between-lg', styles.desktopContainer)}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <Typography id="h2_selamat_datang" type="bold" variant="h2" className={styles.title}>
                        {t('login:customerLogin')}
                    </Typography>
                    <Typography variant="p" className={styles.titleInformation}>
                        {t('login:loginInformation')}
                    </Typography>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 login-container">
                    <div className="row">
                        {(!isOtp || desktop) && phonePassword === false && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 clear-margin-padding">
                                <form onSubmit={formik.handleSubmit} autoComplete="off">
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="input-container">
                                                <label className="label" htmlFor="username">
                                                    {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login
                                                        ? t('login:emailLabel')
                                                        : t('login:phoneEmailLabel')}
                                                    {' '}
                                                    <span>*</span>
                                                </label>
                                                <input
                                                    id="username"
                                                    className="input input-username"
                                                    type="text"
                                                    name="username"
                                                    value={formik.values.username}
                                                    onChange={formik.handleChange}
                                                    autoComplete="off"
                                                />
                                                {formik.errors.username && (
                                                    <Typography variant="caption" align="left" color="red">
                                                        {formik.errors.username}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="input-container">
                                                <label className="label" htmlFor="password">
                                                    {t('login:password')}
                                                    {' '}
                                                    <span>*</span>
                                                    <div className="input-password-container">
                                                        <input
                                                            id="password"
                                                            className="input input-password"
                                                            type={passwordVisible ? 'text' : 'password'}
                                                            name="password"
                                                            value={formikPhoneEmail.values.password}
                                                            onChange={formikPhoneEmail.handleChange}
                                                        />
                                                        {passwordVisible ? (
                                                            <VisibilityIcon
                                                                className="password-icon"
                                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                            />
                                                        ) : (
                                                            <VisibilityOffIcon
                                                                className="password-icon"
                                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                            />
                                                        )}
                                                    </div>
                                                </label>
                                                {formik.errors.password && (
                                                    <Typography variant="caption" align="left" color="red">
                                                        {formik.errors.password}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <div className={classNames(styles.recaptchaWrapper)}>
                                                    <ReCAPTCHA
                                                        className={styles.recaptchaStyle}
                                                        sitekey={sitekey}
                                                        onChange={handleChangeCaptcha}
                                                        ref={recaptchaRef}
                                                    />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop || loading ? false : disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography className="button-label" variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            {firebaseLoaded && firebase.app() && !socialLoginMethodLoading && (
                                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                            )}
                                        </div>
                                        <div className="button-container">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop || loading ? false : disabled}
                                                align="left"
                                            >
                                                <Typography className="button-label" variant="span" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                            <div className="forgot-password">
                                                <Link href="/customer/account/forgotpassword">
                                                    <a>{t('login:forgotPassword')}</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        {(!isOtp || desktop) && phonePassword !== false && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 clear-margin-padding">
                                <form onSubmit={formikPhoneEmail.handleSubmit} autoComplete="off">
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="input-container">
                                                <label className="label" htmlFor="username">
                                                    {t('login:emailLabel')}
                                                    {' '}
                                                    <span>*</span>
                                                </label>
                                                <input
                                                    id="username"
                                                    className="input input-username"
                                                    type="text"
                                                    name="username"
                                                    value={formikPhoneEmail.values.username}
                                                    onChange={formikPhoneEmail.handleChange}
                                                    autoComplete="off"
                                                />
                                                {formikPhoneEmail.errors.username && (
                                                    <Typography className={styles.errorLabel} variant="p" align="left" color="red">
                                                        {formikPhoneEmail.errors.username}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="input-container">
                                                <label className="label" htmlFor="password">
                                                    {t('login:password')}
                                                    {' '}
                                                    <span>*</span>
                                                    <div className="input-password-container">
                                                        <input
                                                            id="password"
                                                            className="input input-password"
                                                            type={passwordVisible ? 'text' : 'password'}
                                                            name="password"
                                                            value={formikPhoneEmail.values.password}
                                                            onChange={formikPhoneEmail.handleChange}
                                                        />
                                                        {passwordVisible ? (
                                                            <VisibilityIcon
                                                                className="password-icon"
                                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                            />
                                                        ) : (
                                                            <VisibilityOffIcon
                                                                className="password-icon"
                                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                            />
                                                        )}
                                                    </div>
                                                </label>
                                                {formikPhoneEmail.errors.password && (
                                                    <Typography className={styles.errorLabel} variant="p" align="left" color="red">
                                                        {formikPhoneEmail.errors.password}
                                                    </Typography>
                                                )}
                                                <Link href="/customer/account/forgotpassword">
                                                    <a>
                                                        <Typography className={styles.linkStyle} variant="p">
                                                            {t('login:forgotPassword')}
                                                        </Typography>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-12">
                                            {enableRecaptcha ? (
                                                <div className={classNames(styles.recaptchaWrapper)}>
                                                    <ReCAPTCHA
                                                        className={styles.recaptchaStyle}
                                                        sitekey={sitekey}
                                                        onChange={handleChangeCaptcha}
                                                        ref={recaptchaRef}
                                                    />
                                                    {formikPhoneEmail.errors.captcha && (
                                                        <Typography className={styles.errorLabel} variant="p" align="center" color="red">
                                                            {formikPhoneEmail.errors.captcha}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>

                                        <div className="button-container">
                                            <Button
                                                id="login_button_masuk"
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop || loading ? false : disabled}
                                                align="left"
                                            >
                                                <Typography className="button-label" variant="span" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                        </div>

                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            {firebaseLoaded && firebase.app() && !socialLoginMethodLoading && (
                                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {(isOtp || desktop) && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={formikOtp.handleSubmit} className={styles.formOtp} autoComplete="off">
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12">
                                            <OtpBlock
                                                setDisabled={setDisabled}
                                                type="login"
                                                OtpView={OtpView}
                                                phoneProps={{
                                                    name: 'username',
                                                    placeholder: '+6281234xxxx',
                                                    value: formikOtp.values.username,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!formikOtp.errors.username,
                                                    errorMessage: formikOtp.errors.username || null,
                                                }}
                                                codeProps={{
                                                    name: 'otp',
                                                    value: formikOtp.values.otp,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!(formikOtp.touched.otp && formikOtp.errors.otp),
                                                    errorMessage: (formikOtp.touched.otp && formikOtp.errors.otp) || null,
                                                }}
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <div className={classNames(styles.recaptchaWrapper)}>
                                                    <ReCAPTCHA
                                                        className={styles.recaptchaStyle}
                                                        sitekey={sitekey}
                                                        onChange={handleChangeCaptcha}
                                                        ref={recaptchaRef}
                                                    />
                                                    {formikOtp.errors.captcha && <Typography color="red">{formikOtp.errors.captcha}</Typography>}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography className="button-label" variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('common:button:submit')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 register-container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={styles.headerSpan}>
                                <Typography className="clear-margin-padding register-title" type="bold" variant="p" letter="capitalize">
                                    {t('login:newCustomer')}
                                </Typography>
                                {' '}
                                <Link
                                    href={query && query.redirect ? `/company/account/create?redirect=${query.redirect}` : '/company/account/create'}
                                    disabled={desktop ? false : disabled}
                                >
                                    <a>
                                        <Typography className={styles.linkStyle} variant="span">
                                            {t('login:registerTitle')}
                                        </Typography>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {toastMessage}
            </div>
        </div>
    );
};

export default Login;
