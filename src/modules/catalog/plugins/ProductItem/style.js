/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, Centering, CreateMargin, ClearMarginPadding, FlexRow, CenterAbsolute,
} from '@theme_mixins';
import {
    BLUE_GRAY, GRAY_PRIMARY, GRAY_THIRD, PRIMARY, WHITE,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {},
    itemContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...CreatePadding(4, 2, 4, 2),
    },
    itemInnerContainer: {
        borderRadius: 8,
        boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 15%)',
        width: '100%',
        height: '100%',
        position: 'relative',
        '& .MuiSkeleton-rect': {
            paddingBottom: '120%',
        },
        '& a': {
            cursor: 'pointer',
            [theme.breakpoints.down('sm')]: {
                display: 'contents',
            },
        },
        '& .old-price': {
            fontSize: '12px !important',
            fontWeight: '400 !important',
            color: `${BLUE_GRAY} !important`,
            lineHeight: 'normal',
            [theme.breakpoints.down('sm')]: {
                fontSize: '10px !important',
            },
        },
        '& .final-price': {
            fontSize: 14,
            lineHeight: 'normal',
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '& *': {
            letterSpacing: 0,
        },
        '& .special-price-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 5,
        },
    },
    quickView: {
        '& .btn-quick-view-list': {
            clear: 'both',
            background: 'transparent',
            border: 'none',
            fontWeight: 'bold',
            color: GRAY_THIRD,
            cursor: 'pointer',
            outline: 'none',
            display: 'block',
            marginTop: 15,
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
                // boxShadow: '0px 3px 3px 1px rgba(0,0,0,0.15)',
            },
        },
    },
    listContainer: {
        width: 'calc(100% - 20px)',
        // display: 'flex',
        height: '100%',
        overflow: 'hidden',
        ...CreatePadding(10, 10, 0, 10),
        ...CreateMargin(0, 10, 15, 10),
        position: 'relative',
        '& .MuiSkeleton-rect': {
            paddingBottom: '120%',
        },
        '& a': {
            cursor: 'pointer',
        },
    },
    badgesNewSales: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 5,
        borderRadius: 5,
        zIndex: 1,
        ...FlexRow,
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
    },
    badgesNewSalesList: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 5,
        zIndex: 1,
        ...FlexRow,
        justifyContent: 'space-between',
        padding: 15,
    },
    imgItem: {
        width: '100%',
        ...Centering,
        position: 'relative',
        borderRadius: '8px 8px 0 0',
        '& *': {
            borderRadius: '8px 8px 0 0',
        },
        '& .btn-quick-view': {
            position: 'absolute',
            zIndex: 2,
            clear: 'both',
            background: 'rgba(0,0,0, 0.3)',
            borderRadius: 5,
            padding: 5,
            border: 'none',
            fontWeight: 'bold',
            color: WHITE,
            cursor: 'pointer',
            outline: 'none',
            display: 'none',
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
            },
        },
    },
    imgProduct: {
        width: '100%',
        paddingTop: '100%',
        background: 'red',
    },
    detailItem: {
        height: 'auto',
        position: 'relative',
        ...CreatePadding(14, 10, 13, 10),
        [theme.breakpoints.down('sm')]: {
            ...CreatePadding(10, 10, 10, 10),
        },
    },
    listImgItem: {
        position: 'relative',
        maxWidth: '100%',
        '& .btn-quick-view': {
            position: 'absolute',
            zIndex: 2,
            clear: 'both',
            background: 'rgba(0,0,0, 0.3)',
            borderRadius: 5,
            padding: 5,
            border: 'none',
            fontWeight: 'bold',
            color: WHITE,
            cursor: 'pointer',
            outline: 'none',
            display: 'none',
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            ...Centering,
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
            },
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'none !important',
        },
    },
    listDetailItem: {
        height: 'auto',
        position: 'relative',
        flex: 0.8,
    },
    descItem: {
        ...FlexColumn,
        maxWidht: '80%',
        position: 'relative',
        '& .price_text': {
            color: '#414048',
            fontSize: 14,
            fontWeight: 'bold',
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '& .req-login, .req-register': {
            fontSize: 12,
            '& a': {
                textDecoration: 'none',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 10,
            },
        },
    },
    productTitle: {
        ...CreateMargin(0, 0, 5, 0),
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 1.2,
        color: '#414048',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,

        },
    },
    vendor: {
        margin: '0 0 2px 0',
        fontSize: 12,
        fontWeight: '700',
        color: '#414048',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
        '& > span': {
            marginRight: 4,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    manufacture: {
        margin: 0,
        color: '#7B9AAF',
        fontSize: 12,
        fontWeight: '400',
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    nie: {
        margin: 0,
        color: '#7B9AAF',
        fontSize: 12,
        fontWeight: 'normal',
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },

    loginRegisterDescription: {
        margin: 0,
        color: '#414048',
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 10,
    },
    loginRegister: {
        color: '#F58732',
    },
    btnFeed: {
        ...ClearMarginPadding,
        width: 20,
        height: 20,
        position: 'absolute',
        top: '0px',
        right: 25,
        textAlign: 'right',
    },
    btnCompare: {
        ...ClearMarginPadding,
        width: 20,
        height: 20,
        position: 'absolute',
        top: '0px',
        right: 5,
        textAlign: 'right',
    },
    productLinkButton: {
        maxWidth: 'calc(100% - 34px)',
    },
    iconFeed: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
    },
    iconCompare: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
    },
    iconActive: {
        color: PRIMARY,
    },
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
    feedContainer: {
        position: 'absolute',
        width: '20px',
        top: '-4px',
        right: '45px',
        textAlign: 'right',
    },
    btnAddToCart: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        bottom: 0,
    },
    itemConfigurable: {
        width: '20px !important',
        height: '20px !important',
        ...CreateMargin(5, 5, 5, 5),
    },
    customBtnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
            height: 35,
        },
        [theme.breakpoints.up('sm')]: {
            ...CreateMargin(5, 5, 5, 5),
            width: 316,
        },
        ...CreateMargin(10, 0, 0, 0),
        width: '100%',
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
        fontSize: 12,
    },
}));
