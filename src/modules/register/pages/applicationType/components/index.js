/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Select from '@common_select';
import useStyles from '@core_modules/register/pages/applicationType/components/style';
import classNames from 'classnames';
import ApplicationContainer from '@core_modules/register/components/applicationContainer/index';
import SubmitButton from '@core_modules/register/components/submitButton/index';

const ApplicationType = ({
    t,
    formik,
    typeList,
}) => {
    const styles = useStyles();

    return (
        <ApplicationContainer
            title={t('register:completeApplication')}
            stepTitle={t('register:businessType')}
            step={1}
            totalStep={5}
        >
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>

                <div className={classNames(styles.fieldContainer)}>
                    <div className={classNames(styles.fieldContent)}>
                        <Select
                            required
                            label={t('register:businessType')}
                            name="businessType"
                            helperText={t('common:form:select')}
                            options={typeList}
                            value={formik.values.businessType}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.businessType && formik.errors.businessType)}
                            errorMessage={(formik.touched.businessType && formik.errors.businessType) || null}
                        />
                    </div>
                </div>

                <SubmitButton label={t('register:saveContinue')} />
            </form>
        </ApplicationContainer>
    );
};

export default ApplicationType;
