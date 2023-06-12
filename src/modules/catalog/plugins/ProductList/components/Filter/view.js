import Button from '@common_button';
import useStyles from '@plugin_productlist/components/style';
import AppliedFilter from '@plugin_productlist/components/Filter/AppliedFilter';

const FilterView = (props) => {
    const {
        t, setOpenFilter, handleClear, handleRemove, openFilter, filter, selectedFilter, loading,
    } = props;
    const styles = useStyles();
    return (
        <>
            {filter && filter.length > 0 && !loading && (
                <div>
                    <Button className={styles.buttonFilter} onClick={() => setOpenFilter(!openFilter)} id="filter-plp-mobile">
                        {t('catalog:title:shoppingBasedOn')}
                    </Button>
                    <AppliedFilter
                        t={t}
                        handleClear={handleClear}
                        handleRemove={handleRemove}
                        filter={filter}
                        selectedFilter={selectedFilter}
                    />
                </div>
            )}
        </>
    );
};

export default FilterView;
