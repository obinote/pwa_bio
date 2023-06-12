import { modules } from '@config';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const generateCatalogSorting = (isSearch, t) => {
    let updatedSort;
    const baseSort = [
        { value: { key: 'name', value: 'ASC' }, label: t('catalog:sort:alphabet:asc') },
        { value: { key: 'name', value: 'DESC' }, label: t('catalog:sort:alphabet:desc') },
        { value: { key: 'price', value: 'ASC' }, label: t('catalog:sort:price:asc') },
        { value: { key: 'price', value: 'DESC' }, label: t('catalog:sort:price:desc') },
    ];
    const catalogSort = [{ value: { key: 'position', value: 'ASC' }, label: t('catalog:sort:relevance') }];
    const searchSort = [{ value: { key: 'relevance', value: 'DESC' }, label: 'Relevance' }];

    if (isSearch) {
        updatedSort = [...searchSort, ...baseSort];
    } else {
        updatedSort = [...catalogSort, ...baseSort];
    }

    const { catalog } = modules;
    const sortList = catalog.productListing.sort;
    updatedSort = updatedSort
        .filter((sort) => sortList[sort.value.key])
        .map((updatedSortData) => ({
            ...updatedSortData,
            value: JSON.stringify({ key: updatedSortData.value.key, value: updatedSortData.value.value }),
        }));

    return updatedSort;
};

const useStyles = makeStyles((theme) => ({
    sortContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 16,
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            marginBottom: 0,
        },
    },
    select: {
        width: 200,
        borderBottom: '1px solid black',
        fontSize: 12,
        marginLeft: 24,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 8,
            width: 150,
        },
    },
    selectItem: {
        fontSize: 14,
    },
}));

const SortDesktop = (props) => {
    const {
        isSearch, defaultSort, filterValue, setFiltervalue, t,
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch, t), []);

    const styles = useStyles();
    const [value, setValue] = React.useState(filterValue.sort || defaultSort);
    const [selectedFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        const savedData = {
            selectedFilter,
        };
        if (event.target.value !== '') {
            savedData.sort = event.target.value;
        }

        setFiltervalue(savedData);
    };

    return (
        <div className={styles.sortContainer} id={`sort${typeof window !== 'undefined' && window.innerWidth <= 768 ? '-mobile' : ''}`}>
            <Typography variant="span" letter="uppercase">
                {t('catalog:title:shortFilter')}
            </Typography>
            <Select
                defaultValue={sortByData[0].value}
                value={value}
                className={styles.select}
                onChange={handleChange}
                name="sort"
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                }}
            >
                {sortByData.map((data, sortIndex) => (
                    <MenuItem key={`sort_index_${sortIndex}`} className={styles.selectItem} value={data.value}>{data.label}</MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default SortDesktop;
