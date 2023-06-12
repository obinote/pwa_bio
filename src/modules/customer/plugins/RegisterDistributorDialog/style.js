import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    modalTitleContainer: {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
    },
    modalTitle: {
        border: 'none',
        fontSize: '30px',
        color: '#42929d',
        fontWeight: 400,
    },
    containerActionButton: {
        padding: '10px 24px 18px',
    },
    buttonAction: {
        borderRadius: '50px',
        backgroundColor: '#f58732',
        borderColor: '#f58732',
        padding: '0 25px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 400,
        height: '40px',
    },
}));
