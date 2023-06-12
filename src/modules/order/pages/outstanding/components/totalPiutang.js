/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import Typography from '@common_typography';
import { Container } from '@root/node_modules/@material-ui/core/index';
import { formatPrice } from '@helper_currency';
import useStyles from '@core_modules/order/pages/outstanding/components/style';
import Image from '@core_modules/commons/SliderPromoSwiper/Banner/Thumbor';

const TotalPiutang = (props) => {
    const { dataOrderOutstandingPiutang, t } = props;
    const styles = useStyles();
    return (
        <Container className={styles.container}>
            {
                /* Total Piutang */
                dataOrderOutstandingPiutang && dataOrderOutstandingPiutang.total_amount > 0 ? (
                    <>
                        {/* Total Piutang */}
                        <div className={styles.boxContainerPiutang}>
                            <div className={styles.boxImage}>
                                <Image src="/assets/img/user_application_danger.svg" />
                            </div>
                            <div>
                                <Typography variant="title" className={styles.titlePiutang}>
                                    {t('order:outstanding:totalPiutang')}
                                </Typography>
                                <Typography variant="overline" className={styles.valuePiutang}>
                                    {formatPrice(Math.round(dataOrderOutstandingPiutang.total_amount) || 'IDR')}
                                </Typography>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.boxContainerPiutang}>
                        <div className={styles.boxImage}>
                            <Image src="/assets/img/user_application_danger.svg" />
                        </div>
                        <div>
                            <Typography variant="title" className={styles.titlePiutang}>
                                {t('order:outstanding:totalPiutang')}
                            </Typography>
                            <Typography variant="overline" className={styles.valuePiutang}>
                                Rp. 0
                            </Typography>
                        </div>
                    </div>
                )
            }
        </Container>
    );
};

export default TotalPiutang;
