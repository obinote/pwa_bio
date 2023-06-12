/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
import React from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import TagManager from 'react-gtm-module';
import { getProduct, getProductAgragations } from '@core_modules/catalog/services/graphql';
import * as Schema from '@core_modules/catalog/services/graphql/productSchema';
import getCategoryFromAgregations from '@core_modules/catalog/helpers/getCategory';
import generateConfig from '@core_modules/catalog/helpers/generateConfig';
import Content from '@plugin_productlist/components';
import ErrorContent from '@plugin_productlist/components/ErrorContent';

const Product = (props) => {
    const {
        catId = 0,
        catalog_search_engine,
        customFilter,
        url_path,
        defaultSort,
        t,
        categoryPath,
        ErrorMessage,
        storeConfig,
        query,
        path,
        availableFilter,
        isDistributorPlp,
        loading: filterLoading,
        seller,
        size,
        token,
        isLogin,
        ...other
    } = props;
    const { query: queryString } = useRouter();
    const [products, setProducts] = React.useState({
        total_count: 0,
        items: [],
    });
    const initEtalase = queryString.mk || 'all';
    const searcQuery = queryString.qd || '';
    const [loading, setLoading] = React.useState(false);
    const [loadmore, setLoadmore] = React.useState(false);
    const [filterSaved, setFilterSaved] = React.useState(false);
    const [selectedSellerEtalase, setSelectedSellerEtalaseState] = React.useState(initEtalase);
    const [searchTerm] = React.useState(searcQuery);
    const [distributorFilterActive, setDistributorFilterActive] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
        ...storeConfig.pwa,
    };

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const toggleFilterDistributor = () => {
        setDistributorFilterActive(!distributorFilterActive);
    };

    const setFiltervalue = (v) => {
        const tempData = v;
        setFilterSaved(true);

        // remove undefined distributor
        if (Object.prototype.hasOwnProperty.call(v, 'selectedFilter')) {
            if (Object.prototype.hasOwnProperty.call(v.selectedFilter, 'distributor')) {
                if (v.selectedFilter.distributor === undefined) {
                    delete tempData.selectedFilter.distributor;
                }
            }
        }

        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(tempData).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        const value = v.selectedFilter[idx].replace('&', '_AND_');
                        queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${value}`;
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                // Vendor with "&" in the name will cause error in filtering.
                const value = typeof v[key] === 'string' ? v[key].replace('&', '_AND_') : v[key];
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${value}`;
            }
        });

        if (isDistributorPlp) {
            const params = encodeURI(queryParams);
            Router.push(`/distributor/${seller.company_code}?${params}`);
        } else {
            Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
        }
    };

    const setSelectedSellerEtalase = (value) => {
        if (isDistributorPlp) {
            Router.push({ pathname: `/distributor/${seller.company_code}`, query: { mk: value } }, undefined, { scroll: false });
        }
        setSelectedSellerEtalaseState(value);
    };

    const setSearchTerm = (value) => {
        Router.push({ pathname: `/distributor/${seller.company_code}`, query: { qd: value } }, undefined, { scroll: false });
    };

    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    if (isDistributorPlp && selectedSellerEtalase === 'all') {
        const tempFilter = config.filter.filter((itm) => itm.type !== 'main_kategori');
        config.filter = tempFilter;
    } else if (isDistributorPlp && selectedSellerEtalase !== 'all') {
        config.filter.push({
            type: 'main_kategori',
            value: selectedSellerEtalase,
        });
        config.filter.push({
            type: 'is_etalase',
            value: 1,
        });
    }

    if (distributorFilterActive) {
        config.filter.push({
            type: 'is_valid',
            value: true,
        });
    }

    if (searchTerm !== '' && searchTerm !== undefined) {
        const tempFilter = config.filter.filter((itm) => itm.type !== 'main_kategori');
        config.filter = tempFilter;
        config.search = searchTerm;
    }

    config = generateConfig(query, config, elastic, availableFilter);
    let context = (isLogin && isLogin === 1) || (config.sort && config.sort.key === 'random') ? { request: 'internal' } : {};
    if (token && token !== '') {
        context = {
            ...context,
            headers: {
                authorization: token,
            },
        };
    }

    const { loading: productFetchLoading, data, fetchMore } = getProduct(config, {
        variables: {
            pageSize: parseInt(storeConfig?.pwa?.page_size, 0) || 10,
            currentPage: 1,
        },
        context: {
            ...context,
            request: 'internal',
        },
        fetchPolicy: config.sort && config.sort.key === 'random' && filterSaved ? 'cache-first' : 'cache-first',
    });

    React.useEffect(() => {
        setLoading(productFetchLoading);
    }, [productFetchLoading]);

    // generate filter if donthave custom filter
    const aggregations = [];
    if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            aggregations.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
    }
    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <ErrorContent {...contentProps} />;
    };

    const handleLoadMore = async (selectedPage) => {
        window.scrollTo(0, 0);
        const pageSize = storeConfig.pwa ? parseInt(storeConfig?.pwa?.page_size, 0) : 10;
        setFilterSaved(false);
        setLoading(true);
        try {
            const totalProduct = products && products.total_count ? products.total_count : 0;
            const totalPage = Math.ceil(totalProduct / pageSize);
            if (fetchMore && typeof fetchMore !== 'undefined' && selectedPage <= totalPage) {
                await setLoadmore(true);
                // setPage(selectedPage);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: selectedPage }),
                    variables: {
                        pageSize,
                        currentPage: selectedPage,
                    },
                    context,
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        setLoadmore(false);
                        setLoading(false);
                        return {
                            products: {
                                ...fetchMoreResult.products,
                                items: [...fetchMoreResult.products.items],
                            },
                        };
                    },
                });
            }
        } catch (error) {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
            const tagManagerArgs = {
                dataLayer: {
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: categoryPath ? `category ${categoryPath}` : '',
                    ecommerce: {
                        currencyCode: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                        impressions: data.products.items.map((product, index) => {
                            let categoryProduct = '';
                            // eslint-disable-next-line no-unused-expressions
                            product.categories.length > 0
                                && product.categories.map(({ name }, indx) => {
                                    if (indx > 0) categoryProduct += `/${name}`;
                                    else categoryProduct += name;
                                });
                            return {
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: categoryProduct,
                                position: index,
                            };
                        }),
                    },
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        } else {
            setProducts({
                total_count: 0,
                items: [],
            });
        }
    }, [data]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        handleLoadMore,
        renderEmptyMessage,
        storeConfig,
        isDistributorPlp,
        seller,
        selectedSellerEtalase,
        setSelectedSellerEtalase,
        distributorFilterActive,
        toggleFilterDistributor,
        isLogin,
        setSearchTerm,
    };

    return <Content {...contentProps} {...other} />;
};

Product.propTypes = {
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

const ProductWrapper = (props) => {
    const router = useRouter();
    const { path, query } = getQueryFromPath(router);

    let availableFilter = [];
    let loadingAgg;
    if (Object.keys(query).length > 0) {
        const { data: agg, loading } = getProductAgragations();
        loadingAgg = loading;
        availableFilter = agg && agg.products ? agg.products.aggregations : [];
    }
    if (loadingAgg) {
        return <span />;
    }
    return <Product {...props} availableFilter={availableFilter} path={path} query={query} />;
};

export default ProductWrapper;
