import { makeStyles } from '@material-ui/core/styles';
import { RED } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    wrapperContent: {
        padding: 21,
        alignItems: 'center',
        border: '1px dashed #7B9AAF !important',
        borderRadius: 4,
        margin: 0,
        cursor: 'pointer',
    },
    label: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginBottom: 10,
        display: 'inline-block',
        fontSize: 14,
    },
    insideLabel: {
        color: '#7B9AAF',
        fontSize: 14,
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
        marginRight: 16,
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
