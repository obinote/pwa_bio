import Typography from '@common_typography';
import TextField from '@common_textfield';
import Toast from '@common_toast';
import Loading from '@common_loaders/Backdrop';
import OtpBlock from '@plugin_otp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useStyles from '@core_modules/forgotpassword/pages/default/components/style';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReCAPTCHA from 'react-google-recaptcha';

const ForgotPassword = (props) => {
    const styles = useStyles();
    const {
        t, loading, data, formik, load, useEmail, handleSwitch, toast, setToast, setDisabled, useForgotWithPhone,
        isExpired, enableRecaptcha, siteKey, recaptchaRef, onChangeRecaptcha,
    } = props;

    const desktop = breakPointsUp('sm');

    if (loading) return <Loading open />;

    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.pageTitleWrapper)}>
                <h1 className={classNames(styles.pageTitle)}>
                    {t('forgotpassword:title')}
                </h1>
            </div>

            {
                isExpired
                    ? (
                        <div className={classNames(styles.pageMessageWrapper)}>
                            <HighlightOffIcon style={{ fill: '#b30000', fontSize: 24 }} />
                            <div className={classNames(styles.pageMessage)}>
                                {t('forgotpassword:isExpired')}
                            </div>
                        </div>
                    )
                    : <></>
            }

            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                        <Loading open={load} />
                        {data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && (
                            <FormControlLabel
                                control={<Switch checked={useEmail} onChange={handleSwitch} name="useOtp" color="primary" />}
                                className={styles.switch}
                                label={t('forgotpassword:useEmail')}
                            />
                        )}
                        {useEmail ? (
                            toast.open && (
                                <Toast
                                    autoHideDuration={null}
                                    open={toast.open}
                                    setOpen={() => setToast({ ...toast, open: false })}
                                    message={toast.text}
                                    variant={toast.variant}
                                />
                            )
                        ) : (
                            <Toast
                                open={toast.open}
                                setOpen={() => setToast({ ...toast, open: false })}
                                message={toast.text}
                                variant={toast.variant}
                            />
                        )}
                        {(!useEmail && useForgotWithPhone && (
                            <>
                                <Typography variant="span" align="left">
                                    {t('forgotpassword:contentWithPhoneEmail')}
                                </Typography>
                                <TextField
                                    label={t('forgotpassword:phoneEmailLabel')}
                                    placeholder={t('forgotpassword:phoneEmailFields')}
                                    name="phoneNumberEmail"
                                    value={formik.values.phoneNumberEmail}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.phoneNumberEmail}
                                    errorMessage={formik.errors.phoneNumberEmail || null}
                                />
                            </>
                        ))
                            || (useEmail && (
                                <>
                                    <Typography variant="span" align="left" className={classNames(styles.fieldNote)}>
                                        {t('forgotpassword:content')}
                                    </Typography>
                                    <TextField
                                        required
                                        label="Email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={!!formik.errors.email}
                                        errorMessage={formik.errors.email || null}
                                    />
                                </>
                            ))}
                        {data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && !useEmail && (
                            <OtpBlock
                                setDisabled={setDisabled}
                                type="forgotPassword"
                                phoneProps={{
                                    name: 'phoneNumber',
                                    value: formik.values.phoneNumber,
                                    onChange: formik.handleChange,
                                    error: !!formik.errors.phoneNumber,
                                    errorMessage: formik.errors.phoneNumber || null,
                                }}
                                codeProps={{
                                    name: 'otp',
                                    value: formik.values.otp,
                                    onChange: formik.handleChange,
                                    error: !!formik.errors.otp,
                                    errorMessage: formik.errors.otp || null,
                                }}
                            />
                        )}
                        {enableRecaptcha && (
                            <>
                                <ReCAPTCHA
                                    sitekey={siteKey}
                                    onChange={onChangeRecaptcha}
                                    ref={recaptchaRef}
                                />
                                <Typography className={styles.errorHelperText}>{formik.errors.captcha}</Typography>
                            </>
                        )}
                        <button
                            className={styles.btn}
                            type="submit"
                            style={desktop ? { width: 'max-content' } : {}}
                        >
                            <span className={styles.btnLabel}>
                                {t('forgotpassword:resetMyPassword')}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
