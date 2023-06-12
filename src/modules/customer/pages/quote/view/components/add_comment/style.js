/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE_GRAY } from '@theme_color';

export default makeStyles((theme) => ({
    wrapper: {
        padding: 17,
    },
    title: {
        marginBottom: 12,
    },
    txt: {
        padding: 8,
        font: 14,
        width: '100%',
        maxWidth: '100%',
        border: '1px solid #D5EAFB',
        outline: 'none',
    },
    txtComment: {
        marginBottom: 6,
    },
    inputContainer: {
        display: 'block',
        backgroundColor: '#F2F9FF',
        padding: 8,
        marginTop: 12,
    },
    labelFile: {},
    inputFile: {
        display: 'none',
    },
    clipIcon: {
        width: 28,
        height: 28,
        marginRight: 4,
    },
    btnFile: {
        color: '#F58732',
        textTransform: 'none',
        padding: 0,
        marginLeft: 4,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    attachInfo: {
        marginLeft: 8,
        color: BLUE_GRAY,
    },
    fileName: {
        marginLeft: 8,
    },
    btn: {
        textTransform: 'capitalize',
        marginTop: 18,
        color: '#F58732',
        border: '1px solid #F58732',
        '&:hover': {
            backgroundColor: '#F58732',
            color: '#fff',
        },
    },
}));
