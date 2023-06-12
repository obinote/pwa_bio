import useStyles from '@core_modules/digitalsign/pages/default/components/style';
import Router from 'next/router';
import Typography from '@common_typography';
import Skeleton from '@material-ui/lab/Skeleton';

const DigitalSign = (props) => {
    const styles = useStyles();
    const { t, storeConfig, dataSign } = props;
    const imgIcon = '/assets/img/file.svg';
    const imgIcon1 = '/assets/img/user.svg';
    const imgIcon2 = '/assets/img/building.svg';

    const BackToStore = () => {
        Router.push('/');
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.stickyCheckoutHeader}>
                    <div id="header">
                        <div className="link-backtostore" onClick={BackToStore}>
                            <img className="logo" src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`} alt="logo" />
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <Typography variant="h1" type="bold" letter="none" align="center" className={styles.title}>
                        {t('digitalsign:title')}
                    </Typography>
                </div>
                <div className={[styles.info, styles.mb_40].join(' ')}>
                    <Typography variant="span" className={styles.infoOrderId} letter="none">
                        {`${t('digitalsign:description')}`}
                    </Typography>
                </div>
                <div className={styles.datadetailcontainer}>
                    <div className={styles.detailData}>
                        <img className={styles.imgIcon} src={imgIcon} alt="success" />
                        <div>
                            <Typography variant="p" letter="none" className={styles.dataLable} color="#7B9AAF">
                                {`${t('digitalsign:nomorsurat')}`}
                            </Typography>
                            {!dataSign.letterNumber && (
                                <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                    <Skeleton variant="text" width="100%" />
                                </Typography>
                            )}
                            <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                {dataSign.letterNumber ?? ''}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.detailData}>
                        <img className={styles.imgIcon} src={imgIcon2} alt="success" />
                        <div>
                            <Typography variant="p" letter="none" className={styles.dataLable} color="#7B9AAF">
                                {`${t('digitalsign:companyName')}`}
                            </Typography>
                            {!dataSign.companyName && (
                                <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                    <Skeleton variant="text" width="100%" />
                                </Typography>
                            )}
                            <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                {dataSign.companyName ?? ''}
                            </Typography>
                        </div>
                    </div>
                    <div className={[styles.detailData, styles.detailDataLast].join(' ')}>
                        <img className={styles.imgIcon} src={imgIcon1} alt="success" />
                        <div>
                            <Typography variant="p" letter="none" className={styles.dataLable} color="#7B9AAF">
                                {`${t('digitalsign:undersigned')}`}
                            </Typography>
                            {!dataSign.apotekerName && (
                                <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                    <Skeleton variant="text" width="100%" />
                                </Typography>
                            )}
                            <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                {dataSign.apotekerName ?? ''}
                            </Typography>
                            {!dataSign.orderDate && (
                                <Typography variant="p" letter="none" className={styles.dataText} color="#414048" type="bold">
                                    <Skeleton variant="text" width="100%" />
                                </Typography>
                            )}
                            <Typography variant="p" letter="none" className={styles.dataText} color="#414048">
                                {dataSign.orderDate ?? ''}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DigitalSign;
