import Link from 'next/link';
import classNames from 'classnames';
import useStyles from '@core_modules/cart/pages/default/components/style';

const EmptyView = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={classNames(styles.cartContainer)}>
            <div className={classNames(styles.pageTitleWrapper)}>
                <h1 className={classNames(styles.pageTitle)}>
                    {t('cart:pageTitle')}
                </h1>
                <div className="">
                    <p className={styles.emptyText}>{t('cart:empty:noItems')}</p>
                    <p className={styles.emptyText}>
                        {t('cart:empty:click')}
                        {' '}
                        <Link href="/">
                            <a className={styles.emptyLink}>
                                {t('cart:empty:here')}
                            </a>
                        </Link>
                        {' '}
                        {t('cart:empty:toContinueShopping')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmptyView;
