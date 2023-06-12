import { makeStyles } from '@material-ui/core/styles';
import { RED } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    wrapperContent: {
        padding: '0 10px',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        margin: '0 0 20px',
        cursor: 'pointer',
        background: '#F2F9FF',
    },
    label: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginBottom: 10,
        display: 'inline-block',
        fontSize: 14,
    },
    insideLabel: {
        color: '#F58732',
        fontSize: 14,
        fontWeight: '600',
    },
    wrapperInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapperUploaded: {
        width: 'calc(100% - 42px)',
        paddingRight: 20,
        position: 'relative',
    },
    uploadedLabel: {
        fontWeight: 'bold',
        display: 'block',
        fontSize: 12,
    },
    docLogo: {
        marginRight: 5,
        marginTop: 5,
        '& img': {
            width: 25,
        },
    },
    trashLogo: {
        position: 'absolute',
        top: '50%',
        right: -5,
        transform: 'translate(0, -50%)',
    },
    filename: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '200px',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '295px',
        },
    },
    required: {
        color: RED,
    },
    errorInfo: {
        marginTop: 7,
        fontSize: 12,
        fontWeight: 400,
        color: '#e02b27',
    },
}));

export default useStyles;
