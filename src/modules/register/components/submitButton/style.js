import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, CreateMargin, FlexRow } from '@theme_mixins';
import { RED } from '@theme_color';

export default makeStyles((theme) => ({
    footer: {
        ...CreateMargin(0, 0, 0, 0),
        ...FlexColumn,
        width: '100%',
        height: 'auto',
    },
    btnWrapper: {
        ...FlexRow,
        ...CreateMargin(0, 0, 0, 0),
        padding: 25,
        background: '#f2f9ff',
        justifyContent: 'space-between',
        borderRadius: 10,
        [theme.breakpoints.down('xs')]: {
            padding: 24,
        },
    },
    additionalWrapper: {
        [theme.breakpoints.down('xs')]: {
            display: 'block !important',
        },
    },
    back: {
        cursor: 'pointer',
        display: 'inline-block',
        alignSelf: 'center',
    },
    backLabel: {
        fontSize: 16,
        color: '#f58732',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    btnSubmitWrapper: {
        display: 'inline-block',
    },
    additionalBtn: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: 25,
        },
    },
    btnSubmit: {
        padding: '11px 20px',
        backgroundColor: '#f58732',
        border: '1px solid #f58732',
        borderRadius: 25,
        fontSize: 20,
        fontWeight: 500,
        color: '#FFFFFF',
        cursor: 'pointer',
    },
    requiredField: {
        fontSize: 12,
        color: RED,
        fontWeight: 400,
        marginTop: 20,
        marginBottom: 30,
    },
}));
