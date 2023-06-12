import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    logo: {
        width: 170,
    },
    headingContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    dateSubtitle: {
        fontSize: 16,
    },
    contentWrapper: {
        border: '1px solid #ccc',
        padding: 25,
        marginTop: 36,
    },
    contentTitle: {
        fontSize: 24,
        paddingBottom: 8,
    },
    orderInfoTitle: {
        fontSize: 18,
        textTransform: 'uppercase',
        marginTop: '2rem',
        paddingBottom: 8,
    },
    orderInfo: {
        display: 'flex',
        gap: '4rem',
        marginBottom: 28,
        flexWrap: 'wrap',
        '& > * > *:first-child': {
            paddingBottom: 12,
        },
    },
    paymentMehodGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '1rem',
        marginTop: '1rem',
    },
    rowBorder: {
        borderBottom: '1px solid #ccc',
        gridColumn: '1 / -1',
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
