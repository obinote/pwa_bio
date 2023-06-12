/* eslint-disable no-unused-vars */
import useStyle from '@layout_customer/components/document_jumbotron/style';
import Link from 'next/link';

const WillExpired = (props) => {
    const { t, isAdmin, docs } = props;
    const styles = useStyle();

    return (
        <div className={styles.completeApplication}>
            <div>
                <div alt="icon" className={styles.docIcon} />
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleApplication}>{t('customer:jumbotron:will_expired:title')}</h2>
                </div>
                <div className={styles.descApplication}>
                    <p>{t('customer:jumbotron:will_expired:desc').replace(/\$/, docs)}</p>
                </div>
                <Link href="/customer/application_type">
                    <div className={styles.actionButton}>
                        <a className={styles.buttonApplication}>{t('customer:jumbotron:complete_application:button')}</a>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default WillExpired;
