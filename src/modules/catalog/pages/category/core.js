import Layout from '@layout';
import { StripHtmlTags } from '@helper_text';
import { getCategory, getPwaConfig, getCategoryPrivateEvent } from '@core_modules/catalog/services/graphql';
import generateSchemaOrg from '@core_modules/catalog/helpers/schema.org';
import dynamic from 'next/dynamic';
import Content from '@core_modules/catalog/pages/category/components';

const ErrorView = dynamic(() => import('@core_modules/error/pages/default'), { ssr: false });
const SkeletonView = dynamic(() => import('@core_modules/catalog/pages/category/components/Skeleton'), { ssr: false });

const Page = (props) => {
    const {
        categoryId, storeConfig: configStore, pageConfig = {}, ...other
    } = props;
    const { loading, data } = getCategory({
        productSize: configStore?.pwa?.page_size || 10,
        id: categoryId,
    });
    const { data: dataConfig } = getPwaConfig();
    const { loading: loadingPrivateEvent, data: dataPrivateEvent } = getCategoryPrivateEvent({
        variables: {
            category_id: categoryId,
        },
    });
    const storeConfig = dataConfig?.storeConfig || {};
    const ogContent = {};
    let config = {};
    let schemaOrg = null;
    if (data && data.categoryList[0]) {
        const category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].description) {
            ogContent.description = StripHtmlTags(data.categoryList[0].description);
        }
        config = {
            title: loading ? '' : data.categoryList[0].name,
            headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
            header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
            bottomNav: 'browse',
            pageType: 'category',
            ogContent,
            schemaOrg,
        };
    }

    if (loading || loadingPrivateEvent) {
        const pwaConfig = storeConfig?.pwa || {};
        return (
            <Layout {...props} pageConfig={config}>
                <SkeletonView {...pwaConfig} />
            </Layout>
        );
    }

    if (!data || !dataPrivateEvent) {
        return <ErrorView statusCode={404} {...props} />;
    }

    if ((!loading && data && !data.categoryList[0])) {
        return <ErrorView statusCode={404} {...props} />;
    }
    return (
        <Layout {...props} pageConfig={config || pageConfig}>
            <Content categoryId={categoryId} data={data} {...other} storeConfig={storeConfig} dataPrivateEvent={dataPrivateEvent} />
        </Layout>
    );
};

export default Page;
