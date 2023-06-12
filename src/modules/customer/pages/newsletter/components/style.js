import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, CreatePadding,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        padding: 0,
    },
    block: {
        ...CreatePadding(16, 30, 16, 5),
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(27, 0),
        },
        '& .MuiTypography-root': {
            color: '#414048',
        },
        '& span': {
            fontSize: 18,
            letterSpacing: 0,
            textTransform: 'capitalize',
        },
        '& .checkbox-container': {
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
        },
    },
    titleContent: {
        fontSize: '30px',
    },
    btnSaveNewsletter: {
        width: '100%',
        bottom: 0,
        ...CreatePadding(16, 16, 16, 0),
        [theme.breakpoints.up('sm')]: {
            position: 'unset',
        },
        '& button': {
            backgroundColor: '#F58732',
            boxShadow: 'unset',
            width: 106,
            height: 41,
            '& span': {
                fontSize: 14,
                color: '#FFFFFF',
                margin: 0,
                fontWeight: '400',
            },
            '&:hover': {
                backgroundColor: '#F58732',
            },
        },
    },
    btnSave: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // width: 'fit-content',
        },
    },
    btnContainer: {
        width: '100%',
    },
}));
