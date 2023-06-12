import { useState } from 'react';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/detail/components/OrderComplete/style';
import Rating from '@material-ui/lab/Rating';
import TextField from '@common_textfield';
import { useFormik } from 'formik';
import { setOrderRating } from '@core_modules/order/services/graphql/';
import * as Yup from 'yup';
import DropFile from './DropFile';

export const ModalRating = (props) => {
    const {
        t, modalRating, handleModalClose,
        orderId, orderRatingRefetch, valueRating, setValueRating, dataReview, isEdit,
        ratingRefetch, isOrder,
    } = props;
    const styles = useStyles();
    const [addRating] = setOrderRating();
    const [isDelete, setIsDelete] = useState(false);
    const handleSubmitRating = (values, actionDelete = false) => {
        if (valueRating === 0) {
            window.toastMessage({
                open: true,
                text: t('order:modalRating:erroRating'),
                variant: 'error',
            });
            return;
        }
        window.backdropLoader(true);
        addRating({
            variables: values,
        }).then((res) => {
            window.backdropLoader(false);
            handleModalClose();
            if (res?.data?.setOrderRating?.response === 'failed') {
                window.toastMessage({
                    open: true,
                    text: res?.data?.setOrderRating?.message ?? t('order:modalRating:errorSubmit'),
                    variant: 'error',
                });
            } else {
                // eslint-disable-next-line no-lonely-if
                if (!isDelete) {
                    window.toastMessage({
                        open: true,
                        text: t('order:modalRating:successSubmit'),
                        variant: 'success',
                    });
                }
            }
            if (!actionDelete) {
                if (isOrder) {
                    orderRatingRefetch();
                } else {
                    ratingRefetch();
                }
                handleModalClose();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            handleModalClose();
            window.toastMessage({
                open: true,
                text: e.message || t('order:modalRating:errorSubmit'),
                variant: 'error',
            });
        });
    };

    const RatingSchema = Yup.object().shape({
        comment: Yup.string().required(t('customer:companyUser:requiredField')).nullable(),
    });

    const formikRating = useFormik({
        initialValues: {
            comment: dataReview?.rating_comment ?? null,
            fileAttach: '',
        },
        validationSchema: RatingSchema,
        onSubmit: (values) => {
            const variables = {
                id: orderId,
                rate: valueRating,
                comment: values.comment,
                file: values.fileAttach,
            };
            if (!variables.file) {
                delete variables.file;
            }
            handleSubmitRating(variables);
        },
    });

    const handleSetFile = (files, fieldName) => {
        let fileImages = [];
        files.forEach((val) => {
            fileImages = [...fileImages, {
                binary: val.baseCode,
                filename: val.file.name,
            }];
        });
        formikRating.setFieldValue(fieldName, fileImages);
    };

    const handleDeleteFile = (fieldName) => {
        formikRating.setFieldValue(fieldName, '');
    };

    const handleModalRatingClose = () => {
        formikRating.resetForm();
        handleModalClose();
    };

    // eslint-disable-next-line no-unused-vars
    const handleDeleteImage = () => {
        const variables = {
            id: orderId,
            rate: valueRating,
            comment: dataReview?.rating_comment,
            file: [],
        };
        setIsDelete(true);
        handleSubmitRating(variables, true);
    };

    return (
        <Dialog className={classNames(styles.customModalRating)} fullWidth maxWidth="md" open={modalRating} onClose={handleModalRatingClose}>
            <DialogTitle className="custom-form-modal">
                <div className={styles.modalHead}>
                    <Typography variant="span" type="bold" color="black" size="14">
                        {t('order:modalRating:title')}
                    </Typography>
                    <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleModalRatingClose}>
                        <CloseIcon size="large" color="secondary" />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <Rating
                    name="rating-input"
                    size="large"
                    value={valueRating}
                    onChange={(event, newValue) => {
                        if (newValue < parseInt(dataReview?.rating, 10) && isEdit) {
                            window.toastMessage({
                                open: true,
                                text: t('order:modalRating:errorMinimum'),
                                variant: 'error',
                            });
                            return;
                        }
                        setValueRating(newValue);
                    }}
                />
                <form onSubmit={formikRating.handleSubmit} className="custom-form-modal">
                    <Typography variant="span" type="bold" color="black" size="14">
                        {t('order:modalRating:labelComment')}
                    </Typography>
                    <TextField
                        name="comment"
                        type="text"
                        maxLength="255"
                        multiline
                        onChange={formikRating.handleChange}
                        value={formikRating.values.comment}
                        error={!!(formikRating.touched.comment && formikRating.errors.comment)}
                        errorMessage={(formikRating.touched.comment && formikRating.errors.comment) || null}
                    />
                    <div className="upload-review">
                        <DropFile
                            required={false}
                            name="fileAttach"
                            value={formikRating.values.fileAttach}
                            maxSize={200}
                            acceptedFile=".jpg,.jpeg,.png"
                            multiple
                            error={(formikRating.touched.fileAttach && formikRating.errors.fileAttach)}
                            handleSetFile={handleSetFile}
                            handleDeleteFile={handleDeleteFile}
                        />
                        {dataReview?.rating_images?.length > 0 && !isDelete && (
                            <div>
                                <div className="image-review">
                                    {dataReview?.rating_images.map((val, index) => (
                                        <div className="image-review-wrapper" key={index}>
                                            <img src={val.value} alt={val.company_name} />
                                        </div>
                                    ))}
                                </div>
                                {/* <Button className="btn-delete-image" size="small" align="left" onClick={handleDeleteImage}>
                                    {t('order:modalRating:btnDelete')}
                                </Button> */}
                                <br />
                            </div>
                        )}
                    </div>
                    <div className="button-wrapper">
                        <Button className={classNames(styles.generalButton, 'btn-submit')} type="submit" align="left">
                            <Typography variant="span" type="normal" color="white" size="14">
                                {t('order:modalRating:btnSubmit')}
                            </Typography>
                        </Button>
                        <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={() => handleModalRatingClose()}>
                            <Typography variant="p" type="normal">
                                {t('order:modalRating:btnCancel')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalRating;
