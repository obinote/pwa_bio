/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
// import Layout from '@layout_customer';
// import Paper from '@material-ui/core/Paper';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/createTicket/components/style';
import CustomAutocomplete from '@core_modules/commons/AutoComplete';
import Button from '@common_button';
import FileUploadTicket from '@src_modules/customer/pages/createTicket/plugins/FileUploadTicket/core';
import classNames from 'classnames';

const CreateTicketPage = (props) => {
    const {
        t, formik, load, dataAvailableDepartments, resHelpdeskDepartmentOrder,
        getHelpdeskDepartmentOrder, selectedOrder, handleChangeOrder, onChangeFileUpload,
        dataFile, incrementId, fileMaxSize,
    } = props;

    // const handleInputFile = async (e) => {
    //     const { files } = e.target;
    //     const fileReader = new FileReader();
    //     const fileTypes = ['jpg', 'jpeg', 'png'];
    //     if (files && files[0]) {
    //         const { size } = files[0];
    //         const isSizeAllow = size < convertKBtoBytes(maxSize);
    //         const extension = files[0].name.split('.').pop().toLowerCase(); // file extension from input file
    //         const isSuccess = fileTypes.indexOf(extension) > -1; // is extension in acceptable types
    //         if (!isSuccess) {
    //             e.target.value = null;
    //             window.toastMessage({
    //                 open: true,
    //                 text: t('checkout:uploadImageExtensionFailed'),
    //                 variant: 'error',
    //             });
    //         } else if (!isSizeAllow) {
    //             e.target.value = null;
    //             window.toastMessage({
    //                 open: true,
    //                 text: t('common:error:quoteUploadSize', { maxSize }),
    //                 variant: 'error',
    //             });
    //         } else {
    //             fileReader.readAsDataURL(files[0]);
    //             fileReader.onload = async (event) => {
    //                 const image_base64 = event.target.result;
    //                 setImage(image_base64);
    //             };
    //         }
    //     }
    // };

    const styles = useStyles();
    return (
        <>
            <form className={styles.containerForm} onSubmit={formik.handleSubmit}>
                <Typography variant="h2" type="bold" align="left" className={styles.note}>
                    {t('customer:tickets:createNewTicket')}
                </Typography>
                <div className="input-container">
                    <label className="label" htmlFor="department_id">
                        {t('contact:requestType')}
                        {' '}
                        <span>*</span>
                    </label>
                    <select name="department_id" id="department_id" className="input" autoComplete="off" value={formik.values.department_id} onChange={formik.handleChange}>
                        {dataAvailableDepartments && dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket && dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket.length > 0 ? (
                            <>
                                {dataAvailableDepartments.awHelpdesk2AvailableDepartmentsForCreateTicket.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </>
                        ) : null}
                    </select>
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
                    {formik.errors.subject && <Typography variant="caption" align="left" color="red">{formik.errors.subject}</Typography>}
                </div>
                <div className="input-container">
                    <label className="label" htmlFor="order_id">
                        {t('contact:order')}
                    </label>
                    <CustomAutocomplete
                        id="order_id"
                        enableCustom={false}
                        mode="lazy"
                        className="input"
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
                        disabled={!!incrementId && selectedOrder?.orderId}
                    />
                </div>
                <div className="input-container">
                    <label className="label" htmlFor="ccRecipients">
                        {t('contact:ccRecipients')}
                    </label>
                    <input
                        id="ccRecipients"
                        className={classNames(styles.inputRecipient, 'input')}
                        type="text"
                        name="ccRecipients"
                        value={formik.values.ccRecipients}
                        onChange={formik.handleChange}
                        autoComplete="off"
                    />
                    <Typography className={styles.recipientInfo} variant="caption" align="left">{t('contact:addEmailByComa')}</Typography>
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
                    {formik.errors.content && <Typography variant="caption" align="left" color="red">{formik.errors.content}</Typography>}
                </div>
                <FileUploadTicket t={t} dataFile={dataFile} onChangeFileUpload={onChangeFileUpload} />
                <span className={styles.maxAttachFiles}>{`${t('customer:tickets:maxAttachFiles')} ${fileMaxSize}Kb`}</span>
                <div className={styles.createTicketFooter}>
                    <Button
                        disabled={load}
                        loading={load}
                        className={styles.buttonSubmit}
                        align="left"
                        type="submit"
                    >
                        <Typography variant="span" type="regular" letter="capitalize" color="white">
                            {t('customer:tickets:sendTicket')}
                        </Typography>
                    </Button>
                    <Button
                        variant="text"
                        align="left"
                        href="/customer/account/tickets"
                        className="button-back"
                    >
                        <Typography variant="span" type="regular" letter="capitalize">
                            {t('common:button:cancel')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateTicketPage;
