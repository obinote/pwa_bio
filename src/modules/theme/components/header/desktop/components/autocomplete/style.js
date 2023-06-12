import { makeStyles } from '@material-ui/core/styles';
import { CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    listContainer: {
        paddingTop: 10,
        width: '100%',
    },
    firstListContainer: {
        height: 'auto',
    },
    topTitle: {
        display: 'block',
        width: '100%',
        height: '20px',
        paddingLeft: '13px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '8px',
    },
    imageContainer: {
        float: 'left',
        marginRight: 20,
    },
    img: {
        width: '50px',
        height: 'auto',
    },
    title: {
        paddingBottom: 5,
        textTransform: 'capitalize',
        fontSize: 14,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContainerCategory: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
        [theme.breakpoints.up('sm')]: {
            padding: '5px 0',
        },
        '& .icon-Kosmetik, .icon-Cosmetic': {
            '&:before': {
                content: 'url(/assets/img/category-cosmetic.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
        '& .icon-Alat.Kesehatan, .icon-Medical.Device': {
            '&:before': {
                content: 'url(/assets/img/category-device.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
        '& .icon-Obat, .icon-Medicine': {
            '&:before': {
                content: 'url(/assets/img/category-medicine.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
        '& .icon-Herbal': {
            '&:before': {
                content: 'url(/assets/img/category-herbal.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
        '& .icon-Vaksin, .icon-Vaccine': {
            '&:before': {
                content: 'url(/assets/img/category-vaccine.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
        '& .icon-OTC': {
            '&:before': {
                content: 'url(/assets/img/category-otc.svg)',
                transform: 'scale(0.8)',
            },
            [theme.breakpoints.down('sm')]: {
                '&:before': {
                    transform: 'scale(0.6)',
                    width: 50,
                },
            },
        },
    },
    topTitleCategory: {
        paddingLeft: 0,
    },
    breadcrumbs: {
        paddingBottom: 5,
        textTransform: 'uppercase',
        color: '#929292',
        fontSize: 10,
        fontStyle: 'italic',
    },
    titleCategory: {
        textTransform: 'capitalize',
        fontSize: '14px',
        display: 'flex',
        // gap: '10px',
        alignItems: 'center',
        '& > span': {
            lineHeight: 'normal',
            textAlign: 'left',
            fontWeight: 'normal',
        },
    },
    titleCategoryExpanded: {
        textTransform: 'capitalize',
        fontSize: '14px',
        display: 'flex',
        // gap: 10,
        // flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'center',
        '& > span': {
            textAlign: 'left',
            lineHeight: 'normal',
            fontWeight: 'normal',
        },
    },
    productSearchWrapper: {
        display: 'flex',
        alignItems: 'center',
        '& .product-content': {
            display: 'block',
            overflow: 'hidden',
        },
    },
    searchResultContainer: {
        ...CreatePadding(20, 20, 20, 20),
        [theme.breakpoints.down('sm')]: {
            ...CreatePadding(0, 20, 0, 20),
            '& .MuiAutocomplete-option': {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
        '& .MuiButtonBase-root': {
            borderRadius: 8,
            backgroundColor: '#F2F9FF',
            marginBottom: 20,
        },
    },
    optionDropdown: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '100%',
        },
        '& > li': {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

export default useStyles;
