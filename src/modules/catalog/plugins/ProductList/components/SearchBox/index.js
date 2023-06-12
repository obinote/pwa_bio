import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import useStyles from '@core_modules/catalog/plugins/ProductList/components/SearchBox/style';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const Search = ({ fetchSearch, companyName, t }) => {
    const inputRef = useRef(null);
    const router = useRouter();
    const query = router.query.qd;
    const [searchTerm, setSearchTerm] = useState(query || '');
    const [isFromSearch, setIsFormSearch] = useState(false);

    const styles = useStyles();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setIsFormSearch(true);
    };

    useEffect(() => {
        if (isFromSearch) {
            const delayDebounceFn = setTimeout(() => {
                fetchSearch(searchTerm);
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        }

        return () => false;
    }, [searchTerm]);

    useEffect(() => {
        if (query !== undefined) {
            inputRef.current.focus();
        }
    }, [query]);

    return (
        <TextField
            inputRef={inputRef}
            className={classNames(styles.searchBox)}
            size="small"
            placeholder={t('catalog:searchBox', { company_name: companyName })}
            id="outlined-basic"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
        />
    );
};

export default Search;
