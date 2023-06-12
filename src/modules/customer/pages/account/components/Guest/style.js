import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, Centering,
} from '@theme_mixins';

export default makeStyles({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        alignItems: 'center',
    },
    authBlock: {
        ...Centering,
        width: '100%',
        height: 'auto',
        padding: '15vh 30px',
        textAlign: 'center',
        '& *': {
            fontFamily: 'Roboto',
            letterSpacing: 0,
        },
    },
    btnSignIn: {
        marginBottom: 35,
        marginTop: 15,
        background: '#f58732',
        border: '1px solid #f58732',
        '& span': {
            color: '#FFFFFF',
            fontSize: 14,
        },
        '&:hover': {
            background: '#FFFFFF',
            '& span': {
                color: '#f58732',
            },
        },
    },
    btnSignUp: {
        marginTop: 15,
        fontSize: 18,
        background: '#e7f3ff',
        border: '1px solid #e7f3ff',
        '& span': {
            color: '#f58732',
            fontSize: 14,
        },
        '&:hover': {
            background: '#FFFFFF',
            borderColor: '#f58732',
            '& span': {
                color: '#f58732',
            },
        },
    },
    span: {
        width: '100%',
        height: 20,
    },
    labelForm: {
        fontSize: 18,
        fontWeight: '400',
    },
});
