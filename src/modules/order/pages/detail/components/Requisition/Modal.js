import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import useStyles from '@plugin_optionitem/components/Requisition/style';
import { createRequisitionList } from '@core_modules/product/services/graphql/';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const Modal = (props) => {
    const {
        t, modalRequisition, handleModalClose, requisitionAction,
    } = props;
    const styles = useStyles();

    const [addRequisition] = createRequisitionList();
    const { requisitionListRefetch } = requisitionAction;

    const RequisitionSchema = Yup.object().shape({
        name: Yup.string().required(t('required field')),
        description: Yup.string().required(t('required field')),
    });
    const handleSubmitRequisition = (values) => {
        window.backdropLoader(true);
        addRequisition({
            variables: values,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('order:createNewRequisitionListSuccess'),
                variant: 'success',
            });
            requisitionListRefetch();
            handleModalClose();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('order:createNewRequisitionListError'),
                variant: 'error',
            });
        });
    };
    const formikRequisition = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: RequisitionSchema,
        onSubmit: (values) => {
            const variables = {
                name: values.name,
                description: values.description,
            };
            handleSubmitRequisition(variables);
        },
    });

    if (!modalRequisition) {
        return null;
    }

    return (
        <Dialog className={classNames(styles.customFormsModal, 'custom-forms-modal')} open={modalRequisition} close={handleModalClose}>
            <DialogTitle>{t('order:createNewRequisitionList')}</DialogTitle>
            <DialogContent>
                <form onSubmit={formikRequisition.handleSubmit} className="custom-form-modal">
                    <Typography variant="span" type="bold" color="black" size="14">
                        {t('order:modalNameRequisition')}
                        <span className="asterisk-label">*</span>
                    </Typography>
                    <TextField
                        name="name"
                        type="text"
                        maxlength="40"
                        onChange={formikRequisition.handleChange}
                        value={formikRequisition.values.name}
                        error={!!(formikRequisition.touched.name && formikRequisition.errors.name)}
                        errorMessage={(formikRequisition.touched.name && formikRequisition.errors.name) || null}
                    />

                    <Typography variant="span" type="bold" color="black" size="14">
                        {t('order:modalDescriptionRequisition')}
                    </Typography>
                    <TextField
                        maxlength="255"
                        id="description"
                        onChange={formikRequisition.handleChange}
                        value={formikRequisition.values.description}
                    />
                    <div className="button-wrapper">
                        <Button className={classNames(styles.generalButton, 'btn-submit')} type="submit" align="left">
                            <Typography variant="span" type="normal" color="white" size="14">
                                {t('common:button:save')}
                            </Typography>
                        </Button>
                        <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleModalClose}>
                            <Typography variant="p" type="normal">
                                {t('common:button:cancel')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
