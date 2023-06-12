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
import useStyles from '@core_modules/order/pages/overdue/components/style';
import SkeletonLoader from '@core_modules/blog/pages/category/components/Skeleton';

const TotalPiutang = (props) => {
    const {
        data: dataOverdue, t, loading,
    } = props;
    const styles = useStyles();

    return (
        <Container className={styles.container}>
            {/* Total Piutang */
                loading ? (
                    <SkeletonLoader />
                )
                    : dataOverdue && dataOverdue.total_amount > 0
                        ? (
                            <>
                                {/* Total Piutang */}
                                <div className={styles.boxContainerPiutang}>
                                    <div>
                                        <Typography variant="title" className={styles.titlePiutang}>{t('order:overdue:totalPiutang')}</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="overline" className={styles.valuePiutang}>
                                            {formatPrice(Math.round(dataOverdue.total_amount) || 'IDR')}
                                        </Typography>
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <div className={styles.boxContainerPiutang}>
                                <div>
                                    <Typography variant="title" className={styles.titlePiutang}>{t('order:overdue:totalPiutang')}</Typography>
                                </div>
                                <div>
                                    <Typography variant="overline" className={styles.valuePiutang}>Rp. 0</Typography>
                                </div>
                            </div>
                        )
            }
        </Container>
    );
};

export default TotalPiutang;
