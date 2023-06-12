import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    previewContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#fff',
        padding: 10,
        borderRadius: 14,
        '& img': {
            width: 72,
            height: 'auto',
        },
        '& .product-info': {
            width: '65%',
            '& a': {
                fontSize: 14,
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineClamp: 2,
                display: '-webkit-box',
                boxOrient: 'vertical',
            },
            '& .price': {
                color: '#414048',
            },
        },
        '& .product-image': {
            width: '35%',
        },
    },
    previewOrderContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        '& a': {
            color: '#06aec9',
        },
        '& .total-order': {
            fontWeight: 'bold',
        },
    },
    order: {
        boxShadow: '1px 1px 2px 1px #B5BBC5',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '5px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    textOrder: {
        fontSize: "12px",
        color: "#68779F",
        wordBreak: "break-word", 
    }
}));
