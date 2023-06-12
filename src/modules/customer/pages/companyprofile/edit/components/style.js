import { makeStyles } from '@material-ui/core/styles';
// import { GRAY_PRIMARY, GREEN, PRIMARY } from '@theme_color';
import { FlexRow } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    displayFlexRow: {
        ...FlexRow,
    },
    container: {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '2.5rem',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        },
        '& > .col': {
            width: '50%',
            [theme.breakpoints.down('md')]: {
                width: '100%',
            },
        },
    },
    divEdit: {
        marginTop: 16,
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    gridSpanFull: {
        gridColumn: 'span 2',
    },
    gridSpanFullInMobile: {
        [theme.breakpoints.down('xs')]: {
            gridColumn: 'span 2',
        },
    },
    photoContainer: {
        maxWidth: 440,
    },
    photoUploadHelper: {
        lineHeight: 1.5,
        paddingTop: '0.5rem',
        textAlign: 'center',
        color: '#7B9AAF',
        font: 'normal normal normal 12px/14px Roboto',
    },
    photoFileName: {
        whiteSpace: 'pre',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
    },
    photoRemoveButton: {
        color: '#7B9AAF',
    },
    textField: {
        '&.MuiTextField-root input.MuiInputBase-input': {
            fontSize: 14,
            paddingLeft: 9,
            paddingRight: 9,
        },
    },
    field: {
        '& .inputField': {
            width: '100%',
            '& .MuiInput-root': {
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
                '& input': {
                    padding: '6px 5px 6px',
                    height: '25px',
                },
            },
        },
        '& .required': {
            color: '#E02B27',
            marginLeft: 2,
        },
    },
    select: {
        marginTop: 0,
        '& .MuiInputLabel-formControl': {
            top: '0 !important',
            left: '0 !important',
            fontSize: '12px !important',
            color: 'black !important',
            position: 'relative',
            fontWeight: '500 !important',
            lineHeight: '1.66',
            letterSpacing: '0.03333em',
            transform: 'none',
        },
        '& .MuiInput-root': {
            marginTop: '0px !important',
        },
        '& .MuiInputBase-input': {
            border: '1px solid #7B9AAF !important',
            borderRadius: '5px !important',
            padding: '10px 9px !important',
            fontSize: '14px !important',
        },
        '& .MuiFormHelperText-root': {
            '& span': {
                margin: 0,
                color: '#ff1744',
            },
        },
    },
    halfContent: {
        width: '50%',
        display: 'inline-block',
        '& .MuiInputLabel-formControl': {
            top: '0 !important',
            left: '0 !important',
            fontSize: '16px !important',
            color: 'black !important',
            position: 'relative',
            fontWeight: '500 !important',
        },
        '& .MuiInput-root': {
            marginTop: '0px !important',
        },
        '& .MuiInputBase-input': {
            border: '1px solid #7B9AAF !important',
            borderRadius: '5px !important',
            padding: '10px 9px !important',
            fontSize: '14px !important',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
            paddingRight: 0,
        },
    },
    label: {
        margin: 0,
        fontWeight: '500',
    },
    divPhoto: {
        marginTop: 36,
        border: '1px solid #7B9AAF',
        borderRadius: '5px',
        '& .view': {
            padding: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            '@media (max-width: 425px)': {
                flexDirection: 'column',
                gap: '1.5rem',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '16px',
                alignItems: 'center',
            },
        },
        '& .imageView': {
            width: '161px',
            height: '161px',
            flexBasis: '49%',
            maxWidth: '100%',
            '& .buttonUpload': {
                display: 'block',
                margin: '0 auto',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
            },
        },
        [theme.breakpoints.down('md')]: {
            marginTop: 20,
        },
    },
    action: {
        display: 'flex',
        gap: '0.75rem',
        marginTop: '0.75rem',
        marginBottom: '2rem',
        [theme.breakpoints.down('xs')]: {
            gap: '1rem',
            flexDirection: 'column',
        },
    },
    button: {
        padding: '12px 21px',
        backgroundColor: '#F58732',
        textTransform: 'none',
        '&.MuiButton-root:hover': {
            backgroundColor: '#F58732',
        },
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: 'white',
            alignSelf: 'center',
            display: 'flex',
        },
    },
    noMargin: {
        margin: 0,
    },
    tipPaper: {
        padding: 12,
        background: '#FFDCE3 !important',
        [theme.breakpoints.up('lg')]: {
            marginLeft: '1rem',
        },
    },
}));

export default useStyles;
