import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';
import {
    BORDER_LIGHT, BLUE, BLUE_GRAY, WHITE,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    languageSwitcher: {
        margin: '0px auto',
        maxWidth: 1280,
        padding: '0px 20px',
        width: 'auto',
        marginTop: 30,
    },
    buttonWrapper: {
        display: 'inline-flex',
        flexBasis: 0,
        flex: '1 1 0px',
        borderRadius: 25,
        background: BORDER_LIGHT,
        ...CreatePadding(5, 5, 5, 5),
    },
    btnLang: {
        ...CreatePadding(10, 0, 10, 0),
        borderRadius: 25,
        fontWeight: 600,
        border: 'none',
        backgroundColor: BORDER_LIGHT,
        color: BLUE_GRAY,
        cursor: 'pointer',
        outline: 'none',
        minWidth: 150,
        '&.active': {
            backgroundColor: BLUE,
            color: WHITE,
        },
    },
}));

export default useStyles;
