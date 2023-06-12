/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import GridList from '@common_gridlist';
import Carousel from '@common_slick/Caraousel';
import SkeletonWidgetHome from '@common_slick/Caraousel/SkeletonWidgetHome';
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import ProductItem from '@plugin_productitem';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import React, { useMemo } from 'react';
import { useTranslation } from '@i18n';

/**
 * [CONSTANT] variable
 */
export const TEMPLATE_SLIDER = 'product/widget/new/content/new_grid.phtml';
export const TEMPLATE_GRID = 'grid';

const WidgetListProductHomepage = (props) => {
    const {
        template, products_count, conditions_encoded, drawer_filter_on_desktop_enable,
    } = props;
    const { t } = useTranslation();

    /**
     * [QUERY] query for products items
     */
    const dataConditions = useMemo(() => getProductListConditions(conditions_encoded), [conditions_encoded]);
    const dataFilter = generateQueries(template, dataConditions);
    // eslint-disable-next-line radix
    const { data, loading, error } = getProductList({ ...dataFilter, pageSize: parseInt(products_count) });
    const dataItems = data?.products?.items || [];

    /**
     * [METHOD] on reinit trigger when all data has been rendered, hide skeleton
     */
    const onReInit = () => {
        if (document.getElementsByClassName('widget-product-list')) {
            const elms = document.getElementsByClassName('widget-product-list');
            for (let i = 0; i < elms.length; i++) {
                elms[i].className = 'full-width widget-product-list';
            }
        }
        if (document.getElementsByClassName('widget-product-list-skeleton')) {
            const elms = document.getElementsByClassName('widget-product-list-skeleton');
            for (let i = 0; i < elms.length; i++) {
                elms[i].className = 'full-width widget-product-list-skeleton hide';
            }
        }
    };

    /**
     * [TEMPLATE] type slider
     */
    const classSkeleton = 'full-width widget-product-list-skeleton';
    const classProductList = 'full-width widget-product-list';
    if (loading) {
        return (
            <div className={`${classSkeleton} load-items`}>
                <SkeletonWidgetHome />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <div className="mgz-product-error">
                    <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />
                </div>
            </>
        );
    }

    if (template === TEMPLATE_SLIDER && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <Carousel
                        onReInit={onReInit}
                        enableQuickView={false}
                        data={dataItems}
                        Item={ProductItem}
                        slideLg={dataItems?.length > 10 ? 6 : 5}
                        xxs={445}
                        slideXxs={1}
                    />
                </div>
            </>
        );
    }

    /**
     * [TEMPLATE] type grid
     */
    if (template === TEMPLATE_GRID && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <GridList
                        data={dataItems}
                        ItemComponent={ProductItem}
                        className="grid"
                        gridItemProps={{ xs: 6, sm: 4, md: drawer_filter_on_desktop_enable ? 3 : 2 }}
                    />
                </div>
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

    return <SkeletonWidgetHome itemsResponsive={itemsResponsive} itemsWidth={itemsWidth} />;
};

export default WidgetListProductHomepage;
