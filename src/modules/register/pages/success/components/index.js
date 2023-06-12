/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import useStyles from '@core_modules/register/pages/success/components/style';
import classNames from 'classnames';

const RegisterSuccessView = ({
    t,
    data,
}) => {
    const styles = useStyles();
    const successImg = '/assets/img/register-success.svg';

    const BlockTitle = ({ label }) => (
        <div className={classNames(styles.blockTitle)}>
            <p className={classNames(styles.blockTitleP)}>
                {label}
            </p>
        </div>
    );

    const BlockContentItem = ({ label, value }) => (
        <p className={classNames(styles.blockContentItem)}>
            <p className={classNames(styles.blockContentItemTitle)}>
                {label}
            </p>
            <p className={classNames(styles.blockContentItemValue)}>
                {value}
            </p>
        </p>
    );

    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.wrapperRegisterSuccess)}>
                <div className={classNames(styles.successImage)}>
                    <img
                        src={successImg}
                        alt="Success Register"
                    />
                </div>
                <div className={classNames(styles.successDesc)}>
                    <div className={classNames(styles.successTitle)}>
                        <p className={classNames(styles.successTitleP)}>{t('register:successTitle1')}</p>
                        <p className={classNames(styles.successTitleP)}>{t('register:successTitle2')}</p>
                    </div>
                    <div className={classNames(styles.successSubtitle)}>
                        {t('register:successSubtitle')}
                    </div>
                </div>
            </div>
            <div className={classNames(styles.wrapperRegisterDetail)}>
                <div className={classNames(styles.blockProfile)}>
                    <BlockTitle label={t('register:companyInfo')} />
                    <div className={classNames(styles.blockContent)}>
                        <BlockContentItem label={t('register:companyName')} value={data?.company_name} />
                        <BlockContentItem label={t('register:companyEmail')} value={data?.company_email} />
                    </div>
                </div>
                <div className={classNames(styles.blockProfile)}>
                    <BlockTitle label={t('register:companyAddress')} />
                    <div className={classNames(styles.blockContent)}>
                        <BlockContentItem label={t('register:address')} value={data?.street} />
                        <BlockContentItem label={t('register:city')} value={data?.city} />
                        <BlockContentItem label={t('register:country')} value={data?.country} />
                        <BlockContentItem label={t('register:province')} value={data?.region} />
                        <BlockContentItem label={t('register:postalCode')} value={data?.postcode} />
                        <BlockContentItem label={t('register:phoneNumber')} value={data?.telephone} />
                    </div>
                </div>
                <div className={classNames(styles.blockProfile)}>
                    <BlockTitle label={t('register:companyAdmin')} />
                    <div className={classNames(styles.blockContent)}>
                        <BlockContentItem label={t('register:position')} value={data?.position} />
                        <BlockContentItem label={t('register:email')} value={data?.email} />
                        <BlockContentItem label={t('register:name')} value={data?.name} />
                        <BlockContentItem
                            label={t('register:gender')}
                            value={data?.gender === 'Male'
                                ? t('register:male')
                                : t('register:female')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSuccessView;
