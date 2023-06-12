/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React from 'react';
import Layout from '@layout';
import gqlService, { getDownloadBase64 } from '@core_modules/customer/services/graphql';
// import CustomerLayout from '@layout_customer';
import Skeleton from '@src_modules/customer/pages/companyprofile/profile/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const forceDownload = (blob, filename) => {
    const a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
};

const companyProfile = (props) => {
    const {
        t, pageConfig, Content,
    } = props;
    const config = {
        title: t('customer:companyProfile:pageTitle'),
        headerTitle: t('customer:companyProfile:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    // graphql
    const { data, loading } = gqlService.getCustomerCompanyDetail();
    const dataCompany = (data && data.getCustomerCompanyDetail) || [];

    const [setDownloadBase64] = getDownloadBase64();

    const downloadFileWithKey = async (key = '') => {
        const encryptedKey = key.substr(0, 25) + key.substr(26, key.length);
        window.backdropLoader(true);
        try {
            const result = await setDownloadBase64(
                {
                    variables: {
                        input: encryptedKey,
                    },
                },
            );
            const { base64, file_name, type } = result.data.getDownloadBase64;
            const decryptBase64 = await base64.substr(0, 25) + base64.substr(26, base64.length);
            // for mobile app wrapper
            if (window?.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'DOWNLOAD_BASE64', base64: decryptBase64, fileType: type, name: file_name,
                }));
            } else {
                // for web browser
                const base64File = await fetch(decryptBase64).then(async (res) => res.blob());
                const f = URL.createObjectURL(base64File);
                forceDownload(f, `${file_name}.${type}`);
            }
            window.backdropLoader(false);
        } catch (e) {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
            window.backdropLoader(false);
        }
        window.backdropLoader(false);
    };

    const downloadProps = {
        downloadFileWithKey, setDownloadBase64,
    };

    const contentProps = {
        t,
        dataCompany,
    };

    if (loading) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <CustomerLayout {...props}>
                <Content
                    {...contentProps}
                    {...downloadProps}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default companyProfile;
