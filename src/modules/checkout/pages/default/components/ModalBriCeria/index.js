import React from 'react';
import View from '@core_modules/checkout/pages/default/components/ModalBriCeria/view';
import { useTranslation } from '@i18n';

const ModalBriCeria = (props) => {
    const {
        briCeriaData, order_id, open, setOpen,
    } = props;
    const { t } = useTranslation(['common']);

    const handleClose = () => {
        window.location.replace(`/sales/order/view/order_id/${order_id}`);
    };
    return (
        <View
            handleClose={handleClose}
            t={t}
            briCeriaData={briCeriaData}
            open={open}
            setOpen={setOpen}
        />
    );
};

export default ModalBriCeria;
