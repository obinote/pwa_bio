import useStyles from '@src_modules/print/pages/shipment/components/style';
import Link from 'next/link';
import Chip from '@material-ui/core/Chip';
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

const Heading = ({ t, storeConfig, printData }) => {
    const { i18n } = useTranslation();
    const styles = useStyles();
    const date = i18n.language === 'id' ? dayjs(new Date()).locale(i18n.language).format('DD MMMM YYYY') : dayjs(new Date()).format('MMMM DD, YYYY');
    const generateLabel = (label) => t(`order:labelStatus:${label}`);
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
                <TitleChip label={generateLabel(printData.order_status)} variant="outlined" />
            </div>
            <p className={styles.dateSubtitle}>
                {t('order:printedAt')}
                {': '}
                {date}
            </p>
        </>
    );
};

export default Heading;
