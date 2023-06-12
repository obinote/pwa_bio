import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(({
    etalaseContainer: {
        // width: '20%',
    },
    sellerEtalase: {

    },
    etalaseH3: {
        fontWeight: 600,
        lineHeight: 1.1,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
    },
    etalaseList: {
        padding: 0,
        border: '1px solid #d5eafb',
        marginBottom: 20,
    },
    etalaseItem: {
        borderBottom: '1px solid #d5eafb',
        cursor: 'pointer',
    },
    etalaseItemSelected: {
        backgroundColor: '#f2f9ff !important',
    },
    etalaseLabel: {
        minHeight: 46,
        verticalAlign: 'middle',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontSize: 16,
        color: '#414048',
    },
    etalaseLabelSelected: {
        color: '#7b9aaf !important',
    },
}));

export default useStyles;
