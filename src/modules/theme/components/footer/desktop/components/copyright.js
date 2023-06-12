/* eslint-disable react/no-unknown-property */
import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';

const Copyright = (props) => {
    const {
        t, loading, error, storeConfig,
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;
    return (
        <div className="copyright">
            <span>{storeConfig.copyright}</span>
            <style jsx global>
                {`
                    .copyright {
                        // border-top: 1px solid #e7f3ff;
                        background: #ffffff;
                        color: #b7b7b7;
                        font-size: 12px;
                        text-align: center;
                        max-width: 1280px;
                        padding: 20px 10px 20px 10px;
                        margin: auto;
                    }
                    .copyright span {
                        color: #7b9aaf;
                        letter-spacing: 0.01em;
                        font-weight: 500;
                    }
                `}
            </style>
        </div>
    );
};

export default Copyright;
