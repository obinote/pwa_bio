import useStyles from '@src_modules/print/pages/invoice/components/style';
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

const Heading = ({ printData, storeConfig }) => {
    const { t, i18n } = useTranslation();
    const styles = useStyles();
    const date = i18n.language === 'id'
        ? dayjs(printData.printed_at).locale(i18n.language).format('DD MMMM YYYY')
        : dayjs(printData.printed_at).format('MMMM DD, YYYY');
    const generateOrderStatus = (label) => t(`order:labelStatus:${label}`);
    const generatePaymentStatus = (label) => t(`order:outstanding:${label}`);

    return (
        <>
            <Link href="/">
                <img className={styles.logo} alt="Logo" src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`} />
            </Link>
            <div className={styles.headingContainer}>
                <h1 style={{ fontSize: 26, marginRight: 10 }}>
                    {t('order:order')}
                    {' #'}
                    {printData.order_number}
                </h1>
                <TitleChip label={generateOrderStatus(printData.order_status)} variant="outlined" />
            </div>
            <p className={styles.dateSubtitle}>{date}</p>
            <Box component="p" mt="1rem" mb="4rem">
                <b>
                    {t('order:paymentStatus')}
                    :
                    {' '}
                </b>
                <span>{generatePaymentStatus(printData.invoiceSection.payment_status.toLowerCase())}</span>
            </Box>
        </>
    );
};

export default Heading;
