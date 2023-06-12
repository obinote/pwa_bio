import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, PRIMARY, WHITE, GRAY_SECONDARY, BLUE, ORANGE,
} from '@theme_color';
import {
    CenterAbsolute, CreateBorder, CreateMargin, CreatePadding, FlexColumn, FlexRow, Centering,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
        width: '100%',
        height: '100%',
        maxWidth: '1280px',
        [theme.breakpoints.down('sm')]: {
            ...FlexColumn,
        },
        position: 'relative',
        '& .customizable-container': {
            marginTop: 20,
        },
        '& .product-video': {
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            '& iframe': {
                height: 'auto',
                padding: 'auto 0',
            },
            [theme.breakpoints.up('sm')]: {
                '& iframe': {
                    height: '572px',
                },
            },
        },
        '& *': {
            letterSpacing: 0,
        },
    },
    headContainer: {
        position: 'relative',
        backgroundColor: WHITE,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: 55,
        },
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
    },

    body: {
        ...CreatePadding(15, 20, 0, 20),
        ...FlexColumn,
        // ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),

        [theme.breakpoints.down('sm')]: {
            borderBottom: 'none',
        },
    },

    footer: {
        display: 'grid',
        gridAutoFlow: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        background: WHITE,
        boxShadow: '0px 0px 6px #00000040',
        // opacity : 0.7,
        ...CreatePadding(10, 20, 10, 20),
        zIndex: theme.zIndex.drawer + 1,
        '& > div': {
            margin: 0,
        },
        '& .row': {
            justifyContent: 'space-around',
            gap: 10,
            '& div': {
                margin: 0,
            },
            '& > div': {
                flexBasis: 'auto',
                padding: 0,

                '&:first-child': {
                    width: 130,
                },
                '&:nth-child(2)': {
                    width: 'calc(100% - 140px)',
                },
            },
        },
    },

    title: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 40,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            margin: '5px 0 !important',
        },
        color: '#414048',
    },

    vendorIcon: {
        fill: '#42929D',
        fontSize: 12,
        marginRight: 4,
        [theme.breakpoints.up('sm')]: {
            fontSize: 18,
            marginRight: 8,
            marginTop: 4,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 10,
            marginTop: 1,
        },
    },

    vendorName: {
        fontSize: 22,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
        marginLeft: '2px',
        color: '#414048',
    },

    btnAddToCard: {
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
        backgroundColor: '#F58732',
        '&:hover': {
            backgroundColor: '#E67E22',
            boxShadow: 'none',
        },
    },
    btnChatFooter: {
        backgroundColor: WHITE,
        color: '#414048',
        fontSize: 12,
        textTransform: 'none',
        padding: 0,
        '&::before': {
            color: '#f58732',
            fontSize: 22,
        },
        '&:hover': {
            backgroundColor: WHITE,
            color: '#414048',
            boxShadow: 'none',
        },
    },

    textBtnAddToCard: {
        fontSize: 16,
        color: `${WHITE} !important`,
    },

    titleContainer: {
        ...FlexRow,
        alignItems: 'flex-start',
        // justifyContent: 'space-between',
    },

    titlePriceContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        flex: 1,
        fontSize: 20,
        '& *': {
            textTransform: 'unset',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
            '& .special-price-wrapper': {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 5,
            },
        },
    },

    shareContainer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        flex: 1,
        '& > div': {
            textAlign: 'right !important',
        },
        [theme.breakpoints.down('sm')]: {
            '& button span': {
                fontSize: 9,
            },
        },
    },

    defaultContainer: {
        ...CreateMargin(8, 0, 8, 0),
    },

    shareRootContainer: {
        ...CreatePadding(15, 30, 30, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40,
        },
    },

    btnShare: {
        margin: '0px !important',
    },

    iconShare: {
        color: PRIMARY,
        fontSize: 25,
        ...CreateMargin(0, 0, 0, 0),
    },

    carouselContainer: {
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 70,
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    carouselTitle: {
        marginBottom: '20px',
    },
    desc: {
        ...CreateMargin(14, 0, 14, 0),
        // textAlign: 'center',
    },
    ratingContainer: {
        ...FlexRow,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 16,
        },
    },
    priceSection: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    priceTiersContainer: {
        ...FlexColumn,
        borderLeft: '1px solid #e7f3ff',
        margin: 0,
        padding: '10px 20px',
        minWidth: '50%',

        [theme.breakpoints.down('sm')]: {
            borderLeft: 0,
            padding: '10px 0',
        },

        '& > *': {
            flex: '0 0 100%',
            margin: '0 0 2px 0',
            fontSize: 12,
            fontWeight: '400',
            letterSpacing: 0,
        },
    },
    btnLoadReview: {
        ...Centering,
        textAlign: 'center',
    },
    textLoadReview: {
        color: `${GRAY_SECONDARY} !important`,
    },
    sku: {
        alignItems: 'center',
        marginLeft: '0 !important',
    },
    tabs: {
        paddingTop: '40px',

        [theme.breakpoints.down('sm')]: {
            paddingTop: '140px',
        },
    },
    shareTitle: {
        marginTop: 20,
        fontSize: 12,
    },
    bannerProduct: {
        width: '99%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            height: '572px',
        },
    },
    bannerLiteTop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    bannerLiteTopMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    bannerLiteLabel: {
        ...CreatePadding(10, 0, 10, 0),
    },
    bannerLiteAfter: {
        ...CreatePadding(10, 0, 10, 0),
    },
    shareIcon: {
        width: '100%',
    },
    rowItem: {
        ...FlexRow,
        justifyContent: 'space-around',
        width: '350px',
    },
    btnCompare: {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        width: '120px',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            background: WHITE,
        },
    },
    stock: {
        marginLeft: '0px',
    },
    detailRow: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    detailRowCol: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
    },
    detailTable: {
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            '& tr td:first-child': {
                minWidth: 80,
                paddingRight: 10,
            },
        },
    },
    detailTableRowData: {
        color: '#7B9AAF',
        verticalAlign: 'baseline',
    },
    detailSecondCol: {
        paddingLeft: '15px',
    },
    divider: {
        display: 'block',
        width: '100%',
        ...CreateMargin(10, 0, 10, 0),
        borderBottom: '0.5px solid #9C9C9C',
    },
    iconMoon: {
        '&::before': {
            color: '#f58732',
            fontSize: 17,
            marginRight: 10,
        },
    },
    iconChat: {
        '&::before': {
            color: '#f58732',
            fontSize: 20,
            marginRight: 7,
        },
    },
    actionMobile: {
        ...FlexColumn,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    actionIcon: {
        fill: '#f58732',
        marginRight: 8,
    },
    btnAction: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'none',
        ...CreatePadding(5, 0, 5, 0),
        cursor: 'pointer',
    },
    btnActionText: {
        color: '#414048',
        fontSize: 16,
    },
    privateEvent: {
        marginBottom: 20,
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
        },
        '& .label': {
            borderRadius: '8px 0 0 8px',
            backgroundColor: BLUE,
            display: 'flex',
            alignItems: 'center',
            padding: '5px 15px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                borderRadius: '8px 8px 0 0',
                padding: '10px 15px',
                justifyContent: 'center',
            },
            '& .icon': {
                lineHeight: '0',
                width: 30,
                marginRight: 6,
                '& img': {
                    width: '100%',
                },
            },
            '& .caption': {
                color: '#FFFFFF',
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 'normal',
                [theme.breakpoints.down('xs')]: {
                    fontSize: 20,
                },
            },
        },
        '& .wrapper-timer': {
            padding: '10px 5px',
            borderRadius: '0 8px 8px 0',
            backgroundColor: ORANGE,
            minWidth: 150,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                borderRadius: '0 0 8px 8px',
            },
            '& .end-in': {
                fontWeight: 'normal',
                fontSize: 10,
                textAlign: 'center',
                color: '#FFFFFF',
                marginBottom: 0,
                textTransform: 'capitalize',
            },
            '& .timer': {
                display: 'flex',
                justifyContent: 'center',
                color: '#FFFFFF',
                '& .clock': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& > .dots': {
                        display: 'inline-block',
                        fontWeight: '700',
                        fontSize: 18,
                    },
                    '& > section': {
                        textAlign: 'center',
                        padding: '0 3px',
                        '& p': {
                            fontSize: 18,
                            fontWeight: 'bold',
                        },
                        '& small': {
                            display: 'none',
                        },
                    },
                },
                '& .expired + .clock': {
                    display: 'none',
                },
                '& .expired': {
                    fontSize: 18,
                    fontWeight: '700',
                },
            },
        },
        '& .wrapper-upcoming': {
            padding: '10px 5px',
            borderRadius: '0 8px 8px 0',
            backgroundColor: ORANGE,
            minWidth: 150,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                borderRadius: '0 0 8px 8px',
            },
            '& .coming-soon': {
                fontWeight: 'normal',
                fontSize: 12,
                textAlign: 'center',
                color: '#FFFFFF',
                marginBottom: 0,
                textTransform: 'capitalize',
            },
            '& .items-date': {
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                display: 'flex',
                textAlign: 'center',
                color: '#FFFFFF',
                '& .item-date': {
                    width: 'calc(50% - 10px)',
                    '& .date': {
                        fontSize: 16,
                        fontWeight: '700',
                        [theme.breakpoints.down('xs')]: {
                            fontSize: 14,
                        },
                    },
                    '& .time': {
                        fontSize: 12,
                        fontWeight: '600',
                    },
                },
                '& .until': {
                    fontSize: 16,
                    width: 20,
                    textAlign: 'center',
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 14,
                    },
                },
            },
        },
    },
    breadcrumbStyle: {
        marginBottom: 10,
        '& p': {
            margin: 0,
        },
    },
    mobilePrice: {
        display: 'flex',
        width: '100%',
        gap: 15,
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    mobileActionBlock: {
        '& div': {
            flexDirection: 'column',
            marginBottom: 20,
            gap: 6,
            '& i::before': {
                fontSize: 22,
                minWidth: 30,
                display: 'inline-block',
            },
            '& span': {
                color: '#7B9AAF',
            },
        },
    },
    shippingEta: {
        [theme.breakpoints.down('xs')]: {
            borderTop: '1px solid #9C9C9C',
            marginTop: 20,
            paddingTop: 15,
        },
    },
}));

export default useStyles;
