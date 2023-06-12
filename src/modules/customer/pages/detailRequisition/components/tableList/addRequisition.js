/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';
import classNames from 'classnames';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@common_textfield';

const AddRequisition = (props) => {
    const {
        t, handleAddClose, showFieldAdd = false, handleSubmitAdd, loadingInsertRequisition,
    } = props;
    const styles = useStyles();

    const formikAddRequisition = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('customer:requisition:requiredField')),
        }),
        onSubmit: (values) => {
            const variables = {
                name: values.name,
                description: values.description,
            };
            handleSubmitAdd(variables);
        },
    });

    return (
        <Dialog
            className={classNames(styles.customFormsModal, 'custom-forms-modal')}
            open={showFieldAdd}
            onClose={handleAddClose}
        >
            <DialogTitle>{t('customer:requisition:modalTitle')}</DialogTitle>
            <DialogContent>
                <form onSubmit={formikAddRequisition.handleSubmit} className="custom-form-modal">
                    <Typography className={classNames('frame-mandatory')} variant="span" type="bold" color="black" size="14">
                        {t('customer:requisition:modalName')}
                        <span className={styles.mandatory}>&nbsp;*</span>
                    </Typography>
                    <TextField
                        name="name"
                        type="text"
                        maxLength="40"
                        onChange={formikAddRequisition.handleChange}
                        value={formikAddRequisition.values.name}
                        error={!!(formikAddRequisition.touched.name && formikAddRequisition.errors.name)}
                        errorMessage={(formikAddRequisition.touched.name && formikAddRequisition.errors.name) || null}
                    />

                    <Typography variant="span" type="bold" color="black" size="14">
                        {t('customer:requisition:modalDescription')}
                    </Typography>
                    <TextField
                        maxLength="255"
                        id="description"
                        onChange={formikAddRequisition.handleChange}
                        value={formikAddRequisition.values.description}
                    />
                    <div className="button-wrapper">
                        <Button
                            className={classNames(styles.generalButton, 'btn-submit', {
                                'btn-submit-disabled': loadingInsertRequisition,
                            })}
                            type="submit"
                            align="left"
                            loading={loadingInsertRequisition}
                            disabled={loadingInsertRequisition}
                        >
                            <Typography variant="span" type="normal" color="white" size="14">
                                {t('customer:requisition:modalButtonSubmit')}
                            </Typography>
                        </Button>
                        <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleAddClose}>
                            <Typography variant="p" type="normal">
                                {t('customer:requisition:modalButtonCancel')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRequisition;
