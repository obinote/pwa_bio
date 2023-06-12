import useStyle from '@layout_customer/components/document_jumbotron/style';
import Link from 'next/link';
import classNames from 'classnames';

const Pending = (props) => {
    const { t, comment, isAdmin } = props;
    const styles = useStyle();

    if (isAdmin) {
        return (
            <div className={classNames(styles.completeApplication)}>
                <div>
                    <div alt="icon" className={styles.docIcon} />
                </div>
                <div>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.titleApplication}>{t('customer:jumbotron:revision:title')}</h2>
                    </div>
                    <div className={styles.descApplication}>
                        <p>{t('customer:jumbotron:revision:desc')}</p>
                    </div>
                    <div className={styles.commentWrapper}>
                        <span className={styles.commentInfo}>{t('customer:jumbotron:revision:comment')}</span>
                        <p className={styles.commentText}>{comment ?? ''}</p>
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
        <div className={classNames(styles.completeApplication)}>
            <div>
                <div alt="icon" className={styles.docIcon} />
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleApplication}>{t('customer:jumbotron:revision:title_user')}</h2>
                </div>
                <div className={styles.descApplication}>
                    <p>{t('customer:jumbotron:revision:desc_user')}</p>
                </div>
            </div>
        </div>
    );
};

export default Pending;
