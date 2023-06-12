import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY, ORANGE } from '@theme_color';
import { FlexRow, CreatePadding } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    filterAccordion: {
        background: 'red',
        '& .heading': {
            marginBottom: 14,
        },
        '& .filter-container': {
            // marginTop: 37,
            borderRadius: 12,
            boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 15%)',
            padding: '28px 20px',
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
        ...CreatePadding(0, 0, 20, 0),
        '& .grid': {
            ...CreatePadding(4, 4, 4, 4),
            '& .grid-item': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
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
        wdith: '100%',
        display: 'flex',
        marginTop: 24,
    },
    productListContainer: {
        width: '80%',
        paddingLeft: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: 0,
        },
    },

    paginationContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    buttonFilter: {
        background: ORANGE,
        display: 'none',
        '&:hover': {
            background: ORANGE,
        },
    },
}));

export default useStyles;
