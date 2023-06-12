import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, FlexColumn, CreatePadding } from '@theme_mixins';
import { WHITE, ORANGE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: '10px auto',
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            ...CreateMargin(24, 0, 0, 0),
            ...CreatePadding(0, 20, 0, 20),
            alignItems: 'center',
        },
    },
    btnView: {
        ...CreateMargin(0, 8, 0, 0),
        ...CreatePadding(6, 24, 6, 24),
        height: 46,
        bottom: 0,
        left: 0,
        color: WHITE,
        borderRadius: 100,
        backgroundColor: WHITE,
        boxShadow: 'none',
        borderColor: ORANGE,
        border: '1px solid',
        '&:hover': {
            backgroundColor: WHITE,
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            height: 38,
            float: 'left',
        },
    },
    txtBtn: {
        color: ORANGE,
        fontWeight: 400,
    },
    txtCaption: {
        ...CreateMargin(10, 16, 10, 16),
        fontSize: 12,
        maxWidth: 280,
        fontWeight: 400,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    iconmoon: {
        fontSize: 20,
        marginRight: 2,
    },
    backToProduct: {
        position: 'absolute',
        width: 'auto',
        left: 15,
        top: 15,
        padding: '0 20px',
        borderRadius: 40,
        height: 40,
        background: '#F58732',
        textTransform: 'none',
        zIndex: '99',
        '&:before': {
            content: '""',
            display: 'inline',
            width: 22,
            height: 22,
            backgroundImage: 'url(/assets/img/left-arrow.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            marginRight: 5,
        },
        '&:hover': {
            background: '#e96c0b',
        },
    },
}));

export default useStyles;
