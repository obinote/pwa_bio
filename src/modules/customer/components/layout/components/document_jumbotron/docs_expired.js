import useStyle from '@layout_customer/components/document_jumbotron/style';
import Link from 'next/link';

const DocsExpired = (props) => {
    const { t, isAdmin, expired } = props;
    const styles = useStyle();

    let title = '';
    let desc = '';

    switch (true) {
    case expired === 'time_expired':
        title = isAdmin ? t('customer:jumbotron:expired:title') : t('customer:jumbotron:expired:title_user');
        desc = isAdmin ? t('customer:jumbotron:expired:desc') : t('customer:jumbotron:expired:desc_user');
        break;
    case expired !== '':
        title = isAdmin ? t('customer:jumbotron:expired:title') : t('customer:jumbotron:expired:title_user');
        desc = isAdmin ? t('customer:jumbotron:expired:desc_expired').replace(/\$/, expired) : t('customer:jumbotron:expired:desc_expired_user');
        break;
    default:
        return (<></>);
    }

    return (
        <div className={styles.completeApplication}>
            <div>
                <div alt="icon" className={styles.docIcon} />
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleApplication}>{title}</h2>
                </div>
                <div className={styles.descApplication}>
                    <p>{desc}</p>
                </div>
                {isAdmin && (
                    <Link href="/customer/application_type">
                        <div className={styles.actionButton}>
                            <a className={styles.buttonApplication}>{t('customer:jumbotron:complete_application:button')}</a>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DocsExpired;
