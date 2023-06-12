/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable no-shadow */
/* eslint-disable keyword-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/detailRequisition/components/skeleton';
import { useRouter } from 'next/router';
import { getHost } from '@helpers/config';
import { addProductsToCartCustom, writeCartProductsReportMutation } from '@core_modules/product/services/graphql';
import _ from 'lodash';
import { encrypt } from '@helper_encryption';
import userAgent from '@helper_useragent';
import { gql, useApolloClient } from '@apollo/client';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const PRODUCT_IDS_BY_SKU = gql`
    query productIdsBySku($skus: [String]) {
        products(filter: { sku: { in: $skus } }) {
            items {
                id
            }
        }
    }
`;

const MyDetailRequisition = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:myRequisition'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myRequisition'),
        bottomNav: false,
    };
    const router = useRouter();
    const requisitionId = _.get(router, 'query.slug');
    const listId = Number(requisitionId);
    const { data, loading, refetch } = gqlService?.getRequisitionList({
        variables: { entity_id: listId },
    });
    const { data: dateDateReminder } = gqlService?.getDateReminderRequisitionList({
        variables: { list_id: listId },
    });
    const { data: dataFull, refetch: dataRefetch } = gqlService?.getRequisitionList();
    const [addRequisition, { loading: loadingInsertRequisition }] = gqlService?.insertRequisitionList();
    const [addDateReminderRequisitionList, { loading: loadingReminderRequisitionDate }] = gqlService?.addDateReminderRequisitionList();
    const [deleteRequisitionList] = gqlService?.deleteRequisitionItem();
    const [deleteRequisition] = gqlService?.deleteRequisition();
    const [updateRequisitionList] = gqlService?.updateRequisition();
    const { data: dataExport } = gqlService?.exportRequisitionItem({
        variables: { list_id: listId },
    });
    const [updateQty] = gqlService?.updateRequisitionItem();
    const [moveRequisitionList] = gqlService?.moveRequisitionItem();
    const [addToCart] = addProductsToCartCustom();
    const [writeCartProductsReport] = writeCartProductsReportMutation();
    const [showFieldEdit, setshowFieldEdit] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [checkedRowsAll, setCheckedRowsAll] = React.useState(false);
    const [showMove, setshowMove] = React.useState(false);
    const [showCopy, setshowCopy] = React.useState(false);
    const [showFieldAlert, setshowFieldAlert] = React.useState(false);
    const [showFieldAdd, setshowFieldAdd] = React.useState(false);
    const [showMoveCopy, setshowMoveCopy] = React.useState(false);
    const [dateRequisitionReminder, setDateRequisitionReminder] = React.useState(null);

    const mount = React.useRef(null);

    React.useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (mount.current && !_.isEmpty(dateDateReminder)) {
            const getInitialReminderValue = _.get(dateDateReminder, 'getDateReminderRequisitionList');
            const getInitialValue = _.isEmpty(getInitialReminderValue) ? null : getInitialReminderValue;
            setDateRequisitionReminder(getInitialValue);
        }
    }, [dateDateReminder]);

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props} activeMenu="/customer/account/requisition">
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    const handleCheck = () => { };

    const handleSubmitAdd = (values) => {
        addRequisition({
            variables: values,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:requisition:successAdd'),
                variant: 'success',
            });
            dataRefetch();
            setshowFieldAdd(false);
            setshowCopy(false);
            setshowMove(false);
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:requisition:failedAdd'),
                variant: 'error',
            });
            setshowFieldAdd(true);
        });
    };

    const handleSubmit = (values) => {
        updateRequisitionList({
            variables: values,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageEditSuccess'),
                variant: 'success',
            });
            setshowFieldEdit(false);
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageEditFailed'),
                variant: 'error',
            });
            setshowFieldEdit(true);
        });
    };

    const handleSubmitQty = (values) => {
        updateQty({
            variables: values,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageUpdateQtySuccess'),
                variant: 'success',
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageUpdateQtyFailed'),
                variant: 'error',
            });
        });
    };

    const handleDeleteRequistion = () => {
        deleteRequisition({
            variables: {
                list_id: listId,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageDeleteSuccess'),
                variant: 'success',
            });
            refetch();
            setTimeout(() => router.push('/customer/account/requisition'), 250);
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageDeleteFailed'),
                variant: 'error',
            });
        });
    };

    const handleDelete = (id) => {
        deleteRequisitionList({
            variables: {
                item_id: [id],
                list_id: listId,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageDeleteProductSuccess'),
                variant: 'success',
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageDeleteProductFailed'),
                variant: 'error',
            });
        });
    };

    const handleChecked = (checked, dtId, itemsData) => {
        let dataRowsChecked = null;
        if (checked) {
            dataRowsChecked = [...checkedRows, itemsData];
            setCheckedRows(dataRowsChecked);
            handleCheck(dataRowsChecked);
            setshowMoveCopy(true);
        } else {
            dataRowsChecked = checkedRows.filter((e) => e !== itemsData);
            setCheckedRows(dataRowsChecked);
            handleCheck(dataRowsChecked);
            setshowMoveCopy(false);
        }
        const dataRequisition = _.get(dataFull, 'getRequisitionList.data');
        const dataRequisitionSelected = _.first(_.filter(dataRequisition, { entity_id: dtId }));
        const getDataItems = _.get(dataRequisitionSelected, 'items');
        const isCheckedAll = dataRowsChecked?.length === getDataItems?.length;
        setCheckedRowsAll(isCheckedAll);
    };

    const handleCheckedAll = (checked, dataItems) => {
        if (checked) {
            setCheckedRows(dataItems);
            setshowMoveCopy(true);
            setCheckedRowsAll(true);
        } else {
            setCheckedRows([]);
            setshowMoveCopy(false);
            setCheckedRowsAll(false);
        }
    };

    const handleUpdateQty = (itemsData) => {
        updateQty({
            variables: {
                list_id: listId,
                item_id: itemsData.item_id,
                qty: itemsData.qty,
            },
            context: {
                request: 'internal',
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageUpdateQtySuccess'),
                variant: 'success',
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageUpdateQtyFailed'),
                variant: 'error',
            });
        });
    };

    const handleDeleteSelected = (checkedRows) => {
        let idSelected = checkedRows.map(({ item_id }) => item_id);
        const isEmpty = idSelected.length === 0;
        if (isEmpty) {
            setshowFieldAlert(true);
        } else {
            deleteRequisitionList({
                variables: {
                    item_id: idSelected,
                    list_id: listId,
                },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageDeleteSelectedSuccess'),
                    variant: 'success',
                });
                setCheckedRows([]);
                refetch();
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageDeleteSelectedFailed'),
                    variant: 'error',
                });
            });
        }
    };

    const handleMoveSelected = (checkedRows, id) => {
        let idSelected = checkedRows.map(({ item_id }) => item_id);
        const isEmpty = idSelected.length === 0;
        if (isEmpty) {
            setshowFieldAlert(true);
        } else {
            moveRequisitionList({
                variables: {
                    item_id: idSelected,
                    list_id: id,
                },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageMoveSelectedSuccess'),
                    variant: 'success',
                });
                setCheckedRows([]);
                setshowMove(false);
                refetch();
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageMoveSelectedFailed'),
                    variant: 'error',
                });
            });
        }
    };

    const handleCopySelected = (checkedRows, id) => {
        let idSelected = checkedRows.map(({ item_id }) => item_id);
        const isEmpty = idSelected.length === 0;
        if (isEmpty) {
            setshowFieldAlert(true);
        } else {
            moveRequisitionList({
                variables: {
                    item_id: idSelected,
                    list_id: id,
                    copy: true,
                },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageCopySelectedSuccess'),
                    variant: 'success',
                });
                setshowCopy(false);
                refetch();
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageCopySelectedFailed'),
                    variant: 'error',
                });
            });
        }
    };

    function addToCartAll(dataItem) {
        return new Promise((resolve, reject) => {
            addToCart({
                variables: {
                    cartItems: dataItem,
                },
            }).then((data) => {
                resolve(data);
            }).catch(() => {
                reject();
            });
        });
    }
    const client = useApolloClient();

    // the requisition list does not provide product_id so we use sku to get
    // the id first and then write report
    function writeReport(skus) {
        client
            .query({
                query: PRODUCT_IDS_BY_SKU,
                variables: { skus },
                context: { request: 'internal' },
                fetchPolicy: 'no-cache',
            })
            .then((res) => res.data.products.items.map((item) => item.id))
            .then((ids) => writeCartProductsReport({ variables: { productId: ids } }));
    }

    const handleMultipleAtc = async (checkedRows) => {
        window.backdropLoader(true);
        const dataCheck = checkedRows.map(item => ({
            quantity: item.qty,
            sku: item.sku,
            id: item.id,
        }));
        const isEmpty = dataCheck.length === 0;
        if (isEmpty) {
            window.backdropLoader(false);
            setshowFieldAlert(true);
        } else {
            const successSkus = [];
            let messageError = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const dataItem of dataCheck) {
                try {
                    // eslint-disable-next-line no-await-in-loop
                    const addTocart = await addToCartAll(dataItem);
                    if (addTocart?.data?.addProductsToCartCustom?.user_errors?.length) {
                        addTocart.data.addProductsToCartCustom.user_errors.forEach((errorItem) => {
                            messageError.push(errorItem?.message ?? t('customer:detailRequisition:atcSelectedFailed'));
                        });
                    } else {
                        successSkus.push(dataItem.sku);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            window.backdropLoader(false);
            window.reloadCartQty = true;

            writeReport(successSkus);

            if (messageError) {
                messageError.forEach((msg) => {
                    window.toastMessage({
                        open: true,
                        text: msg,
                        variant: 'error',
                    });
                });
            }
            setTimeout(() => {
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:atcSelectedSuccess', { countSuccess: successSkus.length }),
                    variant: 'success',
                });
                setCheckedRows([]);
                setCheckedRowsAll(false);
            }, 1000);
        }
    };

    const printRequsition = (id) => {
        const encryptedId = encodeURIComponent(encrypt(id.toString()));
        const requisitionPrintUrl = userAgent.isMobileApps()
            ? `${getHost()}/print/requisition/${encryptedId}`
            : `${getHost()}/customer/account/requisition/print/${id}`;
        window.open(requisitionPrintUrl);
    };

    const handleClick = (url_key) => {
        console.log('url_key detail requisition', url_key);
    };

    const handleClickOpen = () => {
        setshowFieldEdit(true);
    };

    const handleClickClose = () => {
        setshowFieldEdit(false);
    };

    const handleClose = () => {
        setshowFieldAlert(false);
    };

    const handleAddOpen = () => {
        setshowFieldAdd(true);
    };

    const handleAddClose = () => {
        setshowFieldAdd(false);
    };

    const handleDateRemiderInputChange = (e) => {
        const value = _.get(e, 'target.value');
        setDateRequisitionReminder(value);
    };

    const handleDateReminder = async (dt) => {
        const isNumber = /^[0-9,]*$/.test(String(dateRequisitionReminder));
        if (!isNumber) {
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageReminderRequisitionDateNumber'),
                variant: 'error',
            });
            return;
        }

        const list_id = _.get(dt, 'entity_id');
        try {
            const res = await addDateReminderRequisitionList({
                variables: {
                    list_id,
                    date_reminder: _.isEmpty(dateRequisitionReminder) ? null : [Number(dateRequisitionReminder)],
                },
            });
            const isSuccess = _.get(res, 'data.addDateReminderRequisitionList.status');
            if (isSuccess) {
                window.toastMessage({
                    open: true,
                    text: t('customer:detailRequisition:messageReminderRequisitionDateSuccess'),
                    variant: 'success',
                });
                setDateRequisitionReminder(null);
            }
        } catch (err) {
            console.log('[err] request date reminder', err);
            window.toastMessage({
                open: true,
                text: t('customer:detailRequisition:messageReminderRequisitionDateFailed'),
                variant: 'error',
            });
        }
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props} activeMenu="/customer/account/requisition">
                <Content
                    t={t}
                    data={data}
                    dataFull={dataFull}
                    dataExport={dataExport}
                    loading={loading}
                    router={router}
                    handleSubmit={handleSubmit}
                    handleChecked={handleChecked}
                    handleCheckedAll={handleCheckedAll}
                    handleDelete={handleDelete}
                    handleDeleteRequistion={handleDeleteRequistion}
                    handleClick={handleClick}
                    handleClickOpen={handleClickOpen}
                    handleClickClose={handleClickClose}
                    handleClose={handleClose}
                    handleDeleteSelected={handleDeleteSelected}
                    handleSubmitQty={handleSubmitQty}
                    handleMultipleAtc={handleMultipleAtc}
                    handleUpdateQty={handleUpdateQty}
                    handleMoveSelected={handleMoveSelected}
                    handleCopySelected={handleCopySelected}
                    showFieldAlert={showFieldAlert}
                    showFieldEdit={showFieldEdit}
                    checkedRows={checkedRows}
                    showMove={showMove}
                    showCopy={showCopy}
                    setshowMove={setshowMove}
                    setshowCopy={setshowCopy}
                    handleAddOpen={handleAddOpen}
                    handleAddClose={handleAddClose}
                    showFieldAdd={showFieldAdd}
                    handleSubmitAdd={handleSubmitAdd}
                    showMoveCopy={showMoveCopy}
                    printRequsition={printRequsition}
                    loadingInsertRequisition={loadingInsertRequisition}
                    checkedRowsAll={checkedRowsAll}
                    handleDateReminder={handleDateReminder}
                    handleDateRemiderInputChange={handleDateRemiderInputChange}
                    loadingReminderRequisitionDate={loadingReminderRequisitionDate}
                    dateRequisitionReminder={dateRequisitionReminder}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default MyDetailRequisition;
