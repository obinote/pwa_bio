import { makeStyles } from '@material-ui/core/styles';
import { Centering, CreatePadding } from '@theme_mixins';
import { WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
    },
    body: {
        ...Centering,
        ...CreatePadding(20, 80, 80, 80),
        justifyContent: 'space-between',
    },
    item: {
        margin: 0,
        ...Centering,
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        boxShadow: 'none',
        padding: 10,
        '& .MuiFormControl-marginNormal': {
            marginTop: 0,
        },
    },
    modalSearch: {
        top: '0 !important',
    },
    iconClose: {
        size: 30,
    },
    lastCat: {
        margin: 0,
        padding: 2,
        height: 'auto',
        marginBottom: '40px !important',
    },
    cat: {
        padding: 2,
        height: 'auto',
    },
    mobileSearch: {
        paddingLeft: 10,
        width: '90%',
        position: 'relative',
        borderRadius: 100,
        '& .MuiAutocomplete-inputRoot': {
            ...CreatePadding(5, 40, 5, 40),
        },
        '& .MuiInputBase-input': {
            fontSize: 14,
            color: '#7B9AAF',
        },
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
        zIndex: 9,
        top: -3,
    },
}));

export default useStyles;
