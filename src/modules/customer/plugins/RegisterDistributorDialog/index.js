/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@common_button';
import propTypes from 'prop-types';
import { useTranslation } from '@i18n';
import useStyles from '@core_modules/customer/plugins/RegisterDistributorDialog/style';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const RegisterDistributorDialog = ({
    open = false, handleYes, message, confirmationMessage, handleCancel, titleMessage,
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    return (
        <Dialog
            open={open}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle disableTypography className={styles.modalTitleContainer}>
                <Typography className={styles.modalTitle} variant="h2">{titleMessage}</Typography>
                <IconButton aria-label="close" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{ color: 'rgba(0, 0, 0, 0.75' }}>
                    {message}
                    {confirmationMessage !== '' ? (
                        <>
                            <br />
                            <br />
                            <strong>
                                {confirmationMessage}
                            </strong>
                        </>
                    ) : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleYes}
                    color="primary"
                    autoFocus
                    align="right"
                    className={styles.buttonAction}
                    rootClassName={styles.containerActionButton}
                >
                    {t('common:menu:register')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RegisterDistributorDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    titleMessage: propTypes.string,
    message: propTypes.string,
};

RegisterDistributorDialog.defaultProps = {
    message: 'Are you Sure ?',
    titleMessage: '',
};

export default RegisterDistributorDialog;
