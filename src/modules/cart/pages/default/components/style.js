import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, WHITE_IMPORTANT, GREEN, WHITE, BLUE_SECONDARY, ORANGE, BLUE, BLACK, RED,
} from '@theme_color';
import {
    FlexColumn,
    FlexRow,
    CreatePadding,
    CreateMargin,
    Centering,
} from '@theme_mixins';
import { FONT_14, FONT_BIG } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    cartContainer: {
        maxWidth: 1280,
        margin: '0 auto',
        padding: '30px 20px 20px',
    },
    cartBoxContainer: {
        width: '100%',
        display: 'block',
        maxWidth: 900,
        margin: 'auto',
    },
    pageTitleWrapper: {
        width: '100%',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: 15,
        },
    },
    pageTitle: {
        fontSize: 50,
        fontWeight: 600,
        marginBottom: 20,
        color: '#414048',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontWeight: 700,
            fontSize: 30,
        },
    },
    requisitionList: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'fit-content',
        cursor: 'pointer',
    },
    listIcon: {
        color: ORANGE,
        fontSize: '32px !important',
    },
    requisitionLabel: {
        fontSize: 16,
        color: '#414048',
        textTransform: 'none',
    },
    cartActionsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cartActionContinue: {
        color: ORANGE,
        fontSize: 14,
    },
    cartActionUpdate: {
        backgroundColor: `${BLUE} !important`,
        height: '40px !important',
        '&:hover': {
            backgroundColor: `${BLUE} !important`,
        },
    },
    textField: {
        maxWidth: 50,
    },
    tooltip: {
        backgroundColor: `${WHITE} !important`,
        pointerEvents: 'auto !important',
        border: '0.5px solid rgba(0, 0, 0, 0.1) !important',
        padding: '0 !important',
    },
    listItemIcon: {
        color: `${ORANGE} !important`,
        minWidth: '30px !important',
    },
    listItemText: {
        color: `${BLACK} !important`,
    },
    alert: {
        margin: 15,
    },
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        marginBottom: 20,
    },
    iconClose: {
        ...FONT_BIG,
    },
    toolbar: {
        ...FlexRow,
        marginBottom: 7,
    },
    toolbarCounter: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    toolbarButton: {
        fontSize: 11,
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        maxWidth: '320px',
    },
    items: {
        ...FlexColumn,
    },
    item: {
        ...FlexRow,
        position: 'relative',
        marginTop: 20,
        '& .product-options': {
            fontSize: 11,
            paddingLeft: 0,
            marginTop: 10,
            marginBottom: 20,
        },
    },
    itemImgWrapper: {
        flex: 1,
        maxWidth: 200,
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
        },
    },
    itemImg: {
        width: '100%',
        display: 'block',
    },
    itemInfo: {
        flex: 2,
        ...CreatePadding(0, 12, 0, 12),
        position: 'relative',
        paddingBottom: 30,
        '& .alert': {
            marginTop: 10,
        },
        '& .product-options': {
            '& .option-wrapper': {
                fontSize: 12,
                '& .option-wrapper__item': {
                    marginLeft: 0,
                },
                '& .option-item': {
                    margin: 0,
                    marginLeft: 5,
                },
            },
        },
        '& .option-link-mobile': {
            paddingLeft: 5,
        },
    },
    itemName: {
        textDecoration: 'none',
        color: PRIMARY,
        marginBottom: 4,
        display: 'inline-block',
    },
    itemPrice: {
        position: 'absolute',
        bottom: 0,
        left: 12,
        fontWeight: 'bold',
    },
    itemActions: {
        position: 'absolute',
        right: 12,
    },
    iconBtn: {
        display: 'block',
        padding: 9,
        color: WHITE_IMPORTANT,
        width: 30,
        height: 30,
        fontSize: 14,
        background: '#000',
        margin: '5px 0',
        '&:hover': {
            background: '#fff',
            boxShadow: `inset 0px 0px 0px 1px ${PRIMARY}`,
            color: PRIMARY,
        },
    },
    icon: {
        fontSize: 14,
    },
    crosselTitle: {
        display: 'block',
        ...FONT_14,
    },
    emptyText: {
        ...CreateMargin(0, 0, 10, 0),
    },
    emptyLink: {
        color: '#006bb4',
        textDecoration: 'none',
    },
    containerEmpty: {
        [theme.breakpoints.up('sm')]: {
            minHeight: 'calc(100vh - 437px)',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: 400,
            position: 'relative',
            margin: 0,
        },
    },
    butonEmpty: {
        [theme.breakpoints.down('sm')]: {
            bottom: 15,
            position: 'fixed',
            padding: 0,
            left: 0,
            width: '100%',
        },
    },
    mobileBottomSpace: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 140,
        },
    },
    modalContainer: {
        ...Centering,
        display: 'block',
        backgroundColor: WHITE,
        width: 428,
        margin: '10vw auto 0 auto',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '17px 24px 0',
    },
    modalH1: {
        border: 'none',
        fontSize: 30,
        paddingBottom: 18,
        color: BLUE_SECONDARY,
        fontWeight: 400,
        paddingRight: 20,
    },
    modalContent: {
        padding: '0 48px 20px 24px',
    },
    modalFooter: {
        textAlign: 'left',
        padding: '0 24px 20px',
    },
    modalClose: {
        cursor: 'pointer',
    },
    modalSave: {
        backgroundColor: ORANGE,
        color: WHITE,
        borderRadius: 50,
        height: 40,
        fontSize: 16,
        fontWeight: 400,
        padding: '0 24px',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8,
        },
    },
    modalCancel: {
        backgroundColor: 'transparent',
        color: ORANGE,
        borderRadius: 50,
        height: 40,
        fontSize: 16,
        fontWeight: 400,
        padding: '0 24px',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8,
            textDecoration: 'underline',
        },
    },
    modalInputWrapper: {
        margin: '0 0 20px',
    },
    modalInputLabel: {
        display: 'block',
        fontWeight: 600,
        margin: '0 0 8px',
    },
    inputRequired: {
        color: RED,
    },
    modalInput: {
        padding: '5px 10px',
        border: '1px solid #d5eafb',
        borderRadius: 5,
        minHeight: 40,
        width: '100%',
        '&:focus': {
            outline: 'none',
        },
    },
    modalTextArea: {
        height: 100,
    },
    miniCartItemContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: '12px',
            marginRight: '12px',
            paddingTop: '12px',
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '12px',
            marginRight: '12px',
            paddingTop: '12px',
        },
        listStyle: 'none none',
        overflowX: 'hidden',
        overflowY: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '80px',
        '& li.item-loading': {
            border: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            '& > span': {
                margin: '0 auto',
            },
        },
        '& li.item-loading:last-child': {
            marginBottom: 20,
        },

    },
}));

export default useStyles;
