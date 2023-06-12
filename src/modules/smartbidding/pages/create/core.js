import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@core_modules/smartbidding/services/graphql';
import React from 'react';
import * as Yup from 'yup';
import { storeConfig } from '@core_modules/cart/services/graphql';

const SmartBidding = (props) => {
    const { t, Content } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('customer:menu:smartBidding'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:smartBidding'),
        bottomNav: false,
    };

    const [product, setProduct] = React.useState([
        {
            product_name: '',
            qty: 0,
        },
    ]);

    const [surat, setSurat] = React.useState([
        {
            binary: '',
            filename: '',
        },
    ]);

    const [createBiddingList] = gqlService.createBiddingList();
    const [createBiddingDraft] = gqlService.createBiddingDraft();

    let maxSize = 0;
    const { loading, data: dataConfig, error } = storeConfig();

    if (!loading && dataConfig?.storeConfig?.max_size && !error) {
        maxSize = dataConfig.storeConfig?.max_size;
    }

    const handleSubmitandSave = (input) => {
        window.backdropLoader(true);

        createBiddingList({
            variables: {
                ...input,
                status: '2',
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('smartbidding:success'),
                    variant: 'success',
                });
                router.push('/customer/account/bidding');
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

    const handleSubmitandDraft = (input) => {
        window.backdropLoader(true);

        createBiddingDraft({
            variables: {
                ...input,
                status: '1',
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('smartbidding:success'),
                    variant: 'success',
                });
                router.push('/customer/account/bidding');
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

    const itemss = {};
    const attach = {};

    const formik = useFormik({
        initialValues: {
            name: '',
            deskripsi: '',
            surat_lelang: {
                ...attach,
            },
            due_date: '',
            status: '',
            items: {
                ...itemss,
            },
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Nama Harus Di Isi'),
            deskripsi: Yup.string().required('Deskripsi Harus Di Isi'),
            surat_lelang: Yup.string().required('Dokumen Harus Di Isi'),
            due_date: Yup.string().required('Tanggal Berakhir Harus Di Isi'),
            items: Yup.array().of(
                Yup.object({
                    product_name: Yup.string().required('Nama Produk Harus Di Isi'),
                    qty: Yup.number()
                        .transform((value, originalValue) => {
                            if (typeof originalValue !== 'string') {
                                return undefined;
                            }
                            if (originalValue.trim() === '') {
                                return undefined;
                            }
                            // eslint-disable-next-line radix
                            const parsedValue = parseInt(originalValue);
                            // eslint-disable-next-line no-restricted-globals
                            if (isNaN(parsedValue)) {
                                return undefined;
                            }
                            return parsedValue;
                        })
                        .required('Qty Harus Di Isi')
                        .min(1, 'Jumlah item minimal 1')
                        .max(9999999, 'Jumlah item maksimal 9999999'),
                }),
            ),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                name: values.name,
                deskripsi: values.deskripsi,
                surat_lelang: [],
                due_date: values.due_date.toString(),
                items: [],
            };
            const { items } = values;
            const keyAtt = Object.keys(items);
            keyAtt.forEach((key) => {
                const { product_name, qty } = items[key];
                // eslint-disable-next-line radix
                const qtySubmit = parseInt(qty);
                valueToSubmit.items.push({
                    product_name,
                    qty: qtySubmit,
                });
            });
            const { surat_lelang } = values;
            const keysAtt = Object.keys(surat_lelang);
            keysAtt.forEach((key) => {
                const { binary, filename } = surat_lelang[key];
                valueToSubmit.surat_lelang.push({
                    binary,
                    filename,
                });
            });
            if (values.status === '2') {
                handleSubmitandSave(valueToSubmit);
            } else if (values.status === '1') {
                handleSubmitandDraft(valueToSubmit);
            }
        },
    });

    const handelChangeInput = (index, event) => {
        const values = [...product];
        values[index][event.target.name] = event.target.value;
        setProduct(values);
        formik.setFieldValue('items', product);
    };

    const handleAddProduct = () => {
        setProduct([...product, { product_name: '', qty: 0 }]);
    };

    const handleRemoveProduct = (index) => {
        const values = [...product];
        values.splice(index, 1);
        setProduct(values);
        formik.setFieldValue('items', values);
    };

    const handleSubmit = async (e, formStatus = '1') => {
        await formik.setFieldValue('items', product);
        await formik.setFieldValue('status', formStatus);
        await formik.handleSubmit(e);
    };

    const contentProps = {
        props,
        title: pageConfig.title,
        t,
        formik,
        product,
        setProduct,
        surat,
        setSurat,
        handelChangeInput,
        handleAddProduct,
        handleRemoveProduct,
        maxSize,
        handleSubmit,
    };

    return (
        <Layout pageConfig={pageConfig} {...props} t={t}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default SmartBidding;
