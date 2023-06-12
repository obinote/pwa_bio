/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import useStyles from '@core_modules/register/components/submitButton/style';
import classNames from 'classnames';
import { useTranslation } from '@i18n';

const SubmitButton = ({
    label,
    requiredLabel = null,
    onBack,
    additional = null,
}) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.footer)}>
            {requiredLabel
                ? (
                    <p className={classNames(styles.requiredField)}>
                        *
                        {requiredLabel}
                    </p>
                )
                : <></>}
            <div
                className={classNames(styles.btnWrapper, additional ? styles.additionalWrapper : '')}
                style={!onBack ? { justifyContent: 'right' } : {}}
            >
                {
                    onBack ? (
                        <div
                            className={classNames(styles.back)}
                            onClick={() => onBack()}
                            aria-hidden="true"
                        >
                            <span className={classNames(styles.backLabel)}>
                                {t('register:back')}
                            </span>
                        </div>
                    ) : (<></>)
                }
                { additional }
                <div className={classNames(styles.btnSubmitWrapper, additional ? styles.additionalBtn : '')}>
                    <button
                        type="submit"
                        className={styles.btnSubmit}
                    >
                        {label}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SubmitButton;
