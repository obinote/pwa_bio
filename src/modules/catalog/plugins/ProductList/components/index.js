import React, { useEffect, useState } from 'react';
import GridList from '@common_gridlist';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import FilterDesktop from '@plugin_productlist/components/FilterDesktop';
import ProductItem from '@plugin_productitem/index';
import LabelView from '@plugin_productitem/components/LabelView';
import useStyles from '@plugin_productlist/components/style';
import Sort from '@plugin_productlist/components/FilterDesktop/sort';
import FilterSellerEtalase from '@plugin_productlist/components/FilterSellerEtalase';
import FilterSellerEtalaseDialog from '@plugin_productlist/components/FilterSellerEtalase/FilterSellerEtalaseDialog';
import Pagination from '@plugin_productlist/components/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import Filter from '@plugin_productlist/components/Filter';
import FilterDistributor from '@plugin_productlist/components/FilterDistributor';
import SearchBox from '@core_modules/catalog/plugins/ProductList/components/SearchBox';
import Intro from '@core_modules/customer/plugins/Guide';

const Content = (props) => {
    const {
        query,
        showTabs,
        customFilter,
        elastic,
        t,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        TabView,
        products,
        categoryPath,
        renderEmptyMessage,
        ProductListSkeleton,
        loading,
        loadmore,
        handleLoadMore,
        dataTabs,
        onChangeTabs,
        isDistributorPlp = false,
        toggleFilterDistributor,
        distributorFilterActive,
        isLogin,
        setSearchTerm,
        seller,
        ...other
    } = props;
    const { storeConfig } = props;
    const styles = useStyles();
    const [isGrid, setGridState] = useState(true);
    const handleScroll = () => {
        // To get page offset of last user
        // const lastUserLoaded = document.querySelector(`.grid-item:last-child`);
        const lastUserLoaded = document.querySelector('.latest-product-indicator');
        if (lastUserLoaded) {
            const lastUserLoadedOffset = lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > lastUserLoadedOffset && !loadmore && products.items.length < products.total_count) {
                handleLoadMore();
            }
        }
    };

    const setGrid = async (state) => {
        setLocalStorage('isGrid', state);
        setGridState(state);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        const gridView = getLocalStorage('isGrid');
        if (gridView !== null) {
            setGridState(gridView);
        }
    }, [isGrid]);
    return (
        <>
            {categoryPath && isLogin && products && products?.items.length > 0 && !loading && !isDistributorPlp ? <Intro page="plp" /> : null}

            {!isDistributorPlp && (products.items.length === products.total_count || loading)
                ? renderEmptyMessage(products.items.length, loading)
                : null}

            <div className={styles.mainContainer}>
                {storeConfig?.pwa?.drawer_filter_on_desktop_enable ? (
                    <div className="col-sm-12 col-lg-2 hidden-mobile">
                        <FilterDesktop
                            filter={customFilter || aggregations}
                            defaultSort={JSON.stringify(defaultSort)}
                            filterValue={query}
                            setFiltervalue={setFiltervalue}
                            isSearch={!!config.search}
                            products={products}
                            renderEmptyMessage={renderEmptyMessage}
                            loading={loading}
                            tabs={dataTabs}
                            t={t}
                            onChangeTabs={onChangeTabs}
                            storeConfig={storeConfig}
                        />
                    </div>
                ) : null}
                <div className={styles.innerContainer}>
                    {loading ? (
                        <Skeleton height={150} className="filter-skeleton" />
                    ) : (
                        <>
                            {isDistributorPlp && <FilterSellerEtalase {...props} />}

                            {!isDistributorPlp && products?.items.length > 0 && (
                                <FilterDesktop
                                    filter={customFilter || aggregations}
                                    defaultSort={JSON.stringify(defaultSort)}
                                    filterValue={query}
                                    setFiltervalue={setFiltervalue}
                                    isSearch={!!config.search}
                                    products={products}
                                    renderEmptyMessage={renderEmptyMessage}
                                    loading={loading}
                                    tabs={dataTabs}
                                    t={t}
                                    onChangeTabs={onChangeTabs}
                                    storeConfig={storeConfig}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className={styles.productListContainer}>
                    {isDistributorPlp ? <FilterSellerEtalaseDialog {...props} /> : <></>}
                    {!storeConfig?.pwa?.drawer_filter_on_desktop_enable ? (
                        <div className={styles.filterBtnContainer}>
                            <div className={styles.leftSideFilter}>
                                {products.items.length !== 0 && !isDistributorPlp && !loading && isLogin === 1 && (
                                    <FilterDistributor t={t} active={distributorFilterActive} toggleFilterDistributor={toggleFilterDistributor} />
                                )}
                                {isDistributorPlp && <SearchBox t={t} companyName={seller?.company_name} fetchSearch={setSearchTerm} />}
                            </div>
                            {products.items.length !== 0 && !loading && (
                                <div className={styles.categoryFilterAndSort}>
                                    <div className="hidden-desktop">
                                        <Filter
                                            filter={aggregations}
                                            defaultSort={JSON.stringify(defaultSort)}
                                            filterValue={query}
                                            setFiltervalue={setFiltervalue}
                                            isSearch={!!config.search}
                                            products={products}
                                            renderEmptyMessage={renderEmptyMessage}
                                            loading={loading}
                                            setGrid={(state) => setGrid(state)}
                                            t={t}
                                            {...other}
                                        />
                                    </div>
                                    <Sort
                                        filter={customFilter || aggregations}
                                        defaultSort={JSON.stringify(defaultSort)}
                                        filterValue={query}
                                        setFiltervalue={setFiltervalue}
                                        isSearch={!!config.search}
                                        t={t}
                                        isDistributorPlp={isDistributorPlp}
                                        {...other}
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}
                    <div className={styles.productContainer}>
                        {isDistributorPlp && (products.items.length === products.total_count || loading)
                            ? renderEmptyMessage(products.items.length, loading)
                            : null}
                        {loading && <ProductListSkeleton />}
                        {!loading && (
                            <GridList
                                data={products.items}
                                ItemComponent={ProductItem}
                                className="grid"
                                itemProps={{
                                    categorySelect: categoryPath,
                                    LabelView,
                                    isGrid,
                                    catalogList: true,
                                    className: 'grid-item',
                                    ...other,
                                }}
                                gridItemProps={
                                    isGrid
                                        ? {
                                            xs: 6,
                                            sm: 4,
                                            md: 3,
                                        }
                                        : {
                                            xs: 12,
                                            sm: 12,
                                            md: 12,
                                        }
                                }
                            />
                        )}
                    </div>
                    {!loading && products.items.length > 0 && (
                        <Pagination
                            classContainer={styles.paginationContainer}
                            numberOfPages={products.page_info.total_pages}
                            page={products.page_info.current_page}
                            onChange={(event, selectedPage) => {
                                handleLoadMore(selectedPage);
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;
