import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    otpContainer: {
        border: '1px solid #E8EDF1',
        borderRadius: '8px',
    },
    mt_20: {
        marginTop: 20,
    },
    otpBtn: {
        maxWidth: '100%',
        height: 50,
        background: ORANGE,

        '&:hover': {
            background: '#dc6e1a',
        },
        '& span': {
            fontSize: '20px',
            fontWeight: '500',
        },
    },
    otpInputContainer: {
        marginLeft: '50%',
        transform: 'translate(-50%)',
        width: '102px',
    },
    otpTitle: {
        color: '#414048',
        fontWeight: 'bold',
        letterSpacing: 0,
    },
    otpBtnLable: {
        fontSize: '14px !important',
        fontWeight: 'normal !important',
    },
    otpDescription: {
        color: '#7B9AAF',
        fontWeight: '400',
        letterSpacing: 0,
    },
}));

export default useStyles;
