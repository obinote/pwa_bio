/* eslint-disable no-plusplus */
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import { getProduct, getCategoryByName } from '@core_modules/theme/services/graphql';
import { useTranslation } from '@i18n';
import Typography from '@common_typography';
import useStyles from '@src_modules/theme/components/header/desktop/components/autocomplete/style';
import { breakPointsUp } from '@helper_theme';
// import Button from '@common_button';
// import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useEffect } from 'react';

let globalTimeout = null;

const generateItemData = ({ product, category, landing }) => {
    const result = [];
    if (product) {
        for (let index = 0; index < product.items.length; index++) {
            const element = product.items[index];
            const prod = {
                id: element.id,
                name: element.name,
                url_key: element.url_key,
                position: index,
                sku: element.sku,
                vendor_name: element.vendor_name,
                small_image: element.small_image,
                price_tiers: element.price_tiers,
                tier_prices_custom: element.tier_prices_custom,
                price_range: element.price_range,
                type: 'product',
            };
            result.push(prod);
        }
    }
    if (category) {
        for (let index = 0; index < category.length; index++) {
            const element = category[index];
            const cat = {
                id: element.id,
                name: element.name,
                url_key: element.url_path,
                breadcrumbs: element.breadcrumbs,
                position: index,
                type: 'category',
            };
            result.push(cat);
        }
    }
    if (landing) {
        for (let index = 0; index < landing.length; index++) {
            const element = landing[index];
            const cat = {
                id: element.id,
                name: element.name,
                url_key: element.url_path,
                breadcrumbs: element.breadcrumbs,
                position: index,
                type: 'landing',
            };
            result.push(cat);
        }
    }
    return result;
};

export default function ComboBox(props) {
    const {
        placeholder,
        handleSearch,
        setValue,
        OptionsItem,
        forcePopupIcon = true,
        width = 300,
        maxHeight = '80vh',
        enableVoice,
        dataCategory,
        disabled = false,
        searchImageAction,
        ...others
    } = props;
    const desktop = breakPointsUp('sm');
    const { t } = useTranslation(['common']);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [typeLoading, setTypeLoading] = React.useState(false);

    const [actGetProduct, { loading, data, error }] = getProduct();

    const [actGetCategory, { data: dCategory, loading: dLoading, error: dError }] = getCategoryByName();

    let itemData = [];
    const isLoadingFinish = !loading && !dLoading;

    if (isLoadingFinish && !typeLoading && error === undefined && dError === undefined && data && dCategory) {
        itemData = generateItemData({ product: data.products, category: dCategory.categoryList });
    }

    if (!search && !typeLoading) {
        itemData = generateItemData({ landing: dataCategory?.category?.children });
    }

    useEffect(() => {
        if (search) {
            if (globalTimeout) {
                clearTimeout(globalTimeout);
            }

            globalTimeout = setTimeout(async () => {
                actGetProduct({
                    context: {
                        request: 'internal',
                    },
                    fetchPolicy: 'no-cache',
                    variables: {
                        term: search,
                    },
                });
                actGetCategory({
                    variables: {
                        name: search,
                    },
                    context: {
                        request: 'internal',
                    },
                    fetchPolicy: 'no-cache',
                });

                setTypeLoading(false);
            }, 1000);

            return () => clearTimeout(globalTimeout);
        }

        if (!search) {
            setTypeLoading(false);
        }

        return () => false;
    }, [search]);

    // const setOpenSearchByImage = () => {
    //     const { handleSearchByImage } = searchImageAction;
    //     handleSearchByImage();
    // };

    const startAutocomplete = (e) => {
        if (e.type === 'blur') {
            setSearch('');
            setOpen(false);
        }

        if (e.type === 'change') {
            const val = encodeURI(e.target.value);
            setValue(val);
            setSearch(e.target.value);

            if (e.target.value) {
                setTypeLoading(true);
            }
        }
    };

    const styles = useStyles();

    return (
        <Autocomplete
            id="combo-box-demo"
            className={styles.customDropdown}
            options={itemData}
            loading={typeLoading || !isLoadingFinish}
            filterOptions={(options) => options}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.name === value.name}
            forcePopupIcon={forcePopupIcon}
            style={{
                width,
                height: desktop ? '44px' : '40px',
                boxSizing: 'border-box',
                borderRadius: '100px',
                border: '2px solid #42929d',
                background: '#f2f9ff',
            }}
            openOnFocus={false}
            open={open}
            disabled={disabled}
            ListboxProps={{ style: { maxHeight, height: 'auto' } }}
            groupBy={(option) => option.type}
            renderGroup={(itemGroup) => {
                const { children, group } = itemGroup;
                if (group === 'landing') {
                    return (
                        <div className={styles.searchResultContainer}>
                            {/* hide on phase 3, this feature will be enable on hypercare */}
                            {/* <Button fullWidth onClick={setOpenSearchByImage}>
                                <CameraAltIcon style={{ fill: '#f58732' }} />
                                <Typography variant="span">{t('common:search:searchByCamera')}</Typography>
                            </Button> */}

                            <Typography variant="span" type="bold" size="16">
                                {t('common:search:productCategory')}
                            </Typography>
                            <div className={open ? styles.optionDropdown : null}>{children}</div>
                        </div>
                    );
                }
                return <div>{children}</div>;
            }}
            renderOption={(option) => <OptionsItem {...option} />}
            renderInput={(params) => (
                <TextField
                    id="standard-basic"
                    placeholder={placeholder || t('common:title:search')}
                    margin="normal"
                    variant="standard"
                    onFocus={() => {
                        if (!search) {
                            setOpen(true);
                        }
                    }}
                    {...params}
                />
            )}
            onInputChange={startAutocomplete}
            onBlur={startAutocomplete}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    setOpen(false);
                    handleSearch(event);
                }
            }}
            onChange={(e, value) => {
                if (value) {
                    const sharedProp = {
                        name: value?.name || '',
                        small_image: value?.small_image || {},
                        price: value?.price_range
                            ? { priceRange: value.price_range, priceTiers: value.price_tiers, priceTiersCustom: value.tier_prices_custom || [] } : {},
                    };

                    Router.push(
                        {
                            pathname: '/[...slug]',
                            query: {
                                productProps: JSON.stringify(sharedProp),
                            },
                        },
                        `/${value.url_key || value.url_path}`,
                    );
                }
            }}
            {...others}
        />
    );
}
