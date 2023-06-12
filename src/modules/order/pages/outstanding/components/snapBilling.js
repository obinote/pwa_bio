/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

// import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@common_typography';
import { Container, Button, Box } from '@root/node_modules/@material-ui/core/index';
import Alert from '@material-ui/lab/Alert';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/outstanding/components/style';

const RadioButtonsGroup = (props) => {
    const {
        t, dataSnap, loadMore, setValueSnapBilling = () => {}, valueSnapBilling,
        getUrlBilling = () => {}, setPageOrder = () => {},
    } = props;

    const styles = useStyles();

    const handleChange = (event) => {
        setValueSnapBilling(event.target.value);
    };

    return (
        <Container className={styles.containerSnapBilling}>
            {/* Snap Billing */}
            <div>
                <FormControl className={styles.FormControlSnapBilling}>
                    <FormLabel><Typography variant="title" className={styles.snapBillingTitle}>{t('order:outstanding:snapBillingTitle')}</Typography></FormLabel>
                    <FormLabel><Typography variant="title" type="normal" className={styles.snapBillingDescription}>{t('order:outstanding:snapBillingDescription')}</Typography></FormLabel>
                    {
                        loadMore ? (
                            <SkeletonContent />
                        )
                            : dataSnap && dataSnap.payment.length > 0
                                ? (
                                    <>
                                        {
                                            dataSnap.payment.map((val, index) => (
                                                <RadioGroup
                                                    key={index}
                                                    value={valueSnapBilling}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={val.code} control={<Radio />} label={val.title} />
                                                </RadioGroup>
                                            ))
                                        }
                                    </>
                                )
                                : (
                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                )
                    }
                </FormControl>
                <br />
                <Box className={styles.boxButtonPay}>
                    <Button onClick={getUrlBilling} type="button" className={styles.buttonPaymentSnapBilling}><Typography variant="subtitle2">{t('order:outstanding:payBilling')}</Typography></Button>
                    <Button onClick={() => setPageOrder(1)} type="button" className={styles.buttonCanceleBilling}><Typography variant="subtitle2">{t('order:outstanding:cancelCreateBilling')}</Typography></Button>
                </Box>
            </div>
        </Container>
    );
};

export default RadioButtonsGroup;
