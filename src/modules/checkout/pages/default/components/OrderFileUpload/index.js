/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import OrderFileUploadView from '@core_modules/checkout/pages/default/components/OrderFileUpload/view';
import useStyles from '@core_modules/checkout/pages/default/components/OrderFileUpload/style';
import gqlService from '@core_modules/checkout/services/graphql/index';
import { storeConfig } from '@core_modules/cart/services/graphql';

const OrderFileUpload = (props) => {
    const styles = useStyles();
    const inputFileRef = useRef();
    const timeoutToastRef = useRef();
    const mount = useRef();
    const [onUploadPurchaseLetter] = gqlService.uploadPurchaseLetter();
    const [onDeletePurchaseLetter] = gqlService.deletePurchaseLetter();
    const [onGetPurchaseLetter, { data: getPurchaseLetterData }] = gqlService.getPurchaseLetter();
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setDeleteLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageDisplay, setImageDisplay] = useState(null);
    const [filename] = useState(`image-${new Date().getTime()}.jpg`);
    const [purchaseLetterValue, setPurchaseLetterValue] = useState(null);
    const { checkout, t, setCheckout } = props;
    const cartId = checkout?.data?.cart?.id;
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9-_/ ]+$/;
    let maxSize = 0;
    const { loading: loadingConfig, data: dataConfig, error } = storeConfig();

    if (!loadingConfig && dataConfig?.storeConfig?.max_size && !error) {
        maxSize = dataConfig.storeConfig?.max_size;
    }

    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    useEffect(() => {
        if (mount.current) {
            const onPurchaseLetterInit = async () => {
                if (cartId !== undefined) {
                    await onGetPurchaseLetter({ variables: { cart_id: cartId } });
                }
            };
            onPurchaseLetterInit();
        }
    }, [cartId]);

    useEffect(() => {
        if (mount.current && getPurchaseLetterData) {
            const purchaseLetterRemoteData = getPurchaseLetterData?.getSuratPembelian;
            if (purchaseLetterRemoteData) {
                const imageUrl = purchaseLetterRemoteData?.image_url;
                const sp_number = purchaseLetterRemoteData?.sp_number;
                setPurchaseLetterValue(sp_number);
                setImage(imageUrl);
                setImageDisplay(imageUrl);
                let checkoutNew = { ...checkout };
                if (imageUrl !== null) {
                    checkoutNew = {
                        ...checkoutNew,
                        upload_purchase_letter: true,
                    };
                }
                if (sp_number !== null) {
                    checkoutNew = {
                        ...checkoutNew,
                        input_purchase_letter: true,
                    };
                }
                setCheckout(checkoutNew);
            }
        }
    }, [getPurchaseLetterData]);

    const onResetFileInput = () => {
        inputFileRef.current.value = null;
    };

    const getErrorGQL = (res) => {
        let data = {
            isError: false,
            message: null,
            category: null,
        };
        if (res?.graphQLErrors) {
            if (res?.graphQLErrors?.length && res?.graphQLErrors?.length > 0) {
                const issetErrorGqlMessage = res?.graphQLErrors[0]?.hasOwnProperty('message');
                const issetErrorGqlExtension = res?.graphQLErrors[0]?.hasOwnProperty('extensions');
                if (issetErrorGqlMessage) {
                    data = {
                        ...data,
                        isError: true,
                        message: res?.graphQLErrors[0]?.message,
                    };
                }

                if (issetErrorGqlExtension) {
                    data = {
                        ...data,
                        category: res?.graphQLErrors[0]?.extensions?.category,
                    };
                }
            }
        }

        return data;
    };

    const onShowToastErrorMessage = (message) => {
        window.toastMessage({
            open: true,
            text: message,
            variant: 'error',
        });
        clearTimeout(timeoutToastRef.current);
        timeoutToastRef.current = setTimeout(() => {
            window.toastMessage({ open: false });
        }, 3000);
    };

    const onShowToastSuccessMessage = (message) => {
        window.toastMessage({
            open: true,
            text: message,
            variant: 'success',
        });
        clearTimeout(timeoutToastRef.current);
        timeoutToastRef.current = setTimeout(() => {
            window.toastMessage({ open: false });
        }, 3000);
    };

    const onDeleteFileUpload = async () => {
        try {
            setDeleteLoading(true);
            setCheckout({
                ...checkout,
                loading: {
                    upload: true,
                },
            });
            const res = await onDeletePurchaseLetter({
                variables: { cart_id: cartId },
            });
            const getData = res?.data;
            if (getData?.deleteSuratPembelian?.success) {
                setImage(null);
                setImageDisplay(null);
                onResetFileInput();
                onShowToastSuccessMessage(t('checkout:uploadImagePurchaseLetterSuccessDelete'));
                setCheckout({
                    ...checkout,
                    loading: {
                        upload: false,
                    },
                    upload_purchase_letter: true,
                });
            }
            setDeleteLoading(false);
        } catch (err) {
            const getError = getErrorGQL(err);
            const message = getError?.message === null ? t('checkout:somethingWrong') : getError?.message;
            onShowToastErrorMessage(message);
            setDeleteLoading(false);
            setCheckout({
                ...checkout,
                loading: {
                    upload: false,
                },
            });
        }
    };

    const onRequestFileUpload = async () => {
        // const isNotAllowUpload = purchaseLetterValue === null || purchaseLetterValue === '';
        // if (isNotAllowUpload) {
        //     onShowToastErrorMessage(t('checkout:uploadImagePurchaseLetterFailed'));
        //     return;
        // }
        const isNotAllowUploadImage = image === null;
        if (isNotAllowUploadImage) {
            onShowToastErrorMessage(t('checkout:uploadImagePurchaseLetterImageFailed'));
            return;
        }

        try {
            setLoading(true);
            setCheckout({
                ...checkout,
                loading: {
                    upload: true,
                },
            });
            const res = await onUploadPurchaseLetter({
                variables: {
                    // trim hapus space depan belakang
                    purchase_letter: purchaseLetterValue === null ? '' : purchaseLetterValue.trim(),
                    cart_id: cartId,
                    filename,
                    image_base64: image,
                },
            });
            const getData = res?.data;
            if (getData?.uploadSuratPembelian?.success) {
                setImageDisplay(image);
                setCheckout({
                    ...checkout,
                    loading: {
                        upload: false,
                    },
                    upload_purchase_letter: true,
                    input_purchase_letter: true,
                });
                onShowToastSuccessMessage(t('checkout:uploadImagePurchaseLetterSuccess'));
            } else {
                setCheckout({
                    ...checkout,
                    loading: {
                        upload: false,
                    },
                    upload_purchase_letter: false,
                    input_purchase_letter: false,
                });
                const getError = res?.errors[0] ? res?.errors[0] : null;
                const message = getError?.message === null ? t('checkout:somethingWrong') : getError?.message;
                onShowToastErrorMessage(message);
            }
            setLoading(false);
        } catch (err) {
            const getError = getErrorGQL(err);
            const message = getError?.message === null ? t('common:error:quoteUploadSize', { maxSize }) : getError?.message;
            onShowToastErrorMessage(message);
            setImage(null);
            setLoading(false);
            setCheckout({
                ...checkout,
                loading: {
                    upload: false,
                },
                upload_purchase_letter: false,
                input_purchase_letter: false,
            });
        }
    };

    const onChangePurchaseLetter = (e) => {
        const text = e.target.value;

        if (text !== null) {
            if (ALPHA_NUMERIC_DASH_REGEX.test(text) || text === '') {
                setCheckout({
                    ...checkout,
                    input_purchase_letter: true,
                    purchase_letter_value: text,
                });
            } else {
                return;
            }
        }

        setPurchaseLetterValue(text);
    };

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }

    const onChangeFileUpload = async (e) => {
        const { files } = e.target;
        const fileReader = new FileReader();
        const fileTypes = ['jpg', 'jpeg', 'png'];
        if (files && files[0]) {
            const { size } = files[0];
            const isSizeAllow = size < convertKBtoBytes(maxSize);
            const extension = files[0].name.split('.').pop().toLowerCase(); // file extension from input file
            const isSuccess = fileTypes.indexOf(extension) > -1; // is extension in acceptable types
            if (!isSuccess) {
                e.target.value = null;
                onShowToastErrorMessage(t('checkout:uploadImageExtensionFailed'));
            } else if (!isSizeAllow) {
                e.target.value = null;
                window.toastMessage({
                    open: true,
                    text: t('common:error:quoteUploadSize', { maxSize }),
                    variant: 'error',
                });
            } else {
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = async (event) => {
                    const image_base64 = event.target.result;
                    setImage(image_base64);
                };
            }
        }
    };

    const onErrorImagePreview = async (err) => {
        console.log('[err] error image preview', err);
    };

    const contentProps = {
        styles,
        cartId,
        inputFileRef,
        loading,
        loadingDelete,
        imageDisplay,
        purchaseLetterValue,
        maxSize,
        onErrorImagePreview,
        onChangeFileUpload,
        onChangePurchaseLetter,
        onRequestFileUpload,
        onDeleteFileUpload,
    };

    return <OrderFileUploadView {...contentProps} {...props} />;
};
export default OrderFileUpload;
