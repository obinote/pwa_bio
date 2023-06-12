/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

const AddressView = ({ customer, styles, t }) => (
    <>
        <div style={{ marginBottom: 50 }}>
            <div className={styles.blockTitle}>
                <h2 className={styles.infoTitle}>{t('customer:menu:accountInformation')}</h2>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-lg-6">
                    <div className={styles.box}>
                        <h3>{t('customer:menu:contactInformation')}</h3>
                        <p>
                            {customer.firstname}
                            {' '}
                            {customer.lastname}
                            <br />
                            {customer.email}
                            <br />
                            <Link href="account/profile">
                                <a className={styles.desktopLink}>{t('common:button:change')}</a>
                            </Link>
                            {' '}
                            |
                            {' '}
                            <Link href="account/profile">
                                <a className={styles.desktopLink}>{t('customer:newPassword:title')}</a>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-6">
                    <div className={styles.box}>
                        <h3>{t('customer:menu:newsletter')}</h3>
                        <p>
                            {customer.is_subscribed ? t('customer:menu:subcription') : t('customer:menu:noSubcription')}
                            <br />
                            <Link href="/customer/newsletter">
                                <a className={styles.desktopLink}>{t('common:button:change')}</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default AddressView;
