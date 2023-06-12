/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow, CreatePadding } from '@theme_mixins';

export default makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        ...CreatePadding(14, 14, 14, 14),
        borderRadius: 20,
        outline: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25vw',
            maxWidth: 600,
        },
        [theme.breakpoints.down('md')]: {
            width: '60vw',
        },
    },
    popupHeader: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    popupTitle: {
        fontSize: 18,
    },
    btnClose: {
        ...CreatePadding(4, 4, 4, 4),
        cursor: 'pointer',
    },
    popupBody: {
        ...FlexColumn,
    },
}));
