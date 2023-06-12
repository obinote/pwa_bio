/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import { generateCatalogSorting } from '@plugin_productlist/components/FilterDesktop/sort';

const Filter = (props) => {
    const {
        FilterModalView, FilterView, filterValue, isSearch, defaultSort, setFiltervalue, filter, storeConfig, t, ...other
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch, t), []);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [selectedFilter, setFilter] = React.useState(filterValue);
    const [sort, setSort] = React.useState(filterValue.sort ? filterValue.sort : '');
    const [priceRange, setPriceRange] = React.useState([0, 0]);
    const router = useRouter();

    // reset filter if route change
    React.useEffect(() => {
        const pricerangelist = filter.filter((data) => data.field === 'price');
        // eslint-disable-next-line radix
        const pricerangelistmaxvalue = parseInt(pricerangelist[0]?.value[pricerangelist[0]?.value.length - 1].value) || 0;

        setPriceRange(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, pricerangelistmaxvalue]);
        setFilter(filterValue);
    }, [router.asPath, filter]);

    const handleRemove = (code) => {
        const newFilter = selectedFilter;
        delete newFilter[code];
        setFiltervalue(newFilter);
    };

    const handleClear = () => {
        const pricerangelist = filter.filter((data) => data.field === 'price');
        // eslint-disable-next-line radix
        const pricerangelistmaxvalue = parseInt(pricerangelist[0]?.value[pricerangelist[0]?.value.length - 1].value) || 0;
        // reset value for sort component
        setSort(defaultSort || '');

        // reset value for price range component
        setPriceRange(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, pricerangelistmaxvalue]);

        let newFilter = {
            q: selectedFilter.q,
        };

        // new filter with clear/reset value
        if (selectedFilter.q === undefined || selectedFilter.q === '' || selectedFilter.q === 'undefined') {
            newFilter = {};
        }

        setOpenFilter(false);
        setFilter(newFilter);
        setFiltervalue(newFilter);
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        setFiltervalue(savedData);
        setOpenFilter(!openFilter);
    };

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
        handleSave();
    };

    const ModalProps = {
        selectedFilter, setSelectedFilter, setCheckedFilter, handleSave, handleClear, handleRemove, sortByData, sort, setSort, priceRange, setPriceRange,
    };

    return (
        <>
            {FilterModalView ? (
                <FilterModalView
                    open={openFilter}
                    setOpen={() => setOpenFilter(!openFilter)}
                    {...props}
                    {...ModalProps}
                />
            ) : null}

            <FilterView
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                isSearch={isSearch}
                filter={filter}
                t={t}
                {...ModalProps}
                {...other}
            />
        </>
    );
};

export default Filter;
