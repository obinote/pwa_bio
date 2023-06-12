import { makeStyles } from '@material-ui/core/styles';
import { CreateMargin } from '@theme_mixins';
import { ORANGE, WHITE, BLUE_LIGHT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        backgroundColor: WHITE,
        boxShadow: 24,
        padding: '30px 24px',
    },
    modalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        maxWidth: '80%',
        display: 'inline-block',
    },
    modalDescription: {
        fontSize: '16px',
        marginTop: '12px',
    },
    actionWrapper: {
        textAlign: 'center',
        marginTop: '24px',
    },
    btnWrapper: {
        display: 'inline-block',
        ...CreateMargin(0, 6, 0, 6),
    },
    btnRegister: {
        background: ORANGE,
        padding: '12px 36px',
        '&, &:hover': {
            background: ORANGE,
        },
    },
    btnCancel: {
        background: BLUE_LIGHT,
        color: ORANGE,
        padding: '12px 36px',
        '&, &:hover': {
            background: BLUE_LIGHT,
        },
    },
    iconSuccessContainer: {
        ...CreateMargin(0, 0, 12, 0),
    },
    btnCloseWrapper: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
}));

export default useStyles;
