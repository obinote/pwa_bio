import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, WHITE } from '@theme_color';
import {
    CreateBorder,
    FlexRow,
    CreatePadding,
} from '@theme_mixins';

export default makeStyles(() => ({
    root: {
        ...CreateBorder(0, 0, 0, 0, PRIMARY),
        ...FlexRow,
        background: WHITE,
        ...CreatePadding('4px', '15px', '4px', '15px'),
        marginTop: '5px',
    },
    rootRmBorder: {
        ...FlexRow,
        border: 'none',
        background: WHITE,
        ...CreatePadding('4px', '15px', '4px', '15px'),
        marginTop: '5px',
    },
    labelContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    labelBox: {
        flex: 1,
    },
    labelContainerActive: {
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecoration: 'line-through',
        marginLeft: 'auto',
    },
    promo: {
        marginLeft: 'auto',
        fontWeight: 'bold',
    },
    notPromo: {
        marginLeft: 'auto',
        fontWeight: 'bold',
    },
}));
