import Link from 'next/link';
import useStyles from '@core_modules/error/pages/default/components/404/style';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Error404 = (props) => {
    const styles = useStyles();
    const router = useRouter();
    const { t } = props;

    return (
        <div className={classNames(styles.mainContainer)}>
            <div className={classNames(styles.errorCointainer)}>
                <div className={classNames(styles.pageTitleWrapper)}>
                    <h1 className={classNames(styles.pageTitle)}>
                        {t('common:error:error404title')}
                    </h1>
                </div>
                <div className={classNames(styles.contentWrapper)}>
                    <dl className={classNames(styles.dlWrapper)}>
                        <dt className={classNames(styles.dtWrapper)}>
                            {t('common:error:list1Title')}
                        </dt>
                        <dd className={classNames(styles.ddWrapper)}>
                            <ul className={classNames(styles.ulWrapper)}>
                                <li className={classNames(styles.liWrapper)}>
                                    {t('common:error:list1item1')}
                                </li>
                                <li className={classNames(styles.liWrapper)}>
                                    {t('common:error:list1item2')}
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <dl className={classNames(styles.dlWrapper)}>
                        <dt className={classNames(styles.dtWrapper)}>
                            {t('common:error:list2Title')}
                        </dt>
                        <dd className={classNames(styles.ddWrapper)}>
                            {t('common:error:list2Desc')}
                        </dd>
                        <dd>
                            <ul className={classNames(styles.ulWrapper)}>
                                <li className={classNames(styles.liWrapper)}>
                                    <div onClick={() => router.back()} aria-hidden="true" style={{ display: 'inline-block' }}>
                                        <a className={classNames(styles.aLink)}>
                                            {t('common:error:goBack')}
                                        </a>
                                    </div>
                                    {' '}
                                    {t('common:error:list2item1')}
                                </li>
                                <li className={classNames(styles.liWrapper)}>
                                    {t('common:error:list2item2')}
                                </li>
                                <li className={classNames(styles.liWrapper)}>
                                    {t('common:error:list2item3')}
                                    <br />
                                    <Link href="/">
                                        <a className={classNames(styles.aLink)}>
                                            {t('common:error:storeHome')}
                                        </a>
                                    </Link>
                                    {' | '}
                                    <Link href="/customer/account">
                                        <a className={classNames(styles.aLink)}>
                                            {t('common:error:myAccount')}
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Error404;
