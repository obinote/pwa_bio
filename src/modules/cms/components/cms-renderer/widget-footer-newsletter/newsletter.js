import React, { useState } from 'react';
import { subscribeNewsletter } from '@core_modules/customer/services/graphql/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsletterFooter = (props) => {
    const { t } = props;
    const [loading, setLoading] = useState(false);
    const [onPostSubscribe] = subscribeNewsletter();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email(t('common:error:emailError')).required(t('common:error:emailRequired')),
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            onPostSubscribe({
                variables: { email: values.email },
            })
                .then(async (res) => {
                    const data = res.data.subscribe.status;
                    window.toastMessage({
                        open: true,
                        variant: data.response !== 'Failed' ? 'success' : 'error',
                        text: data.message,
                    });
                    resetForm();
                    setLoading(false);
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('common:newsletter:emailFormat'),
                    });
                    setLoading(false);
                });
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <div className="field newsletter">
                <div className="control">
                    <label htmlFor="newsletter">
                        <input
                            disabled={loading}
                            id="newsletter"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && <span className="error-input">{formik.errors.email}</span> }
                    </label>
                </div>
            </div>
            <div className="actions">
                <button
                    disabled={loading}
                    type="submit"
                    className="action subscribe primary"
                    title="Subscribe"
                    aria-label="Subscribe"
                >
                    { loading && <CircularProgress style={{ marginTop: 8 }} size={20} color="#42929d" /> }
                    {!loading && t('common:newsLetter:buttonTitle')}
                </button>
            </div>
        </form>
    );
};

export default NewsletterFooter;
