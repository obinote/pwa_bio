import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, CreateMargin, FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        ...CreatePadding(0, 10, 30, 0),
        color: '#414048',
        letterSpacing: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        '& label': {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#414048',
        },
        '& input': {
            borderRadius: '5px',
            border: '1px solid #7B9AAF',
            marginTop: '10px',
            padding: ' 10px',
        },
        '& .legend': {
            marginTop: 30,
            padding: '0 0 10px',
            '& span': {
                fontSize: '18px',
                fontWeight: 700,
                textTransform: 'capitalize',
            },
        },
        '& .custom-edit-account-left': {
            [theme.breakpoints.up('sm')]: {
                width: '48%',
            },
            '& .MuiFormControl-fullWidth': {
                marginBottom: 0,
                height: 'auto',
            },
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
        },
        '& .custom-edit-account-right': {
            [theme.breakpoints.up('sm')]: {
                width: '48%',
            },
            '& .MuiFormControl-fullWidth': {
                marginBottom: 0,
                maxHeight: 'unset',
            },
            '& .MuiInputAdornment-positionEnd': {
                position: 'absolute',
                right: 0,
                top: 30,
            },
        },
    },
    titleContent: {
        fontSize: '30px',
    },
    editContainer: {
        ...FlexColumn,
    },
    checkboxLabel: {
        marginBottom: '3px',
        display: 'block',
        '& .MuiFormControlLabel-label': {
            '& span': {
                fontSize: '14px',
                color: '#414048',
                textTransform: 'capitalize',
                fontWeight: 400,
                margin: 0,
            },
        },
    },
    bottomButtons: {
        textAlign: 'left',
        marginTop: 50,
        '& button': {
            backgroundColor: '#F58732',
            boxShadow: 'unset',
            padding: '12px 21px',
            width: 90,
            height: 41,
            '& span': {
                fontSize: 14,
                color: '#FFFFFF',
                margin: 0,
                fontWeight: '400',
                letterSpacing: 0,
            },
            '&:hover': {
                backgroundColor: '#F58732',
            },
        },
    },
    skeletonContainer: {
        paddingTop: 32,
        width: '100%',
    },
    skeletonField: {
        ...CreateMargin(6, 6, 24, 0),
    },
    skeleton: {
        ...CreateMargin(6, 6, 6, 0),
    },
    skeletonCheckBox: {
        ...CreateMargin(6, 6, 15, 0),
    },
}));
