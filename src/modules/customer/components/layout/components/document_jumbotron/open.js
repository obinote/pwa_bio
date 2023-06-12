import useStyle from '@layout_customer/components/document_jumbotron/style';
import Link from 'next/link';

const CompleteApplication = (props) => {
    const { t, isAdmin } = props;
    const styles = useStyle();

    if (isAdmin) {
        return (
            <div className={styles.completeApplication}>
                <div>
                    <div alt="icon" className={styles.docIcon} />
                </div>
                <div>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.titleApplication}>{t('customer:jumbotron:complete_application:title')}</h2>
                    </div>
                    <div className={styles.descApplication}>
                        <p>{t('customer:jumbotron:complete_application:desc')}</p>
                    </div>
                    <Link href="/customer/application_type">
                        <div className={styles.actionButton}>
                            <a className={styles.buttonApplication}>{t('customer:jumbotron:complete_application:button')}</a>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.completeApplication}>
            <div>
                <div alt="icon" className={styles.docIcon} />
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleApplication}>{t('customer:jumbotron:complete_application_user:title')}</h2>
                </div>
                <div className={styles.descApplication}>
                    <p>{t('customer:jumbotron:complete_application_user:desc')}</p>
                </div>
            </div>
        </div>
    );
};

export default CompleteApplication;
