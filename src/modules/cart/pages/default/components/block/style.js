import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    cartDiscount: {
        marginTop: 20,
        backgroundColor: '#f2f9ff',
        padding: '15px 15px 20px',
    },
    blockDiscount: {
        margin: 0,
        padding: 0,
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    blockTitle: {
        border: 0,
        padding: '0 0 10px',
    },
    blockTitleLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: '#414048',
    },
    blockContent: {
        display: 'table',
        width: '100%',
    },
    blockControl: {
        display: 'table-cell',
    },
    discountInput: {
        border: '1px solid #d5eafb',
        borderRadius: '5px 0 0 5px',
        height: 40,
        borderRight: 'none',
        width: '100%',
        padding: '0 9px',
        '&:focus': {
            outline: 'none',
        },
    },
    discountButton: {
        display: 'table-cell',
        height: 40,
        background: '#ffffff',
        color: '#06aec9',
        border: '1px solid #d5eafb',
        borderRadius: '0 5px 5px 0',
        boxShadow: 'none',
        fontWeight: 500,
        borderLeft: 'none',
        width: 'auto',
        padding: '0 9px',
        cursor: 'pointer',
    },
}));

export default useStyles;
