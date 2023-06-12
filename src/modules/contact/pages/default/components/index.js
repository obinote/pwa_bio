/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/control-has-associated-label */

import Typography from '@common_typography';
import Button from '@common_button';
import useStyles from '@core_modules/contact/pages/default/components/style';
import parse from 'html-react-parser';
import CustomAutocomplete from '@core_modules/commons/AutoComplete';
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactComponent = (props) => {
    const { content } = props;
    return parse(content, {
        replace: (domNode) => {
            if (domNode.attribs && domNode.attribs['data-content-type'] === 'html') {
                return (
                    <div dangerouslySetInnerHTML={{ __html: domNode.children[0].data }} />
                );
            }
        },
    });
};

const ContactForm = (props) => {
    const styles = useStyles();
    const {
        t, formik, load, isLogin, dataAvailableDepartments, resHelpdeskDepartmentOrder, getHelpdeskDepartmentOrder, selectedOrder, handleChangeOrder,
        enableRecaptcha, sitekey, recaptchaRef, handleChangeCaptcha,
    } = props;
    return (
        <form className={styles.containerForm} onSubmit={formik.handleSubmit}>
            <Typography variant="h6" type="bold" align="left" className={styles.note}>
                {t('contact:anyQuestion')}
            </Typography>
            <div className="input-container">
                <label className="label" htmlFor="customer_name">
                    {t('contact:name')}
                    {' '}
                    <span>*</span>
                </label>
                <input
                    id="customer_name"
                    className="input"
                    type="text"
                    name="customer_name"
                    value={formik.values.customer_name}
                    onChange={formik.handleChange}
                />
                { formik.touched.customer_name && formik.errors.customer_name && <Typography variant="caption" align="left" color="red">{formik.errors.customer_name}</Typography> }
            </div>
            <div className="input-container">
                <label className="label" htmlFor="customer_email">
                    {t('contact:email')}
                    {' '}
                    <span>*</span>
                </label>
                <input
                    id="customer_email"
                    className="input"
                    type="email"
                    name="customer_email"
                    value={formik.values.customer_email}
                    onChange={formik.handleChange}
                />
                { formik.touched.customer_email && formik.errors.customer_email && <Typography variant="caption" align="left" color="red">{formik.errors.customer_email}</Typography> }
            </div>
            <div className="input-container">
                <label className="label" htmlFor="telephone">
                    {t('contact:telephone')}
                    {' '}
                    <span>*</span>
                </label>
                <input
                    id="telephone"
                    className="input"
                    type="tel"
                    name="telephone"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                />
                { formik.touched.telephone && formik.errors.telephone && <Typography variant="caption" align="left" color="red">{formik.errors.telephone}</Typography> }
            </div>
            <div className="input-container">
                <label className="label" htmlFor="content">
                    {t('contact:message')}
                    {' '}
                    <span>*</span>
                </label>
                <textarea
                    rows={5}
                    cols={5}
                    id="content"
                    className="input textarea"
                    type="text"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />
                { formik.touched.content && formik.errors.content && <Typography variant="caption" align="left" color="red">{formik.errors.content}</Typography> }
            </div>
            <div className="input-container">
                <label className="label" htmlFor="subject">
                    {t('contact:subject')}
                    {' '}
                    <span>*</span>
                </label>
                <input
                    id="subject"
                    className="input"
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />
                { formik.touched.subject && formik.errors.subject && <Typography variant="caption" align="left" color="red">{formik.errors.subject}</Typography> }
            </div>
            {isLogin > 0 && (
                <>
                    <div className="input-container">
                        <label className="label" htmlFor="ccRecipients">
                            {t('contact:ccRecipients')}
                        </label>
                        <input
                            id="ccRecipients"
                            className="input"
                            type="text"
                            name="ccRecipients"
                            value={formik.values.ccRecipients}
                            onChange={formik.handleChange}
                            autoComplete="off"
                        />
                        <Typography variant="caption" align="left">{t('contact:addEmailByComa')}</Typography>
                    </div>
                    <div className="input-container">
                        <label className="label" htmlFor="department_id">
                            {t('contact:requestType')}
                        </label>
                        <select name="department_id" id="department_id" className="input" autoComplete="off" value={formik.values.department_id} onChange={formik.handleChange}>
                            {dataAvailableDepartments && dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket && dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket.length > 0 ? (
                                <>
                                    <option key="empty" value="" />
                                    {dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket.map((option) => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </>
                            ) : null}
                        </select>
                    </div>
                    <div className="input-container">
                        <label className="label" htmlFor="order_id">
                            {t('contact:order')}
                        </label>
                        <CustomAutocomplete
                            id="order_id"
                            enableCustom={false}
                            mode="lazy"
                            className={classNames('input', styles.autoComplete)}
                            value={selectedOrder}
                            onChange={handleChangeOrder}
                            loading={resHelpdeskDepartmentOrder.loading}
                            options={resHelpdeskDepartmentOrder && resHelpdeskDepartmentOrder?.data && resHelpdeskDepartmentOrder.data.getHelpdeskDepartmentOrder.orders}
                            getOptions={getHelpdeskDepartmentOrder}
                            getOptionLabel={(option) => option.incrementId}
                            name="order_id"
                            // label={t('common:form:order')}
                            primaryKey="id"
                            labelKey="order_id"
                        />
                    </div>
                </>
            )}
            <div>
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
            <Button
                disabled={load}
                loading={load}
                // rootClassName="contact-btn-container"
                className={styles.buttonSubmit}
                align="left"
                type="submit"
            >
                {t('common:button:send')}
            </Button>
        </form>
    );
};

const ContactPage = (props) => {
    const styles = useStyles();
    const {
        data, t, loading, Skeleton,
    } = props;
    return (
        <div className={styles.container}>
            <div className="page-title-wrapper text-center">
                <h1>{t('contact:contactUs')}</h1>
            </div>
            <div className={classNames(styles.contentWrapperContact, 'content-wrapper-contact')}>
                <div className="left-side">
                    {((!loading && data?.cmsBlocks) && (
                        <div id="html-body">
                            <ContactComponent content={data.cmsBlocks.items[0].content} />
                        </div>
                    ))}
                    {(loading && <Skeleton />)}
                </div>
                <div className="right-side">
                    <ContactForm {...props} />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
