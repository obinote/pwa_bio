import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    tableRowHead: {
        borderTop: '1px solid #414048',
        borderBottom: '1px solid #414048',
    },
    tableContainer: {
        marginTop: 30,
        boxShadow: 'none',
        width: '100%',
    },
    productImgContainer: {
        width: 105,
        height: 130,
    },
    productImg: {
        width: 105,
        height: 'auto',
    },
}));
