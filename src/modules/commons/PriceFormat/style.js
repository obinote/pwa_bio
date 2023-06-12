import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noMargin: {
        margin: 0,
        fontSize: 30,
        marginRight: 10,
        color: '#414048',
    },
    oldPrice: {
        fontSize: 18,
        color: '#7B9AAF',
        fontWeight: 400,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    finalPrice: {
        fontSize: 35,
        marginRight: 10,
        color: '#414048',
        [theme.breakpoints.down('xs')]: {
            fontSize: 25,
        },
    },
}));

export default useStyles;
