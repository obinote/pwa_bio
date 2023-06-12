import GridList from '@core_modules/commons/GridList';
import useStyles from '@core_modules/searchimage/components/product_view/style';
import ProductItem from '@plugin_productitem/index';
import LabelView from '@plugin_productitem/components/LabelView';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';

const ProductView = ({ data, loading }) => {
    const styles = useStyles();
    const categoryPath = '';
    const isGrid = true;

    return (
        <div className={styles.productContainer}>
            {loading ? (
                <ProductListSkeleton />
            ) : (
                <GridList
                    data={data}
                    ItemComponent={ProductItem}
                    className="grid"
                    itemProps={{
                        categorySelect: categoryPath,
                        LabelView,
                        isGrid,
                        catalogList: true,
                        className: 'grid-item',
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
    );
};

export default ProductView;
