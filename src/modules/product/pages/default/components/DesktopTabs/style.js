import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateBorder, CreateMargin, CreatePadding } from '@theme_mixins';
// import { PRIMARY } from '@theme_color';
// import { FONT_DEFAULT, FONT_10, FONT_REGULAR } from '@theme_typography';

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        ...CreateBorder(0, 0, '0.5px', 0, '#9C9C9C'),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: '70px',
        },
    },
    accordion: {
        boxShadow: 'none',
        borderRadius: '0px !important',
        margin: 0,
        ...CreateBorder('0.5px', 0, 0, 0, '#9C9C9C'),
        '& .Mui-expanded': {},
        '& .MuiAccordionSummary-expandIcon svg': {
            fill: '#000',
        },
        '& .MuiAccordionSummary-root': {
            ...CreatePadding(0, 16, 0, 0),
        },
        '& .MuiAccordionSummary-content': {
            ...CreateMargin(16, 0, 16, 0),
        },
        '& .MuiAccordionDetails-root': {
            ...CreatePadding(0, 16, 16, 0),
        },
    },
    bodyOpen: {
        // ...CreateBorder(0, 0, '0.5px', 0, '#9C9C9C'),
    },
    title: {
        color: '#414048',
        fontSize: 18,
        margin: 0,
    },
    tableParent: {
        '& > tr td': {
            paddingBottom: 4,
            color: '#414048',
        },
        '& > tr td:nth-child(2)': {
            paddingLeft: 20,
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
    renderHtml: {
        display: 'block',
        '& ol, & ul': {
            paddingLeft: 20,
        },
    },
}));
