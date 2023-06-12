/* eslint-disable react/no-unknown-property */
import Loading from '@common_loaders/Backdrop';
import WidgetFooterNewsletter from '@core_modules/cms/components/cms-renderer/widget-footer-newsletter/index';
import Alert from '@material-ui/lab/Alert';
import { MAX_WIDTH } from '@theme_vars';
import replaceAll from '@helpers/replaceAll';

const FooterView = (props) => {
    const {
        data, t, loading, error, footerRef,
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;

    let dataCmsBlock = replaceAll(data.cmsBlocks.items[0]?.content, '&lt;', '<') ?? 'null';
    dataCmsBlock = replaceAll(dataCmsBlock, '&gt;', '>') ?? 'null';

    return (
        <div className="cms-container wrapper-footer" ref={footerRef}>
            {/* eslint-disable-next-line react/no-danger */}
            <WidgetFooterNewsletter {...props} html={dataCmsBlock} />
            <style jsx global>
                {`
                    .wrapper-footer {
                        background-color: #fff;
                        padding: 0;
                        margin-top: 40px;
                    }
                    .container-footer {
                        display: flex;
                        margin-top: 40px;
                        max-width: ${MAX_WIDTH};
                        margin: 0 auto;
                    }
                    .container-footer * {
                        letter-spacing: 0.03em;
                    }
                    .container-footer h4 {
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                    }
                    .container-footer .content-assets ul {
                        list-style: none;
                        padding-left: 0;
                    }
                    .container-footer .content-assets ul li {
                        line-height: 24px;
                        margin-bottom: 6px;
                    }
                    .container-footer .content-assets ul li a {
                        color: #575757;
                    }
                `}
            </style>
        </div>
    );
};

export default FooterView;
