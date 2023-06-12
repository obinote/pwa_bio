/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Button from '@common_button';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Layout from '@layout_customer';

import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@core_modules/customer/pages/profile/components/style';

const ProfileForm = (props) => {
    const styles = useStyles();
    const {
        t, formik, handleChangePhone, setEditEmail,
        editEmail, setEditPass, editPass, updateCustomerStatus, changeCustomerPasswordStatus, UpdateCustomerEmailStatus,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <form className={classNames('custom-edit-account', styles.container)} onSubmit={formik.handleSubmit}>
            <div className="custom-edit-account-left">
                <legend className="legend"><span>{t('customer:profile:accountInformation')}</span></legend>
                <TextField
                    required
                    label={t('common:form:firstName')}
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.firstName && formik.errors.firstName)
                    }
                    errorMessage={
                        (formik.touched.firstName && formik.errors.firstName)
                        || null
                    }
                />

                <TextField
                    required
                    label={t('common:form:lastName')}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.lastName && formik.errors.lastName)
                    }
                    errorMessage={
                        (formik.touched.lastName && formik.errors.lastName) || null
                    }
                />

                <TextField
                    required
                    label={t('common:form:phoneNumber')}
                    name="phonenumber"
                    value={formik.values.phonenumber}
                    onChange={handleChangePhone}
                    error={
                        !!(formik.touched.phonenumber && formik.errors.phonenumber)
                    }
                    errorMessage={
                        (formik.touched.phonenumber && formik.errors.phonenumber) || null
                    }
                />

                <FormControlLabel
                    className={styles.checkboxLabel}
                    onChange={() => setEditEmail(!editEmail)}
                    control={(
                        <Checkbox
                            checked={editEmail}
                            name="emailCheckbox"
                            color="primary"
                            size="small"
                        />
                    )}
                    label={(
                        <Typography variant="span">
                            {t('common:button:change')}
                            {' '}
                            Email
                        </Typography>
                    )}
                />

                <FormControlLabel
                    className={styles.checkboxLabel}
                    onChange={() => setEditPass(!editPass)}
                    control={(
                        <Checkbox
                            checked={editPass}
                            name="passwordCheckbox"
                            color="primary"
                            size="small"
                        />
                    )}
                    label={(
                        <Typography variant="span">
                            {t('common:button:change')}
                            {' '}
                            Password
                        </Typography>
                    )}
                />

                {/* <FormControlLabel
                    className={styles.checkboxLabel}
                    onChange={() => setEditRemote(!editRemote)}
                    control={(
                        <Checkbox
                            onChange={editRemote}
                            name="passwordCheckbox"
                            color="primary"
                            size="small"
                        />
                    )}
                    label={(
                        <Typography variant="span">
                            {t('common:form:remoteShopping')}
                        </Typography>
                    )}
                /> */}
            </div>

            <div className="custom-edit-account-right">
                <div className={styles.editContainer}>
                    <div className={editEmail ? 'show' : 'hide'}>
                        <div className={!editPass ? 'show' : 'hide'}>
                            <legend className="legend"><span>{t('customer:profile:changeEmail')}</span></legend>
                        </div>
                        <div className={editPass ? 'show' : 'hide'}>
                            <legend className="legend"><span>{t('customer:profile:changeEmailPassword')}</span></legend>
                        </div>
                        <TextField
                            required
                            label="Email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.email && formik.errors.email)
                            }
                            errorMessage={
                                (formik.touched.email && formik.errors.email) || null
                            }
                        />
                    </div>
                    <div className={editEmail || editPass ? 'show' : 'hide'}>
                        <div className={!editEmail ? 'show' : 'hide'}>
                            <legend className="legend"><span>{t('customer:profile:changePassword')}</span></legend>
                        </div>
                        <PasswordField
                            required
                            label={t('common:form:currentPassword')}
                            showVisible
                            name="currentPassword"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.currentPassword
                                    && formik.errors.currentPassword)
                            }
                            errorMessage={
                                (formik.touched.currentPassword
                                    && formik.errors.currentPassword)
                                || null
                            }
                        />
                    </div>
                    <div className={editPass ? 'show' : 'hide'}>
                        <PasswordField
                            required
                            t={t}
                            label={t('common:form:newPassword')}
                            showVisible
                            showPasswordMeter
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.password && formik.errors.password)
                            }
                            errorMessage={
                                (formik.touched.password
                                    && formik.errors.password)
                                || null
                            }
                        />
                        <TextField
                            required
                            label={t('common:form:confirm')}
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.confirmPassword
                                    && formik.errors.confirmPassword)
                            }
                            errorMessage={
                                (formik.touched.confirmPassword
                                    && formik.errors.confirmPassword)
                                || null
                            }
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottomButtons}>
                <Button
                    fullWidth={!desktop}
                    type="submit"
                    loading={updateCustomerStatus.loading || changeCustomerPasswordStatus.loading || UpdateCustomerEmailStatus.loading}
                    align={desktop ? 'left' : 'center'}
                >
                    <Typography letter="capitalize" color="white" type="bold">
                        {t('common:button:save')}
                    </Typography>
                </Button>
            </div>
        </form>
    );
};

const ProfilePage = (props) => {
    const { data } = props;

    return (
        <>
            <ProfileForm
                {...props}
                data={data.customer}
            />
        </>
    );
};

export default ProfilePage;
