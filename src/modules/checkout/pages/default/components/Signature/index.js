import React, { useEffect, useRef, useState } from 'react';
import SignatureView from '@core_modules/checkout/pages/default/components/Signature/view';
import gqlService from '@core_modules/checkout/services/graphql';

const Signature = (props) => {
    const sigPadRef = useRef();
    const mount = useRef();
    const {
        t, checkout, setCheckout, formik,
    } = props;
    const [applySignature] = gqlService.applySignature({ onError: () => { } });
    const [deleteSignature] = gqlService.deleteSignature({ onError: () => { } });
    const [onGetSignature, { data: getSignatureData }] = gqlService.getSignatureByCart();
    const [loadingSignature, setloadingSignature] = useState(false);
    const cartId = checkout?.data?.cart?.id;

    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    useEffect(() => {
        if (mount.current) {
            const onSignatureInit = async () => {
                if (cartId !== undefined) {
                    setloadingSignature(true);
                    await onGetSignature({
                        variables: {
                            cart_id: cartId,
                        },
                    });
                }
            };

            onSignatureInit();
        }
    }, [cartId]);

    useEffect(() => {
        if (mount.current && getSignatureData) {
            const signatureRemoteData = getSignatureData?.getSignatureByCart;

            if (signatureRemoteData) {
                const signaturePoints = JSON.parse(signatureRemoteData?.cart.signature_points);
                if (sigPadRef.current !== null && signaturePoints) {
                    sigPadRef.current.fromData(signaturePoints);

                    const state = { ...checkout };
                    state.selected.signature = true;
                    setCheckout(state);
                }
            }

            setloadingSignature(false);
        }
    }, [getSignatureData]);

    const onApplySignature = async () => {
        const state = {
            ...checkout,
        };
        setloadingSignature(true);
        const signatureContentArray = JSON.stringify(sigPadRef?.current.toData());
        const signatureContent = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
        const result = await applySignature({
            variables: {
                cart_id: cartId,
                signature_base64: signatureContent,
                signature_points: signatureContentArray,
            },
        });
        const updatedCart = result?.data?.applySignature?.cart;
        if (updatedCart) {
            const mergeCart = {
                ...state.data.cart,
                ...updatedCart,
            };
            state.data.cart = mergeCart;
            state.selected.signature = true;
            setCheckout(state);
        }
        setloadingSignature(false);
    };

    const onDeleteSignature = async () => {
        const state = {
            ...checkout,
        };
        setloadingSignature(true);
        const result = await deleteSignature({ variables: { cart_id: cartId } });
        const updatedCart = result?.data?.deleteSignature?.cart;
        if (updatedCart) {
            const mergeCart = {
                ...state.data.cart,
                ...updatedCart,
            };
            state.data.cart = mergeCart;
            state.selected.signature = false;
            setCheckout(state);
            sigPadRef.current.clear();
        }
        setloadingSignature(false);
    };

    const contentProps = {
        onApplySignature,
        onDeleteSignature,
        sigPadRef,
        t,
        loadingSignature,
        formik,
        checkout,
    };
    return <SignatureView {...contentProps} />;
};
export default Signature;
