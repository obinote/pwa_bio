import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@core_modules/digitalsign/services/graphql';

const DigitalSign = (props) => {
    const router = useRouter();
    const {
        t, Content, pageConfig, storeConfig,
    } = props;
    const [dataSign, setDataSign] = React.useState({});
    const { orderNumber } = router.query;
    const [getOrderLetter] = gqlService.getOrderLetter();

    const config = {
        title: t('thanks:title'),
        headerTitle: t('thanks:title'),
        bottomNav: false,
        pageType: 'purchase',
        ...pageConfig,
    };

    const ContentProps = {
        t,
        storeConfig,
        dataSign,
    };

    React.useEffect(async () => {
        await getOrderLetter({
            variables: {
                increment_id: orderNumber,
            },
        })
            .then(({ data }) => {
                if (data.getOrderLetter) {
                    setDataSign(data.getOrderLetter);
                }
            })
            .catch((err) => {
                console.log(`Failed get digital sign data with error: ${err}`);
            });
    }, []);

    return (
        <Layout
            t={t}
            pageConfig={config}
            storeConfig={storeConfig}
            withLayoutHeader={false}
            withLayoutFooter={false}
            showRecentlyBar={false}
            isShowChat={false}
            {...props}
        >
            <Content {...ContentProps} />
        </Layout>
    );
};

export default DigitalSign;
