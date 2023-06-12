import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { trackOrderHistory } from '@core_modules/order/services/graphql';

const TrackOrder = (props) => {
    const {
        t, Content, Skeleton,
    } = props;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('trackingorder:trackingOrder')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('trackingorder:trackingOrder')}`,
        bottomNav: false,
    };
    const [params] = React.useState({ id });
    const { loading, data, error } = trackOrderHistory(params);

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:fetchError')}
                    </Alert>
                </CustomerLayout>
            </Layout>
        );
    }
    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }
    if (!loading && data && data.getTrackOrder) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.getTrackOrder;
    }

    pageConfig = {
        title: `${t('trackingorder:trackingOrder')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('trackingorder:trackingOrder')} #${data?.getTrackOrder ? data?.getTrackOrder.increment_id : ''}`,
        bottomNav: false,
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                trackingOrder={detail}
            />
        </Layout>
    );
};

TrackOrder.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

TrackOrder.defaultProps = {
    Content: () => { },
    Skeleton: () => { },
};

export default TrackOrder;
