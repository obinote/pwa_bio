import makeStyles from '@material-ui/core/styles/makeStyles';

const PRIMARY_SOFT = 'black';

export default makeStyles((theme) => ({
    container: {
        height: '450px',
        width: '560px',
        display: 'flex',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
        position: 'fixed',
        right: '32px',
        bottom: '94px',
        zIndex: '99999',

        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100vh',
            bottom: 0,
            right: 0,
        },
    },
    chatWrapper: {
        height: '100%',
        width: '560px',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
    },
    closeGetAgent: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        height: '10%',
        paddingRight: '.7em',
    },
    loadingAgentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
    },
    messageButton: {
        marginLeft: '6px',
        fontSize: '14px',
        background: PRIMARY_SOFT,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '12px',
        outline: 'none',
        '&.MuiButtonBase-root': {
            minWidth: '24px !important',
        },
        '&.MuiButtonBase-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
        },
        '& span': {
            color: '#ffffff',
        },
    },
    failedGetAgent: {
        textAlign: 'center',
    },
}));
