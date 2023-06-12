/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';
import classNames from 'classnames';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@common_textfield';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';

const HeaderRequistion = (props) => {
    const {
        t, data, handleClickOpen, handleClickClose, showFieldEdit = false, handleSubmit, router,
    } = props;
    const styles = useStyles();

    const datarequisition = data?.getRequisitionList?.data[0];

    const listId = Number(router.query.slug);

    const RequisitionSchema = Yup.object().shape({
        name: Yup.string().required(t('customer:requisition:requiredField')).nullable(),
        description: Yup.string().required(t('customer:requisition:requiredField')).nullable(),
    });

    const formikEditRequisition = useFormik({
        initialValues: {
            name: datarequisition.name,
            description: datarequisition?.description,
            list_id: listId,
        },
        validationSchema: RequisitionSchema,
        onSubmit: (values) => {
            const variables = {
                name: values.name,
                description: values.description,
                list_id: listId,
            };
            handleSubmit(variables);
        },
    });

    return (
        <div className="detail-requisition-header">
            <div className="detail-requisition-header-title">
                <Typography variant="h1" letter="capitalize">
                    {datarequisition.name}
                </Typography>
                <div className="detail-requisition-header-button">
                    <Button variant="text" className="custom-button-modal" onClick={handleClickOpen}>
                        <Typography variant="p" type="normal" color="black">
                            {t('customer:detailRequisition:buttonEditRequisition')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <Typography variant="span" type="normal" size="14" letter="capitalize">
                {datarequisition.description}
            </Typography>
            <div className="detail-requisition-modal-edit">
                <Dialog className={classNames(styles.customFormsModal, 'custom-forms-modal')} open={showFieldEdit} onClose={handleClickClose}>
                    <DialogTitle>{t('customer:requisition:modalTitle')}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={formikEditRequisition.handleSubmit} className="custom-form-modal">
                            <Typography variant="span" type="bold" color="black" size="14">
                                {t('customer:requisition:modalName')}
                                {' '}
                                <span className="required">*</span>
                            </Typography>
                            <CloseIcon
                                onClick={handleClickClose}
                                style={{
                                    cursor: 'pointer', position: 'absolute', top: '15px', right: '20px',
                                }}
                            />
                            <TextField
                                name="name"
                                type="text"
                                maxlength="40"
                                onChange={formikEditRequisition.handleChange}
                                value={formikEditRequisition.values.name}
                                error={!!(formikEditRequisition.touched.name && formikEditRequisition.errors.name)}
                                errorMessage={(formikEditRequisition.touched.name && formikEditRequisition.errors.name) || null}
                            />

                            <Typography variant="span" type="bold" color="black" size="14">
                                {t('customer:requisition:modalDescription')}
                                {' '}
                                <span className="required">*</span>
                            </Typography>
                            <TextField
                                id="description"
                                multiline
                                rows={3}
                                defaultValue=""
                                onChange={formikEditRequisition.handleChange}
                                value={formikEditRequisition.values.description}
                                error={!!(formikEditRequisition.touched.description && formikEditRequisition.errors.description)}
                                errorMessage={(formikEditRequisition.touched.description && formikEditRequisition.errors.description) || null}
                            />
                            <div className="button-wrapper">
                                <Button
                                    className={classNames(styles.generalButton, 'btn-submit')}
                                    type="submit"
                                    align="left"
                                >
                                    <Typography variant="span" type="normal" color="white" size="14">
                                        {t('customer:requisition:modalButtonSubmit')}
                                    </Typography>
                                </Button>
                                <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleClickClose}>
                                    <Typography variant="p" type="normal">
                                        {t('customer:requisition:modalButtonCancel')}
                                    </Typography>
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default HeaderRequistion;
