import { makeStyles } from '@material-ui/core/styles';
import { CreatePadding, CreateMargin, CenterAbsolute } from '@theme_mixins';
import {
    BORDER_LIGHT, ORANGE, WHITE, BLUE_PRIMARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        ...CreatePadding(10, 10, 10, 10),
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...CreateMargin(0, 0, 18, 0),
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        [theme.breakpoints.up('md')]: {
            maxWidth: 960,
            ...CenterAbsolute,
        },
    },
    leftContainer: {
        position: 'absolute',
    },
    rightContainer: {
        position: 'absolute',
        right: 0,
        width: '60%',
    },
    rightContainerPdp: {
        position: 'absolute',
        right: 0,
        width: '85%',
    },
    centerContainer: {
        alignItems: 'center',
        textAlign: 'center',
        flexGrow: 1,
        ...CreatePadding(0, '20%', 0, '20%'),
    },
    backIcon: {
        fontSize: 30,
    },
    headerAbsolute: {
        position: 'absolute',
        zIndex: 1,
        borderBottom: 'none',
        backgroundColor: WHITE,
    },
    headerRelative: {
        position: 'relative',
    },
    headerFixed: {
        position: 'sticky',
        top: 0,
        zIndex: 82,
        backgroundColor: WHITE,
        borderBottom: `1px solid ${BLUE_PRIMARY}`,
    },
    title: {
        fontSize: 12,
    },
    count_address: {
        background: ORANGE,
        width: '24px',
        height: '24px',
        marginLeft: '5px',
        borderRadius: '100%',
        textAlign: 'center',
        lineHeight: '24px',
        color: 'white',
    },
    headerRight: {
        display: 'flex!important',
        flexDirection: 'row',
        '& .MuiAutocomplete-inputRoot': {
            ...CreatePadding(5, 40, 5, 40),
        },
        '& .MuiInputBase-input': {
            fontSize: 14,
            color: '#7B9AAF',
        },
    },
    mobileSearch: {
        paddingLeft: 10,
        width: '100%',
        position: 'relative',
        '& .MuiFormControl-marginNormal': {
            margin: 0,
        },
        '& .MuiFormControl-marginNormal .MuiInputBase-input': {
            width: '100%',
        },
        '& .MuiIconButton-edgeEnd': {
            padding: '8px 12px',
        },
    },
    searchIcon: {
        padding: 5,
        position: 'absolute',
        width: '100%',
        zIndex: 9,
        top: -3,
        '& .MuiFormControl-marginNormal': {
            marginTop: 0,
        },
        '& .MuiIconButton-edgeStart': {
            position: 'absolute',
            right: 15,
            top: 0,
        },
        '& .MuiAutocomplete-input': {
            width: '100% !important',
        },
    },
}));

export default useStyles;
