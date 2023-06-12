/* eslint-disable react/no-danger */
import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig, onlyCms, ...other
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }

    if (loading) return <Loading open={loading} />;
    if (onlyCms) return <CmsRenderer {...other} t={t} content={data.cmsPage.pwa_content} storeConfig={storeConfig} />;

    return (
        <div className="cms-container">
            {/* eslint-disable-next-line react/no-danger */}
            {data.cmsPage.content_heading && (
                <div className="page-title-wrapper">
                    <h1 className="page-title text-center" dangerouslySetInnerHTML={{ __html: data.cmsPage.content_heading }} />
                </div>
            )}
            <CmsRenderer {...other} t={t} content={data.cmsPage.pwa_content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
