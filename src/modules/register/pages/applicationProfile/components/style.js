import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';
import { RED } from '@theme_color';

export default makeStyles((theme) => ({
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        '& .MuiAccordion-root': {
            borderTop: 'none',
        },
        '& .MuiAccordion-root:nth-child(1)': {
            borderTop: '0.5px solid #D5EAFB',
        },
        '& .MuiAccordion-root:before': {
            backgroundColor: 'transparent',
        },
        '& .MuiPaper-elevation1': {
            boxShadow: 'none',
        },
        '& .MuiAccordion-root.Mui-expanded': {
            margin: 0,
        },
        '& .MuiAccordionSummary-root': {
            padding: 0,
            borderBottom: '0.5px solid #D5EAFB',
        },
        '& .MuiAccordionSummary-content': {
            margin: '16px 0',
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '16px 0',
        },
        '& .MuiAccordionSummary-root.Mui-expanded': {
            minHeight: 48,
        },
        '& .MuiAccordionDetails-root': {
            padding: '0',
            display: 'block',
        },
        '& .MuiButton-label': {
            color: '#EE781B',
        },
        '& .MuiInputLabel-asterisk': {
            color: RED,
        },
        // autocomplete
        '& .MuiAutocomplete-inputRoot': {
            padding: 0,
        },
        // for x icon on autocomplete
        '& .MuiAutocomplete-endAdornment': {
            top: 'auto',
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child': {
            padding: '0 9px',
        },
        // for DatePicker
        '& .MuiInputLabel-formControl': {
            width: '100%',
        },
    },
    accordionTitle: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.1,
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.1,
        },
    },

    sectionContainer: {
        padding: '25px 0',
        display: 'flex',
        borderBottom: '0.5px solid #D5EAFB',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: '5px 0',
            display: 'block',
            borderBottom: 'none',
        },
    },
    sectionTitle: {
        width: 200,
        fontSize: 18,
        flex: 'none',
        color: '#414048',
        [theme.breakpoints.down('xs')]: {
            margin: '15px 0',
            fontSize: 16,
            width: '100%',
        },
    },
    sectionContent: {
        width: 'calc(100% - 200px)',
        display: 'grid',
        flexGrow: 1,
        gap: '12px 16px',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            width: '100%',
        },
    },
    sectionContent2Col: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    sectionContent3Col: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    textInput2Col: {
        gridColumn: 'span 2',
    },
    textInput3Col: {
        gridColumn: 'span 3',
    },
    checkbox: {
        width: 'fit-content',
        paddingTop: 0,
        '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: '#0075FF',
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
    errorInfo: {
        color: '#e02b27',
        fontSize: 12,
        fontWeight: 400,
        margin: 5,
    },
    cityAutocomplete: {
        '& label.MuiInputLabel-root:after': {
            color: 'red',
            content: "' *'",
        },
    },
}));
