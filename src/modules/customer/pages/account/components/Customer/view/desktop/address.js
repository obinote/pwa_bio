/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

const generateData = (data, { t, styles }) => (
    <p>
        {data.firstname}
        {' '}
        {data.lastname}
        <br />
        {data?.street ? data.street[0] : ''}
        <br />
        {data.city}
        {', '}
        {data?.region?.region ? data?.region?.region : ''}
        {', '}
        {data.postcode}
        <br />
        Indonesia
        <br />
        <Link href="/customer/account/address">
            <a className={styles.desktopLink}>{t('customer:address:editTitle')}</a>
        </Link>
    </p>
);

const AddressView = (props) => {
    const { customer, styles, t } = props;
    const { addresses } = customer;
    let defaultShiping = {};
    let defaultBilling = {};
    let defaultAddress = false;

    for (let index = 0; index < addresses.length; index++) {
        const addr = addresses[index];
        if (addr.default_billing && !defaultBilling.id) {
            defaultBilling = addr;
        }

        if (addr.default_shipping && !defaultShiping.id) {
            defaultShiping = addr;
        }

        if (addr.default_billing === true || addr.default_shipping === true) {
            defaultAddress = true;
        }
    }

    return (
        <>
            <div className={styles.blockTitle}>
                <h2 className={styles.infoTitle}>
                    {t('customer:menu:address')}
                    <Link href="/customer/account/address">
                        <a className={styles.desktopLinkHeader}>{t('customer:address:editTitle')}</a>
                    </Link>
                </h2>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-lg-6">
                    <div className={styles.box}>
                        <h3>{t('customer:address:defaultBilling')}</h3>
                        {addresses.length > 0 && defaultAddress && defaultBilling?.id ? (
                            generateData(defaultBilling, props)
                        ) : (
                            <div>
                                <div>
                                    <p>{t('customer:address:emptyMessage')}</p>
                                </div>
                                <div>
                                    <a href="/customer/address/edit" className={styles.desktopLink}>{t('customer:address:changeAddress')}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-6">
                    <div className={styles.box}>
                        <h3>{t('customer:address:defaultShipping')}</h3>
                        {addresses.length > 0 && defaultAddress && defaultShiping.id ? (
                            generateData(defaultShiping, props)
                        ) : (
                            <div>
                                <div>
                                    <p>{t('customer:address:emptyMessage')}</p>
                                </div>
                                <div>
                                    <a href="/customer/address/edit" className={styles.desktopLink}>{t('customer:address:changeAddress')}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddressView;
