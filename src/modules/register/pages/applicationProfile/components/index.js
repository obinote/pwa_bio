/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */

import { useState } from 'react';
import TextField from '@common_textfield';
import useStyles from '@core_modules/register/pages/applicationProfile/components/style';
import DateDayJs from '@date-io/dayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import classNames from 'classnames';
import ApplicationContainer from '@core_modules/register/components/applicationContainer/index';
import SubmitButton from '@core_modules/register/components/submitButton/index';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import dayjs from 'dayjs';
import CustomCheckbox from '@core_modules/commons/CheckBox/index';
import Select from '@common_select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextFieldMui from '@material-ui/core/TextField';
import _ from 'lodash';

const iconStyle = { fontSize: 30, color: '#000000' };

const getSectionName = (label) => {
    if (label === 'Data Sarana') {
        return 'sarana';
    }

    if (label === 'Data Apoteker') {
        return 'apoteker';
    }

    if (label === 'Data Tenaga Teknis Kefarmasian') {
        return 'asisten';
    }

    return null;
};

const ApplicationProfile = ({
    t,
    formik,
    provinces,
    cities,
    handleChangeProvince,
    handleChangeDate,
    paymentList,
    handleSelectPaymentMethod,
    onBack,
    specimentFields = [],
}) => {
    const styles = useStyles();
    const num = /^\d+$/;
    const [expanded, setExpanded] = useState('panel1');

    return (
        <ApplicationContainer
            title={t('register:completeApplication')}
            stepTitle={t('register:businessProfile')}
            step={2}
            totalStep={5}
        >
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>

                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={() => setExpanded(expanded === 'panel1' ? null : 'panel1')}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === 'panel1'
                                ? <RemoveIcon style={iconStyle} />
                                : <AddIcon style={iconStyle} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span className={classNames(styles.accordionTitle)}>
                            {t('register:profile:panel1Title')}
                        </span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classNames(styles.sectionContainer)}>
                            <div className={classNames(styles.sectionTitle)}>
                                {t('register:profile:admin:title')}
                            </div>
                            <div className={classNames(styles.sectionContent, styles.sectionContent2Col)}>
                                <TextField
                                    required
                                    label={t('register:profile:admin:npwp')}
                                    name="administrasi.no_npwp"
                                    value={formik.values.administrasi?.no_npwp}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.administrasi?.no_npwp && formik.errors.administrasi?.no_npwp)}
                                    errorMessage={(formik.touched.administrasi?.no_npwp && formik.errors.administrasi?.no_npwp) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:profile:admin:facility')}
                                    name="administrasi.nama_sarana"
                                    value={formik.values.administrasi?.nama_sarana}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.administrasi?.nama_sarana && formik.errors.administrasi?.nama_sarana)}
                                    errorMessage={(formik.touched.administrasi?.nama_sarana && formik.errors.administrasi?.nama_sarana) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:profile:admin:npwpName')}
                                    name="administrasi.nama_npwp"
                                    value={formik.values.administrasi?.nama_npwp}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.administrasi?.nama_npwp && formik.errors.administrasi?.nama_npwp)}
                                    errorMessage={(formik.touched.administrasi?.nama_npwp && formik.errors.administrasi?.nama_npwp) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:address')}
                                    name="administrasi.alamat"
                                    value={formik.values.administrasi?.alamat}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.administrasi?.alamat && formik.errors.administrasi?.alamat)}
                                    errorMessage={(formik.touched.administrasi?.alamat && formik.errors.administrasi?.alamat) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:phoneNumber')}
                                    name="administrasi.telepon"
                                    value={formik.values.administrasi?.telepon}
                                    onChange={(e) => {
                                        if (num.test(e.target.value) || e.target.value === '') {
                                            formik.handleChange(e);
                                        }
                                    }}
                                    error={!!(formik.touched.administrasi?.telepon && formik.errors.administrasi?.telepon)}
                                    errorMessage={(formik.touched.administrasi?.telepon && formik.errors.administrasi?.telepon) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:email')}
                                    type="email"
                                    name="administrasi.email"
                                    value={formik.values.administrasi?.email}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.administrasi?.email && formik.errors.administrasi?.email)}
                                    errorMessage={(formik.touched.administrasi?.email && formik.errors.administrasi?.email) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:postalCode')}
                                    name="administrasi.kota_kodepos"
                                    value={formik.values.administrasi?.kota_kodepos}
                                    onChange={(e) => {
                                        if (num.test(e.target.value) || e.target.value === '') {
                                            formik.handleChange(e);
                                        }
                                    }}
                                    error={!!(formik.touched.administrasi?.kota_kodepos && formik.errors.administrasi?.kota_kodepos)}
                                    errorMessage={(formik.touched.administrasi?.kota_kodepos && formik.errors.administrasi?.kota_kodepos) || null}
                                />
                            </div>
                        </div>

                        <div className={classNames(styles.sectionContainer)}>
                            <div className={classNames(styles.sectionTitle)}>
                                {t('register:profile:invoice:title')}
                            </div>
                            <div className={classNames(styles.sectionContent, styles.sectionContent2Col)}>
                                <TextField
                                    required
                                    label={t('register:name')}
                                    name="faktur.nama"
                                    value={formik.values.faktur?.nama}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.faktur?.nama && formik.errors.faktur?.nama)}
                                    errorMessage={(formik.touched.faktur?.nama && formik.errors.faktur?.nama) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:city')}
                                    // label={t('register:address')}
                                    name="faktur.kota"
                                    value={formik.values.faktur?.kota}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.faktur?.kota && formik.errors.faktur?.kota)}
                                    errorMessage={(formik.touched.faktur?.kota && formik.errors.faktur?.kota) || null}
                                />
                                <TextField
                                    className={classNames(styles.textInput2Col)}
                                    required
                                    label={t('register:address')}
                                    name="faktur.alamat"
                                    value={formik.values.faktur?.alamat}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.faktur?.alamat && formik.errors.faktur?.alamat)}
                                    errorMessage={(formik.touched.faktur?.alamat && formik.errors.faktur?.alamat) || null}
                                />
                            </div>
                        </div>

                        <div className={classNames(styles.sectionContainer)} style={{ display: 'none' }}>
                            <div className={classNames(styles.sectionTitle)}>
                                {t('register:profile:paymentMethod:title')}
                            </div>
                            <div className={classNames(styles.sectionContent)}>
                                <CustomCheckbox
                                    className={styles.checkbox}
                                    noLabel
                                    data={paymentList}
                                    value={formik.values.cara_bayar}
                                    onChange={handleSelectPaymentMethod}
                                />
                                {formik.touched.cara_bayar && formik.errors.cara_bayar && <span className={styles.errorInfo}>{formik.errors.cara_bayar}</span>}
                            </div>
                        </div>

                        <div className={classNames(styles.sectionContainer)}>
                            <div className={classNames(styles.sectionTitle)}>
                                {t('register:profile:financial:title')}
                            </div>
                            <div className={classNames(styles.sectionContent, styles.sectionContent3Col)}>
                                <TextField
                                    required
                                    label={t('register:profile:financial:bankAccountNumber')}
                                    name="financial.no_account_bank"
                                    value={formik.values.financial?.no_account_bank}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.financial?.no_account_bank && formik.errors.financial?.no_account_bank)}
                                    errorMessage={(formik.touched.financial?.no_account_bank && formik.errors.financial?.no_account_bank) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:profile:financial:bankAccountName')}
                                    name="financial.nama_account_bank"
                                    value={formik.values.financial?.nama_account_bank}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.financial?.nama_account_bank && formik.errors.financial?.nama_account_bank)}
                                    errorMessage={(formik.touched.financial?.nama_account_bank && formik.errors.financial?.nama_account_bank) || null}
                                />
                                <TextField
                                    required
                                    label={t('register:profile:financial:bankName')}
                                    name="financial.nama_bank"
                                    value={formik.values.financial?.nama_bank}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.financial?.nama_bank && formik.errors.financial?.nama_bank)}
                                    errorMessage={(formik.touched.financial?.nama_bank && formik.errors.financial?.nama_bank) || null}
                                />
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={() => setExpanded(expanded === 'panel2' ? null : 'panel2')}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === 'panel2'
                                ? <RemoveIcon style={iconStyle} />
                                : <AddIcon style={iconStyle} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span className={classNames(styles.accordionTitle)}>
                            {t('register:profile:panel2Title')}
                        </span>
                    </AccordionSummary>
                    <AccordionDetails>

                        {
                            specimentFields.map((section) => {
                                const { fields } = section;
                                const sectionName = getSectionName(section.label);
                                if (_.size(fields) === 0) {
                                    return <></>;
                                }

                                return (
                                    <div className={classNames(styles.sectionContainer)}>
                                        <div className={classNames(styles.sectionTitle)}>
                                            {section.label}
                                        </div>
                                        <div className={classNames(styles.sectionContent, styles.sectionContent3Col)}>
                                            {fields.map((field, index) => {
                                                let fieldProps = {};
                                                const { name } = field;
                                                const { label } = field;
                                                const finalName = `${sectionName}.${name}`;
                                                const validation = _.get(field, 'validation') ?? [];
                                                const required = !!validation.find((val) => val === 'required');
                                                const isDate = !!validation.find((val) => val === 'validate-date-au');

                                                if (name === 'country_id') {
                                                    return <></>;
                                                }

                                                if (name === 'region_id') {
                                                    return (
                                                        <Select
                                                            required={required}
                                                            label={label}
                                                            name={finalName}
                                                            helperText={t('common:form:select')}
                                                            options={provinces}
                                                            value={_.get(formik.values, finalName)}
                                                            onChange={(e) => handleChangeProvince(e.target.value)}
                                                            error={!!(_.get(formik.touched, finalName) && _.get(formik.errors, finalName))}
                                                            errorMessage={(_.get(formik.touched, finalName) && _.get(formik.errors, finalName)) || null}
                                                        />
                                                    );
                                                }

                                                if (name === 'city') {
                                                    return (
                                                        <Autocomplete
                                                            id="city"
                                                            freeSolo
                                                            className={classNames(styles.cityAutocomplete, styles.textInput2Col)}
                                                            options={cities}
                                                            value={_.get(formik.values, finalName)}
                                                            onChange={(e, v) => formik.setFieldValue(finalName, v)}
                                                            renderInput={(params) => (
                                                                <>
                                                                    <TextFieldMui
                                                                        {...params}
                                                                        label={label}
                                                                        InputLabelProps={{ shrink: true }}
                                                                    />
                                                                    {!!(_.get(formik.touched, finalName) && _.get(formik.errors, finalName)) && (
                                                                        <span
                                                                            className={styles.errorInfo}
                                                                        >
                                                                            {(_.get(formik.touched, finalName) && _.get(formik.errors, finalName)) || null}
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        />
                                                    );
                                                }

                                                if (isDate) {
                                                    return (
                                                        <DatePicker
                                                            required={required}
                                                            label={label}
                                                            name={finalName}
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs()}
                                                            value={
                                                                _.get(formik.values, finalName) && _.get(formik.values, finalName) !== ''
                                                                    ? dayjs(_.get(formik.values, finalName), 'DD/MM/YYYY')
                                                                    : null
                                                            }
                                                            onChange={(e) => {
                                                                handleChangeDate({
                                                                    value: e,
                                                                    field: finalName,
                                                                });
                                                            }}
                                                            error={!!(_.get(formik.touched, finalName) && _.get(formik.errors, finalName))}
                                                            helperText={(_.get(formik.touched, finalName) && _.get(formik.errors, finalName)) || null}
                                                        />
                                                    );
                                                }

                                                if (index === 0 || (index === 1 && sectionName === 'sarana')) {
                                                    fieldProps = { className: classNames(styles.textInput3Col) };
                                                }

                                                const isDigit = !!validation.find((val) => val === 'validate-digits');

                                                return (
                                                    <TextField
                                                        {...fieldProps}
                                                        required={required}
                                                        label={label}
                                                        name={finalName}
                                                        value={_.get(formik.values, finalName)}
                                                        onChange={isDigit
                                                            ? (e) => {
                                                                if (num.test(e.target.value) || e.target.value === '') {
                                                                    formik.handleChange(e);
                                                                }
                                                            }
                                                            : formik.handleChange}
                                                        error={!!(_.get(formik.touched, finalName) && _.get(formik.errors, finalName))}
                                                        errorMessage={(_.get(formik.touched, finalName) && _.get(formik.errors, finalName)) || null}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </AccordionDetails>
                </Accordion>

                <SubmitButton
                    label={t('register:saveContinue')}
                    requiredLabel={t('register:requiredField')}
                    onBack={onBack}
                />
            </form>
        </ApplicationContainer>
    );
};

const ApplicationProfileProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <ApplicationProfile {...props} />
    </MuiPickersUtilsProvider>
);

export default ApplicationProfileProvider;
