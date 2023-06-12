import Modal from '@material-ui/core/Modal';
import useStyles from '@core_modules/distributor/pages/list/components/Modal/style';
import Button from '@common_button';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { registerToDistributor } from '@core_modules/distributor/services/graphql';
import { useTranslation } from '@i18n';

const ModalContent = ({
    onClose, onRegister, data, loading, error, distributor,
}) => {
    const { t } = useTranslation();
    const styles = useStyles();

    if (loading) {
        return (
            <div>
                <h2 className={classNames(styles.modalTitle)}>{t('distributor:modalLoadingTitle')}</h2>
                <div className={classNames(styles.modalDescription)}>{t('distributor:modalLoadingDesc')}</div>
            </div>
        );
    }

    if (data && data.registerSeller.message === 'success') {
        return (
            <div>
                <div className={classNames(styles.iconSuccessContainer)}>
                    <img src="/assets/img/icon-register-success.svg" alt="Success" />
                </div>
                <h2 className={classNames(styles.modalTitle)}>{t('distributor:modalSuccessTilte')}</h2>
                <div className={classNames(styles.modalDescription)}>{t('distributor:modalSuccessDesc')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2 className={classNames(styles.modalTitle)}>{t('distributor:modalErrorTitle')}</h2>
                <div className={classNames(styles.modalDescription)}>{t('distributor:modalErrorDesc')}</div>
            </div>
        );
    }

    return (
        <div>
            <h2 className={classNames(styles.modalTitle)}>
                {t('distributor:modalRegisterTitle', { distributorName: distributor?.data?.company_name })}
            </h2>
            <div className={classNames(styles.modalDescription)}>{t('distributor:modalRegisterDesc')}</div>
            <div className={classNames(styles.actionWrapper)}>
                <div className={classNames(styles.btnWrapper)}>
                    <Button variant="contained" className={classNames(styles.btnRegister)} onClick={onRegister}>
                        <span>{t('distributor:register')}</span>
                    </Button>
                </div>
                <div className={classNames(styles.btnWrapper)}>
                    <Button onClick={onClose} variant="contained" className={classNames(styles.btnCancel)}>
                        <span>{t('distributor:cancel')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ModalCustom = ({
    open, handleClose, distributor, updateDistributor,
}) => {
    const styles = useStyles();
    const [registerToDistributorGql, {
        data, loading, reset, error,
    }] = registerToDistributor({
        onCompleted: () => {
            updateDistributor(distributor.key);
        },
    });

    const register = () => {
        registerToDistributorGql({
            variables: {
                vendorCode: `${distributor.data.company_code}`,
            },
        });
    };

    const close = () => {
        handleClose();
        reset();
    };

    return (
        <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className={classNames(styles.modal)}>
                {!loading && (
                    <div className={classNames(styles.btnCloseWrapper)}>
                        <IconButton onClick={close}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                )}

                <div>
                    <ModalContent onClose={close} onRegister={register} loading={loading} data={data} error={error} distributor={distributor} />
                </div>
            </Box>
        </Modal>
    );
};

export default ModalCustom;
