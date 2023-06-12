import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn,
} from '@theme_mixins';
import { RED } from '@theme_color';

export default makeStyles((theme) => ({
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        ...CreatePadding(24, 0, 24, 0),
        borderTop: '0.5px solid #D5EAFB',
        '& .MuiInputBase-root': {
            padding: 20,
            alignItems: 'center',
            display: 'flex',
            border: '1px dashed #7B9AAF !important',
            borderRadius: 4,
            margin: 0,
            cursor: 'pointer',
        },
        '& .MuiInputBase-input': {
            border: '1px solid #D5EAFB !important',
            borderRadius: 5,
        },
        '& .MuiInputLabel-asterisk': {
            color: RED,
        },
        '& .MuiInputLabel-formControl': {
            marginBottom: 8,
            display: 'inline-block',
        },
        '& .MuiInput-formControl': {
            marginTop: '0 !important',
        },
    },
    titleWrapper: {
        marginBottom: 25,
    },
    title: {
        margin: '0 0 5px 0',
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.1,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 400,
    },
    fieldContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // alignItems: 'end',
        paddingBottom: 35,
    },
    fieldContent: {
        position: 'relative',
        width: 'calc(50% - 20px)',
        marginBottom: 45,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            width: '100%',
        },
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: '2rem',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fieldDivider: {
        marginBottom: '45px',
    },
}));
