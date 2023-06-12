import { useEffect, useState } from 'react';
import useStyles from '@core_modules/distributor/pages/list/components/Search/style';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ fetchSearch, setLoadingFetchmore, t }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFromSearch, setIsFormSearch] = useState(false);

    const styles = useStyles();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setIsFormSearch(true);
        setLoadingFetchmore(true);
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

    return (
        <div className={classNames(styles.searchWrapper)}>
            <TextField
                className={classNames(styles.searchBox)}
                size="small"
                placeholder={t('distributor:searchBox')}
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
        </div>
    );
};

export default Search;
