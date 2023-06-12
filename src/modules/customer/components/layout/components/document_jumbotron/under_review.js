import useStyle from '@layout_customer/components/document_jumbotron/style';
import classNames from 'classnames';

const UnderReview = (props) => {
    const { t } = props;
    const styles = useStyle();

    return (
        <div className={styles.completeApplication}>
            <div>
                <div alt="icon" className={classNames(styles.docIcon, 'review')} />
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleApplication}>{t('customer:jumbotron:under_review:title')}</h2>
                </div>
                <div className={styles.descApplication}>
                    <p>{t('customer:jumbotron:under_review:desc')}</p>
                </div>
            </div>
        </div>
    );
};

export default UnderReview;
