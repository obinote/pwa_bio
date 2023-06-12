/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, FlexRow, CreatePadding, CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    wrapper: {
        padding: 17,
    },
    shippingContainer: {
        ...FlexRow,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    shippingTitle: {
        fontSize: 14,
    },
    shippingDesc: {
        fontSize: 14,
    },
    shippingAddr: {
        textTransform: 'none',
        fontStyle: 'normal',
    },
    column: {
        // padding: 17,
        ...CreatePadding(8, 8, 8, 8),
        marginRight: 8,
        width: '50%',
        maxWidth: 350,
        '&.loading': {
            paddingLeft: 0,
        },
    },
    columnRight: {},
    btnContainer: {
        ...FlexColumn,
        alignItems: 'baseline',
        '&.loading > span': {
            marginTop: 8,
        },
    },
    btn: {
        padding: 0,
        marginTop: 6,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& span': {
            color: '#F58732',
            textTransform: 'capitalize',
            fontSize: 14,
            fontWeight: 400,
        },
        '&:disabled > span': {
            color: '#7B9AAF !important',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        ...CreatePadding(14, 14, 14, 14),
        borderRadius: 20,
        outline: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25vw',
            maxWidth: 600,
        },
        [theme.breakpoints.down('md')]: {
            width: '60vw',
        },
    },
    popupHeader: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    popupTitle: {
        fontSize: 18,
    },
    btnClose: {
        ...CreatePadding(4, 4, 4, 4),
        cursor: 'pointer',
    },
    popupBody: {
        ...FlexColumn,
    },
    address_shipping: {
        display: 'flex',
        width: '100%',
        margin: '0 0 14px 0 !important',
    },
    btnModalWrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 24,
    },
    btnCancel: {
        background: '#F58732 !important',
        color: '#fff !important',
        padding: '4px 16px !important',
        '&:hover': {
            background: '#F58732 !important',
        },
    },
    btnApprove: {
        background: '#42929d !important',
        color: '#fff !important',
        padding: '4px 16px !important',
        '&:hover': {
            background: '#42929d !important',
        },
    },
}));
