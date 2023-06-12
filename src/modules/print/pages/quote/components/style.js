import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexRow, CreatePadding,
} from '@theme_mixins';

export default makeStyles(() => ({
    wrapper: {
        '& .header-middle__left': {
            '& .header-middle__logo-link': {
                width: '170px',
                marginBottom: 30,
                marginTop: 10,
            },
        },
        '& .detail-requisition-header': {
            '& h1': {
                fontSize: 40,
                fontWeight: 400,
                marginBottom: 15,
                display: 'block',
            },
            '& span': {
                fontSize: 14,
                fontWeight: 400,
                marginBottom: 15,
                display: 'block',
            },
        },
    },
    title: {
        marginLeft: '0 !important',
        paddingLeft: '0 !important',
        display: 'inline-block',
        fontSize: 30,
    },
    status: {
        padding: '0 10px',
        fontSize: 18,
        borderRadius: 5,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginLeft: 24,
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
    shippingContainer: {
        ...FlexRow,
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
        ...CreatePadding(8, 8, 8, 0),
        marginRight: 8,
        width: '50%',
        maxWidth: 350,
        '&.loading': {
            paddingLeft: 0,
        },
    },
}));
