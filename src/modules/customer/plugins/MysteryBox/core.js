/* eslint-disable no-use-before-define */
import React from 'react';
import gqlService from '@core_modules/mysterybox/services/graphql';

const MysteryBoxCore = ({ Content, enabled }) => {
    const { data: dataMysteryBox, loading: loadMysteryBox } = gqlService.getCustomerMisteryBoxAvailable();

    if (loadMysteryBox) {
        return null;
    }

    return <Content dataMysteryBox={dataMysteryBox?.getCustomerMisteryBoxAvailable} dataConfig={enabled} />;
};

export default MysteryBoxCore;
