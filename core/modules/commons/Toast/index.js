import Snackbar from '@material-ui/core/Snackbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px 20px',
        overflow: 'hidden',
        wordWrap: 'break-word',
        width: '100%',
        display: 'flex',
        color: '#FFFFFF',
        alignItems: 'center',
        fontSize: 14,
        maxWidth: 640,
        background: 'transparent',
        margin: 'auto',
        boxShadow: 'none',
        justifyContent: 'center',
        minHeight: 50,
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
        },
        '& .MuiAlert-action': {
            [theme.breakpoints.up('sm')]: {
                position: 'absolute',
                right: 25,
            },
        },
    },
    message: {
        wordWrap: 'break-word',
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

function Alert(props) {
    const styles = useStyles();
    return <MuiAlert elevation={6} classes={{ root: styles.container, message: styles.message }} variant="standard" {...props} />;
}

const Toast = ({
    open, message, setOpen, variant = 'info', autoHideDuration = 3000,
}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <div className="alert-wrapper">
                <Alert onClose={handleClose} severity={variant}>
                    {message}
                </Alert>
            </div>
        </Snackbar>
    );
};

export default Toast;
