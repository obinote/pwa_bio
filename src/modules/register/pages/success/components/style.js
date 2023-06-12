import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    container: {
        maxWidth: 1280,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
    },
    wrapperRegisterSuccess: {
        width: '100%',
        maxWidth: 500,
        margin: '30px auto 40px auto',
    },
    successImage: {
        display: 'flex',
        justifyContent: 'center',
    },
    successDesc: {
        textAlign: 'center',
    },
    successTitle: {
        marginBottom: 15,
    },
    successTitleP: {
        fontSize: 30,
        margin: 0,
        color: '#42929d',
        lineHeight: 1.35,
    },
    successSubtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.35,
        color: '#414048',
    },
    wrapperRegisterDetail: {
        display: 'flex',
        backgroundColor: '#f2f9ff',
        borderRadius: 25,
        padding: '30px 15px',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: 20,
        },
    },
    blockProfile: {
        width: 'calc(100%/3)',
        padding: '0 15px',
        marginBottom: 0,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'block',
            marginBottom: 35,
            padding: 0,
        },
    },
    blockTitle: {
        marginBottom: 15,
    },
    blockTitleP: {
        fontWeight: 700,
        fontSize: 18,
    },
    blockContent: {

    },
    blockContentItem: {
        display: 'flex',
        marginBottom: 10,
    },
    blockContentItemTitle: {
        width: 150,
        paddingRight: 10,
        lineHeight: 1.35,
        fontWeight: 'bold',
    },
    blockContentItemValue: {
        width: ' calc(100% - 150px)',
        lineHeight: 1.35,
        wordBreak: 'break-word',
    },
}));
