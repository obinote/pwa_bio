// import Layout from '@layout_customer';
import useStyles from '@src_modules/customer/pages/creditlimit/components/style';
import Typography from '@common_typography';
import CreditRegulerLimit from '@src_modules/customer/pages/creditlimit/components/limit';
import CreditRegulerHistory from '@src_modules/customer/pages/creditlimit/components/history';
import Alert from '@material-ui/lab/Alert';

const CreditRegulerPage = (props) => {
    const {
        t, dataLimit, dataHistory,
    } = props;
    const styles = useStyles();
    return (
        <>
            <div className={styles.creditWrapper}>
                <div className="credit-remaining">
                    <Typography variant="h4" type="bold">
                        {t('customer:creditReguler:remaining')}
                    </Typography>
                    {dataLimit?.getRegularCredit?.regularCredits?.length > 0 ? (
                        <CreditRegulerLimit
                            t={t}
                            dataLimit={dataLimit}
                        />
                    ) : (
                        <Alert severity="warning">{t('customer:creditReguler:remainingTableNotFound')}</Alert>
                    )}
                </div>
                <div className="credit-transaction">
                    <Typography variant="h4" type="bold">
                        {t('customer:creditReguler:history')}
                    </Typography>
                    <CreditRegulerHistory
                        t={t}
                        dataHistory={dataHistory}
                    />
                </div>
            </div>
        </>
    );
};

export default CreditRegulerPage;
