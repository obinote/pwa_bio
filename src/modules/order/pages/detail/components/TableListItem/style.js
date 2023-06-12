import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

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
    tableContainer: {
        boxShadow: 'none',
        width: '100%',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        '& .do-wrapper': {
            marginBottom: '15px',
        },
        '& .do-items': {
            display: 'flex',
            '& span': {
                marginBottom: 0,
                marginTop: 0,
                '&:first-child': {
                    whiteSpace: 'nowrap',
                    marginRight: 5,
                },
                '&:last-child': {
                    whiteSpace: 'normal',
                },
            },
        },
    },
    tableRowHead: {
        '& span': {
            fontWeight: '600',
            color: '#414048',
            margin: 0,
            lineHeight: 'normal',
        },
        '& th': {
            verticalAlign: 'bottom',
            lineHeight: 'normal',
            '&:first-child': {
                paddingLeft: 5,
            },
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
        '& span': {
            margin: 0,
            lineHeight: '1.5',
        },
        '& td': {
            paddingTop: 15,
            paddingBottom: 15,
            verticalAlign: 'top',
            '&:first-child': {
                paddingLeft: 5,
                [theme.breakpoints.up('sm')]: {
                    maxWidth: 200,
                },
            },
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('xs')]: {
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
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
    },
    productImgContainer: {
        width: 105,
        height: 130,
    },

    productImg: {
        width: 105,
        height: 'auto',
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
    columnInfo: {
        minWidth: 200,
    },
}));
