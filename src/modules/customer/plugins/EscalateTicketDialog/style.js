import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    modalTitleContainer: {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
    },
    modalTitle: {
        border: 'none',
        fontSize: '30px',
        color: '#42929d',
        fontWeight: 400,
    },
    modalContent: {
        color: '#414048',
        fontSize: 14,
        letterSpacing: 0,
    },
    containerActionButton: {
        padding: '0 0 15px 20px',
        width: 'unset',
        [theme.breakpoints.down('xs')]: {
            padding: 5,
        },
    },
    actionContainer: {
        justifyContent: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
        },
    },
    buttonAction: {
        borderRadius: '50px',
        backgroundColor: '#f58732',
        borderColor: '#f58732',
        padding: '0 25px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 400,
        height: '40px',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#f58732',
            borderColor: '#f58732',
        },
    },
    buttonActionCancel: {
        borderRadius: '50px',
        backgroundColor: 'transparent',
        color: '#f58732',
        padding: '0 25px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 400,
        height: '40px',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#f58732',
        },
    },
    inputArea: {
        background: '#ffffff',
        backgroundclip: 'padding-box',
        border: '1px solid #d5eafb',
        borderRadius: 5,
        fontSize: 14,
        height: 'auto',
        lineHeight: 1.42857143,
        margin: 0,
        padding: 10,
        verticalAlign: 'baseline',
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        '&:not([disabled]):focus': {
            boxShadow: '0 0 3px 1px #00699d',
        },
        '&:focus-visible': {
            outline: 0,
        },
    },
}));
