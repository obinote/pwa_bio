import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    CenterAbsolute,
    FlexRow,
} from '@theme_mixins';
import {
    BLUE_LIGHT,
} from '@theme_color';

export default makeStyles(() => ({
    passwordStrength: {
        background: BLUE_LIGHT,
        width: '100%',
        height: 30,
        ...FlexRow,
    },
    passwdStrPrgsCtr: {
        background: 'transparent',
        height: 30,
    },
    zero: {
        width: 0,
    },
    per3: {
        width: '30%',
    },
    half: {
        width: '50%',
    },
    per7: {
        width: '75%',
    },
    full: {
        width: '100%',
    },
    passwdStrPrgsBar: {
        height: 30,
        background: '#c5eeac',
        // opacity: 0.4,
    },
    per3Bar: {
        width: '30%',
        background: '#FFAFAE',
        // opacity: 0.3,
    },
    halfBar: {
        background: '#ffd6b3',
        width: '50%',
        // opacity: 0.5,
    },
    txtPasswdStr: {
        position: 'absolute',
        width: '100%',
        ...CenterAbsolute,
        // textTransform: 'capitalize !important',
        color: '#7B9AAF',
        fontSize: 12,
        fontWeight: 400,
        marginLeft: 12,
        letterSpacing: 0,
    },
}));
