import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helper_regex';
import {
    updateCustomerProfile as gqlUpdateCustomer,
    updateCustomerEmail as gqlUpdateCustomerEmail,
    changeCustomerPassword as gqlChangeCustomerPassword, getCustomer,
} from '@core_modules/customer/services/graphql';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const ProfilePage = (props) => {
    const {
        data, error, loading, Content, t, Skeleton,
    } = props;

    if (loading) return <CustomerLayout {...props}><Skeleton /></CustomerLayout>;
    if (error) return <CustomerLayout {...props}><p>{`Error: ${error.message}`}</p></CustomerLayout>;
    if (!data) return null;

    const [updateCustomer, updateCustomerStatus] = gqlUpdateCustomer();
    const [changeCustomerPassword, changeCustomerPasswordStatus] = gqlChangeCustomerPassword();
    const [UpdateCustomerEmail, UpdateCustomerEmailStatus] = gqlUpdateCustomerEmail();
    const [editEmail, setEditEmail] = React.useState(false);
    const [editPass, setEditPass] = React.useState(false);
    const [editRemote, setEditRemote] = React.useState(false);

    const ProfileSchema = Yup.object().shape({
        email: editEmail && Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        phonenumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        currentPassword:
            (editEmail || editPass) && Yup.string().required(t('validate:password:required')),
        password:
            editPass && Yup.string().required(t('validate:password:required')),
        confirmPassword:
            editPass
            && Yup.string()
                .required(t('validate:confirmPassword:required'))
                .test(
                    'check-pass',
                    t('validate:confirmPassword.wrong'),
                    // eslint-disable-next-line no-use-before-define
                    (input) => (input === formik.values.password),
                ),
    });

    const formik = useFormik({
        initialValues: {
            firstName: data.firstname,
            lastName: data.lastname,
            phonenumber: data.phonenumber || '',
            email: data.email,
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (values, { setSubmitting, setFieldValue }) => {
            if (!updateCustomerStatus.loading && !changeCustomerPasswordStatus.loading && !UpdateCustomerEmailStatus.loading) {
                window.backdropLoader(true);
                await updateCustomer({
                    variables: {
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: editEmail ? values.email : data.email,
                        password: values.currentPassword,
                        phonenumber: values.phonenumber,
                    },
                }).then(async () => {
                    if (editEmail) {
                        await UpdateCustomerEmail({
                            variables: {
                                email: values.email,
                                password: values.currentPassword,
                            },
                        });
                        setFieldValue('currentPassword', '', false);
                    }
                    if (editPass) {
                        await changeCustomerPassword({
                            variables: {
                                currentPassword: values.currentPassword,
                                newPassword: values.password,
                            },
                        });
                        setFieldValue('currentPassword', '', false);
                        setFieldValue('password', '', false);
                        setFieldValue('confirmPassword', '', false);
                    }
                    setEditRemote(false);
                    setEditEmail(false);
                    setEditPass(false);
                    setSubmitting(false);
                    window.backdropLoader(false);
                    window.toastMessage({ variant: 'success', open: true, text: t('customer:profile:successUpdate') });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({ variant: 'error', open: true, text: e.message ? e.message.split(':')[0] : t('common:error:fetchError') });
                });
            }
        },
    });

    const handleChangePhone = (event) => {
        const { value } = event.target;
        formik.setFieldValue('phonenumber', value);
    };

    return (
        <CustomerLayout {...props}>
            <Content
                t={t}
                loading={loading}
                error={error}
                data={data}
                formik={formik}
                handleChangePhone={handleChangePhone}
                setEditEmail={setEditEmail}
                editEmail={editEmail}
                setEditPass={setEditPass}
                editPass={editPass}
                setEditRemote={setEditRemote}
                editRemote={editRemote}
                updateCustomerStatus={updateCustomerStatus}
                changeCustomerPasswordStatus={changeCustomerPasswordStatus}
                UpdateCustomerEmailStatus={UpdateCustomerEmailStatus}
            />
        </CustomerLayout>
    );
};

const Profile = (props) => {
    const { t, pageConfig, storeConfig } = props;
    const config = {
        title: t('customer:profile:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:profile:title'),
        bottomNav: false,
    };

    const { error, loading, data } = getCustomer(storeConfig);

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <ProfilePage {...props} loading={loading} data={data && data.customer ? data.customer : null} error={error} />
        </Layout>
    );
};

export default Profile;
