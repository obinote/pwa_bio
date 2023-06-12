import {
    Button, DialogContent, DialogTitle, Dialog,
} from '@root/node_modules/@material-ui/core/index';
import React, { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import useStyles from '@src_modules/customer/pages/companyusers/components/style';
import gqlService from '@src_modules/customer/services/graphql';
import { regexPhone } from '@helper_regex';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ModalAction = ({
    t, initialValue, currentPage, pageSize, refetch,
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const styles = useStyles();

    const [updateCompanyUser] = gqlService.updateCompanyUser();
    // const { refetch } = gqlService.companyUsers();

    const UpdateCompanyUserSchema = Yup.object().shape({
        job_title: Yup.string().required(t('customer:companyUser:requiredField')),
        firstname: Yup.string().required(t('customer:companyUser:requiredField')),
        lastname: Yup.string().required(t('customer:companyUser:requiredField')),
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('customer:companyUser:requiredField')),
    });

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleSubmit = async (values, resetForm) => {
        window.backdropLoader(true);
        await updateCompanyUser({
            variables: {
                status: initialValue.status,
                ...values,
            },
        })
            .then(async () => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:companyUser:successEdit'),
                    variant: 'success',
                });
                setOpen(false);
                resetForm();
                await refetch({
                    pageSize,
                    currentPage,
                });
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:companyUser:failedEdit'),
                    variant: 'error',
                });
                setOpen(true);
            });
    };

    const formikUpdateCompanyUser = useFormik({
        initialValues: {
            id: '',
            job_title: '',
            firstname: '',
            lastname: '',
            email: '',
            telephone: '',
        },
        validationSchema: UpdateCompanyUserSchema,
        onSubmit: (values, { resetForm }) => {
            const variables = {
                id: values.id,
                job_title: values.job_title,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                telephone: values.telephone,
            };
            handleSubmit(variables, resetForm);
        },
    });

    React.useEffect(() => {
        formikUpdateCompanyUser.setValues({
            id: initialValue.id,
            job_title: initialValue.job_title,
            firstname: initialValue.firstname,
            lastname: initialValue.lastname,
            email: initialValue.email,
            telephone: initialValue.telephone,
        });
    }, [initialValue]);

    return (
        <>
            <Typography onClick={handleOpen} className={styles.linkEdit}>
                {t('customer:companyUser:tableEdit')}
            </Typography>
            <Dialog
                onClose={handleClose}
                open={open}
                className={classNames(styles.customFormsModal, 'custom-forms-modal')}
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
            >
                <DialogTitle>{t('customer:companyUser:modalTitle')}</DialogTitle>
                <DialogContent>
                    <form onSubmit={formikUpdateCompanyUser.handleSubmit} className="custom-form-modal">
                        <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                            {t('customer:companyUser:modalJobTitle')}
                        </Typography>
                        <CloseIcon
                            onClick={handleClose}
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: '15px',
                                right: '20px',
                            }}
                        />
                        <TextField
                            name="job_title"
                            type="text"
                            maxlength="40"
                            onChange={formikUpdateCompanyUser.handleChange}
                            value={formikUpdateCompanyUser.values.job_title}
                            error={!!(formikUpdateCompanyUser.touched.job_title && formikUpdateCompanyUser.errors.job_title)}
                            errorMessage={(formikUpdateCompanyUser.touched.job_title && formikUpdateCompanyUser.errors.job_title) || null}
                        />
                        <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                            {t('customer:companyUser:modalFirstName')}
                        </Typography>
                        <TextField
                            name="firstname"
                            type="text"
                            maxlength="40"
                            onChange={formikUpdateCompanyUser.handleChange}
                            value={formikUpdateCompanyUser.values.firstname}
                            error={!!(formikUpdateCompanyUser.touched.firstname && formikUpdateCompanyUser.errors.name)}
                            errorMessage={(formikUpdateCompanyUser.touched.firstname && formikUpdateCompanyUser.errors.firstname) || null}
                        />
                        <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                            {t('customer:companyUser:modalLastName')}
                        </Typography>
                        <TextField
                            name="lastname"
                            type="text"
                            maxlength="40"
                            onChange={formikUpdateCompanyUser.handleChange}
                            value={formikUpdateCompanyUser.values.lastname}
                            error={!!(formikUpdateCompanyUser.touched.lastname && formikUpdateCompanyUser.errors.lastname)}
                            errorMessage={(formikUpdateCompanyUser.touched.lastname && formikUpdateCompanyUser.errors.lastname) || null}
                        />
                        <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                            {t('customer:companyUser:modalEmail')}
                        </Typography>
                        <TextField
                            name="email"
                            type="text"
                            maxlength="40"
                            onChange={formikUpdateCompanyUser.handleChange}
                            value={formikUpdateCompanyUser.values.email}
                            error={!!(formikUpdateCompanyUser.touched.email && formikUpdateCompanyUser.errors.email)}
                            errorMessage={(formikUpdateCompanyUser.touched.email && formikUpdateCompanyUser.errors.email) || null}
                        />
                        <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                            {t('customer:companyUser:modalPhoneNumber')}
                        </Typography>
                        <TextField
                            name="telephone"
                            type="text"
                            maxlength="40"
                            onChange={formikUpdateCompanyUser.handleChange}
                            value={formikUpdateCompanyUser.values.telephone}
                            error={!!(formikUpdateCompanyUser.touched.telephone && formikUpdateCompanyUser.errors.telephone)}
                            errorMessage={(formikUpdateCompanyUser.touched.telephone && formikUpdateCompanyUser.errors.telephone) || null}
                        />
                        <div className="button-wrapper">
                            <Button className={classNames(styles.generalButton, 'btn-submit')} type="submit" align="left">
                                <Typography variant="span" type="normal" color="white" size="14">
                                    {t('customer:companyUser:modalButtonSubmit')}
                                </Typography>
                            </Button>
                            <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleClose}>
                                <Typography variant="p" type="normal">
                                    {t('customer:companyUser:modalButtonCancel')}
                                </Typography>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalAction;
