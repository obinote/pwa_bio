/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Product from '@plugin_productlist';
import Typography from '@common_typography';
import useStyles from '@core_modules/searchresult/components/style';
import Breadcrumb from '@common_breadcrumb';

const SearchResult = (props) => {
    const { storeConfig, t, q } = props;
    const styles = useStyles();
    const breadcrumbData = [
        {
            label: `${t('catalog:title:searchResult')}: '${q}'`,
            link: '/',
            active: true,
            id: 'search-result-id',
        },
    ];
    return (
        <div className={styles.container}>
            {/* add url path if no redirect to slug */}
            <div>
                <Breadcrumb data={breadcrumbData} />
                <Typography id="h1_searchResult" type="bold" variant="h1" className={styles.title}>
                    {t('catalog:title:searchResult')}
                    {': '}
                    '
                    {q}
                    '
                </Typography>
            </div>
            <Product
                defaultSort={{ key: 'relevance', value: 'DESC' }}
                url_path="catalogsearch/advanced/result"
                showTabs
                catalog_search_engine={storeConfig.catalog_search_engine}
                t={t}
                storeConfig={storeConfig}
                {...props}
            />
        </div>
    );
};

export default SearchResult;
