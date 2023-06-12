import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY, ORANGE, WHITE } from '@theme_color';
import { FlexRow, CreatePadding } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    leftSideFilter: {
        flexGrow: 1,
        paddingRight: 25,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingRight: 0,
        },
    },
    categoryFilterAndSort: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            gap: 15,
            width: '45%',
            justifyContent: 'space-between',
            '& #sort-mobile': {
                marginBottom: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 15,
            width: '100%',
        },
    },
    countProductText: {
        ...FONT_10,
        marginLeft: 20,
        paddingTop: 3,
    },
    btnFilter: {
        marginRight: -20,
        padding: 0,
    },
    iconFilter: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconGrid: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconList: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    leftWrapperFilter: {
        ...FlexRow,
        ...CreatePadding(2, 0, 2, 0),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 30, 0),
        '& .grid': {
            '& .grid-item': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 4,
            },
        },
    },
    btnLoadmore: {
        cursor: 'pointer',
        width: '100%',
        padding: '20px',
        fontSize: '12px',
        background: '#fff',
        border: 'none',
        color: '#B4B4B4',
    },
    countProductTextDesktop: {
        justifyContent: 'flex-start',
        fontSize: 12,
        marginTop: -25,
    },
    divLoadMore: {
        width: '100%',
        textAlign: 'center',
        padding: 20,
    },
    hideDivLoadMore: {
        width: '100%',
        textAlign: 'center',
        padding: 20,
        visibility: 'hidden',
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        marginTop: 24,
        [theme.breakpoints.down('sm')]: {
            marginTop: 16,
        },
    },
    productListContainer: {
        width: '80%',
        paddingLeft: 20,
        [theme.breakpoints.down('sm')]: {
            width: '70%',
            padding: 0,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    innerContainer: {
        paddingTop: 0,
        paddingRight: 14,
        width: '20%',
        [theme.breakpoints.down('sm')]: {
            width: '30%',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        '& .filter-skeleton': {
            marginTop: -25,
        },
        '& .title': {
            display: 'block',
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
    },
    paginationContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    buttonFilter: {
        color: ORANGE,
        textTransform: 'none',
        fontWeight: 400,
        marginTop: 24,
        border: `2px solid ${ORANGE}`,
        background: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            fontSize: 12,
            padding: '3px 10px',
            minWidth: 108,
        },
        '&:hover, &:active': {
            background: WHITE,
            color: ORANGE,
            textTransform: 'none',
            fontWeight: 400,
            marginTop: 24,
            border: `2px solid ${ORANGE}`,
            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
            },
        },
    },
    filterBtnContainer: {
        display: 'flex',
        width: '100%',
        padding: '0 8px',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
            padding: 0,
            marginBottom: 9,
        },
    },
}));

export default useStyles;
