import { breakPointsUp } from '@helper_theme';
import Button from '@common_button';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import Typography from '@common_typography';
// import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/newsletter/components/style';
import CheckboxSettings from '@core_modules/customer/pages/newsletter/components/checkbox';
import CheckboxView from '@core_modules/customer/pages/newsletter/components/checkbox/view';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@layout_customer'), { ssr: false });

const SettingPage = (props) => {
    const styles = useStyles();
    const {
        t, customer, setSettings, handleSave,
    } = props;
    const desktop = breakPointsUp('sm');
    const subData = [{ value: 'subscribed', label: t('customer:newsletter:subscribed') }];
    return (
        <Layout {...props} title={t('customer:setting:newsletter')}>
            <div className={classNames('col-md-12', styles.container)}>
                <div className={styles.block}>
                    {typeof customer.is_subscribed !== 'undefined' ? (
                        <CheckboxSettings
                            name="is_subscribed"
                            t={t}
                            value={customer.is_subscribed ? ['subscribed'] : []}
                            setSettings={setSettings}
                            data={subData}
                            CheckboxView={CheckboxView}
                        />
                    ) : (
                        <Skeleton variant="rect" height={80} />
                    )}
                </div>
                <div className={styles.btnSaveNewsletter}>
                    <Button onClick={handleSave} fullWidth={!desktop} align={desktop ? 'left' : 'center'}>
                        <Typography letter="capitalize" color="white" type="bold">
                            {t('common:button:save')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
