/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Layout from '@layout';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import {
    addCompanyType,
    getCompanyType,
} from '@core_modules/register/services/graphql';
import _ from 'lodash';
import useMessageTranslator from '@helpers/messageTranslator';

const ApplicationType = (props) => {
    const {
        t, pageConfig, Content,
    } = props;
    const __ = useMessageTranslator();
    const title = `${t('register:businessType')} - ${t('register:completeApplication')}`;

    const config = {
        title,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: title,
        bottomNav: false,
    };
    const [typeList, setTypeList] = React.useState([]);
    const { data: dataCompanyType, loading } = getCompanyType();

    const [saveType] = addCompanyType();

    const configValidation = {
        businessType: Yup.string().required(t('register:required')),
    };

    const TypeSchema = Yup.object().shape(configValidation);

    const handleSaveType = async (values) => {
        const inputType = {
            // company_id: '-',
            company_group_id: Number(values.businessType),
        };

        window.backdropLoader(true);

        saveType({
            variables: {
                input: inputType,
            },
        })
            .then(() => {
                Router.push({
                    pathname: '/customer/application_profile',
                });

                window.backdropLoader(false);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: __(e.message.split(':')[0] || 'Something went wrong.'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            businessType: '',
        },
        validationSchema: TypeSchema,
        onSubmit: (values, { resetForm }) => {
            handleSaveType(values, resetForm);
        },
    });

    useEffect(() => {
        if (loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loading]);

    useEffect(() => {
        if (dataCompanyType) {
            const selected = _.get(dataCompanyType, 'getCompanyType.selectedCompanyType.value');
            const items = _.get(dataCompanyType, 'getCompanyType.optionCompanyType');

            if (selected) {
                formik.setFieldValue('businessType', selected);
            }

            if (items) {
                setTypeList(items);
            }
        }
    }, [dataCompanyType]);

    const coreProps = {
        typeList,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                {...props}
                t={t}
                formik={formik}
                {...coreProps}
            />
        </Layout>
    );
};

export default ApplicationType;
