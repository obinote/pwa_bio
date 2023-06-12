import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    etalaseContainer: {
        width: '100%',
    },
    sellerEtalase: {

    },
    etalaseH3: {
        fontWeight: 600,
        lineHeight: 1.1,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    etalaseList: {
        padding: 0,
        border: '1px solid #d5eafb',
        marginBottom: 20,
    },
    etalaseItem: {
        borderBottom: '1px solid #d5eafb',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            pointerEvents: 'none',
        },
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
    dialogContainer: {
        backgroundColor: '#fff',
        width: '80vw',
        maxHeight: '75vh',
        margin: 'auto',
        boxShadow: '0 10px 50px rgb(0 0 0 / 50%)',
        padding: 0,
        borderRadius: 8,
        '& div': {
            pointerEvents: 'auto',
        },
    },
    dialogList: {
        height: '65vh',
        overflowY: 'scroll',
    },
    dialogBack: {
        maxHeight: '10vh',
        textAlign: 'center',
        padding: 20,
        fontSize: 18,
        backgroundColor: '#f58732',
        color: '#fff',
        fontWeight: 700,
        cursor: 'pointer',
    },
    dialogBackLabel: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
    },
}));

export default useStyles;
