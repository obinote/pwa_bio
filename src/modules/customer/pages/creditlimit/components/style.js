/* eslint-disable linebreak-style */
/* eslint-disable no-dupe-keys */
/* eslint-disable linebreak-style */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexRow } from '@theme_mixins';

export default makeStyles((theme) => ({
    creditWrapper: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: '50px',
        },
        '& .credit-remaining': {
            marginTop: '30px',
            '& h4': {
                fontSize: '18px',
                color: '#414048',
                margin: 0,
                letterSpacing: 0,
            },
            '& .MuiAlert-standardWarning': {
                marginTop: 20,
            },
        },
        '& .credit-transaction': {
            marginTop: '30px',
            '& h4': {
                fontSize: '18px',
                color: '#414048',
                margin: 0,
                letterSpacing: 0,
            },
            '& .MuiAlert-standardWarning': {
                marginTop: 20,
            },
        },
    },
    tableContainer: {
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 14,
        },
        boxShadow: 'none',
        width: '100%',
    },
    table: {
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
        [theme.breakpoints.up('sm')]: {
            '& .MuiTableCell-root': {
                padding: '10px',
            },
        },
        '& .MuiTableCell-head': {
            borderBottom: '1px solid #E8EDF1',
            fontWeight: 'bold',
            color: '#414048',
            letterSpacing: 0.28,
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            padding: '10px 0',
            borderBottom: '1px solid #E8EDF1',
        },
        '& .MuiTableCell-alignLeft': {
            [theme.breakpoints.up('sm')]: {
                padding: '10px',
            },
            '& .amount-green': {
                '& span': {
                    margin: 0,
                    color: '#0D9816',
                },
            },
            '& .amount-red': {
                '& span': {
                    margin: 0,
                    color: '#FA2E2C',
                },
            },
            '& .amount-orange': {
                '& span': {
                    margin: 0,
                    color: '#F58732',
                },
            },
        },
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            padding: '5px 0px !important',
            borderBottom: 'none !Important',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '10px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            '& span': {
                margin: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& span': {
                margin: 0,
            },
        },
        '& span': {
            color: '#414048',
            letterSpacing: 0.28,
        },
        width: '50%',
        position: 'relative',
        paddingRight: 20,
    },
    value: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '& span': {
            margin: 0,
            color: '#414048',
            letterSpacing: 0.28,
        },
    },
    displayFlexRow: {
        ...FlexRow,
    },
}));
