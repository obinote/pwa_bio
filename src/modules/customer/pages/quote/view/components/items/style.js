/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

export default makeStyles((theme) => ({
    table: {
        width: '100%',
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
    itemsVendor: {
        fontWeight: 600,
    },
    inputItem: {
        width: 45,
        border: '1px solid #D5EAFB',
        height: '30px',
        outline: 'none',
        textAlign: 'center',
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    btnUpdate: {
        color: '#F58732',
        textTransform: 'capitalize',
        fontWeight: 400,
    },
    tableTotal: {
        marginTop: 14,
        background: '#F2F9FF',
        padding: 20,
    },
    tableTotalBody: {
        width: '100%',
        display: 'table',
        '& tr': {},
        '& td': {
            padding: 0,
            borderBottom: 'none',
            paddingTop: 2,
        },
        '& tr > td:nth-child(2)': {
            textAlign: 'right',
        },
        '&.loading > tr > td:nth-child(2)': {
            width: '150px',
        },
    },
    cellPaddingBottom: {
        paddingBottom: '8px !important',
    },
    cellPaddingTop: {
        paddingTop: '8px !important',
    },
    tableRowBorder: {
        borderBottom: '1px solid #D5EAFB !important',
    },
    tableCellBold: {
        fontWeight: 700,
    },
    btnRemove: {
        background: 'none',
        minWidth: 0,
    },
    trLoading: {
        '& span': {
            height: 50,
        },
    },
}));
