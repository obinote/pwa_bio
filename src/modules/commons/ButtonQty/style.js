import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';
import { FlexRow, Centering, CreateBorder } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    box: {
        ...FlexRow,
        width: 120,
        height: 48,
    },
    qtyButton: {
        backgroundColor: '#fff',
        height: 48,
        color: '#f58732',
    },
    minus: {
        fontSize: 36,
        borderRadius: '25px 0px 0px 25px',
        ...CreateBorder('2px', 0, '2px', '2px', '#D5EAFB'),
        flex: 1,
        ...Centering,
        cursor: 'pointer',
        userSelect: 'none',
    },
    input: {
        margin: 0,
        flex: 1,
        fontSize: 16,
        minWidth: 30,
        ...CreateBorder('2px', 0, '2px', 0, '#D5EAFB'),
        ...Centering,
        borderRadius: 0,
        textAlign: 'center',
        '&:focus': {
            outline: 'none',
        },
        '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
        },
        '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
        },
        WebkitAppearance: 'textfield',
    },
    plus: {
        flex: 1,
        fontSize: 26,
        borderRadius: '0px 25px 25px 0px',
        ...CreateBorder('2px', '2px', '2px', 0, '#D5EAFB'),
        ...Centering,
        cursor: 'pointer',
        userSelect: 'none',
    },
    disabled: {
        color: GRAY_SECONDARY,
    },
}));

export default useStyles;
