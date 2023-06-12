import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE, WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    iconBox: {
        textAlign: 'center',
        padding: 3,
        borderRadius: 30,
        position: 'fixed',
        bottom: -30,
        transform: 'translateY(-50%)',
        zIndex: 1,
        left: 80,
        [theme.breakpoints.down('xs')]: {
            bottom: 60,
            left: 13,
        },
        '& .MuiFab-root': {
            width: 102,
            height: 102,
            background: BLUE,
            border: `5px solid ${WHITE}`,
            borderRadius: 50,
            boxShadow: '0px 3px 5px #00000066',
            position: 'relative',
            transform: 'scale(0.8)',
            marginLeft: '-10px',
            marginBottom: '-10px',
            '&:hover': {
                background: BLUE,
            },
            '& div': {
                position: 'absolute',
                top: 15,
                right: '50%',
                transform: 'translateX(50%)',
                lineHeight: '14px',
                color: WHITE,
            },
            '& img': {
                animation: '$upDown 4s linear infinite',
            },
            '& .counter': {
                backgroundColor: '#FA2E2C',
                position: 'absolute',
                top: 30,
                right: 0,
                width: 28,
                height: 28,
                lineHeight: '25px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: 0,

            },
            [theme.breakpoints.down('xs')]: {
                transform: 'scale(0.6)',
                marginLeft: '-20px',
                marginBottom: '-18px',
            },
        },
    },
    '@keyframes upDown': {
        '0%, 100%': {
            transform: 'translateY(20px)',
        },
        '50%': {
            transform: 'translateY(30px)',
        },
    },
}));

export default useStyles;
