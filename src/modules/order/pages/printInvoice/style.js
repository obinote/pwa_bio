import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    logo: {
        width: 170,
    },
    dateSubtitle: {
        fontSize: 16,
    },
    secondTitle: {
        textTransform: 'uppercase',
        textDecoration: 'underline',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    topDetails: {
        display: 'flex',
        gap: '4rem',
        marginBottom: 28,
    },
    summary: {
        marginTop: 46,
        width: 'max-content',
        marginLeft: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        rowGap: 22,
        columnGap: 22,
        paddingRight: 32,
        '& > *:nth-child(odd)': {
            textTransform: 'capitalize',
        },
        '& .promo-wrapper': {
            display: 'flex',
            gridColumn: '1 / -1',
            width: '100%',
            justifyContent: 'space-between',
        },
    },
    hidden: {
        display: 'none',
    },
    showInPrint: {
        '@media print': {
            display: 'inline',
        },
    },
    hideInPrint: {
        '@media print': {
            display: 'none',
        },
    },

    bold: {
        fontWeight: 'bold',
    },
}));
