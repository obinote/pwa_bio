import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BLUE, BLUE_LIGHT, ORANGE, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        width: 335,
        display: 'flex',
        borderRadius: 10,
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },

    },
    leftContainer: {
        width: 56,
        background: BLUE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .icon-container': {
            padding: '0 8px',
            position: 'relative',
            '& .shopping-bag-icon': {
                fontSize: 32,
                color: WHITE,
            },
            '& .verified-user-icon': {
                color: ORANGE,
                position: 'absolute',
                fontSize: 22,
                right: 2,
                top: 8,
            },
        },
    },
    rightContainer: {
        width: '100%',
        background: BLUE_LIGHT,
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        '& .description': {
            fontSize: 12,
            width: 215,
            paddingRight: 16,
            lineHeight: 1.2,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                paddingRight: 0,
                fontSize: 11,
            },
        },
    },
    rootSwitch: {
        '& .MuiSwitch-switchBase': {

        },
        '& .MuiSwitch-thumb': {
            background: WHITE,
        },
        '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
            background: ORANGE,
            opacity: 1,
        },
    },
}));

export default useStyles;
