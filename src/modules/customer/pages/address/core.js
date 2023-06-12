/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import _ from 'lodash';
import {
    createCustomerAddress,
    removeAddress as gqlRemoveAddress,
    updateCustomerAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
    getCustomerAddress as gqlGetCustomerAddress,
    approvalAddressCancel as gqlApprovalAddressCancel,
    approvalAddressRequest as gqlApprovalAddressRequest,
    getApprovalAddressStatus as gqlGetApprovalAddressStatus,
    getCompanyStatus,
} from '@core_modules/customer/services/graphql';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const AddressCustomer = (props) => {
    const {
        t, pageConfig, Content, storeConfig,
    } = props;
    const config = {
        title: t('customer:address:pageTitle'),
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    // graphql
    const { data: dataCompany, loading: loadingCompany } = getCompanyStatus();
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    const [removeAddress] = gqlRemoveAddress();
    const getCustomerAddress = gqlGetCustomerAddress(storeConfig);
    const [cancelApprovalAddress] = gqlApprovalAddressCancel();
    const [requestApprovalAddress] = gqlApprovalAddressRequest();
    const [getApprovalStatus, responApprovalSatus] = gqlGetApprovalAddressStatus();
    // state
    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openNew, setOpenDialogNew] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });
    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapPosition({
            lat,
            lng,
        });
    };

    // didmount
    useEffect(() => {
        setLoading(true);
        if (!getCustomerAddress.loading && getCustomerAddress.data && !loadingCompany) {
            const { customer } = getCustomerAddress.data;

            if (customer) {
                const selectedAddress = customer.addresses.find((addr) => addr.default_shipping);
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
                setAddress(customer.addresses);
            }
            setLoading(false);
        }

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [getCustomerAddress, loadingCompany]);

    // handle open modal add adress button
    const handleOpenNew = () => {
        setOpenDialogNew(!openNew);
    };

    // handle open modal status address
    const handleOpenStatus = (addressId) => {
        getApprovalStatus({
            variables: {
                address_id: addressId,
            },
        });
        setOpenStatus(true);
    };

    // handle close modal status address
    const handleCloseStatus = () => {
        setOpenStatus(false);
    };

    // handle change selected address
    const handleChange = async (event) => {
        window.backdropLoader(true);
        const addressId = parseInt(event.target.value);
        let detail = {};
        for (let index = 0; index < address.length; index++) {
            if (address[index].id === addressId) {
                detail = address[index];
            }
        }
        if (!detail.can_edit || detail.can_request) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:address:notApprovalMessage'),
                variant: 'error',
            });
            return;
        }

        setSelectedAddressId(addressId);
        await updatedDefaultAddress({
            variables: {
                addressId,
                street: detail.street[0],
            },
        });
        await getCustomerAddress.refetch();
        window.backdropLoader(false);
    };

    // handle edit address
    const handleDialogSubmit = async () => {
        setLoading(true);
        await getCustomerAddress.refetch();
        setAddress(getCustomerAddress.data.customer.addresses);
        setLoading(false);
    };

    // handle add address
    const handleAddress = async (data, type) => {
        setLoadingAddress(true);
        window.backdropLoader(true);

        if (type === 'update') {
            await updateAddress({
                variables: {
                    ...data,
                },
            });
        } else {
            await addAddress({
                variables: {
                    ...data,
                },
            });
        }

        setSuccess(true);
        setLoadingAddress(false);
        window.backdropLoader(false);
        _.delay(() => {
            if (openNew) {
                setOpenDialogNew(false);
            }
            setSuccess(false);
            handleDialogSubmit();
        }, 1000);
    };

    const setRemoveAddress = async (addressId) => {
        setLoadingAddress(true);
        setLoading(true);

        if (addressId) {
            await removeAddress({
                variables: {
                    id: addressId,
                },
            });
        }

        _.delay(async () => {
            await getCustomerAddress.refetch();
            setSuccess(true);
            setLoadingAddress(false);
            setLoading(false);
        }, 1000);
    };

    const setCancelApproval = async (addressId) => {
        setLoadingAddress(true);
        setLoading(true);
        if (addressId) {
            await cancelApprovalAddress({
                variables: {
                    address_id: addressId,
                },
            });
        }
        _.delay(async () => {
            await getCustomerAddress.refetch();
            setSuccess(true);
            setLoadingAddress(false);
            setLoading(false);
        }, 1000);
    };

    const setRequestApproval = async (addressId) => {
        setLoadingAddress(true);
        setLoading(true);
        if (addressId) {
            await requestApprovalAddress({
                variables: {
                    address_id: addressId,
                },
            });
        }

        _.delay(async () => {
            await getCustomerAddress.refetch();
            setSuccess(true);
            setLoadingAddress(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    loading={loading}
                    address={address}
                    approvalStatus={responApprovalSatus}
                    selectedAddressId={selectedAddressId}
                    handleDialogSubmit={handleDialogSubmit}
                    handleChange={handleChange}
                    handleOpenNew={handleOpenNew}
                    handleOpenStatus={handleOpenStatus}
                    handleAddress={handleAddress}
                    removeAddress={setRemoveAddress}
                    cancelApproval={setCancelApproval}
                    requestApproval={setRequestApproval}
                    loadingAddress={loadingAddress}
                    success={success}
                    openNew={openNew}
                    openStatus={openStatus}
                    handleCloseStatus={handleCloseStatus}
                    dataCompany={dataCompany}
                    storeConfig={storeConfig}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default AddressCustomer;
