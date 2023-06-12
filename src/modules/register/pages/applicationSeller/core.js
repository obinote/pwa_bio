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
    addSellerCompany,
    getAvailableSellerList,
    getSelectedSellerList,
} from '@core_modules/register/services/graphql/index';
import _ from 'lodash';

const ApplicationSeller = (props) => {
    const {
        t, pageConfig, Content,
    } = props;

    const title = `${t('register:businessSeller')} - ${t('register:completeApplication')}`;

    const config = {
        title,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: title,
        bottomNav: false,
    };

    const [availableSeller, setAvailableSeller] = React.useState([]);
    const { data: dataAvailableSeller, loading: loadingAvailable } = getAvailableSellerList();
    const { data: dataSelectedSeller, loading: loadingSelected } = getSelectedSellerList();

    const [saveType] = addSellerCompany();

    const configValidation = {
        vendorCode: Yup.array(),
    };

    const SellerSchema = Yup.object().shape(configValidation);

    const handleSaveSeller = async (values) => {
        const inputSeller = {
            vendorCode: values.vendorCode,
        };

        window.backdropLoader(true);

        saveType({
            variables: {
                input: inputSeller,
            },
        })
            .then(() => {
                Router.push({
                    pathname: '/customer/application_summary',
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
            vendorCode: [],
        },
        validationSchema: SellerSchema,
        onSubmit: (values, { resetForm }) => {
            handleSaveSeller(values, resetForm);
        },
    });

    // UseEffect Backdrop Loading
    useEffect(() => {
        if (loadingAvailable || loadingSelected) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loadingAvailable, loadingSelected]);

    // UseEffect set Available Seller
    useEffect(() => {
        if (dataAvailableSeller) {
            const items = _.get(dataAvailableSeller, 'GetAvailableSellerList.items');

            if (items) {
                setAvailableSeller(items);
            }
        }
    }, [dataAvailableSeller]);

    // UseEffect set Selected Seller
    useEffect(() => {
        if (dataSelectedSeller) {
            const items = _.get(dataSelectedSeller, 'GetSelectedSellerList.items');

            if (items) {
                const arr = _.map(items, 'vendor_code');
                formik.setFieldValue('vendorCode', arr);
            }
        }
    }, [dataSelectedSeller]);

    const onBack = () => {
        Router.push('/customer/application_document');
    };

    const onSelectSeller = (code) => {
        const selected = formik.values.vendorCode;
        let newSelected = [];
        const findCode = selected.find((val) => val === code);

        if (findCode) {
            newSelected = selected.filter((val) => val !== code);
        } else {
            newSelected = [...selected, code];
        }

        formik.setFieldValue('vendorCode', newSelected);
    };

    const checkedStatus = (code) => {
        const selected = formik.values.vendorCode;
        const findCode = selected.find((val) => val === code);
        return !!findCode;
    };

    const coreProps = {
        t,
        formik,
        availableSeller,
        onBack,
        onSelectSeller,
        checkedStatus,
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

export default ApplicationSeller;
