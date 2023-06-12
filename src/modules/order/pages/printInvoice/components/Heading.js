import useStyles from '@core_modules/order/pages/printInvoice/style';
import Link from 'next/link';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import { useTranslation } from '@i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const TitleChip = withStyles({
    outlined: {
        borderWidth: 2,
        borderRadius: 3,
        fontSize: 14,
        textTransform: 'uppercase',
    },
})(Chip);

const Heading = ({ details, storeConfig }) => {
    const { t, i18n } = useTranslation();
    const styles = useStyles();
    const date = i18n.language === 'id'
        ? dayjs(details.order_date).locale(i18n.language).format('DD MMMM YYYY')
        : dayjs(details.order_date).format('MMMM DD, YYYY');

    return (
        <>
            <Link href="/">
                <img className={styles.logo} alt="Logo" src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`} />
            </Link>
            <Box display="flex" alignItems="center" mt="0.8rem" style={{ gap: '2rem' }}>
                <h1 style={{ fontSize: 26 }}>
                    Order #
                    {details.order_number}
                </h1>
                <TitleChip label={details.status_label} variant="outlined" />
            </Box>
            <p className={styles.dateSubtitle}>{date}</p>
            <Box component="p" mt="1rem" mb="4rem">
                <b>
                    {t('order:paymentStatus')}
                    :
                    {' '}
                </b>
                <span>{t(`order:${details.payment_status.toLowerCase()}`)}</span>
            </Box>
        </>
    );
};

export default Heading;
