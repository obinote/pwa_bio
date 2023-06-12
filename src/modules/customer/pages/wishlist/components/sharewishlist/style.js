import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

import { RED, GREEN, BLUE_GRAY } from '@theme_color';

export default makeStyles((theme) => ({
    displayFlexRow: {
        ...FlexRow,
    },
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: 15,
        [theme.breakpoints.up('sm')]: {
            padding: '0 5px 15px',
        },
        '& .MuiIconButton-root': {
            top: '20px !important',
            right: '12px !important',
        },
    },
    sharingTitle: {
        fontSize: 30,
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '40%',
        minWidth: '130px',
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
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
    editLink: {
        marginTop: 20,
    },
    textGreen: {
        color: GREEN,
    },
    textRed: {
        color: RED,
    },
    seeDetails: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    btnWishlist: {
        width: '100%',
        background: '#F58732',
        marginTop: 15,
        [theme.breakpoints.up('md')]: {
            width: 'fit-content',
        },
        '&:hover': {
            background: '#F58732',
        },
        '& span': {
            fontWeight: 400,
            fontSize: 14,
            letterSpacing: 0,
        },
    },
    wrapperText: {
        '& > .MuiFormControl-root': {
            maxHeight: 'none',
            margin: 0.0,
        },
        '& textarea': {
            border: `1px solid ${BLUE_GRAY}`,
            borderRadius: 5,
            padding: 15,
        },
    },
}));
