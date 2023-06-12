import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/order/pages/detail/style';

const Loader = () => {
    const styles = useStyles();
    return (
        <div className={classNames('column', styles.orderDetail)}>
            <div className={classNames(styles.blockHeader)}>
                <Skeleton variant="text" height={59} width="40%" className={classNames('clear-margin-padding', styles.headerTitle)} />
            </div>
            <div className={classNames('row', styles.containerHeaderStatus)}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className={classNames(styles.blockHeaderStatus)}>
                        <Skeleton variant="text" width="20%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                    </div>
                    <div className={classNames(styles.blockHeaderStatus)}>
                        <Skeleton variant="text" width="20%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                    </div>
                    <div className={classNames(styles.blockHeaderStatus)}>
                        <div className="status-payment-wrapper">
                            <Skeleton variant="text" width="40%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                        </div>
                    </div>
                    <div className={classNames(styles.blockHeaderStatus)}>
                        <Skeleton variant="text" width="40%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                    </div>
                </div>
            </div>

            <div>
                <Skeleton variant="text" height={151} />
            </div>

            <div className={styles.wrapperButton}>
                <Skeleton variant="text" height={17} width="100%" />
            </div>
            <div style={{ margin: '20px 0px' }}>
                <Skeleton variant="rect" height={40} width={140} className={styles.orderTab} />
                <Skeleton variant="rect" height={400} width="100%" />
            </div>

            <div className={classNames(styles.block)}>
                <div className="row center-xs start-sm start-sm start-md start-lg">
                    <div className="col-xs-12">
                        <Skeleton width={180} variant="text" />
                        <div className={styles.shipmentDetail}>
                            <Skeleton variant="text" width="40%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                            <Skeleton variant="text" width="40%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                            <Skeleton variant="text" width="40%" className={classNames('clear-margin-padding', styles.headerOrder)} />
                        </div>
                        <Skeleton variant="rect" height={90} width="100%" style={{ marginBottom: '20px' }} />
                    </div>
                </div>
            </div>

            <div className={classNames(styles.block, styles.orderInformation)}>
                <div className="row center-xs start-sm start-sm start-md start-lg">
                    <div className="col-xs-12">
                        <Skeleton varian="text" width={120} height={22} />
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Skeleton varian="text" width={120} height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Skeleton varian="text" width={120} height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Skeleton varian="text" width={120} height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="80%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                        <Skeleton varian="text" width="100%" height={22} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
