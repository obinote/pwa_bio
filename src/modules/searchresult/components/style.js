import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY, SECONDARY } from '@theme_color';
import { FlexColumn, FlexRow, CreatePadding } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: 1280,
        margin: 'auto',
        height: '100%',
        padding: 20,
        ...FlexColumn,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    title: {
        fontSize: 40,
        color: '#414048',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            marginTop: 28,
        },
    },
    headContainer: {
        position: 'relative',
        backgroundColor: SECONDARY,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        borderBottom: 'none',
    },
    filterContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...CreatePadding(15, 15, 15, 15),
    },
    countProductText: {
        justifyContent: 'flex-start',
        ...FONT_10,
    },
    filterBtnContainer: {
        justifyContent: 'flex-end',
        ...FlexRow,
        alignItems: 'center',
        fontSize: 12,
    },
    btnFilter: {
        marginRight: -20,
        padding: 0,
    },
    iconFilter: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 50, 0),
    },
}));

export default useStyles;
