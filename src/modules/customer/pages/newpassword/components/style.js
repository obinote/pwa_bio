import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        '& .MuiInputBase-input': {
            padding: '0 9px !important',
            height: '40px !important',
            fontSize: '14px !important',
        },
        '& .MuiInputLabel-formControl': {
            top: '0 !important',
            left: '0 !important',
            fontSize: '18px !important',
            color: '#2e2e2e !important',
            fontWeight: 'bold !important',
            position: 'relative',
            textAlign: 'left',
        },
        '& .MuiInput-formControl': {
            marginTop: 10,
            border: '1px solid #d5eafb !important',
            borderRadius: '5px !important',
        },
        '& .MuiSvgIcon-root': {
            fill: '#7B9AAF',
        },
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 30,
        padding: '25px 0',
        color: '#414048',
        fontWeight: 600,
        '@media (min-width:768px)': {
            fontSize: 50,
            padding: '41px 0',
        },
    },
    formContainer: {
        ...FlexColumn,
        gap: '1rem',
        margin: '0 10%',
        paddingBottom: 73,
        letterSpacing: 0,
        '& > .MuiFormControl-root.MuiFormControl-fullWidth': {
            margin: 0,
            maxHeight: 'none',
            '& > p:first-child': {
                color: '#414048',
            },
        },
        '@media (min-width:768px)': {
            margin: '0 auto',
            width: 468,
        },
    },
    btn: {
        width: '100%',
        background: '#f58732',
        border: '#f58732',
        borderRadius: 25,
        padding: '11px 26px',
        marginTop: 10,
        fontSize: 20,
        color: '#FFFFFF',
        cursor: 'pointer',
    },
}));
