import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreateMargin, CreatePadding, FlexColumn, FlexRow,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
        width: '100%',
        ...FlexRow,
    },
    textWrapper: {
        ...FlexColumn,
    },
    textTitle: {
        fontSize: 18,
    },
    textDetail: {
        lineHeight: '18px',
        fontWeight: 400,
    },
    textAction: {
        cursor: 'pointer',
        color: '#F58732',
        fontWeight: 'bold',
    },
    iconShipping: {
        width: 40,
        height: 40,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPositionY: 'center',
        marginRight: 10,
        backgroundImage: 'url(/assets/img/shipping-express-green.svg)',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-end',
        },
    },
    popup: {
        backgroundColor: '#fff',
        ...CreatePadding(20, 20, 20, 20),
        borderRadius: '20px',
        outline: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25vw',
            maxWidth: 600,
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            minHeight: '60%',
            maxHeight: '90%',
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
        },
    },
    popupHeader: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    popupTitle: {
        fontSize: 18,
    },
    btnClose: {
        ...CreatePadding(4, 4, 4, 4),
        cursor: 'pointer',
    },
    popupBody: {
        ...FlexColumn,
        maxHeight: '80vh',
        overflowY: 'auto',
    },
    items: {
        ...CreateMargin(8, 0, 0, 0),
    },
    carrierGroup: {
        ...CreateMargin(10, 5, 0, 5),
    },
    carrierMethod: {
        lineHeight: '17px',
    },
    carrierLabel: {
        textTransform: 'capitalize',
    },
}));

export default useStyles;
