import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow, Centering } from '@theme_mixins';
import {
    GREEN, WHITE, BLUE_GRAY, BLUE_SECONDARY, BLUE_PRIMARY,
} from '@theme_color';

export default makeStyles((theme) => ({
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    displayFlexRow: {
        ...FlexRow,
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    mainContainer: {
        maxWidth: '70%',
    },
    cartvendor: {
        marginBottom: 57,
    },
    tableContainer: {
        marginTop: 15,
        boxShadow: 'none',
        width: '100%',
        '& .product-options': {
            paddingLeft: 5,
            fontSize: 12,
            marginTop: 10,
            '& .option-wrapper__item': {
                marginLeft: 0,
            },
            '& .option-item': {
                margin: 0,
                marginLeft: 5,
            },
        },
        '& .option-link': {
            marginLeft: 0,
        },
    },
    table: {
        width: '100%',
        '& *': {
            fontWeight: '400',
            letterSpacing: 0,
        },
    },
    tableRowHead: {
        '& th': {
            height: 50,
        },
        '& th:first-child': {
            paddingLeft: 20,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 10,
            },
        },
    },
    titleDistributor: {
        fontSize: 25,
        fontWeight: '600',
        letterSpacing: 0,
        color: '#414048',
        marginBottom: 13,
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            lineHeight: 'normal',
        },
        '& .icon': {
            marginRight: 10,
            fontSize: 25,
            fontWeight: 'normal',
        },
    },
    tableRowDistributor: {
        '& .outer-distributor-category': {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '& .distributor': {
                fontSize: 18,
                textTransform: 'capitalize',
                letterSpacing: 0,
                color: '#414048',
                [theme.breakpoints.down('sm')]: {
                    lineHeight: 'normal',
                },
                '& .icon': {
                    marginRight: 10,
                    fontSize: 14,
                    fontWeight: 'normal',
                },
            },
            '& .category': {
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0,
                color: '#414048',
                textTransform: 'capitalize',
            },
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('md')]: {
            // display: 'grid !important',
            padding: 10,
        },
    },
    itemRow: {
        borderBottom: '1px solid #E8EDF1',
        verticalAlign: 'top',
        '& td': {
            paddingTop: 20,
            paddingBottom: 20,
        },
        '& td:first-child': {
            paddingLeft: 20,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('md')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    qtyTable: {
        maxWidth: 60,
        '& input': {
            width: 40,
            height: 30,
            textAlign: 'center',
            fontSize: 14,
            padding: '0 5px',
        },
        '& input, fieldset': {
            borderColor: '#D5EAFB',
            borderRadius: 0,
        },
        '& span': {
            textAlign: 'center',
        },
    },
    vendor: {
        background: ' #f2f9ff',
        color: BLUE_SECONDARY,
        height: 35,
    },
    vendorLabel: {
        padding: '8px 15px',
        fontWeight: 700,
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '50%',
        minWidth: '150px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
        '&::after': {
            content: "':'",
            display: 'block',
            position: 'absolute',
            right: '8px',
            top: 0,
        },
    },
    value: {
        [theme.breakpoints.down('md')]: {
            width: '50%',
        },
    },
    productImgContainer: {
        width: 58,
        height: 58,
        position: 'relative',
        '& span': {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            minWidth: 20,
            minHeight: 15,
            backgroundColor: GREEN,
            color: WHITE,
            fontWeight: '700',
            fontSize: 10,
            padding: 5,
            borderRadius: 5,
            ...Centering,
            marginLeft: 'auto',
            marginRight: 5,
            textTransform: 'uppercase',
        },
    },
    imgCell: {
        width: 58,
    },
    productImg: {
        // width: 'auto',
        // height: 'auto',
        maxHeight: 58,
        backgroundColor: WHITE,
    },
    right: {
        textAlign: 'right',
    },
    summary: {
        paddingTop: 30,
    },
    noBorder: {
        borderBottom: 'none',
    },
    iconBtn: {
        color: BLUE_GRAY,
        width: 30,
        height: 30,
    },
    rowMobile: {
        margin: 0,
        paddingLeft: 15,
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
            textAlign: 'center',
            border: `1px solid ${BLUE_PRIMARY}`,
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&.product-info': {
            marginTop: '-10px',
            paddingLeft: 78,
            '& .item-split': {
                [theme.breakpoints.down('xs')]: {
                    width: 'calc(100% / 2)',
                    '&.item-qty': {
                        '& >span': {
                            textAlign: 'left',
                        },
                    },
                    '&.item-subtotal': {
                        width: '100%',
                        '& >span': {
                            textAlign: 'left',
                        },
                    },
                    '&.item-actions': {
                        marginTop: 10,
                        width: '100%',
                        textAlign: 'left',
                    },
                },
                '& span:first-child': {
                    [theme.breakpoints.down('sm')]: {
                        textTransform: 'capitalize',
                        color: BLUE_GRAY,
                    },
                },
                '& span:nth-of-type(2)': {
                    [theme.breakpoints.down('sm')]: {
                        marginTop: 0,
                    },
                },
            },
        },
    },
    nameProduct: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        marginTop: 5,
        width: '70%',
    },
    itemSplit: {
        width: 'calc(100%/3)',
        display: 'flex',
        flexDirection: 'column',
    },
    itemFull: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 78,
            '& > span': {
                '&:first-child': {
                    color: BLUE_GRAY,
                    textTransform: 'capitalize',
                },
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& > span': {
                textAlign: 'left',
                '&:nth-of-type(2)': {
                    marginTop: 0,
                },
            },
        },
    },
    textfieldMobileWrapper: {
        width: 75,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0',
            marginRight: '0',
        },
    },
    labelItem: {
        textTransform: 'capitalize',
        display: 'block',
        textAlign: 'right',
        fontSize: 12,
        color: '#7B9AAF',
        marginBottom: 5,
        whiteSpace: 'nowrap',
    },
    labelStock: {
        textTransform: 'capitalize',
        display: 'block',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#e74c3c',
        whiteSpace: 'nowrap',
    },
    itemWrapper: {
        marginBottom: 20,
        border: '1px solid #E8EDF1',
        borderRadius: 8,
        '& #desktopSummary': {
            borderRadius: '0 0 8px 8px',
        },
        '&.disabled-submit-quote': {
            '& input': {
                pointerEvents: 'none',
            },
            '& .MuiTextField-root': {
                position: 'relative',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: '-2px',
                    top: '-2px',
                    width: 'calc(100% + 4px)',
                    height: 'calc(100% + 4px)',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    cursor: 'not-allowed',
                },
            },
            '& .wrapper-action': {
                position: 'relative',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: '-2px',
                    top: '-2px',
                    width: 'calc(100% + 4px)',
                    height: 'calc(100% + 4px)',
                },
                '& .MuiButtonBase-root': {
                    opacity: 0.4,
                },
            },
        },
    },
    summaryDetail: {
        display: 'none !important',
    },
    middleValue: {
        minHeight: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 14,
    },
}));
