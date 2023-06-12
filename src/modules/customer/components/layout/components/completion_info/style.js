import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    completionContainer: {
        border: '1px solid #e8edf1',
        borderRadius: 8,
        paddingLeft: 50,
        paddingTop: 45,
        paddingBottom: 48,
        marginBottom: 23,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            padding: 20,
        },
    },
    completionImg: {
        width: 143,
        height: 143,
        [theme.breakpoints.down('xs')]: {
            width: 100,
            height: 100,
            marginBottom: 8,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: 100,
            height: 100,
        },
    },
    completionContent: {
        marginLeft: 50,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            marginLeft: 0,
            paddingLeft: 20,
        },
    },
    completionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
            textAlign: 'center',
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            fontSize: 20,
        },
    },
    completionDescription: {
        marginTop: 8,
        fontSize: 14,
        paddingRight: 110,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
            paddingLeft: 20,
            paddingRight: 20,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            paddingRight: 0,
        },
    },
    completionCommentWrapper: {
        marginTop: 20,
    },
    completionCommentTitle: {
        fontWeight: 'bold',
    },
    completionCommentDesc: {
        fontSize: 12,
    },
    btnWrapper: {
        marginTop: 16,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    btnCompletion: {
        padding: '11px 29px',
        backgroundColor: '#f58732',
        border: '1px solid #f58732',
        borderRadius: 25,
        fontSize: 20,
        color: '#FFFFFF',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            fontSize: 16,
            height: 40,
            padding: '0 25px',
        },
    },
}));
