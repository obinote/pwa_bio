/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useState, useCallback } from 'react';
import gqlService, {
    createCustomerAddress,
    updateCustomerAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
} from '@core_modules/checkout/services/graphql';

const ModalAddressCustomer = (props) => {
    const {
        Content, checkout, setOpen, setCheckout, setAddress, open, manageCustomer, ...other
    } = props;
    // graphql
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    // state
    const [address, setAddresses] = useState([]);
    const [addressGlobal, setAddressesGlobal] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [typeAddress, setTypeAddress] = useState('new');
    const [dataEdit, setDataEdit] = useState({});
    const [getAddress, { loading, data: addressCustomer, refetch: _refetch }] = gqlService.getAddressCustomer();
    const refetch = useCallback(() => {
        setTimeout(() => _refetch(), 0);
    }, [_refetch]);

    React.useEffect(() => {
        if (open) {
            getAddress();
            if (
                checkout.selected.address
                && checkout.selected.address.country
                && addressCustomer
                && !loading
                && addressCustomer.customer
                && addressCustomer.customer.addresses_seller
                && addressCustomer.customer.addresses_seller.length > 0
            ) {
                const checkoutAddress = checkout.selected.address;
                // eslint-disable-next-line arrow-body-style
                const selectedAddress = addressCustomer.customer.addresses_seller.filter((add) => {
                    return (
                        `${add.street[0].replace(' ', '-')}-${add.firstname}-${add.telephone}`
                        === `${checkoutAddress.street[0].replace(' ', '-')}-${checkoutAddress.firstname}-${checkoutAddress.telephone}`
                    );
                });
                setSelectedAddressId(selectedAddress && selectedAddress.length > 0 ? selectedAddress[0].id : null);
            }
        }
    }, [open]);

    React.useEffect(() => {
        // const newCheckout = { ...checkout };
        if (
            addressCustomer
            && !loading
            && addressCustomer.customer
            && addressCustomer.customer.addresses_seller
            && addressCustomer.customer.addresses_seller.length > 0
        ) {
            const selectedAddress = addressCustomer.customer.addresses_seller.find((addr) => addr.default_shipping);

            if (checkout.selected.address) {
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
            }
            setAddresses(addressCustomer.customer.addresses_seller);
            setAddressesGlobal(addressCustomer.customer.addresses);
        }
    }, [addressCustomer]);

    // handle open modal add adress button
    const handleOpenNew = (type = 'new') => {
        setOpen(!open);
        setOpenNew(!openNew);
        setTypeAddress(type);
    };
    const handleCloseDiff = async () => {
        setOpen(false);
    };
    // handle change selected address
    const handleChange = async (event, forceUpdate = false) => {
        if (selectedAddressId !== event.target.value || forceUpdate) {
            const state = { ...checkout };
            state.loading.addresses = true;
            state.loading.order = true;
            await setCheckout(state);
            setOpen(false);
            const addressId = parseInt(event.target.value);
            setSelectedAddressId(addressId);
            let detail = {};
            let detailBilling = {};
            for (let index = 0; index < address.length; index++) {
                if (address[index].id === addressId) {
                    detail = address[index];
                }
            }
            for (let index = 0; index < addressGlobal.length; index++) {
                if (addressGlobal[index].default_billing === true) {
                    detailBilling = addressGlobal[index];
                }
            }

            const streetAddress = () => {
                if (!!event.target.valueAddress && event.target.valueAddress !== detail.street[0]) {
                    return event.target.valueAddress;
                }
                return detail.street[0];
            };

            const dataAddress = await updatedDefaultAddress({
                variables: {
                    addressId,
                    street: streetAddress(),
                },
            });

            if (dataAddress && dataAddress.data && dataAddress.data.updateCustomerAddress) {
                const shipping = dataAddress.data.updateCustomerAddress;
                state.selected.address = {
                    firstname: shipping.firstname,
                    lastname: shipping.lastname,
                    city: shipping.city,
                    region: {
                        ...shipping.region,
                        label: shipping.region.region,
                    },
                    country: shipping.country,
                    postcode: shipping.postcode,
                    telephone: shipping.telephone,
                    street: shipping.street,
                    address_label: shipping.address_label,
                };
                state.loading.addresses = false;
                state.loading.order = false;
                await setCheckout(state);
            }

            const { cart } = checkout.data;

            // handling if billing null make same with shipping when change address from modal
            if (Object.keys(detailBilling).length === 0) {
                detailBilling = detail;
            }

            await setAddress(detail, detailBilling, cart);
        } else {
            return true;
        }
    };

    // handle add address
    const handleAddress = async (data) => {
        setLoadingAddress(true);
        const state = { ...checkout };
        if (!success) {
            if (typeAddress === 'update') {
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
                }).then(async (res) => {
                    if (res.data && res.data.createCustomerAddress && res.data.createCustomerAddress.id) {
                        const shipping = res.data.createCustomerAddress;
                        state.selected.address = {
                            firstname: shipping.firstname,
                            lastname: shipping.lastname,
                            city: shipping.city,
                            region: {
                                ...shipping.region,
                                label: shipping.region.region,
                            },
                            country: shipping.country,
                            postcode: shipping.postcode,
                            telephone: shipping.telephone,
                            street: shipping.street,
                            address_label: shipping.address_label,
                        };
                        state.loading.addresses = false;
                        state.loading.order = false;
                        await setCheckout(state);
                    }
                });
            }
        }

        setLoadingAddress(false);

        if (openNew && !open) {
            setOpenNew(false);
            setOpen(true);
            if (refetch && typeof refetch === 'function') {
                refetch();
            }
            if (manageCustomer.refetch && typeof manageCustomer.refetch() === 'function') {
                manageCustomer.refetch();
            }
        }
    };
    return (
        <Content
            loading={loading}
            addressCustomer={addressCustomer}
            address={address}
            selectedAddressId={selectedAddressId}
            handleCloseDiff={handleCloseDiff}
            handleChange={handleChange}
            handleOpenNew={handleOpenNew}
            handleAddress={handleAddress}
            loadingAddress={loadingAddress}
            success={success}
            openNew={openNew}
            setOpen={setOpen}
            open={open}
            typeAddress={typeAddress}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            manageCustomer={manageCustomer}
            updateAddress={updateAddress}
            {...other}
        />
    );
};

export default ModalAddressCustomer;
