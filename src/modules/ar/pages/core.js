import React from 'react';
import Layout from '@layout';
import { getArProduct } from '@core_modules/ar/service/graphql';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Core = (props) => {
    const router = useRouter();
    const ogContent = {
        description: '',
    };
    let config = {};
    const schemaOrg = null;
    const slug = router.query?.slug;
    const { data: dataProducts, loading, error } = getArProduct({
        variables: {
            url_key: slug,
        },
    });
    const data = dataProducts?.products?.items?.[0] ?? {};
    const Content = dynamic(() => import('@core_modules/ar/pages/view'), { ssr: false });

    // const data = {};
    // console.log(data, loading, error);
    // if(loading) return (<h1>Loading...</h1>);
    // getProductDetailInformation;
    // getProductDetailInformation
    // if (data && data.categoryList[0]) {
    //     const category = data.categoryList[0];
    //     schemaOrg = generateSchemaOrg(category, storeConfig);
    //     if (data.categoryList[0].description) {
    //         ogContent.description = StripHtmlTags(data.categoryList[0].description);
    //     }
    // }

    // config = {
    //     title: loading ? '' : data.categoryList[0].name,
    //     headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
    //     header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
    //     bottomNav: 'browse',
    //     pageType: 'category',
    //     ogContent,
    //     schemaOrg,
    // };
    config = {
        title: '',
        headerTitle: '',
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
        pageType: 'category',
        ogContent,
        schemaOrg,
    };

    if (loading) {
        return <Layout {...props} pageConfig={config} />;
    }

    if (error || dataProducts.products.total_count === 0) {
        return router.push('/404', '/404');
    }

    if (typeof window === 'undefined') return (<></>);

    return (
        <Layout {...props} pageConfig={config}>
            <Content {...props} arLink={data?.ar_gltf} product={data} url_key={slug} />
        </Layout>
    );
};

export default Core;
