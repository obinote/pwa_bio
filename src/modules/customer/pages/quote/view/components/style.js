/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        // [theme.breakpoints.up('sm')]: {
        //     maxWidht: 900,
        // },
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: '0px 5px 40px 5px',
        margin: '15px 0 20px',
    },
    title: {
        fontWeight: 600,
        display: 'inline-block',
        fontSize: 30,
        marginRight: 24,
    },
    status: {
        padding: '0 10px',
        fontSize: 18,
        borderRadius: 5,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontWeight: 400,
        border: 1,
        borderStyle: 'solid',
        color: '#42929d',
        borderColor: '#42929d',
    },
    tableDate: {
        marginTop: 10,
        '& tbody tr > td:nth-child(1)': {
            fontWeight: 600,
        },
        '& td': {
            padding: '0 24px 0 0',
            border: 'none',
        },
    },
    btnContainer: {
        display: 'flex',
        width: '100%',
        padding: '10px 0',
        justifyContent: 'space-between',
        '& >  div:first-child': {
            display: 'flex',
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
    tabContainer: {
        padding: '10px 0px',
    },
    table: {
        width: '100%',
    },
    tableContainer: {
        marginTop: '15px 0px',
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
    inputItem: {
        width: 45,
        border: '1px solid #D5EAFB',
        height: '30px',
        outline: 'none',
        textAlign: 'center',
    },
    checkoutContainer: {
        borderTop: '1px solid #D5EAFB',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 24,
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
        },
        '& button': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                marginBottom: 10,
            },
        },
    },
    btnCheckout: {
        padding: '5px 20px !important',
        textTransform: 'capitalize !important',
        backgroundColor: '#F58732 !important',
        color: '#fff !important',
        border: '1px solid #F58732 !important',
        '&:hover': {
            backgroundColor: '#F58732 !important',
        },
        '& span': {
            fontSize: 20,
        },
    },
    btnBackToList: {
        textTransform: 'capitalize !important',
        fontSize: 14,
        color: '#F58732 !important',
        '&:hover': {
            backgroundColor: '#fff !important',
        },
        '&:disabled > span': {
            backgroundColor: '#7B9AAF !important',
        },
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
