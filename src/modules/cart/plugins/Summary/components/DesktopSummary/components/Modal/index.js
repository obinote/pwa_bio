/* eslint-disable react/no-unknown-property */
import React from 'react';
import Typography from '@common_typography';
import Modal from '@material-ui/core/Modal';
import useStyles from '@core_modules/cart/plugins/Summary/components/DesktopSummary/components/Modal/style';
import Button from '@common_button';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@common_textfield';
import { useTranslation } from '@i18n';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { requestNegotiableQuote, getCartDataLazy } from '@core_modules/cart/services/graphql/';
import Route from 'next/router';
import useMessageTranslator from '@helpers/messageTranslator';

const ModalCustom = (props) => {
    const {
        onClose, open, dataCart, maxSize,
    } = props;
    const [createQuotation] = requestNegotiableQuote();
    const [getCart] = getCartDataLazy();
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const { cart_id } = dataCart;
    const [quotationFile, setQuotationFile] = React.useState(null);
    const [quotationFileName, setQuotationFileName] = React.useState(null);
    const [quotationFileExtension, setQuotationFileExtension] = React.useState(null);
    const __ = useMessageTranslator();

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }

    const onChangeFileUpload = (e) => {
        const { files } = e.target;
        const fileReader = new FileReader();
        const fileTypes = ['jpg', 'jpeg', 'png', 'csv', 'pdf'];
        if (files && files[0]) {
            const { size, name } = files[0];
            const isSizeAllow = size < convertKBtoBytes(maxSize);
            const arrFilename = name.split('.');
            const extension = arrFilename[arrFilename.length - 1].toLowerCase();
            const fileName = name.slice(0, name.lastIndexOf('.'));
            const isSuccess = fileTypes.indexOf(extension) > -1;
            if (!isSuccess) {
                e.target.value = null;
                window.toastMessage({
                    open: true,
                    text: t('common:error:quoteUpload'),
                    variant: 'error',
                });
            } else if (!isSizeAllow) {
                e.target.value = null;
                window.toastMessage({
                    open: true,
                    text: t('common:error:quoteUploadSize', { maxSize }),
                    variant: 'error',
                });
            } else {
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = async (event) => {
                    const image_base64 = event.target.result;
                    setQuotationFile(image_base64);
                    setQuotationFileName(fileName);
                    setQuotationFileExtension(extension);
                };
            }
        }
    };

    const handleCreateQuotation = (values) => {
        window.backdropLoader(true);
        const data = { ...values };
        if (quotationFile) {
            data.file_encoded = quotationFile;
            data.file_name = `${quotationFileName}.${quotationFileExtension}`;
            data.file_type = quotationFileExtension;
        }
        getCart({
            variables: {
                cartId: cart_id,
            },
        })
            .then(() => {
                createQuotation({
                    variables: data,
                })
                    .then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: t('common:message:quotationSuccess'),
                            variant: 'success',
                        });
                        Route.push('/customer/account/quote');
                    })
                    .catch((e) => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: __(e.message),
                            variant: 'error',
                        });
                    });
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const QuotationSchema = Yup.object().shape({
        quote_name: Yup.string().required(t('required field')),
        comment: Yup.string().required(t('required field')),
    });
    const formikQuotation = useFormik({
        initialValues: {
            quote_name: '',
            comment: '',
        },
        validationSchema: QuotationSchema,
        onSubmit: (values) => {
            const variables = {
                cart_id,
                quote_name: values.quote_name,
                comment: values.comment,
            };
            handleCreateQuotation(variables);
        },
    });

    return (
        <Modal
            className={styles.wrapperModalReqQuotation}
            open={open}
            onHide={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classNames(styles.modal)}>
                <div className={styles.modalHead}>
                    <div className={styles.modalTitle}>
                        <Typography variant="h2">{t('common:button:proceedToQuotation')}</Typography>
                    </div>
                    <div className={classNames(styles.btnCloseWrapper)}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.modalQuote}>
                        <form onSubmit={formikQuotation.handleSubmit} className="custom-form-modal">
                            <div className={styles.inputStyle}>
                                <label className={styles.inputLabelStyle} htmlFor="quoteName">
                                    {t('common:cart:quoteName')}
                                    <span className="asterisk-label">*</span>
                                </label>
                                <TextField
                                    name="quote_name"
                                    id="quoteName"
                                    onChange={formikQuotation.handleChange}
                                    value={formikQuotation.values.quote_name}
                                    error={!!(formikQuotation.touched.quote_name && formikQuotation.errors.quote_name)}
                                    errorMessage={(formikQuotation.touched.quote_name && formikQuotation.errors.quote_name) || null}
                                />
                            </div>
                            <div className={styles.inputStyle}>
                                <label className={styles.inputLabelStyle} htmlFor="quoteComment">
                                    {t('common:cart:quoteComment')}
                                    <span className="asterisk-label">*</span>
                                </label>
                                <TextField
                                    name="comment"
                                    multiline
                                    rows="4"
                                    id="quoteComment"
                                    onChange={formikQuotation.handleChange}
                                    value={formikQuotation.values.comment}
                                    error={!!(formikQuotation.touched.comment && formikQuotation.errors.comment)}
                                    errorMessage={(formikQuotation.touched.comment && formikQuotation.errors.comment) || null}
                                />
                            </div>
                            <div className={styles.inputFileStyle}>
                                <input className="upload-button" type="file" onChange={onChangeFileUpload} />
                                <Typography type="subtitle1" letter="capitalize" className="attachment-info">
                                    {t('cart:attachInfo', { max_size: maxSize })}
                                </Typography>
                            </div>
                            <div className={styles.btnAction}>
                                <Button className={styles.btnCreate} type="submit">
                                    {t('common:cart:quoteCreate')}
                                </Button>
                                <Button className={styles.btnCancel} onClick={onClose}>
                                    {t('common:cart:quoteCancel')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalCustom;
