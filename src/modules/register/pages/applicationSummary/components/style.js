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
        // for x icon on autocomplete
        '& .MuiAutocomplete-endAdornment': {
            top: 'auto',
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child': {
            padding: '0 9px',
        },
        // for DatePicker
        '& .MuiInputLabel-formControl': {
            width: 'max-content',
        },
        // for checklist
        '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: '#0075FF',
        },
    },
    accordionTitle: {
        color: '#42929D',
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
    pencilIcon: {
        marginLeft: 8,
        cursor: 'pointer',
    },
    itemWrapper: {
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            margin: '15px 0',
        },
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemValue: {
        fontSize: 14,
        [theme.breakpoints.down('xs')]: {
            margin: '15px 0',
        },
    },
    itemDocumentValue: {
        fontSize: 16,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
            margin: '15px 0',
        },
    },
    itemUploaded: {
        paddingTop: 6,
        fontSize: 12,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    sectionContentUploaded: {
        gap: '18px 16px',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    bottomDivider: {
        marginBottom: 50,
    },
    footerContainer: {
        display: 'block',
        width: '100%',
    },
    footerContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    checkboxWrapper: {
        display: 'flex',
        fontWeight: 'normal',
        marginBottom: 5,
        alignItems: 'baseline',
    },
    checkboxInput: {
        marginTop: 2,
        marginRight: 5,
    },
    checkboxLabel: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    checkboxError: {
        color: '#e02b27',
    },
}));
