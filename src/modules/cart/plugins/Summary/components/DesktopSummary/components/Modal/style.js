import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapperModalReqQuotation: {
        zIndex: '1000 !important',
    },
    modal: {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        borderRadius: 15,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        backgroundColor: WHITE,
        padding: '30px 24px',
    },
    modalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        maxWidth: '80%',
        display: 'inline-block',
        '& *': {
            margin: 0,
        },
        '& h2': {
            margin: '-5px 0 10px',
            fontSize: 18,
            fontWeight: '600',

        },
    },
    modalDescription: {
        fontSize: '16px',
        marginTop: '12px',
    },
    btnCloseWrapper: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    modalHead: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputStyle: {
        marginBottom: 10,

        '& input': {
            border: '1px solid #7B9AAF',
            minHeight: 40,
            boxSizing: 'border-box',
            padding: '5px 10px',
            borderRadius: 5,
        },
        '& textarea': {
            border: '1px solid #7B9AAF',
            padding: '5px 10px',
            borderRadius: 5,
        },
        '& *': {
            margin: '0 !important',
            padding: 0,
        },
        '& .asterisk-label': {
            color: '#ff0000',
            display: 'inline',
            marginLeft: '5px !important',
        },
    },
    inputLabelStyle: {
        fontSize: 14,
        textAlign: 'left',
        display: 'block',
        fontWeight: '600',
        marginBottom: '5px !important',
    },
    inputFileStyle: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        textAlign: 'left',
        '& .attachment-info': {
            color: '#7B9AAF',
        },
    },
    btnAction: {
        display: 'flex',
        gap: 20,

        '& > div': {
            width: 'auto',
        },

        '& button': {
            height: 40,
            padding: '5px 30px',
            fontSize: 14,
            textTransform: 'capitalize',
        },
    },
    btnCreate: {
        background: '#F58732',
        border: '1px solid #F58732',

        '&:hover': {
            background: '#FFFFFF',
            color: '#F58732',
        },
    },

    btnCancel: {
        background: 'transparent',
        color: '#F58732',
        padding: 0,

        '&:hover': {
            background: '#F2F9FF',
            color: '#F58732',
        },
    },
}));

export default useStyles;
