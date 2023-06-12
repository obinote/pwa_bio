/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@src_modules/customer/pages/point/components/style';
import classNames from 'classnames';
import Typography from '@common_typography';

const SkeletonLoader = (props) => {
    const {
        t,
    } = props;
    const styles = useStyles();
    const data = [1, 2, 3];
    return (
        <div className={classNames(styles.wrapperPoint, 'container')}>
            <div className="wrapper-header-point">
                <div className="header-point">
                    <div className="header-token" />
                    <div className="header-content" style={{ width: '100%' }}>
                        <Typography variant="span" type="normal" size="12" style={{ color: '#7B9AAF' }}>
                            <Skeleton animation="wave" variant="text" height={25} width="20%" />
                        </Typography>
                        <Typography variant="span" type="bold" style={{ color: '#414048' }} className="span-point">
                            <Skeleton animation="wave" variant="text" height={25} width="20%" />
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="wrapper-content">
                <div className="content-point">
                    <Typography variant="h2" type="bold" className="span-point-title">
                        {t('customer:point:historyTransaction')}
                    </Typography>
                    {data.map((i) => (
                        <div className="history-point" key={i}>
                            <div className={styles.skeleton}>
                                <Skeleton animation="wave" variant="text" height={40} width="20%" />
                                <Skeleton animation="wave" variant="text" height={40} width="5%" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
