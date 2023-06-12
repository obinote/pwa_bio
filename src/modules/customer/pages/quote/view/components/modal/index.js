/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Typography from '@common_typography';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import useStyles from '@src_modules/customer/pages/quote/view/components/modal/style';

const CustomModal = (props) => {
    const {
        title, children, modalOpen, handleModalClose,
    } = props;
    const styles = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={modalOpen}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            title={title}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modalOpen}>
                <div className={styles.popup}>
                    <div className={styles.popupHeader}>
                        <Typography variant="p" type="bold" size="14" className={styles.popupTitle}>
                            {title}
                        </Typography>
                        <div className={styles.btnClose} onClick={handleModalClose}>
                            <CloseOutlinedIcon />
                        </div>
                    </div>
                    <div className={styles.popupBody}>{children}</div>
                </div>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
