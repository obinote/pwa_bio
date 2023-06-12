import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
    },
    fieldContainer: {
        borderTop: '0.5px solid #D5EAFB',
        border: 0,
        padding: 0,
    },
    fieldContent: {
        width: '50%',
        margin: 'auto',
        paddingTop: 32,
        paddingBottom: 32,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
        },
    },

}));
