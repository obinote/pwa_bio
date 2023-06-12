import React from 'react';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@plugin_optionitem/components/Footer'), { ssr: true });

const SimpleOptionView = ({
    qty = 1,
    setQty = () => { },
    maxQty,
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
    showQty = true,
    showAddToCart = true,
    ...other
}) => (
    <>
        <Footer
            loading={loading}
            disabled={disabled}
            showQty={showQty}
            handleAddToCart={handleAddToCart}
            qty={qty}
            maxQty={maxQty}
            setQty={setQty}
            t={t}
            showAddToCart={showAddToCart}
            {...other}
        />
    </>
);

export default SimpleOptionView;
