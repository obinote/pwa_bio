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
import useStyles from '@core_modules/customer/plugins/EscalateTicketDialog/style';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const EscalateTicketDialog = ({
    open = false, handleYes, message, confirmationMessage, handleCancel, titleMessage, messageEscalate, handleChangeMessageEscalate,
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
                <DialogContentText id="alert-dialog-description" className={styles.modalContent}>
                    {message}
                    {confirmationMessage !== '' ? (
                        <>
                            <br />
                            <br />
                            <strong>
                                {confirmationMessage}
                            </strong>

                            <textarea
                                rows={5}
                                cols={5}
                                id="content"
                                className={styles.inputArea}
                                type="text"
                                name="content"
                                value={messageEscalate}
                                onChange={handleChangeMessageEscalate}
                                autoComplete="off"
                            />
                        </>
                    ) : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={styles.actionContainer}>
                {/* <Button
                    onClick={handleYes}
                    color="primary"
                    autoFocus
                    align="right"
                    className={styles.buttonAction}
                    rootClassName={styles.containerActionButton}
                >
                    {t('common:menu:register')}
                </Button> */}
                <Button
                    onClick={handleCancel}
                    color="#333333"
                    align="left"
                    className={styles.buttonActionCancel}
                    rootClassName={styles.containerActionButton}
                >
                    {t('common:button:cancel')}
                </Button>
                <Button
                    onClick={handleYes}
                    color="primary"
                    autoFocus
                    align="left"
                    className={styles.buttonAction}
                    rootClassName={styles.containerActionButton}
                >
                    {t('common:button:escalateToAdmin')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EscalateTicketDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    titleMessage: propTypes.string,
    message: propTypes.string,
};

EscalateTicketDialog.defaultProps = {
    message: 'Are you Sure ?',
    titleMessage: '',
};

export default EscalateTicketDialog;
