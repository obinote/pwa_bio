/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import useStyles from '@core_modules/register/pages/applicationSeller/components/style';
import classNames from 'classnames';
import ApplicationContainer from '@core_modules/register/components/applicationContainer/index';
import SubmitButton from '@core_modules/register/components/submitButton/index';

const SellerItem = ({
    seller,
    onSelectSeller,
    checkedStatus,
    styles,
}) => {
    const isChecked = checkedStatus(seller.vendor_code);

    return (
        <div
            className={classNames(
                styles.sellerItem,
                isChecked ? styles.sellerItemCheck : styles.sellerItemUncheck,
            )}
            onClick={() => onSelectSeller(seller.vendor_code)}
            aria-hidden="true"
        >
            <div className={classNames(styles.sellerContent)}>
                {
                    isChecked
                        ? (
                            <img
                                className={classNames(styles.itemChecked)}
                                src="/assets/img/checkbox-icon.svg"
                                alt="checkbox-icon"
                            />
                        )
                        : (
                            <div className={classNames(styles.itemUnchecked)} />
                        )
                }
                <span className={classNames(styles.itemLabel)}>
                    {seller.vendor_name}
                </span>
            </div>
            <div className={classNames(styles.sellerIconWrapper)}>
                <img
                    className={classNames(styles.sellerIcon)}
                    src={seller.logo}
                    alt=""
                />
            </div>
        </div>
    );
};

const ApplicationSeller = ({
    t,
    formik,
    availableSeller = [],
    onBack,
    onSelectSeller,
    checkedStatus,
}) => {
    const styles = useStyles();

    return (
        <ApplicationContainer
            title={t('register:completeApplication')}
            stepTitle={t('register:businessSeller')}
            step={4}
            totalStep={5}
        >
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>

                <div className={classNames(styles.fieldContainer)}>
                    <div className={classNames(styles.titleWrapper)}>
                        <h4 className={classNames(styles.title)}>
                            {t('register:selectDistributor')}
                        </h4>
                    </div>

                    <div className={classNames(styles.sellerListWrapper)}>
                        {
                            availableSeller.map((seller) => {
                                const sellerItemProps = {
                                    seller,
                                    onSelectSeller,
                                    checkedStatus,
                                    styles,
                                };

                                return <SellerItem {...sellerItemProps} />;
                            })
                        }
                    </div>
                </div>

                <SubmitButton
                    label={t('register:saveContinue')}
                    onBack={onBack}
                />
            </form>
        </ApplicationContainer>
    );
};

export default ApplicationSeller;
