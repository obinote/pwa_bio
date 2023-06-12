import Button from '@common_button';
import Select from '@common_select';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import useStyles from '@core_modules/register/pages/default/components/style';
import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import ButtonMui from '@material-ui/core/Button';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterView = ({
    t,
    formik,
    countries,
    provinces,
    cities,
    district,
    subdistrict,
    handleChangeCountry,
    handleChangeProvince,
    handleChangeCity,
    handleChangeDistrict,
    handleChangeSubdistrict,
    showOTPButton,
    handleGetOTP,
    otpEmail,
    enableRecaptcha,
    sitekey,
    handleChangeCaptcha,
    recaptchaRef,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const num = /^\d+$/;

    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.pageTitleWrapper)}>
                <h1 className={classNames(styles.pageTitle)}>{t('register:title')}</h1>
                <div className={styles.headerSpan}>
                    <Typography>{t('register:alreadyRegistered')}</Typography>
                    {' '}
                    <Link href="/customer/account/login">
                        <a>
                            <Typography className={styles.linkStyle} variant="span">
                                {t('register:signIn')}
                            </Typography>
                        </a>
                    </Link>
                </div>
            </div>
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>
                <div className={classNames(styles.fieldset, styles.companyInfo)}>
                    <div className={classNames(styles.companyTitle)}>
                        <div className={classNames(styles.companyLabelWrapper)}>
                            <p className={classNames(styles.companyTitleLabel)}>{t('register:companyInfo')}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.companyContent)}>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:companyName')}
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.companyName && formik.errors.companyName)}
                                errorMessage={(formik.touched.companyName && formik.errors.companyName) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:companyEmail')}
                                type="email"
                                name="companyEmail"
                                value={formik.values.companyEmail}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.companyEmail && formik.errors.companyEmail)}
                                errorMessage={(formik.touched.companyEmail && formik.errors.companyEmail) || null}
                            />
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.fieldset, styles.companyAddress)}>
                    <div className={classNames(styles.companyTitle)}>
                        <div className={classNames(styles.companyLabelWrapper)}>
                            <p className={classNames(styles.companyTitleLabel)}>{t('register:companyAddress')}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.companyContent)}>
                        <div className={classNames(styles.fullContent)}>
                            <TextField
                                required
                                label={t('register:address')}
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.address && formik.errors.address)}
                                errorMessage={(formik.touched.address && formik.errors.address) || null}
                            />
                        </div>
                    </div>
                    <div className={classNames(styles.companyContent)}>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:country')}
                                name="country"
                                helperText={t('common:form:select')}
                                options={countries}
                                value={formik.values.country}
                                onChange={(e) => handleChangeCountry(e.target.value)}
                                error={!!(formik.touched.country && formik.errors.country)}
                                errorMessage={(formik.touched.country && formik.errors.country) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:province')}
                                name="province"
                                helperText={t('common:form:select')}
                                options={provinces}
                                value={formik.values.province}
                                onChange={(e) => handleChangeProvince(e.target.value)}
                                error={!!(formik.touched.province && formik.errors.province)}
                                errorMessage={(formik.touched.province && formik.errors.province) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:city')}
                                name="city"
                                helperText={t('common:form:select')}
                                options={cities}
                                value={formik.values.city}
                                onChange={(e) => handleChangeCity(e.target.value)}
                                error={!!(formik.touched.city && formik.errors.city)}
                                errorMessage={(formik.touched.city && formik.errors.city) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:district')}
                                name="district"
                                helperText={t('common:form:select')}
                                options={district}
                                value={formik.values.district}
                                onChange={(e) => handleChangeDistrict(e.target.value)}
                                error={!!(formik.touched.district && formik.errors.district)}
                                errorMessage={(formik.touched.district && formik.errors.district) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:subdistrict')}
                                name="subdistrict"
                                helperText={t('common:form:select')}
                                options={subdistrict}
                                value={formik.values.subdistrict}
                                onChange={(e) => handleChangeSubdistrict(e.target.value)}
                                error={!!(formik.touched.subdistrict && formik.errors.subdistrict)}
                                errorMessage={(formik.touched.subdistrict && formik.errors.subdistrict) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:postalCode')}
                                name="postalCode"
                                value={formik.values.postalCode}
                                onChange={(e) => {
                                    if (num.test(e.target.value) || e.target.value === '') {
                                        formik.handleChange(e);
                                    }
                                }}
                                error={!!(formik.touched.postalCode && formik.errors.postalCode)}
                                errorMessage={(formik.touched.postalCode && formik.errors.postalCode) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:phoneNumber')}
                                name="companyPhoneNumber"
                                value={formik.values.companyPhoneNumber}
                                onChange={(e) => {
                                    if (num.test(e.target.value) || e.target.value === '') {
                                        formik.handleChange(e);
                                    }
                                }}
                                error={!!(formik.touched.companyPhoneNumber && formik.errors.companyPhoneNumber)}
                                errorMessage={(formik.touched.companyPhoneNumber && formik.errors.companyPhoneNumber) || null}
                            />
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.fieldset, styles.companyAdmin)}>
                    <div className={classNames(styles.companyTitle)}>
                        <div className={classNames(styles.companyLabelWrapper)}>
                            <p className={classNames(styles.companyTitleLabel)}>{t('register:companyAdmin')}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.companyContent)}>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:name')}
                                name="adminName"
                                value={formik.values.adminName}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.adminName && formik.errors.adminName)}
                                errorMessage={(formik.touched.adminName && formik.errors.adminName) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:position')}
                                name="position"
                                value={formik.values.position}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.position && formik.errors.position)}
                                errorMessage={(formik.touched.position && formik.errors.position) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent, styles.selectField)}>
                            <Select
                                required
                                label={t('register:gender')}
                                name="gender"
                                helperText={t('common:form:select')}
                                options={[
                                    { label: t('register:male'), value: 'Male' },
                                    { label: t('register:female'), value: 'Female' },
                                ]}
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.gender && formik.errors.gender)}
                                errorMessage={(formik.touched.gender && formik.errors.gender) || null}
                            />
                        </div>
                        <div className={classNames(styles.halfContent)}>
                            <TextField
                                required
                                label={t('register:phoneNumber')}
                                name="adminPhoneNumber"
                                value={formik.values.adminPhoneNumber}
                                onChange={(e) => {
                                    if (num.test(e.target.value) || e.target.value === '') {
                                        formik.handleChange(e);
                                    }
                                }}
                                error={!!(formik.touched.adminPhoneNumber && formik.errors.adminPhoneNumber)}
                                errorMessage={(formik.touched.adminPhoneNumber && formik.errors.adminPhoneNumber) || null}
                            />
                        </div>
                        <div>
                            <div className={classNames(styles.halfContent)}>
                                <TextField
                                    required
                                    label={t('register:email')}
                                    type="email"
                                    name="adminEmail"
                                    value={formik.values.adminEmail}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.adminEmail && formik.errors.adminEmail)}
                                    errorMessage={(formik.touched.adminEmail && formik.errors.adminEmail) || null}
                                />
                            </div>
                            <div className={classNames(styles.halfContent)}>
                                <TextField
                                    required
                                    label={t('register:enterOtp')}
                                    name="otp"
                                    value={formik.values.otp}
                                    onChange={(e) => {
                                        if (num.test(e.target.value) || e.target.value === '') {
                                            formik.handleChange(e);
                                        }
                                    }}
                                    error={!!formik.errors.otp}
                                    errorMessage={formik.errors.otp || null}
                                />
                            </div>
                        </div>

                        <div className={classNames(styles.fullContent, styles.otpStyle, showOTPButton ? 'showButton' : '')}>
                            <Typography className={styles.labelStyle} variant="span">
                                {t('register:otpInformation')}
                            </Typography>
                            {' '}
                            {showOTPButton ? (
                                <ButtonMui
                                    onClick={() => handleGetOTP()}
                                    variant="contained"
                                    color="primary"
                                    className={styles.btn}
                                    disabled={!formik.values.adminEmail || formik.errors.adminEmail}
                                >
                                    <Typography variant="span" type="bold">
                                        {!otpEmail ? t('register:getOtp') : t('register:resendOtp')}
                                    </Typography>
                                </ButtonMui>
                            ) : (
                                <p className={classNames(styles.otpSent)}>{t('register:otpSent')}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.fieldset, styles.referralInfo)}>
                    <div className={classNames(styles.companyContent)}>
                        <TextField
                            label={t('register:referral')}
                            placeholder={t('register:salesman_id')}
                            name="salesman_id"
                            value={formik.values.salesman_id}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.companyName && formik.errors.companyName)}
                        />
                    </div>
                </div>

                {enableRecaptcha ? (
                    <div className={classNames(styles.recaptchaWrapper)}>
                        <ReCAPTCHA className={styles.recaptchaStyle} sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                        {formik.errors.captcha && (
                            <Typography className={styles.errorCaptcha} variant="p" align="center" color="red">
                                {formik.errors.captcha}
                            </Typography>
                        )}
                    </div>
                ) : (
                    <></>
                )}

                <div className={styles.footer}>
                    <Button rootClassName={styles.btnSigninWrapper} className={styles.btn} type="submit" align={desktop ? 'right' : 'center'}>
                        <Typography variant="span" color="white">
                            {t('register:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterView;
