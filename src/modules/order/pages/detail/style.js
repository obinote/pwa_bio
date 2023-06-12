import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE, WHITE } from '@theme_color';
import {
    CreatePadding, FlexColumn, FlexRow, CreateMargin, Centering,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    orderDetail: {
        '& *': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },
    },
    tableContainer: {
        marginBottom: '20px',
        border: 0,
        boxShadow: 'none',
        padding: '0 5px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 10,
            paddingBottom: 10,
            '& table': {
                display: 'block',
                '& thead': {
                    display: 'none',
                },
                '& tbody': {
                    display: 'block',
                },
                '& tr': {
                    display: 'flex',
                    flexDirection: 'column',
                    '& td:first-child': {
                        border: 0,
                        paddingBottom: 0,
                        '& span': {
                            color: '#7B9AAF',
                            fontWeight: '600',
                        },
                    },
                    '& td:last-child': {
                        paddingTop: 0,
                    },
                    '& span': {
                        margin: 0,
                    },
                },
            },
        },
    },
    tableRowHead: {
        '& span': {
            fontWeight: '600',
            color: '#414048',
        },
        '& th': {
            paddingTop: 10,
            paddingBottom: 10,
            '&:first-child': {
                width: 200,
            },
        },
    },
    tableRowResponsive: {
        '& td': {
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
    headerOrder: {
        ...FlexColumn,
        flexDirection: 'row',
    },
    block: {
        // ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...FlexColumn,
        '&.subtotal': {
            background: '#f2f9ff',
            padding: 15,
            [theme.breakpoints.down('xs')]: {
                borderRadius: '0 0 5px 5px',
            },
        },
        '& hidden-desktop': {
            [theme.breakpoints.down('xs')]: {
                display: 'none !important',
            },
        },
    },
    blockHeader: {
        ...FlexColumn,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        },
    },
    orderComment: {
        background: '#F2F9FF',
        padding: 20,
        marginBottom: 20,
        borderRadius: 8,
        border: '1px solid #d5eafb',
    },
    headerTitle: {
        textTransform: 'capitalize',
        fontSize: 30,
        fontWeight: 700,
        margin: '0 25px 20px 0 !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
            marginBottom: '10px !important',
            width: '100%',
        },
    },
    headerStatus: {
        textTransform: 'uppercase',
        margin: 0,
        border: '1px solid #42929d',
        borderRadius: 5,
        color: '#42929d',
        padding: '0 12px',
        fontWeight: 800,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        fontSize: 13,
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            display: 'inline-flex',
            marginBottom: 20,
        },
    },
    containerHeaderStatus: {
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
            '& > div ': {
                width: '100%',
                maxWidth: '100%',
                flexBasis: '100%',
            },
        },
    },
    blockHeaderStatus: {
        marginBottom: 5,
        '& p': {
            margin: 0,
        },
        '& label': {
            display: 'inline-block',
            minWidth: 200,
            fontWeight: '500',
            '&:after': {
                content: '":"',
                display: 'inline-block',
                float: 'right',
                marginRight: 10,
            },
        },
        '& span': {
            textTransform: 'capitalize',
            '&:first-child': {
                minWidth: 160,
                fontWeight: '600',
            },
        },
        '& .status-payment-wrapper': {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap',
                '& > div': {
                    marginTop: 5,
                    '& > div': {
                        textAlign: 'left',
                    },
                },
            },
            '& > div': {
                width: '100px',
                marginLeft: '10px',
                [theme.breakpoints.down('md')]: {
                    marginLeft: '160px',
                    width: '100%',
                },
            },
            '& .info-status': {
                color: '#42929d',
                fontWeight: 'bold',
                borderRadius: '5px',
            },
        },
    },
    blockHeaderRefund: {
        borderTop: '1px solid #d5eafb',
        padding: '20px 0',
        marginBottom: 10,
        '& p': {
            margin: 0,
        },
        '& label': {
            display: 'inline-block',
            minWidth: 200,
            fontWeight: '500',
            '&:after': {
                content: '":"',
                display: 'inline-block',
                float: 'right',
                marginRight: 10,
            },
        },
        '& span': {
            textTransform: 'capitalize',
        },
    },
    detail: {
        paddingTop: 0,
        alignItems: 'center',
        textAlign: 'center',
    },
    labelInfoStatus: {
        margin: 0,
    },
    labelDetail: {
        ...CreateMargin(10, 0, 5, 0),
        fontWeight: '600',
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    labelDetailSm: {
        ...CreateMargin(10, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },

    itemContainer: {
        ...FlexRow,
        ...CreateMargin(10, 0, 20, 0),
    },

    productImgContainer: {
        width: 105,
        [theme.breakpoints.down('xs')]: {
            width: 90,
        },
    },

    productImg: {
        width: 105,
        height: 'auto',
    },

    detailItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 90px)',
        },
    },
    textDetail: {
        ...CreateMargin(5, 0, 0, 0),
        padding: 0,
    },
    listSummary: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .promo-item': {
            textAlign: 'left',
        },
    },
    labelSummaryDiscountDetail: {
        paddingLeft: 10,
    },
    labelSummaryTax: {
        flex: 1,
    },
    iconWrapper: {
        ...Centering,
        display: 'inline-block',
    },
    blockLabel: {
        fontSize: 18,
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    footer: {
        ...FlexColumn,
        '&> *': {
            margin: '15px auto',
        },
    },
    blockIcon: {
        ...Centering,
        background: '#f2f9ff',
        borderRadius: 8,
    },
    blockCompleteOrder: {
        ...FlexRow,
        justifyContent: 'space-between',
        background: '#f2f9ff',
        padding: '20px 30px',
        borderTop: '1px solid #D5EAFB',
        alignItems: 'center',
        '& p': {
            fontSize: 18,
            margin: 0,
            fontWeight: '500',
            lineHeight: '1.3',
        },
        '& .MuiRating-root svg': {
            width: 25,
            height: 25,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
            flexDirection: 'column',
            gap: 10,
        },
    },
    completeButton: {
        backgroundColor: '#f58732',
        padding: '0 10px',
        height: '40px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        outline: 'none',
        '& span': {
            color: '#ffffff',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    wrapperButton: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '25px 0',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            gap: 20,
        },
        '& #label-reorder, & #label-return, & #label-back': {
            color: '#f58732',
        },
        '& #label-chat': {
            color: '#f58732',
            lineHeight: 0,
            '&:before': {
                content: 'url(/assets/img/icon-chat.svg)',
                color: '#7b9aaf',
                marginRight: 6,
                verticalAlign: 'sub',
            },
        },
        '& #btn-print': {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            outline: 'none',
        },
        '& #label-print': {
            color: '#f58732',
            lineHeight: 0,
            '&:before': {
                content: 'url(/assets/img/icon-print.svg)',
                color: '#7b9aaf',
                marginRight: 6,
                verticalAlign: 'sub',
            },
        },
        '& > div': {
            '&:first-child': {
                '& button': {
                    '&:not(:last-child)': {
                        marginRight: 20,
                    },
                },
            },
            '&:last-child': {
                '& button': {
                    '&:not(:last-child)': {
                        marginRight: 20,
                    },
                },
            },
        },
        '& button': {
            textAlign: 'left',
            lineHeight: 'normal',
            [theme.breakpoints.down('sm')]: {
                marginBottom: 15,
            },
            '& span': {
                margin: 0,
                lineHeight: 'normal',
            },
        },
    },
    reorderButton: {
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
    },
    txtPayNow: {
        marginTop: '10px',
    },
    btnPayNow: {
        backgroundColor: '#f58732',
        width: '130px',
        padding: 0,
        '& span': {
            textAlign: 'center',
        },
    },
    btnTrackOrder: {
        padding: 0,
        marginLeft: -4,
    },
    orderDetailItem: {
        margin: '20px 0',
    },
    orderTab: {
        '& .MuiTabs-indicator': {
            backgroundColor: 'unset',
        },
        '& .order-tab-title': {
            background: '#f2f9ff',
            color: '#7b9aaf',
            border: '1px solid #d5eafb',
            minHeight: 40,
            textTransform: 'capitalize',
            fontWeight: 400,
            borderRadius: '5px 5px 0 0',
        },
        '& .Mui-selected': {
            background: '#fff',
            borderBottom: 'none',
            '& span': {
                fontWeight: '600',
                color: '#414048',
            },
        },
    },
    orderContent: {
        border: '1px solid #d5eafb',
        borderRadius: '0 5px 5px 5px',
        marginTop: -9,
        padding: '30px !important',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 0 0 !important',
            '& .MuiBox-root > div:first-child': {
                padding: '0 20px',
            },
        },
    },
    wrapperInvoiceHeader: {
        ...FlexRow,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    wrapperRefundHeader: {
        ...FlexRow,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        '& span': {
            color: '#f58732',
        },
    },
    invoiceTitle: {
        fontSize: '20px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    invoiceSubTitle: {
        fontSize: '16px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    shipmentDetail: {
        margin: '15px 0',
    },
    blockRating: {
        '& .rating-result': {
            marginTop: '10px',
            background: '#f2f9ff',
            borderRadius: '8px',
            padding: '20px',
        },
        '& .btn-edit-review': {
            fontSize: '12px',
            textTransform: 'capitalize',
            background: 'none',
            color: '#f58732',
        },
        '& > p': {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 5,
        },
        '& .MuiRating-iconEmpty': {
            color: '#d5eafb',
        },
        '& .label-rating': {
            fontWeight: 'bold',
            margin: '8px 0',
        },
        '& .rating-info': {
            display: 'flex',
            justifyContent: 'space-between',
            '& .rating-date': {
                color: '#7B9AAF',
                fontSize: '13px',
            },
        },
        '& .rating-file': {
            '& a': {
                display: 'block',
                color: '#f58732',
            },
        },
        '& .reply-control-container': {
            '& .divider': {
                width: '100%',
                color: '#7B9AAF',
                marginBottom: 10,
            },
            '& .show-hide-container': {
                ...FlexRow,
                alignItems: 'center',
                cursor: 'pointer',
                '& .show-hide-label': {
                    fontSize: 13,
                    textTransform: 'capitalize',
                },
                '& .show-hide-icon': {
                    fontSize: 18,
                },
            },
        },
    },
    blockRatingDetail: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        '& .Mui-disabled': {
            opacity: '1',
        },
    },
    blockRatingImage: {
        borderRadius: 8,
        width: 50,
        height: 50,
        objectFit: 'cover',
    },
    ratingExpiryDate: {
        fontSize: 12,
        color: '#7B9AAF',
    },
    grandTotal: {
        '& *': {
            fontWeight: '600',
            fontSize: 18,
        },
    },
    starReview: {
        fontSize: '30px !important',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px !important',
        },
    },
    orderInformation: {
        '& *': {
            textAlign: 'left',
        },
        '& > div': {
            gap: 10,
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 20,
        },
    },
    actionInvoice: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        '& span': {
            margin: 0,
        },
        [theme.breakpoints.down('xs')]: {
            margin: '10px 0',
        },
    },
    dividerTotal: {
        border: '1px solid #D5EAFB',
        margin: '10px -16px',
    },
    dueDateContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            justifyContent: 'center',
        },
    },
    dueDateWrapper: {
        marginLeft: 10,
        padding: '7px 13px 7px 7px',
        border: '1px solid #FA2E2C',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dueDateImg: {
        marginRight: 5,
    },
    dueDateLabel: {
        fontStyle: 'italic',
        color: '#FA2E2C',
    },
    replyContainer: {
        margin: '12px 0',
        '& .header': {
            ...FlexRow,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            '& .seller-container': {
                ...FlexRow,
                alignItems: 'center',
                gap: '6px',
                '& .seller-name': {
                    fontWeight: 'bold',
                    fontSize: 14,
                },
                '& .seller-chip': {
                    background: BLUE,
                    color: WHITE,
                    padding: '3px 5px',
                    fontSize: 11,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                },
            },
            '& .date': {
                // color: '#B8CAD7',
                color: '#7B9AAF',
                textAlign: 'right',
                fontSize: '13px',
            },
        },
    },
}));
