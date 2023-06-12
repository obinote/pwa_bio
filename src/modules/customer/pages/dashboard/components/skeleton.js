/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@src_modules/customer/pages/dashboard/components/style';
import classNames from 'classnames';
import Typography from '@common_typography';

const SkeletonLoader = (props) => {
    const { t } = props;
    const styles = useStyles();
    return (
        <>
            <div className={classNames(styles.wrapperDashboard, 'container')}>
                <div className="wrapper-header-dashboard skeleton">
                    <div className="header-dashboard-title">
                        <Typography variant="h1" type="bold" className="dashboard-title">
                            <Skeleton animation="wave" variant="text" width="25%" height={25} />
                        </Typography>
                    </div>
                    <div className="header-dashboard-subtitle">
                        <div className="header-dashboard-email">
                            <Typography variant="h4" type="bold" className="vendor-title">
                                <Skeleton animation="wave" variant="text" width="15%" height={25} />
                            </Typography>
                            <div className="header-dashboard-email-content">
                                <Typography variant="h4" type="normal">
                                    <Skeleton animation="wave" variant="text" width="15%" height={25} />
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper-report-dashboard">
                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                </div>
                <div className="wrapper-report-dashboard">
                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                </div>
                <div className="wrapper-notification-dashboard skeleton">
                    <Skeleton animation="wave" variant="text" width="100%" height={25} />
                </div>
            </div>
        </>
    );
};

export default SkeletonLoader;
