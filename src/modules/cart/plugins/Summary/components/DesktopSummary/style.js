import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_LIGHT, GREEN, WHITE, BLUE_PRIMARY,
} from '@theme_color';
import {
    FlexColumn,
    Centering,
} from '@theme_mixins';

const useStyles = makeStyles(() => ({
    container: {
        background: GRAY_LIGHT,
        width: '100%',
        height: 'auto',
        padding: 20,
        ...FlexColumn,
        position: 'sticky',
        top: 100,
    },
    iconWrapper: {
        ...Centering,
        display: 'inline-block',
    },
    arrowIcon: {
        paddingTop: 5,
        fontSize: 16,
    },
    list: {
        padding: 0,
        margin: 0,
        '& p': {
            fontWeight: '400',
        },
        '& .point-text': {
            fontSize: '12px',
            lineHeight: '14px',
            margin: 0,
        },
        '& img': {
            width: '21px',
            height: '21px',
            objectFit: 'cover',
        },
        '&.listInfoPoint': {
            gap: '15px',
            alignItems: 'center',
            marginTop: '24px',
        },
        '& .point-list': {
            margin: 0,
        },
    },
    footer: {
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        '& > div': {
            textAlign: 'right',
        },
    },
    btnCheckout: {
        marginBottom: 10,
        backgroundColor: '#F58732',
        '&:hover': {
            backgroundColor: '#F58732',
        },
        '& span': {
            textTransform: 'none',
            fontWeight: '500',
            letterSpacing: 0,
            fontSize: 14,
            margin: 0,
        },
    },
    btnQuote: {
        marginBottom: 10,
        backgroundColor: '#06AEC9',
        '&:hover': {
            backgroundColor: '#06AEC9',
        },
        '& span': {
            textTransform: 'none',
            fontWeight: '500',
            letterSpacing: 0,
            fontSize: 14,
            margin: 0,
        },
    },
    paypalBtn: {
        minWidth: '90%',
    },
    labelItem: {
        maxWidth: '50%',
        marginTop: '1px',
        marginBottom: '1px',
    },
    expanItem: {
        background: 'transparent',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
    },

    listProduct: {
        padding: '20px 5px',
        position: 'relative',
        '& .delete': {
            position: 'absolute',
            top: 22,
            right: 0,
            fontSize: 15,
            cursor: 'pointer',
            width: 10,
            height: 10,
        },
    },
    productName: {
        margin: 0,
    },
    imgProduct: {
        width: 75,
        height: 'auto',
    },
    imgBox: {
        position: 'relative',
    },
    freeItem: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        minWidth: 15,
        minHeight: 10,
        backgroundColor: GREEN,
        color: WHITE,
        fontWeight: '700',
        fontSize: 8,
        padding: 2,
        borderRadius: 3,
        ...Centering,
        marginLeft: 'auto',
        marginRight: 5,
        textTransform: 'uppercase',
    },
    bodyProductItem: {
        ...FlexColumn,
        alignItems: 'end',
        '& .item-minus': {
            cursor: 'pointer',
            '&::after': {
                content: '"<"',
            },
        },
        '& .item-count': {
            padding: '0px 10px',
        },
        '& .item-plus': {
            cursor: 'pointer',
            '&::after': {
                content: '">"',
            },
        },
        '& .product-options': {
            margin: '5px',
            '& .option-wrapper': {
                fontSize: 10,
                '& .option-wrapper__item': {
                    paddingLeft: 10,
                },
                '& .option-item': {
                    margin: 0,
                    marginLeft: 5,
                },
            },
        },
    },
    size: {
        fontSize: '18px',
    },
    colorPrimary: {
        color: '#414048',
        marginTop: '10px',
    },
    noMargin: {
        margin: '0px 5px',
    },
    borderTop: {
        borderTop: `1px solid ${BLUE_PRIMARY}`,
    },
    borderBottom: {
        borderBottom: `1px solid ${BLUE_PRIMARY}`,
    },
    summaryTitle: {
        fontSize: 14,
        fontWeight: 600,
        margin: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderBottom: `1px solid ${BLUE_PRIMARY}`,
    },
}));

export default useStyles;
