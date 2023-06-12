/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */

import { useCallback, useState } from 'react';
import useStyles from '@core_modules/register/pages/applicationSummary/components/style';
import classNames from 'classnames';
import ApplicationContainer from '@core_modules/register/components/applicationContainer/index';
import SubmitButton from '@core_modules/register/components/submitButton/index';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';

const iconStyle = { fontSize: 30, color: '#000000' };

// Accordion Custom
const AccordionCustom = ({
    panel,
    title,
    navigate,
    expanded,
    setExpanded,
    styles,
    children,
}) => (
    <Accordion
        expanded={expanded === panel}
        onChange={() => setExpanded(expanded === panel ? null : panel)}
    >
        <AccordionSummary
            expandIcon={
                expanded === panel
                    ? <RemoveIcon style={iconStyle} />
                    : <AddIcon style={iconStyle} />
            }
            aria-controls={`${panel}-a-content`}
            id={`${panel}-a-header`}
        >
            <span className={classNames(styles.accordionTitle)}>
                {title}
            </span>
            <div
                className={classNames(styles.pencilIcon)}
                onClick={navigate}
                aria-hidden="true"
            >
                <img
                    src="/assets/img/pencil-icon.svg"
                    alt="icon"
                />
            </div>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
);

// Main Content
const ApplicationSummary = ({
    t,
    formik,
    type,
    profile,
    documents,
    sellers,
    onNavigateToType,
    onNavigateToProfile,
    onNavigateToDocument,
    onNavigateToSeller,
    onChangeCheckbox,
}) => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState('panel1');
    const paymentMethod = _.get(profile, 'bayar.metode') ? _.get(profile, 'bayar.metode').split('|') : [];
    const spesimen_data_pelanggan = _.get(profile, 'spesimen_data_pelanggan') ?? [];

    const ItemData = useCallback(({ label, value, wrapperStyle }) => (
        <div className={classNames(styles.itemWrapper, wrapperStyle || '')}>
            <span className={classNames(styles.itemLabel)}>
                {label}
            </span>
            <div className={classNames(styles.itemValue)}>
                {value}
            </div>
        </div>
    ), []);

    const ItemDataDocument = useCallback(({ label, value }) => (
        <div className={classNames(styles.itemWrapper)}>
            <span className={classNames(styles.itemLabel)}>
                {label}
            </span>
            <div className={classNames(styles.itemUploaded)}>
                {t('register:uploadedFile')}
            </div>
            <div className={classNames(styles.itemDocumentValue)}>
                {value || '-'}
            </div>
        </div>
    ), []);

    const FooterChecklist = () => (
        <div className={classNames(styles.footerContainer)}>
            <div className={classNames(styles.footerContent)}>
                <label htmlFor="term-condition" className={classNames(styles.checkboxWrapper)}>
                    <input
                        className={classNames(styles.checkboxInput)}
                        id="term-condition"
                        type="checkbox"
                        name="term_condition"
                        onChange={() => onChangeCheckbox('term_condition')}
                        checked={formik.values.term_condition}
                    />
                    <span className={classNames(
                        styles.checkboxLabel,
                        formik.touched.term_condition && formik.errors.term_condition
                            ? styles.checkboxError
                            : '',
                    )}
                    >
                        {t('register:termCondition')}
                    </span>
                </label>
                <label htmlFor="subscribe" className={classNames(styles.checkboxWrapper)}>
                    <input
                        className={classNames(styles.checkboxInput)}
                        id="subscribe"
                        type="checkbox"
                        name="subscribe"
                        onChange={() => onChangeCheckbox('subscribe')}
                        checked={formik.values.subscribe}
                    />
                    {t('register:toSubscribe')}
                </label>
            </div>
        </div>
    );

    return (
        <ApplicationContainer
            title={t('register:completeApplication')}
            stepTitle={t('register:businessSummary')}
            step={5}
            totalStep={5}
        >
            <form className={classNames(styles.formContainer)} onSubmit={formik.handleSubmit}>

                {/* Panel 1 */}
                <AccordionCustom
                    panel="panel1"
                    title={t('register:summary:panel1Title')}
                    navigate={onNavigateToType}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    styles={styles}
                >
                    <div className={classNames(styles.sectionContainer)}>
                        <div className={classNames(styles.sectionTitle)}>
                            {t('register:businessType')}
                        </div>
                        <div className={classNames(styles.sectionContent, styles.sectionContent2Col)}>
                            <ItemData label={type} value="" />
                        </div>
                    </div>
                </AccordionCustom>

                {/* Panel 2 */}
                <AccordionCustom
                    panel="panel2"
                    title={t('register:summary:panel2Title')}
                    navigate={onNavigateToProfile}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    styles={styles}
                >
                    <div className={classNames(styles.sectionContainer)}>
                        <div className={classNames(styles.sectionTitle)}>
                            {t('register:profile:admin:title')}
                        </div>
                        <div className={classNames(styles.sectionContent, styles.sectionContent2Col)}>
                            <ItemData label={t('register:profile:admin:npwp')} value={profile?.administrasi?.no_npwp} />
                            <ItemData label={t('register:profile:admin:facility')} value={profile?.administrasi?.nama_sarana} />
                            <ItemData label={t('register:profile:admin:npwpName')} value={profile?.administrasi?.nama_npwp} />
                            <ItemData label={t('register:address')} value={profile?.administrasi?.alamat} />
                            <ItemData label={t('register:phoneNumber')} value={profile?.administrasi?.telepon} />
                            <ItemData label={t('register:email')} value={profile?.administrasi?.email} />
                            <ItemData label={t('register:postalCode')} value={profile?.administrasi?.kota_kodepos} />
                        </div>
                    </div>

                    <div className={classNames(styles.sectionContainer)}>
                        <div className={classNames(styles.sectionTitle)}>
                            {t('register:profile:invoice:title')}
                        </div>
                        <div className={classNames(styles.sectionContent, styles.sectionContent2Col)}>
                            <ItemData label={t('register:name')} value={profile?.faktur?.nama} />
                            <ItemData label={t('register:city')} value={profile?.faktur?.kota} />
                            <ItemData label={t('register:address')} value={profile?.faktur?.alamat} />
                        </div>
                    </div>

                    <div className={classNames(styles.sectionContainer)} style={{ display: 'none' }}>
                        <div className={classNames(styles.sectionTitle)}>
                            {t('register:profile:paymentMethod:title')}
                        </div>
                        <div>
                            {paymentMethod.map((itm, index) => <ItemData label={`${index + 1}. ${t(`register:profile:paymentMethod:${itm}`)}`} />)}
                        </div>
                    </div>

                    <div className={classNames(styles.sectionContainer)}>
                        <div className={classNames(styles.sectionTitle)}>
                            {t('register:profile:financial:title')}
                        </div>
                        <div className={classNames(styles.sectionContent, styles.sectionContent3Col)}>
                            <ItemData label={t('register:profile:financial:bankAccountNumber')} value={profile?.financial?.no_account_bank} />
                            <ItemData label={t('register:profile:financial:bankAccountName')} value={profile?.financial?.nama_account_bank} />
                            <ItemData label={t('register:profile:financial:bankName')} value={profile?.financial?.nama_bank} />
                        </div>
                    </div>
                </AccordionCustom>

                {/* Panel 3 */}
                <AccordionCustom
                    panel="panel3"
                    title={t('register:summary:panel3Title')}
                    navigate={onNavigateToProfile}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    styles={styles}
                >
                    {
                        spesimen_data_pelanggan.map((section) => {
                            const fields = _.get(section, 'fields') ?? [];
                            if (_.size(fields) === 0) {
                                return <></>;
                            }

                            return (
                                <div className={classNames(styles.sectionContainer)}>
                                    <div className={classNames(styles.sectionTitle)}>
                                        {section.label}
                                    </div>
                                    <div className={classNames(styles.sectionContent, styles.sectionContent3Col)}>
                                        {
                                            fields.map((field, index) => {
                                                let wrapperStyle = null;
                                                const { name } = field;
                                                const { label } = field;
                                                const { value } = field;

                                                // tidak ditampilkan
                                                if (name === 'country_id' || name === 'region_id') {
                                                    return <></>;
                                                }

                                                // checking style
                                                if (index === 0 && section.label !== 'Data Sarana') {
                                                    wrapperStyle = styles.textInput3Col;
                                                }

                                                return <ItemData label={label} value={value} wrapperStyle={wrapperStyle} />;
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </AccordionCustom>

                {/* Panel 4 */}
                <AccordionCustom
                    panel="panel4"
                    title={t('register:summary:panel4Title')}
                    navigate={onNavigateToSeller}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    styles={styles}
                >
                    <div className={classNames(styles.sectionContainer)}>
                        <div>
                            {sellers.map((itm, index) => <ItemData label={`${index + 1}. ${itm.vendor_name}`} />)}
                        </div>
                    </div>
                </AccordionCustom>

                {/* Panel 5 */}
                <AccordionCustom
                    panel="panel5"
                    title={t('register:summary:panel5Title')}
                    navigate={onNavigateToDocument}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    styles={styles}
                >
                    <div className={classNames(styles.sectionContainer)}>
                        <div className={classNames(styles.sectionContent, styles.sectionContentUploaded)}>
                            {documents.map((itm) => <ItemDataDocument label={itm.label} value={itm.value} />)}
                        </div>
                    </div>
                </AccordionCustom>

                <div className={classNames(styles.bottomDivider)} />

                <SubmitButton
                    label={t('register:submit')}
                    additional={<FooterChecklist />}
                />
            </form>
        </ApplicationContainer>
    );
};

export default ApplicationSummary;
