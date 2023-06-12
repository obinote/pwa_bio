import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@common_typography';
import router from 'next/router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@common_skeleton';
import useStyles from '@plugin_productlist/components/FilterDesktop/style';
import AppliedFilter from '@plugin_productlist/components/Filter/AppliedFilter';
import { getCategoryUrlPath } from '@core_modules/catalog/services/graphql';
import Cookies from 'js-cookie';

let globalTimeout = null;

const ViewFilter = (props) => {
    const {
        t, loading, selectedFilter, setSelectedFilter, handleSave, handleClear, handleRemove, isSearch, filter,
    } = props;
    const styles = useStyles();
    const unappliedFilters = filter.filter((item) => !selectedFilter[item.field]);

    const [getUrlPath] = getCategoryUrlPath();

    const selectFilter = async (field, value) => {
        if (field === 'category_id') {
            await getUrlPath({
                variables: {
                    id: value,
                },
            }).then(({ data: response }) => {
                if (response.categoryList && response.categoryList.length > 0) {
                    const urlPath = response.categoryList[0].url_path;
                    router.push({ pathname: urlPath }, undefined);
                }
            });
        } else {
            Cookies.set('of', JSON.stringify(filter));

            if (globalTimeout) {
                clearTimeout(globalTimeout);
            }

            setSelectedFilter(field, value);

            globalTimeout = setTimeout(() => {
                handleSave();
            }, 1000);
        }
    };

    const generateFilter = (itemFilter) => {
        const ItemValueByLabel = [];
        for (let index = 0; index < itemFilter.value.length; index += 1) {
            ItemValueByLabel.push({
                label: itemFilter.value[index].label,
                value: itemFilter.value[index].label,
            });
        }
        return (
            <div className={styles.listCategoryWrapper}>
                {itemFilter.value.map((val, ids) => {
                    if (val !== 'attribute_set_id') {
                        return (
                            <button type="button" onClick={() => selectFilter(itemFilter.field, val.value)} className={styles.listCategory} key={ids}>
                                <Typography variant="span" letter="capitalize">
                                    {`${val.label.replace(/_/g, ' ')} `}
                                    <Typography className="count" variant="span" letter="capitalize">
                                        (
                                        {val.count}
                                        )
                                    </Typography>
                                </Typography>
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    const filteredUnappliedFilters = unappliedFilters.filter(
        (itemFilter) => !(itemFilter.field === 'category_id' && isSearch) && itemFilter.field !== 'price',
    );

    return (
        <div className={styles.root} id="filter-plp">
            {loading ? <Skeleton variant="rect" width="100%" height={705} /> : null}
            {filter && filter.length > 0 && (
                <div>
                    <AppliedFilter t={t} handleClear={handleClear} handleRemove={handleRemove} filter={filter} selectedFilter={selectedFilter} />
                    {filteredUnappliedFilters.length !== 0 && (
                        <>
                            <Typography className={styles.shoppingOption} type="bold" letter="uppercase">
                                {t('catalog:title:shoppingOption')}
                            </Typography>
                            <div className={styles.filterContainer}>
                                {filteredUnappliedFilters.map((itemFilter, idx) => (
                                    <Accordion
                                        className={styles.accordion}
                                        key={idx}
                                        disableGutters
                                        elevation={0}
                                        defaultExpanded={typeof selectedFilter[itemFilter.field] !== 'undefined'}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header2">
                                            <Typography className={styles.heading} variant="span" letter="capitalize">
                                                {/* {itemFilter.label.replace(/_/g, ' ')} */}
                                                {itemFilter.label}
                                            </Typography>
                                        </AccordionSummary>
                                        <div>{generateFilter(itemFilter)}</div>
                                    </Accordion>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewFilter;
