import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, GREEN, PRIMARY, BLUE_PRIMARY, ORANGE, TEXT_SHADE,
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
    boxField: {
        marginTop: '10px',
        marginBottom: '20px',
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
                '& h1': {
                    textAlign: 'left',
                    fontSize: '18px',
                    textTransform: 'capitalize',
                    margin: 0,
                    color: TEXT_SHADE,
                    letterSpacing: 0,
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
        zIndex: '1000 !important',
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
        ...CreatePadding(0, 24, 12, 24),
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
        },
        '& label': {
            fontSize: '14px',
            fontWeight: 700,
            color: '#414048',
            lineHeight: 0,
            transform: 'none',
            letterSpacing: 0,
        },
        '& input': {
            border: `1px solid ${BLUE_PRIMARY}`,
            borderRadius: '5px',
            height: '40px',
            boxSizing: 'border-box',
            padding: '5px 10px !important',
        },

        '& .MuiAutocomplete-inputRoot': {
            paddingRight: '0 !important',
        },

        '& .MuiInputBase-formControl': {
            '&::before': {
                borderBottom: 0,
            },
            '&::after': {
                borderBottom: 0,
            },
        },

        '& .MuiInput-underline': {
            '&:hover': {
                '&:not(.Mui-disabled):before': {
                    borderBottom: 0,
                },
            },
        },

        '& form > div': {
            marginBottom: 0,

            '& > p': {
                marginLeft: 0,
                letterSpacing: 0,
            },
        },
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        ...CreateMargin(0, 0, 0, 0),
        backgroundColor: ORANGE,
        minWidth: '120px',
        height: '40px',
        '& .MuiButton-containedPrimary:hover': {
            backgroundColor: ORANGE,
        },
    },
    boxMap: {
        ...CreateMargin(0, 0, 60, 0),
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
    address_group: {
        display: 'grid',
        gridTemplateColumns: '1fr 50%',
        boxSizing: 'border-box',
        gridColumnGap: '14px',
        marginTop: '10px',

        '& > .MuiAutocomplete-root': {
            marginTop: '10px',
            marginBottom: '10px',
        },

        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '100%',
            gridColumnGap: 0,
            marginTop: 0,
        },
        '& .MuiAutocomplete-inputRoot': {
            padding: 0,
        },
        '& .MuiFormControl-root': {
            marginTop: 0,
            '& p': {
                marginBottom: 6,
            },
        },
    },
    newsletter: {
        '& .MuiCheckbox-root': {
            color: '#D5EAFB',
        },
        '& .MuiCheckbox-root:hover': {
            backgroundColor: 'unset',
        },
        '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: '#F58732 !important',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: 'unset',
        },
        '& span': {
            fontSize: 14,
            textTransform: 'capitalize',
        },
        '& h4': {
            color: TEXT_SHADE,
            letterSpacing: 0,
        },
    },
    address_group_bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: ORANGE,
        },

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '20px',
            paddingBottom: '20px',
        },
    },
}));

export default useStyles;
