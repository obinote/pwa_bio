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
    addSummaryCompany,
    getSelectedCompanyType,
    getBusinessProfile,
    getDocumentProfile,
    getSelectedSellerList,
} from '@core_modules/register/services/graphql/index';
import _ from 'lodash';

const ApplicationSummary = (props) => {
    const {
        t, pageConfig, Content,
    } = props;

    const title = `${t('register:businessSummary')} - ${t('register:completeApplication')}`;

    const config = {
        title,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: title,
        bottomNav: false,
    };

    const [type, setType] = useState(null);
    const [profile, setProfile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [sellers, setSellers] = useState([]);

    const { data: dataType, loading: loadingType } = getSelectedCompanyType();
    const { data: dataProfile, loading: loadingProfile } = getBusinessProfile();
    const { data: dataDocument, loading: loadingDocument } = getDocumentProfile();
    const { data: dataSeller, loading: loadingSeller } = getSelectedSellerList();

    const [saveType] = addSummaryCompany();

    const handleSaveSummary = async (values) => {
        const inputSummary = {
            term_condition: values.term_condition ? 'on' : 'off',
            subscribe: values.subscribe ? 'on' : 'off',
        };

        window.backdropLoader(true);

        saveType({
            variables: {
                input: inputSummary,
            },
        })
            .then(() => {
                Router.push({
                    pathname: '/customer/account/dashboard',
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
        initialValues: {
            term_condition: false,
            subscribe: false,
        },
        validationSchema: Yup.object().shape({
            term_condition: Yup.bool().oneOf([true], t('register:required')),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSaveSummary(values, resetForm);
        },
    });

    // UseEffect Backdrop Loading
    useEffect(() => {
        if (loadingType || loadingProfile || loadingDocument || loadingSeller) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loadingType, loadingProfile, loadingDocument, loadingSeller]);

    // UseEffect set Company Type
    useEffect(() => {
        if (dataType) {
            const temp = _.get(dataType, 'getCompanyType.selectedCompanyType.label');

            if (temp) {
                setType(temp);
            }
        }
    }, [dataType]);

    // UseEffect set Business Profile
    useEffect(() => {
        if (dataProfile) {
            const temp = _.get(dataProfile, 'getBusinessProfile');

            if (temp) {
                setProfile(temp);
            }
        }
    }, [dataProfile]);

    // UseEffect set Documents
    useEffect(() => {
        if (dataDocument) {
            const items = _.get(dataDocument, 'GetDocumentProfile.items');

            if (items) {
                const onlyFile = items.filter((item) => item.type === 'file');
                setDocuments(onlyFile);
            }
        }
    }, [dataDocument]);

    // UseEffect set Selected Seller
    useEffect(() => {
        if (dataSeller) {
            const items = _.get(dataSeller, 'GetSelectedSellerList.items');

            if (items) {
                setSellers(items);
            }
        }
    }, [dataSeller]);

    const onNavigateToType = () => {
        Router.push({ pathname: '/customer/application_type' });
    };

    const onNavigateToProfile = () => {
        Router.push({ pathname: '/customer/application_profile' });
    };

    const onNavigateToDocument = () => {
        Router.push({ pathname: '/customer/application_document' });
    };

    const onNavigateToSeller = () => {
        Router.push({ pathname: '/customer/application_seller' });
    };

    const onChangeCheckbox = (fieldName) => {
        formik.setFieldValue(fieldName, !formik.values[fieldName]);
    };

    const coreProps = {
        t,
        formik,
        type,
        profile,
        documents,
        sellers,
        onNavigateToType,
        onNavigateToProfile,
        onNavigateToDocument,
        onNavigateToSeller,
        onChangeCheckbox,
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

export default ApplicationSummary;
