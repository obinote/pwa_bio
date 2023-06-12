import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        height: '450px',
        width: '725px',
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
            borderRadius: 0,
        },
    },
    chatWrapper: {
        height: '100%',
        width: '725px',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
        position: 'relative',
        [theme.breakpoints.between('sm', 'sm')]: {
            borderRadius: '0 12px 12px 0',
        },
    },
    topBar: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...CreatePadding(20, 15, 10, 15),
    },
    chatTitle: {
        textAlign: 'center',
        cursor: 'pointer',
    },
    loadingAgentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
    },
    listContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        alignItems: 'center',
        borderTop: '1px solid #E8EDF1',
        padding: '10px 0px',
        alignContent: 'center',
    },
    listAgentName: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#414048',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
    buttonStartChat: {
        backgroundColor: '#F58732',
        border: 'unset',
        padding: '10px',
        borderRadius: '24px',
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F58732',
        },
    },
    listSeller: {
        ...CreatePadding(0, 15, 10, 15),
    },
    userBackIcon: {
        cursor: 'pointer',
    },
    userCloseIcon: {
        cursor: 'pointer',
    },
    distributorSendIcon: {
        width: 16,
        height: 16,
    },
}));
