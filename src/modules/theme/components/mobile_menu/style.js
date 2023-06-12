/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';
import { WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100vw',
        display: 'block',
        position: 'fixed',
        left: 0,
        bottom: 0,
        backgroundColor: WHITE,
        boxShadow: '0px 0px 6px #00000040',
        zIndex: 85,
        '& .row': {
            ...CreatePadding(0, 10, 0, 10),
        },
    },
    container: {
        display: 'flex',
        width: '100%',
        padding: 0,
        margin: 0,
    },
    col: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0,
    },
    btn: {
        '& > span': {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    btnText: {
        padding: 0,
        margin: 0,
        color: '#7B9AAF',
        fontSize: 10,
        fontWeight: 400,
    },
}));

export default useStyles;
