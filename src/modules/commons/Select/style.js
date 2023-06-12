import makeStyles from '@material-ui/core/styles/makeStyles';
import { RED } from '@theme_color';

export default makeStyles(() => ({
    root: {
        marginTop: 10,
        // marginBottom: 20,
        '& .MuiFormLabel-asterisk': {
            color: RED,
            '&$error': {
                color: RED,
            },
        },
    },
    errorInfo: {
        fontSize: 12,
        fontWeight: 400,
    },
}));
