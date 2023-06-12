/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import Carousel from '@common_slick/Caraousel';
import SkeletonWidgetHome from '@common_slick/Caraousel/SkeletonWidgetHome';
import ProductItem from '@plugin_productitem';
import Cookies from 'js-cookie';
import useStyles from '@core_modules/cms/components/cms-renderer/widget-recommendations/style';
import RecommendationsClient from '@magento/recommendations-js-sdk';
import { getProductRecommend } from '@core_modules/cms/services/graphql';
import { onGenerateVisitorId } from '@helpers/helpers';
import { getRecentlyViewedProduct } from '@core_modules/cms/services/graphql/index';

const WidgetRecommendations = (props) => {
    const {
        storeConfig, pageType, unit_id, product,
    } = props;
    const styles = useStyles();
    const unitId = unit_id?.split('_');
    const current_sku = product?.items[0]?.sku || '';
    const productId = product?.items[0]?.id || '';
    const mount = React.useRef(null);
    const classProductList = 'full-width widget-product-list';
    const [dataProducts, setDataProducts] = React.useState();
    const [gqlAllRecommended, { data: dataAllProducts }] = getProductRecommend();
    const [onGetRecentlyViewedProduct] = getRecentlyViewedProduct();
    const [isMapping, setIsMapping] = React.useState(false);
    const [filterSku, setFilterSku] = React.useState([]);
    const [isError, setIsError] = React.useState(false);

    const client = React.useMemo(() => {
        const store_code = Cookies.get('store_code_storage') ?? storeConfig.store_code;
        const customer_group_code_hash = Cookies.getJSON('cdt')?.customer_group_code_hash || '';
        const clientRecommendationParams = {
            pageType: pageType,
            environmentId: storeConfig.environment_id,
            storeCode: storeConfig.store_group_code,
            storeViewCode: store_code,
            websiteCode: storeConfig.website_code,
            customerGroupCode: customer_group_code_hash,
        };
        return new RecommendationsClient(clientRecommendationParams);
    }, [storeConfig]);

    const onFetchPreConfigureData = async ({ userViewHistory = [] }) => {
        try {
            const data = await client.fetchPreconfigured({
                unitId: unitId?.[0] || '',
                currentSku: current_sku || '',
                userViewHistory,
            });

            if (pageType === 'PageBuilder') {
                const { products } = data.data;
                const sku = [];
                if (products) {
                    products.forEach((value, index) => {
                        if (value.smallImage !== null && value.smallImage?.url.search(/http?s:/g) < 0) {
                            products[index].smallImage.url = `https:${value.smallImage.url}`;
                        }
                        if (value.image !== null && value.image?.url.search(/http?s:/g) < 0) {
                            products[index].image.url = `https:${value.image.url}`;
                        }
                        if (value.swatchImage !== null && value.swatchImage?.url.search(/http?s:/g) < 0) {
                            products[index].swatchImage.url = `https:${value.swatchImage.url}`;
                        }
                        if (value.thumbnailImage !== null && value.thumbnailImage?.url.search(/http?s:/g) < 0) {
                            products[index].thumbnailImage.url = `https:${value.thumbnailImage.url}`;
                        }
                        if (value.smallImage === null || value.smallImage?.url.search(/no_selection:/g) > 0) {
                            products[index].smallImage = {
                                url: `${window.location.origin}/assets/img/placeholder-bio.jpg`,
                            };
                        }
                        sku.push(value.sku);
                    });
                    setFilterSku(sku);
                    setDataProducts(products);
                }
            } else {
                const oriAdobe = data.data.results;
                const sku = [];
                oriAdobe.map((e) => {
                    e.products.forEach((value, index) => {
                        if (value.smallImage !== null && value.smallImage?.url.search(/http?s:/g) < 0) {
                            e.products[index].smallImage.url = `https:${value.smallImage.url}`;
                        }
                        if (value.image !== null && value.image?.url.search(/http?s:/g) < 0) {
                            e.products[index].image.url = `https:${value.image.url}`;
                        }
                        if (value.swatchImage !== null && value.swatchImage?.url.search(/http?s:/g) < 0) {
                            e.products[index].swatchImage.url = `https:${value.swatchImage.url}`;
                        }
                        if (value.thumbnailImage !== null && value.thumbnailImage?.url.search(/http?s:/g) < 0) {
                            e.products[index].thumbnailImage.url = `https:${value.thumbnailImage.url}`;
                        }
                        if (value.smallImage === null || value.smallImage?.url.search(/no_selection:/g) > 0) {
                            e.products[index].smallImage = {
                                url: `${window.location.origin}/assets/img/placeholder-bio.jpg`,
                            };
                        }
                        sku.push(value.sku);
                    });
                    return e;
                });
                setFilterSku(sku);
                setDataProducts(oriAdobe);
            }
        } catch (err) {
            console.log('[err] preconfigured', err);
            setIsError(true);
        }
    };

    React.useEffect(() => {
        mount.current = true;
        if (window !== 'undefined' && mount.current && current_sku !== '') {
            const getRecentViewedProduct = async () => {
                const visitor_id = onGenerateVisitorId();
                const input = { visitor_id, product_id: productId?.toString() };
                const res = await onGetRecentlyViewedProduct({
                    variables: { input },
                });
                const productItems = res?.data?.recentlyViewedProduct?.items;
                onFetchPreConfigureData({ userViewHistory: productItems });
            };
            getRecentViewedProduct();
        }
        return () => {
            mount.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (dataProducts) {
            gqlAllRecommended({
                variables: {
                    filter: {
                        sku: {
                            in: [...filterSku],
                        },
                    },
                },
            });
        }
        if (dataAllProducts && !isMapping) {
            if (pageType === 'PageBuilder') {
                const mappingTamp = dataProducts?.map((e) => {
                    const tamp = dataAllProducts.products.items.find((el) => el.sku === e.sku);
                    const tampVendorName = tamp?.vendor_name ?? '';
                    return {
                        ...e,
                        vendor_name: tampVendorName,
                    };
                });
                const finalMapping = mappingTamp.filter((value) => value.vendor_name);
                setDataProducts(finalMapping);
                setIsMapping(true);
            } else {
                const mappingTamp = dataProducts?.map((e) => {
                    const newProducts = (e) => {
                        return e.products.map((value) => {
                            const tamp = dataAllProducts.products.items.find((el) => el.sku === value.sku);
                            const tampVendorName = tamp?.vendor_name ?? '';
                            const tampManufacture = tamp?.manufacture_name ?? '';
                            const tampNie = tamp?.valid_to_nie ?? '';
                            const tampNoNie = tamp?.no_nie ?? '';
                            const tampIsValid = tamp?.is_valid ?? '';
                            const tampPrice = tamp?.price_range ?? '';
                            return {
                                ...value,
                                vendor_name: tampVendorName,
                                manufacture_name: tampManufacture,
                                valid_to_nie: tampNie,
                                no_nie: tampNoNie,
                                is_valid: tampIsValid,
                                price_range: tampPrice,
                            };
                        });
                    };
                    return {
                        ...e,
                        products: newProducts(e).filter((el) => el.vendor_name),
                    };
                });
                setDataProducts(mappingTamp);
                setIsMapping(true);
            }
        }
    }, [dataProducts, dataAllProducts]);

    const onReInit = () => {
        if (document.getElementsByClassName('widget-product-list')) {
            const elms = document.getElementsByClassName('widget-product-list');
            for (let i = 0; i < elms.length; i++) {
                elms[i].className = 'full-width widget-product-list';
            }
        }
    };

    if (pageType === 'PageBuilder' && dataProducts?.length === 0) {
        const typeAdobe = document.querySelectorAll('[data-content-type="product_recommendations"]');
        for (let i = 0; i < typeAdobe.length; i++) {
            const idAdobe = typeAdobe[i].getAttribute('data-recommendation-id');
            if (idAdobe.includes(unitId[0])) {
                typeAdobe[i].parentElement.parentElement.parentElement.parentElement.classList.add('hide');
            }
        }
    }

    if (dataProducts && isMapping) {
        return (
            <>
                {pageType === 'PageBuilder' ? (
                    <div className={classProductList}>
                        <Carousel
                            onReInit={onReInit}
                            enableQuickView={false}
                            data={dataProducts}
                            Item={ProductItem}
                            slideLg={dataProducts?.length > 10 ? 6 : 5}
                            xxs={445}
                            slideXxs={1}
                        />
                    </div>
                ) : (
                    <>
                        {dataProducts?.map((results, index) => (
                            <React.Fragment key={`widget-recommendation-product-${index}`}>
                                {results?.products.length > 0 && (
                                    <div className={styles.wrapperRec}>
                                        <div className={styles.title}>
                                            <h2>{results.storefrontLabel}</h2>
                                        </div>
                                        <div className={classProductList}>
                                            <Carousel
                                                onReInit={onReInit}
                                                enableQuickView={false}
                                                data={results.products}
                                                Item={ProductItem}
                                                slideLg={results.products?.length > 10 ? 6 : 5}
                                            />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )}
            </>
        );
    }

    // config skeleton loader
    const itemsResponsive = {
        xs: 2,
        sm: 4,
        md: 4,
    };
    const itemsWidth = {
        xs: 6,
        md: 3,
        sm: 3,
    };

    return !isError ? <SkeletonWidgetHome itemsResponsive={itemsResponsive} itemsWidth={itemsWidth} /> : null;
};

export default WidgetRecommendations;
