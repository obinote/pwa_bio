/* eslint-disable no-unused-vars */
import View from '@core_modules/product/pages/default/components/ShippingEta/view';
import Loader from '@core_modules/product/pages/default/components/ShippingEta/loader';
import { getProductShippingRate } from '@core_modules/product/services/graphql';
import React, { useEffect } from 'react';

const ShippingEta = (props) => {
    const { t, data, storeConfig } = props;
    const [open, setOpen] = React.useState(false);
    const [formattedData, setFormattedData] = React.useState(false);
    const globalCurrency = storeConfig.default_display_currency_code;

    const { data: dataShipping, loading, error } = getProductShippingRate({
        variables: {
            sku: data.sku,
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // eslint-disable-next-line no-shadow
    const formatText = (dataShipping) => {
        // eslint-disable-next-line prefer-const
        const temp = [];
        // eslint-disable-next-line no-unused-expressions
        dataShipping.getProductShippingRate.forEach((value) => {
            const carrier = value.carrier ? value.carrier.toLowerCase() : null;
            const find = temp.findIndex((val) => val.carrierName === carrier);
            // eslint-disable-next-line no-param-reassign
            value.method = value.method ? value.method.replace(/_/g, ' ') : null;
            // eslint-disable-next-line no-param-reassign
            value.label = value.method ? value.method.replace(/_/g, ' ') : null;
            const temp2 = {
                carrierName: carrier,
                data: [value],
            };

            if (find < 0) {
                temp.push(temp2);
            } else {
                temp[find].data.push(value);
            }
        });
        const mainText = dataShipping.getProductShippingRate.find((val) => val.estimation !== null && val.estimation.length > 0);
        return { dataShipping: temp, mainText };
    };

    useEffect(() => {
        if (dataShipping && dataShipping.getProductShippingRate !== null) {
            const fmt = formatText(dataShipping);
            setFormattedData(fmt);
        }
    }, [loading, dataShipping]);

    useEffect(() => {}, [formattedData]);

    // eslint-disable-next-line valid-typeof
    if (loading || typeof error === undefined) {
        return <Loader />;
    }

    if (!dataShipping?.getProductShippingRate) {
        return <></>;
    }

    return (
        <View
            t={t}
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            loading={loading}
            formattedData={formattedData}
            globalCurrency={globalCurrency}
        />
    );
};

export default ShippingEta;
