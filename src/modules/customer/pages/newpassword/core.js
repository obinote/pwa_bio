import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@layout';
import Router from 'next/router';
import { newPassword, checkExpiredRegisterToken } from '@core_modules/customer/services/graphql';
import { useMemoizedCheckPassword } from '@helpers/passwordStrength';

const NewPassword = (props) => {
    const {
        t, Content, pageConfig, query: { id, token },
    } = props;
    const config = {
        title: t('register:setANewPassword'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('register:setANewPassword'),
        bottomNav: false,
    };
    const [disabled, setdisabled] = React.useState(false);
    const [setNewPassword] = newPassword();
    const { loading, error } = checkExpiredRegisterToken({
        id: Number(id),
        token,
    });
    const checkPassword = useMemoizedCheckPassword();

    useEffect(() => {
        if (error?.message?.includes('expired')) {
            Router.push({
                pathname: '/customer/account/forgotpassword',
                query: { is_expired: 1 },
            }, '/customer/account/forgotpassword');
        }
    }, [error]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required(t('validate:newPassword:required'))
                .test(
                    'password-strength',
                    ({ value }) => {
                        const { message: strengthMessage } = checkPassword(value);
                        const lowScoreMessage = t('validate:newPassword:scoreMustBeAtLeast:medium');
                        return strengthMessage ? `${lowScoreMessage}<br/>${strengthMessage}` : lowScoreMessage;
                    },
                    (value) => checkPassword(value).score >= 2,
                ),
            confirmPassword: Yup.string()
                .required(t('validate:confirmNewPassword:required'))
                // eslint-disable-next-line no-use-before-define
                .test('check-pass', t('validate:confirmNewPassword.wrong'), (input) => input === formik.values.password),
        }),
        onSubmit: (values, { resetForm }) => {
            setdisabled(true);
            window.backdropLoader(true);
            setNewPassword({
                variables: {
                    ...values,
                    id: Number(id),
                    token,
                },
            })
                .then(async () => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: t('register:setANewPasswordSuccess'),
                    });
                    resetForm({});
                    setTimeout(() => {
                        Router.push('/customer/account/login');
                    }, 3000);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message || t('register:setANewPasswordFailed'),
                    });

                    if (e?.message?.includes('expired')) {
                        Router.push({
                            pathname: '/customer/account/forgotpassword',
                            query: { is_expired: 1 },
                        }, '/customer/account/forgotpassword');
                    }
                });
        },
    });

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content t={t} formik={formik} disabled={disabled} loading={loading} strength={checkPassword(formik.values.password)} />
        </Layout>
    );
};

export default NewPassword;
