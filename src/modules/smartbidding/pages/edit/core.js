import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import formatDate from '@helper_date';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@core_modules/smartbidding/services/graphql';
import React from 'react';
import * as Yup from 'yup';

// import * as Yup from 'yup';
// import { useFormik } from 'formik';

const SmartBidding = (props) => {
    const { t, Content } = props;
    const router = useRouter();

    const [product, setProduct] = React.useState([
        {
            product_name: '',
            qty: 0,
        },
    ]);

    const [attach, setAttach] = React.useState([
        {
            filename: '',
            url: '',
        },
    ]);

    const { loading, data, refetch } = gqlService.getBiddingDetails({
        id: Number(router.query.id),
    });

    const dataBidding = (data && data?.getBidding) || [];
    const itemBidding = (data && data?.getBidding && data?.getBidding?.items) || [];
    const attachBidding = (data && data.getBidding && data.getBidding.surat_lelang) || [
        {
            filename: '',
            url: '',
        },
    ];

    const [closeBidding] = gqlService.cancelBidding();

    const pageConfig = {
        title: t('smartbidding:editTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: dataBidding.name,
        bottomNav: false,
    };

    React.useEffect(() => {
        if (!loading && data) {
            setProduct(itemBidding);
            setAttach(attachBidding);
        }
    }, [loading, data]);

    const [saveBiddingList] = gqlService.saveBiddingList();
    const [saveBiddingDraft] = gqlService.saveBiddingDraft();

    const handleSubmitandSave = (input) => {
        window.backdropLoader(true);

        saveBiddingList({
            variables: {
                ...input,
                name: dataBidding.name,
                deskripsi: dataBidding.deskripsi,
                bidding_id: dataBidding.id,
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
                setTimeout(() => router.push('/customer/account/bidding'), 250);
                refetch();
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

        saveBiddingDraft({
            variables: {
                ...input,
                name: dataBidding.name,
                deskripsi: dataBidding.deskripsi,
                bidding_id: dataBidding.id,
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
                setTimeout(() => router.push('/customer/account/bidding'), 250);
                refetch();
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

    const handleClose = (idBidding) => {
        window.backdropLoader(true);

        closeBidding({
            variables: { id: idBidding },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('smartbidding:details:closeMessage'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/customer/account/bidding'), 250);
                refetch();
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

    const itemss = [...product];
    // const attach = {};

    const dataFormik = { ...dataBidding };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            due_date: formatDate(dataFormik?.due_date, 'YYYY-MM-DD') || '',
            items: [...itemss],
        },
        validationSchema: Yup.object().shape({
            due_date: Yup.string().required('Tanggal Berakhir Harus Di Isi'),
            items: Yup.array().of(
                Yup.object({
                    product_name: Yup.string().required('Nama Produk Harus Di Isi'),
                    qty: Yup.number()
                        .required('Qty Harus Di Isi')
                        .min(1, 'Jumlah item minimal 1')
                        .max(9999999, 'Jumlah item maksimal 9999999'),
                }),
            ),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                due_date: values.due_date.toString(),
                items: [],
            };
            const { items } = values;
            const keyAtt = Object.keys(items);
            keyAtt.forEach((key) => {
                const { product_name, qty } = items[key];
                valueToSubmit.items.push({
                    product_name,
                    qty,
                });
            });
            if (values.status === '2') {
                handleSubmitandSave(valueToSubmit);
            } else if (values.status === '1') {
                handleSubmitandDraft(valueToSubmit);
            }
        },
    });

    const handelChangeInput = async (index, event) => {
        const values = [];
        product.map((p) => {
            values.push({
                id: p.id,
                product_name: p.product_name,
                qty: p.qty,
            });
            return p;
        });
        if (event.target.name === 'qty') {
            values[index][event.target.name] = Number(event.target.value);
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setProduct(values);
        await formik.setFieldValue('items', values);
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

    const handleSubmit = async (e, status = '1') => {
        await formik.setFieldValue('items', product);
        await formik.setFieldValue('status', status);
        await formik.handleSubmit(e);
    };

    const handleItemsOnBlur = async (editIndex, e) => {
        await handelChangeInput(editIndex, e);
        await formik.validateForm();
    };

    const contentProps = {
        props,
        title: pageConfig.headerTitle,
        data: dataBidding,
        t,
        formik,
        product,
        setProduct,
        attach,
        handelChangeInput,
        handleAddProduct,
        handleRemoveProduct,
        handleClose,
        handleSubmit,
        handleItemsOnBlur,
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig} {...props} t={t}>
                <CustomerLayout {...props} />
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig} {...props} t={t}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default SmartBidding;
