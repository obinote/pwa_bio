import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE_PRIMARY } from '@theme_color';
// import warning from './public/assets/img/warning.svg';
import {
    CreateBorder,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: BLUE_PRIMARY,
        borderBottomStyle: 'solid',
        paddingBottom: 20,
    },
    containerTitle: {
        marginBottom: 10,
    },
    purchaseLetter: {
        borderWidth: 1,
        borderColor: BLUE_PRIMARY,
        borderStyle: 'solid',
        borderRadius: 5,
        width: '100%',
        marginBottom: 15,
    },
    imagePreview: {
        width: '50%',
        height: undefined,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 60,
        },
    },
    imagePreviewFull: {
        width: '100%',
        height: undefined,
    },
    buttonFileUploadFrame: {
        alignSelf: 'center',
        textAlign: 'right',

        [theme.breakpoints.down('sm')]: {
            marginBottom: 60,
            textAlign: 'left',
            alignSelf: 'flex-start',
        },
    },
    buttonFileUploadFrameNoBreak: {
        alignSelf: 'center',
        textAlign: 'right',

        [theme.breakpoints.down('sm')]: {
            alignSelf: 'flex-start',
        },
    },
    buttonFileUpload: {
        background: '#FFFFFF',
        color: '#F58732',
        boxShadow: 'none',
        ...CreateBorder('1px', '1px', '1px', '1px', '#F58732'),

        '&:hover': {
            background: '#F58732',
            borderColor: '#F58732',
            color: '#FFFFFF',
            boxShadow: 'none',
        },
    },
    buttonFileDelete: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 3,
    },
    imageFrame: {
        position: 'relative',
    },
    orderLetterWrapper: {
        display: 'flex',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 20,
        },
    },
    policyText: {
        color: '#7B9AAF',
        fontWeight: '400',
        letterSpacing: 0,
    },
    iconAlert: {
        background: '#F2F9FF',
        display: 'flex',
        padding: '12px 15px',
        lineHeight: '1.2',
        borderRadius: 5,
        color: '#FA2E2C',
        letterSpacing: 0,
        fontWeight: '400',
        fontSize: 14,
        fontStyle: 'italic',
        alignItems: 'center',
        gap: '10px',
    },
}));

export default useStyles;
