/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@common_button';
import propTypes from 'prop-types';
import { useTranslation } from '@i18n';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    generalButton: {
        fontWeight: 400,
        textTransform: 'capitalize',
        letterSpacing: 0,
        width: 105,
        height: 41,
    },
}));
const ConfirmationDialog = ({
    open = false, handleYes, handleCancel, message, confirmationMessage, confirmOnly = false, yesNo = false,
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{ color: '#414048', letterSpacing: 0 }}>
                    {message}
                    {confirmationMessage !== '' ? (
                        <>
                            <br />
                            {confirmationMessage}
                        </>
                    ) : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: '0rem 0rem 1rem' }}>
                {confirmOnly ? (
                    <Button onClick={handleYes} style={{ color: '#F58732' }} autoFocus>
                        {t('common:button:confirm')}
                    </Button>
                ) : (
                    <>
                        <Button onClick={handleYes} className={styles.generalButton} style={{ backgroundColor: '#F58732' }} autoFocus align="right">
                            {t('common:button:yes')}
                        </Button>
                        <Button onClick={handleCancel} variant="text" className={styles.generalButton} style={{ color: '#F58732' }} align="left">
                            {!yesNo ? t('common:button:cancel') : t('common:button:no')}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    handleCancel: propTypes.func.isRequired,
    message: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    message: 'Are you Sure ?',
};

export default ConfirmationDialog;
