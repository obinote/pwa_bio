/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import Router from 'next/router';
import gqlService from '@core_modules/mysterybox/services/graphql';

const MysteryBox = (props) => {
    const {
        Content, pageConfig, t, storeConfig,
    } = props;
    const config = {
        title: t('mysterybox:title'),
        header: 'relative',
        headerTitle: t('mysterybox:title'),
        bottomNav: false,
    };

    const [openGift, setOpenGift] = useState(false);
    const [prize, setPrize] = useState('');
    const [getPrize, { data: dataPrize }] = gqlService.getPrize();
    const [loadingPrize, setLoadingPrize] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setOpenGift(false);
            setPrize('');
        };
        Router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            Router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    const handleGift = () => {
        setLoadingPrize(true);
        getPrize()
            .then((res) => {
                setPrize(res.data.getPrize.type);
                setTimeout(() => {
                    setOpenGift(true);
                    setLoadingPrize(false);
                    refetch();
                }, 1000);
            })
            .catch((e) => {
                setLoadingPrize(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const { loading, refetch } = gqlService.getCustomerMisteryBoxAvailable();

    useEffect(() => {
        if (!storeConfig.enable_mistery_box) {
            Router.push('/');
        }
    }, []);

    if (loading) {
        return <Layout pageConfig={pageConfig || config} {...props} />;
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                dataConfig={storeConfig.enable_mistery_box}
                loading={loading}
                loadingPrize={loadingPrize}
                openGift={openGift}
                handleGift={handleGift}
                prize={prize}
                dataPrize={dataPrize?.getPrize}
            />
        </Layout>
    );
};

export default MysteryBox;
