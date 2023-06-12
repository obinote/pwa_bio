import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    typeContainer: {
        textTransform: 'lowercase',
    },
    historyContainer: {
        marginTop: 16,
    },
    changesContainer: {
        fontSize: 14,
        whiteSpace: 'normal',
        marginTop: 4,
    },
    oldValue: {
        textDecoration: 'line-through',
        marginRight: 8,
    },
    commentContainer: {
        padding: 24,
        borderBottom: '1px solid #d5eafb',
        '&:last-child': {
            borderBottom: 'none',
        },
        '& span:nth-child(1)': {
            width: 200,
        },
        '& span:nth-child(2)': {
            marginTop: 12,
            height: 28,
        },
        '& span:nth-child(3)': {
            marginTop: 12,
            height: 14,
        },
    },
    loaderContainer: {
        height: 25,
        display: 'flex',
        alignItems: 'center',
    },
    loadPrevious: {
        textDecoration: 'underline',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        whiteSpace: 'normal',
    },
}));
