import Password from '@common_password';
import Typography from '@common_typography';
import { PasswordFieldBase, PasswordMeter } from '@core_modules/commons/Password/index';
import useStyles from '@core_modules/customer/pages/newpassword/components/style';
import classNames from 'classnames';
import useTextFieldStyles from '@common_textfield/style';
import Skeleton from './Skeleton';

const ForgotPassword = (props) => {
    const styles = useStyles();
    const textFieldStyles = useTextFieldStyles();
    const {
        t, formik, loading, strength,
    } = props;

    if (loading) return <Skeleton />;

    return (
        <div className={classNames(styles.container)}>
            <h1 className={classNames(styles.pageTitle)}>{t('register:setANewPassword')}</h1>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <PasswordFieldBase
                    required
                    showRevealIcon
                    name="password"
                    label={t('register:newPassword')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    footer={(
                        <>
                            <PasswordMeter strength={strength} />
                            <Typography
                                variant="p"
                                className={textFieldStyles.errorInfo}
                                dangerouslySetInnerHTML={{ __html: formik.errors.password }}
                            />
                        </>
                    )}
                />
                <Password
                    t={t}
                    required
                    label={t('register:confirmNewPassword')}
                    className={styles.email}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={!!formik.errors.confirmPassword}
                    errorMessage={formik.errors.confirmPassword || null}
                    showVisible
                />
                <button className={styles.btn} type="submit">
                    {t('register:setANewPasswordBtn')}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
