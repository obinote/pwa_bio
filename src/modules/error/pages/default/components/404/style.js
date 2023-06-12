import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        justifyContent: 'center',
    },
    errorCointainer: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: 1280,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'auto',
            paddingBottom: 40,
        },
        [theme.breakpoints.only('sm')]: {
            paddingTop: 20,
        },
    },
    pageTitleWrapper: {
        marginTop: 40,
        [theme.breakpoints.only('sm')]: {
            marginTop: 20,
        },
        [theme.breakpoints.only('xs')]: {
            marginTop: 0,
        },
    },
    pageTitle: {
        fontWeight: 700,
        lineHeight: 1.1,
        fontSize: 26,
        marginBottom: 20,
    },
    contentWrapper: {
        display: 'block',
    },
    dlWrapper: {
        marginBottom: 10,
    },
    dtWrapper: {
        fontWeight: 700,
        marginBottom: 5,
    },
    ddWrapper: {
        marginBottom: 10,
    },
    ulWrapper: {
        marginBottom: 25,
        paddingLeft: 40,
    },
    liWrapper: {
        marginBottom: 10,
    },
    aLink: {
        color: '#006bb4',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },

}));

export default useStyles;
