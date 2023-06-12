/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Layout from '@layout';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import {
    getDocumentProfile,
    removeDocument,
    uploadCompanyDocument,
    saveDocumentProfile,
} from '@core_modules/register/services/graphql/index';
import _ from 'lodash';
import dayjs from 'dayjs';
import { storeConfig } from '@core_modules/cart/services/graphql';

const ApplicationDocument = (props) => {
    const {
        t, pageConfig, Content,
    } = props;

    const title = `${t('register:businessDocument')} - ${t('register:completeApplication')}`;

    const config = {
        title,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: title,
        bottomNav: false,
    };

    const { data: dataForm, loading: loadingForm } = getDocumentProfile();
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [dynamicValidation, setDynamicValidation] = useState({});

    const [uploadDocument] = uploadCompanyDocument();
    const [saveDocument] = saveDocumentProfile();
    const [removeFile] = removeDocument();

    let maxSize = 0;
    const { loading: loadingConfig, data: dataConfig, error } = storeConfig();

    if (!loadingConfig && dataConfig?.storeConfig?.max_size && !error) {
        maxSize = dataConfig.storeConfig?.max_size;
    }

    const handleSaveDoc = async (values) => {
        const arrKeyValue = Object.entries(values);
        const items = [];

        arrKeyValue.map((item) => {
            if (item[0] && item[1]) {
                if (item[0].includes('date')) {
                    items.push({
                        name: item[0],
                        value: item[1],
                    });
                } else if (item[1].includes('base64')) {
                    const { fileName } = uploadedDocs.find((doc) => doc.fieldName === item[0]);
                    items.push({
                        name: item[0],
                        value: fileName,
                    });
                }
            }
            return item;
        });

        const inputDoc = {
            items,
        };

        window.backdropLoader(true);

        saveDocument({
            variables: {
                input: inputDoc,
            },
        })
            .then(() => {
                Router.push({
                    pathname: '/customer/application_seller',
                });

                window.backdropLoader(false);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[0] || 'Error',
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {},
        validationSchema: Yup.object().shape(dynamicValidation),
        onSubmit: (values, { resetForm }) => {
            handleSaveDoc(values, resetForm);
        },
    });

    // UseEffect Backdrop Loading
    useEffect(() => {
        if (loadingForm) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loadingForm]);

    // UseEffect set Dynamic Form
    useEffect(() => {
        if (dataForm) {
            const items = _.get(dataForm, 'GetDocumentProfile.items');

            if (items) {
                setDynamicFields(items);
                const uploadedDocuments = items
                    .filter((item) => item.type === 'file' && item.value !== null && item.value !== '')
                    .map((item) => ({ fieldName: item.name, fileName: item.value }));
                setUploadedDocs(uploadedDocuments);
            }
        }
    }, [dataForm]);

    // dynamic field set validation
    useEffect(() => {
        if (dynamicFields.length > 0) {
            let newValidation = {};

            dynamicFields.map((field) => {
                const validation = _.get(field, 'validation') ?? [];
                const required = !!validation.find((val) => val === 'required');

                // set validation
                if (required) {
                    newValidation = {
                        ...newValidation,
                        [field.name]: Yup.string().required(t('register:required')),
                    };
                }

                formik.setFieldValue(field.name, field.value ?? '');

                return newValidation;
            });

            setDynamicValidation(newValidation);
        }
    }, [dynamicFields]);

    const onBack = () => {
        Router.push('/customer/application_profile');
    };

    const handleSetFile = (files, fieldName) => {
        const convertToMagentoBase64 = (baseCode) => {
            let magentoBase64;
            if (baseCode.includes('image')) {
                magentoBase64 = baseCode.replace('image', '@file');
            } else if (baseCode.includes('application')) {
                magentoBase64 = baseCode.replace('application', '@file');
            }
            return magentoBase64;
        };

        const { baseCode } = files[0];
        uploadDocument({
            variables: {
                name: fieldName,
                image: convertToMagentoBase64(baseCode),
            },
        })
            .then(({ data }) => {
                window.toastMessage({
                    open: true,
                    text: data?.uploadCompanyDocument?.message || 'Success',
                    variant: 'success',
                });
                formik.setFieldValue(fieldName, baseCode);
                setUploadedDocs([{ fieldName, fileName: data?.uploadCompanyDocument?.filename }, ...uploadedDocs]);
            })
            .catch((e) => {
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[0] || 'Error',
                    variant: 'error',
                });
            });
    };

    const handleDeleteFile = async (fieldName) => {
        const removeUploadedDoc = () => {
            const uploadedDocsUpdate = uploadedDocs.filter((doc) => doc.fieldName !== fieldName);
            setUploadedDocs(uploadedDocsUpdate);
        };

        try {
            if (!formik.values[fieldName].includes('base64')) {
                await removeFile({
                    variables: {
                        name: fieldName,
                    },
                });
            }
            formik.setFieldValue(fieldName, '');
            removeUploadedDoc();
        } catch (e) {
            window.toastMessage({
                open: true,
                text: e.message.split(':')[0] || 'Error',
                variant: 'error',
            });
        }
    };

    const handleChangeDate = ({ value, field }) => {
        const format = dayjs(value).format('DD/MM/YYYY');
        formik.setFieldValue(field, format);
    };

    const coreProps = {
        t,
        formik,
        onBack,
        dynamicFields,
        handleSetFile,
        handleChangeDate,
        handleDeleteFile,
        maxSize,
    };
    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                {...props}
                {...coreProps}
            />
        </Layout>
    );
};

export default ApplicationDocument;
