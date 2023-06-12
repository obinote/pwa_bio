/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */

import useStyles from '@core_modules/register/pages/applicationDocument/components/style';
import DateDayJs from '@date-io/dayjs';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import classNames from 'classnames';
import ApplicationContainer from '@core_modules/register/components/applicationContainer/index';
import SubmitButton from '@core_modules/register/components/submitButton/index';
import dayjs from 'dayjs';
import CustomDropFile from '@core_modules/register/components/customDropFile/index';
import _ from 'lodash';
import React from 'react';

const ApplicationDocument = ({
    t,
    formik,
    onBack,
    dynamicFields = [],
    handleSetFile,
    handleChangeDate,
    handleDeleteFile,
    maxSize,
}) => {
    const styles = useStyles();
    const [fieldRows, setFieldRows] = React.useState([]);

    const getDateField = (fieldName) => {
        const dateField = dynamicFields.find((field) => field.type === 'date' && field.name === fieldName);

        return dateField;
    };

    React.useEffect(() => {
        if (dynamicFields.length !== 0) {
            const fields = [];
            dynamicFields.forEach((field) => {
                if (field.type === 'file') {
                    const dateField = getDateField(field.date_name);

                    if (typeof dateField !== 'undefined') {
                        fields.push([field, dateField]);
                    } else {
                        fields.push([field]);
                    }
                }
            });

            setFieldRows(fields);
        }
    }, [dynamicFields]);

    return (
        <ApplicationContainer
            title={t('register:completeApplication')}
            stepTitle={t('register:businessDocument')}
            step={3}
            totalStep={5}
        >
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>

                <div className={classNames(styles.titleWrapper)}>
                    <h4 className={classNames(styles.title)}>
                        {t('register:customerDocuments')}
                    </h4>
                    <div className={classNames(styles.subtitle)}>
                        {t('register:uploadDescription', { maxSize })}
                    </div>
                </div>

                <div className={classNames(styles.inputContainer)}>
                    {
                        fieldRows.map((row, index) => (
                            <div>
                                <hr className={classNames(styles.fieldDivider)} />
                                <div className={classNames(styles.rowContainer)}>
                                    {
                                        row.map((field) => {
                                            const name = _.get(field, 'name') ?? '';
                                            const label = _.get(field, 'label') ?? '';
                                            const type = _.get(field, 'type');
                                            const validation = _.get(field, 'validation') ?? [];
                                            const required = !!validation.find((val) => val === 'required');

                                            if (type === 'file') {
                                                return (
                                                    <div className={classNames(styles.fieldContent)}>
                                                        <CustomDropFile
                                                            required={required}
                                                            label={label}
                                                            name={name}
                                                            value={formik.values[name]}
                                                            maxSize={maxSize}
                                                            acceptedFile=".jpg,.jpeg,.png,.pdf"
                                                            multiple={false}
                                                            error={(formik.touched[name] && formik.errors[name])}
                                                            handleSetFile={handleSetFile}
                                                            handleDeleteFile={handleDeleteFile}
                                                        />
                                                    </div>
                                                );
                                            }

                                            if (type === 'date') {
                                                return (
                                                    <div className={classNames(styles.fieldContent)}>
                                                        <DatePicker
                                                            required={required}
                                                            fullWidth
                                                            label={label}
                                                            name={name}
                                                            shrink
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs().add(1, 'day')}
                                                            value={
                                                                formik.values[name] && formik.values[name] !== ''
                                                                    ? dayjs(formik.values[name], 'DD/MM/YYYY')
                                                                    : null
                                                            }
                                                            onChange={(e) => {
                                                                handleChangeDate({
                                                                    value: e,
                                                                    field: name,
                                                                });
                                                            }}
                                                            error={!!(formik.touched[name] && formik.errors[name])}
                                                            helperText={(formik.touched[name] && formik.errors[name])}
                                                        />
                                                    </div>
                                                );
                                            }

                                            return <></>;
                                        })
                                    }
                                </div>
                                {
                                    fieldRows.length - 1 === index ? (<hr className={classNames(styles.fieldDivider)} />) : <></>
                                }
                            </div>
                        ))
                    }
                </div>

                <SubmitButton
                    label={t('register:saveContinue')}
                    requiredLabel={t('register:requiredField')}
                    onBack={onBack}
                />
            </form>
        </ApplicationContainer>
    );
};

const ApplicationDocumentProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <ApplicationDocument {...props} />
    </MuiPickersUtilsProvider>
);

export default ApplicationDocumentProvider;
