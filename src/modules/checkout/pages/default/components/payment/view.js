import Typography from '@common_typography';
import Button from '@common_button';
import commonConfig from '@config';
import ModalHowtoPay from '@core_modules/checkout/pages/default/components/ModalHowtoPay';
import useStyles from '@core_modules/checkout/pages/default/components/style';

/**
 * [VIEW] Payment
 * @param {object} props
 * @returns
 */
const PaymentView = (props) => {
    const styles = useStyles();
    const {
        t, displayHowToPay, setDisplayHowToPay, children,
    } = props;
    const { modules } = commonConfig;
    const [openModal, setModal] = React.useState(false);

    /**
     * [METHOD] handle modal
     * @param {*} state
     */
    const handleModal = (state = false) => {
        setModal(state);
    };

    return (
        <div className={styles.block} id="checkoutPayment">
            <ModalHowtoPay
                open={openModal}
                setOpen={() => handleModal(false)}
                setDisplayHowToPay={setDisplayHowToPay}
            />
            <div className={styles.paymentHeader}>
                <Typography variant="title" type="bold" letter="capitalize">
                    {t('checkout:paymentMethod')}
                </Typography>
                {(modules.checkout.howtoPay.enabled && displayHowToPay) ? (
                    <div>
                        <Button className={styles.howToPay} onClick={() => handleModal(true)}>
                            {t('checkout:howtoPay')}
                        </Button>
                    </div>
                ) : null}
            </div>
            <div>{children}</div>
        </div>
    );
};

export default PaymentView;
