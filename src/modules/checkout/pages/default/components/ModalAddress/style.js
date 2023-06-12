import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, GREEN, PRIMARY, ORANGE, WHITE,
} from '@theme_color';
import { CreateMargin, CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 960,
        },
        width: ' 100%',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    appBarBottom: {
        bottom: 0,
        top: 'auto',
        backgroundColor: 'white',
    },
    pageTitle: {
        marginBottom: 0,
        flexDirection: 'row-reverse',
        padding: '12px 24px 0',
        border: 0,
        '& div': {
            '&:first-child': {
                position: 'relative',
                '& button': {
                    padding: 0,
                    minWidth: 0,

                    '& svg': {
                        fontSize: '20px',
                    },
                },
            },
            '&:nth-child(2)': {
                paddingLeft: '0px',
                display: 'flex',

                '& h1': {
                    textAlign: 'left',
                    fontSize: '18px',
                    textTransform: 'capitalize',
                },
            },
        },
    },
    address_shipping: {
        ...CreatePadding(15, 15, 15, 15),
        width: '100%',
        margin: 0,
    },
    address_billing: {
        padding: '20px 15px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    address_title: {
        color: PRIMARY,
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '5px',
    },
    address_content: {
        fontSize: '12px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        paddingBottom: '15px',
    },
    address_text: {
        fontSize: '12px',
    },
    address_edit: {
        cursor: 'pointer',
        marginLeft: '57.99px',
        textDecoration: 'underline',
        fontSize: '12px',
    },
    address_action: {
        padding: '15px 0',
        float: 'left',
        '& button': {
            backgroundColor: ORANGE,
            borderColor: ORANGE,
            height: '40px',
            padding: '0 14px',
            '& span': {
                color: WHITE,
                fontWeight: 400,
                textTransform: 'capitalize',
                fontSize: '14px',
            },
            '& > span': {
                flexDirection: 'row-reverse',
            },
            '&:hover': {
                backgroundColor: ORANGE,
                borderColor: ORANGE,
                opacity: '0.8',
            },
        },
        [theme.breakpoints.down('sm')]: {
            float: 'none',
        },
    },
    address_add: {
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid black',
        fontSize: '12px',
    },
    address_save: {
        width: '100%',
        backgroundColor: PRIMARY,
        color: 'white',
        textTransform: 'uppercase',
    },
    address_drawer: {
        left: 0,
        width: '100%',

        '& .MuiDialog-container': {
            [theme.breakpoints.down('sm')]: {
                padding: '60px 22px',
            },

            '& > .MuiDialog-paper': {
                maxWidth: '580px',
                borderRadius: 0,

                [theme.breakpoints.down('sm')]: {
                    borderRadius: '12px',
                },
            },
        },
    },
    address_form: {
        padding: '12px 24px',
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },

        '& div > .MuiFormGroup-row': {
            maxHeight: '360px',
            overflowY: 'scroll',

            [theme.breakpoints.down('sm')]: {
                maxHeight: '65vh',
            },
        },
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        ...CreateMargin(30, 0, 30, 0),
    },
    boxMap: {
        ...CreateMargin(30, 0, 60, 0),
        height: 'auto',
    },
    fontWhite: {
        color: 'white',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        textAlign: 'center',
    },
    buttonProgress: {
        color: PRIMARY,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    addBtnSuccess: {
        backgroundColor: GREEN,
        '&:hover': {
            backgroundColor: GREEN,
        },
        ...CreateMargin(30, 0, 30, 0),
    },
}));

export default useStyles;
