import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/detail/components/OrderComplete/style';
import { sendOrderCompletion } from '@core_modules/order/services/graphql/';

export const ModalComplete = (props) => {
    const {
        t, modalComplete, handleModalClose, orderDetailRefetch, orderId,
        openRatingModal,
    } = props;
    const styles = useStyles();

    const [addCompleteOrder] = sendOrderCompletion();

    const handleCompleteOrder = async () => {
        handleModalClose();
        window.backdropLoader(true);
        try {
            const completeOrder = await addCompleteOrder({
                variables: {
                    orderId,
                },
            });
            if (completeOrder?.data?.sendOrderCompletion?.status) {
                await orderDetailRefetch();
                openRatingModal();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('order:completOrderSuccess'),
                    variant: 'success',
                });
            } else {
                const message = completeOrder?.data?.sendOrderCompletion?.message;
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: message ?? t('order:completOrderError'),
                    variant: 'error',
                });
            }
        } catch (e) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('order:completOrderError'),
                variant: 'error',
            });
        }
    };

    return (
        <Dialog className={classNames(styles.customModalComplete)} fullWidth maxWidth="xs" open={modalComplete} close={handleModalClose}>
            <DialogTitle className="modal-complete-title">
                <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleModalClose}>
                    <CloseIcon size="large" color="secondary" />
                </Button>
            </DialogTitle>
            <DialogContent className="modal-complete-content">
                <Typography variant="h2" type="bold" size="18">
                    {t('order:modalComplete:title')}
                </Typography>
                <Typography variant="span" type="normal" size="14">
                    {t('order:modalComplete:description')}
                </Typography>
            </DialogContent>
            <DialogActions className="modal-action">
                <Button className={classNames(styles.buttonYes)} onClick={() => handleCompleteOrder()}>
                    <Typography variant="p" type="normal" color="white" size="14">
                        {t('order:modalComplete:btnSubmit')}
                    </Typography>
                </Button>
                <Button className={classNames(styles.buttonTransparent)} onClick={handleModalClose}>
                    <Typography variant="p" type="normal" size="14">
                        {t('order:modalComplete:btnCancel')}
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalComplete;
