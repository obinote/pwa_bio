import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, GREEN, PRIMARY, BLUE_PRIMARY, ORANGE,
} from '@theme_color';
import { CreateMargin, CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 960,
        },
        width: ' 100%',
        alignSelf: 'center',
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
    },
    address_shipping: {
        ...CreatePadding(15, 15, 0, 15),
        width: '100%',
        margin: 0,
        marginBottom: 15,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',

        '& > span': {
            color: 'transparent !important',
            '&:hover': {
                backgroundColor: 'transparent !important',
            },

            [theme.breakpoints.down('sm')]: {
                '&:last-child': {
                    position: 'relative',
                    zIndex: 9,
                },
            },
        },

        '& .MuiRadio-root.Mui-checked': {
            '& .MuiIconButton-label': {
                '& div:last-child': {
                    display: 'none',
                },
            },
        },

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            '& span': {
                width: '100%',
                padding: 0,
                marginTop: '7px',

                '& .MuiIconButton-label': {
                    justifyContent: 'flex-start',
                },
            },
        },
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
        border: `1px solid ${BLUE_PRIMARY}`,
        marginBottom: '8px',
        borderRadius: '10px',
    },
    address_text: {
        fontSize: '16px',
        fontWeight: 400,
        margin: 0,
    },
    address_edit: {
        cursor: 'pointer',
        fontSize: '14px',
        color: ORANGE,
        fontWeight: 400,
        margin: 0,
        display: 'block',
        ...CreatePadding(0, 15, 15, 15),
        '&:hover': {
            textDecoration: 'underline',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft: '130px',
            marginTop: '-33px',
            position: 'relative',
            marginBottom: '15px',
        },

    },
    address_action: {
        padding: '15px',
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
    },
    address_form: {
        padding: '15px',
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
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
    addressColumn: {
        width: '100%',
    },
    select_button: {
        '& .MuiIconButton-label': {
            '& div:last-child': {
                minWidth: '100px',
                height: '40px',
                background: ORANGE,
                borderRadius: '40px',

                '& > * ': {
                    display: 'none',
                },

                '&::before': {
                    content: 'attr(data-label)',
                    position: 'absolute',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                    right: 0,
                    left: 0,
                    zIndex: 1,
                    color: 'white',
                    lineHeight: '40px',
                },

                '&:hover': {
                    opacity: '0.8',
                },
            },
        },
    },
    address_wrapper: {
        maxWidth: '340px',
        '& h3': {
            fontWeight: '700',
            fontSize: '14px',
        },
    },
}));

export default useStyles;
