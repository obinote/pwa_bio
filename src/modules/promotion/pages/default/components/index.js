/* eslint-disable linebreak-style */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-unescaped-entities */
import Typography from '@common_typography';
import useStyles from '@core_modules/promotion/pages/default/components/style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import PromotionCmsBlock from '@core_modules/promotion/pages/default/components/cms';
import Skeleton from '@core_modules/promotion/pages/default/components/skeleton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

// import PromotionCmsBlockTnc from '@core_modules/promotion/pages/default/components/tnc';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import { CloseRounded } from '@root/node_modules/@material-ui/icons/index';

const PromotionPage = (props) => {
    const {
        t, data, loading,
        localDateString,
    } = props;

    if (loading) return <><Skeleton /></>;
    // if (loading) return <>Loading...</>;
    // if (error) return <Layout {...props}><Alert severity="error">{`Error: ${error.message}`}</Alert></Layout>;
    // if (!data) return <>No Data</>;
    const styles = useStyles();

    // const [open, setOpen] = React.useState(false);
    // const [promoTitle, setPromoTitle] = React.useState();
    // const handleOpenTnc = (title) => {
    //     setOpen(true);
    //     setPromoTitle(title);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleCopy = async (couponcode) => {
        try {
            await window.navigator.clipboard.writeText(couponcode);
        } catch (e) {
            const inputCopy = document.createElement('input');
            inputCopy.value = couponcode;
            document.body.appendChild(inputCopy);
            inputCopy.select();
            document.execCommand('copy');
            document.body.removeChild(inputCopy);
        }

        window.toastMessage({
            open: true,
            text: `${couponcode} ${t('promotion:copied')}`,
            variant: 'success',
        });
    };

    return (
        <div className={styles.wrapperPromotion}>
            <div className="banner-section container">
                <div className="title">
                    <h1>{t('promotion:pageTitle')}</h1>
                    <h3>{t('promotion:subTitle')}</h3>
                </div>
                <PromotionCmsBlock />
            </div>
            {data && (
                <>
                    <div className="coupon-section">
                        <div className="inner-coupon-section container">
                            <div className="title">
                                <h2>{t('promotion:promoDistributor')}</h2>
                            </div>
                            <List className="coupon-items">
                                {data.getCustomerSalesRule.sales_rules.map((item, i) => (
                                    <ListItem key={i}>
                                        <div className="inner">
                                            <div className={`inner-header ${item.seller_name}`}>
                                                <div className="item coupon-name">
                                                    <Typography>{item.name}</Typography>
                                                </div>
                                                <div className="inner-icon" />
                                            </div>
                                            <div className="inner-content">
                                                <div className="item desc">
                                                    <Typography>
                                                        {item.description}
                                                        {' '}
                                                        {t('promotion:in')}
                                                        {' '}
                                                        {item.seller_name}
                                                    </Typography>
                                                </div>
                                                <div className="item coupon-period">
                                                    <div className="label">{t('customer:voucher:promoPeriod')}</div>
                                                    <Typography>
                                                        {localDateString(item.start_date)}
                                                        {' '}
                                                        -
                                                        {' '}
                                                        {localDateString(item.end_date)}
                                                    </Typography>
                                                </div>
                                                {item.coupon_code && (
                                                    <div className="item coupon-code">
                                                        {/* <div className="label">{t('customer:voucher:promoCode')}</div> */}
                                                        <div className="value">
                                                            <div className="box"><Typography>{item.coupon_code}</Typography></div>
                                                            <div className="action">
                                                                <FileCopyOutlinedIcon />
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => {
                                                                        handleCopy(item.coupon_code);
                                                                    }}
                                                                >
                                                                    {t('customer:voucher:copy')}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* <Button className="tnc" onClick={() => handleOpenTnc(item.name)}>{t('promotion:link')}</Button> */}
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                    {/* <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classNames(styles.modalTnc, 'modal-tnc')}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className="inner-tnc">
                                <Typography variant="h2">{promoTitle}</Typography>
                                <Button className="close" onClick={handleClose}>
                                    <CloseRounded />
                                </Button>
                                <PromotionCmsBlockTnc />
                            </div>
                        </Fade>
                    </Modal> */}
                </>
            )}
        </div>
    );
};

export default PromotionPage;
