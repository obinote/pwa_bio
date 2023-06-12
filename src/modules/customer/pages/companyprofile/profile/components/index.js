/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library

// import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/companyprofile/profile/components/style';
import Image from '@common_image';
import Typography from '@common_typography';
// import Link from 'next/link';
import formatDate from '@core/helpers/date';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Route from 'next/router';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const { t, dataCompany, downloadFileWithKey } = props;
    const [showMore, setShowMore] = React.useState(false);
    const paymentMethod = dataCompany?.bayar_metode?.split('|') || [];
    const availablePaymentMethod = dataCompany?.available_payment_method || [];
    const availableShippingMethod = dataCompany?.available_shipping_method || [];
    const distributorList = dataCompany?.selected_distributor_list || [];
    const document = dataCompany?.buyer_documents || [];
    const documentSIUP = document.filter((itm) => itm.document_name === 'document_siup') || {};
    const documentSIKA = document.filter((itm) => itm.document_name === 'document_sipa_sika_apoteker') || {};
    const documentSTRA = document.filter((itm) => itm.document_name === 'document_stra_apoteker') || {};
    const documentApoteker = document.filter((itm) => itm.document_name === 'document_nama_apoteker_penanggung_jawab') || {};
    const documentNpwp = document.filter((itm) => itm.document_name === 'document_npwp') || {};
    const documentSpecimen = document.filter((itm) => itm.document_name === 'document_form_spesiment') || {};
    const documentLokasi = document.filter((itm) => itm.document_name === 'document_foto_lokasi_bagunan_fisik') || {};
    const itemsResponsive = {
        xs: 4,
        sm: 6,
        md: 8,
    };
    const checkBreakpoints = {
        xs: useMediaQuery((theme) => theme.breakpoints.only('xs')),
        sm: useMediaQuery((theme) => theme.breakpoints.only('sm')),
        md: useMediaQuery((theme) => theme.breakpoints.up('md')),
    };
    const currentBreakpoint = Object.entries(checkBreakpoints).filter((val) => val[1] === true);
    if (currentBreakpoint.length === 0) return <></>;
    const maxItemShows = itemsResponsive[currentBreakpoint[0][0]];
    const limitPaymentMethod = availablePaymentMethod.slice(0, maxItemShows);
    const paymentMethodList = showMore ? availablePaymentMethod : limitPaymentMethod;

    const handleClickOpen = () => {
        Route.push('/customer/application_type');
    };

    const updateDocumentClick = () => {
        Route.push('/customer/application_document');
    };

    return (
        <>
            <div>
                <div className={styles.container}>
                    <div className={styles.profileHeaderContainer}>
                        <div className={styles.profileImg}>
                            <Image src={dataCompany.company_logo_url || ''} alt="logo-perusahaan" width="250" height="250" quality={80} />
                        </div>
                        <div className={styles.profileCompany}>
                            <div style={{ marginBottom: '24px' }}>
                                <Typography variant="h1">{dataCompany.company_name}</Typography>
                                <Typography variant="span" size="14">
                                    {dataCompany.company_email}
                                </Typography>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography variant="h4" className={styles.title}>
                                    {t('customer:companyProfile:address')}
                                </Typography>
                                <Typography variant="span" className={styles.information}>
                                    {dataCompany.company_street}
                                    {dataCompany.company_sub_district ? `, ${dataCompany.company_sub_district}` : ''}
                                    {dataCompany.company_district ? `, ${dataCompany.company_district}` : ''}
                                    {dataCompany.company_city ? `, ${dataCompany.company_city}` : ''}
                                    {dataCompany.company_postcode ? `, ${dataCompany.company_postcode}` : ''}
                                    <br />
                                </Typography>
                                <Typography variant="span" className={styles.information}>
                                    {dataCompany.company_telephone}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileInformationColumns}>
                        <div>
                            <Typography variant="h2" className={styles.title}>
                                {t('customer:companyProfile:information:contact')}
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <Typography variant="span" type="bold" className={styles.headerInformation}>
                                        {t('customer:companyProfile:information:companyAdmin')}
                                    </Typography>
                                    <br />
                                    <Typography variant="span" className={styles.information}>
                                        {dataCompany.contact_admin?.name}
                                    </Typography>
                                    <br />
                                    {dataCompany.contact_admin?.job && (
                                        <>
                                            <Typography variant="span" className={styles.information}>
                                                {dataCompany.contact_admin?.job}
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                    <Typography variant="span" className={styles.information}>
                                        {dataCompany.contact_admin?.email}
                                    </Typography>
                                </div>
                                <div className="sales-representative">
                                    <Typography variant="span" type="bold" className={styles.headerInformation}>
                                        {t('customer:companyProfile:information:salesRepresentative')}
                                    </Typography>
                                    <br />
                                    <Typography variant="span" className={styles.information}>
                                        {dataCompany.contact_sales?.name}
                                    </Typography>
                                    <br />
                                    {dataCompany.contact_sales?.job && (
                                        <>
                                            <Typography variant="span" className={styles.information}>
                                                {dataCompany.contact_sales?.job}
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                    <Typography variant="span" className={styles.information}>
                                        {dataCompany.contact_sales?.email}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Typography variant="h2" className={styles.title}>
                                {t('customer:companyProfile:information:paymentInformation')}
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <Typography variant="span" type="bold" className={styles.headerInformation}>
                                        {t('customer:companyProfile:information:availablePayment')}
                                    </Typography>
                                    <br />
                                    <div>
                                        {paymentMethodList.map((itm, index) => (
                                            <>
                                                <Typography key={index} variant="span" className={styles.information}>
                                                    {itm}
                                                </Typography>
                                                <br />
                                            </>
                                        ))}
                                        {availablePaymentMethod.length > maxItemShows ? (
                                            <Typography
                                                className={styles.showMore}
                                                variant="span"
                                                type="semiBold"
                                                color="orange"
                                                onClick={() => setShowMore(!showMore)}
                                            >
                                                {showMore ? t('customer:companyProfile:showLess') : t('customer:companyProfile:showMore')}
                                            </Typography>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Typography variant="h2" className={styles.title}>
                                {t('customer:companyProfile:information:shippingInformation')}
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <Typography variant="span" type="bold" className={styles.headerInformation}>
                                        {t('customer:companyProfile:information:availableShipping')}
                                    </Typography>
                                    <br />
                                    {availableShippingMethod.map((itm, index) => (
                                        <>
                                            <Typography key={index} variant="span" className={styles.information}>
                                                {itm}
                                                <br />
                                            </Typography>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.titleDataPerusahaan}>
                    <Typography variant="h1" type="bold" className={styles.headerTitle}>
                        {t('register:companyProfil')}
                    </Typography>
                    <Button variant="text" className="btn-edit-company" onClick={handleClickOpen}>
                        <Typography variant="p" type="normal" size="14" color="white">
                            {t('register:editCompanyProfil')}
                        </Typography>
                    </Button>
                </div>
                <div className={styles.detailPerusahaan}>
                    <div className={styles.wrapperDetail}>
                        <div className={styles.titleDetail}>
                            <Typography variant="h2" type="bold">
                                {t('register:summary:panel1Title')}
                            </Typography>
                        </div>
                        <div className={styles.wrapperContentDetail}>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:summary:panel1Title')}
                                </Typography>
                                <Typography variant="span" className={styles.wrapperMultiContent}>
                                    {dataCompany.type_of_business}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapperDetail}>
                        <div className={styles.titleDetail}>
                            <Typography variant="h2" type="bold">
                                {t('register:summary:panel2Title')}
                            </Typography>
                        </div>
                        <div className={styles.wrapperContentDetail}>
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:admin:title')}
                                </Typography>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:admin:npwp')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_no_npwp}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:admin:facility')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_nama_sarana}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:admin:npwpName')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_nama_npwp}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:email')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_email}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:address')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_alamat}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:postalCode')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_kota_kodepos}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:phoneNumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.administrasi_telepon}
                                    </Typography>
                                </div>
                            </div>

                            {/* data Invoice */}
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:invoice:title')}
                                </Typography>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:name')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.faktur_nama}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:city')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.faktur_kota}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:address')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.faktur_alamat}
                                    </Typography>
                                </div>
                            </div>

                            {/* Metode Pembayaran */}
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:paymentMethod:title')}
                                </Typography>
                                {/* </div> */}
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:paymentMethod:title')}
                                    </Typography>
                                    <div>
                                        {paymentMethod.map((itm, index) => (
                                            <Typography key={index} variant="span" className={styles.wrapperMultiContent} style={{ margin: 0 }}>
                                                {t(`register:profile:paymentMethod:${itm}`)}
                                                {index === paymentMethod.length - 1 ? '' : ', '}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Finansial */}
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:financial:title')}
                                </Typography>
                                {/* </div> */}
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:financial:bankAccountNumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.financial_no_account_bank}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:financial:bankAccountName')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.financial_nama_account_bank}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:financial:bankName')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.financial_nama_bank}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapperDetail}>
                        <div className={styles.titleDetail}>
                            <Typography variant="h2" type="bold">
                                {t('register:summary:panel3Title')}
                            </Typography>
                        </div>
                        <div className={styles.wrapperContentDetail}>
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:facility:title')}
                                </Typography>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:facility:ownerName')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_nama_pemilik}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:facility:customerNIB')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_nama_wajib_pajak}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:facility:NIBNumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_no_nib}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:address')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_alamat}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:city')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_city}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:postalCode')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_kota_kodepos}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:companyEmail')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_email}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:phoneNumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_telepon}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:facility:hospitalPermitNumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_no_izin}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:facility:hospitalPermitValid')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.sarana_masa_berlaku_izin}
                                    </Typography>
                                </div>
                            </div>

                            {/* Data Apoteker penaggung jawab */}
                            <div style={{ marginBottom: 32 }}>
                                <Typography variant="h3" type="bold" className={styles.subTitle}>
                                    {t('register:profile:pharmacist:data')}
                                </Typography>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:pharmacist:name')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.apoteker_nama}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:pharmacist:STRANumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.apoteker_stra}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:profile:pharmacist:SIKASIPANumber')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.apoteker_sika_sipa}
                                    </Typography>
                                </div>
                                <div className={styles.breakDownDetail}>
                                    <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                        {t('register:email')}
                                    </Typography>
                                    <Typography variant="span" className={styles.wrapperMultiContent}>
                                        {dataCompany.apoteker_email}
                                    </Typography>
                                </div>
                            </div>

                            <Typography variant="h3" type="bold" className={styles.subTitle}>
                                {t('register:profile:technical:title')}
                            </Typography>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:profile:technical:name')}
                                </Typography>
                                <Typography variant="span" className={styles.wrapperMultiContent}>
                                    {dataCompany.asisten_nama}
                                </Typography>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:profile:technical:STRTTKNumber')}
                                </Typography>
                                <Typography variant="span" className={styles.wrapperMultiContent}>
                                    {dataCompany.asisten_sikttk}
                                </Typography>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:profile:technical:STRTTKValid')}
                                </Typography>
                                <Typography variant="span" className={styles.wrapperMultiContent}>
                                    {dataCompany.asisten_sikttk_masa_berlaku}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapperDetail}>
                        <div className={styles.titleDetail}>
                            <Typography variant="h2" type="bold">
                                {t('register:summary:panel5Title')}
                            </Typography>
                            {dataCompany.status_company == 'active' ? (
                                <Button variant="text" className="btn-tool" onClick={updateDocumentClick}>
                                    <Typography variant="p" type="normal" size="14" color="white">
                                        {t('register:document:editDocument')}
                                    </Typography>
                                </Button>
                            ) : null }
                        </div>
                        <div className={styles.wrapperContentDetail}>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:siup')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentSIUP[0]?.document_key ? (
                                        // <Link href={documentSIUP[0]?.document_url || ''} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentSIUP[0]?.document_key); }}
                                        >
                                            {documentSIUP[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                    {documentSIUP[0]?.document_expired_date ? (
                                        <Typography variant="span" className={styles.wrapperMultiContent}>
                                            {t('register:document:validUntil')}
                                            {' '}
                                            {formatDate(documentSIUP[0]?.document_expired_date, 'DD/MM/YYYY')}
                                        </Typography>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:sipa')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentSIKA[0]?.document_key ? (
                                        // <Link href={documentSIKA[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentSIKA[0]?.document_key); }}
                                        >
                                            {documentSIKA[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                    {documentSIKA[0]?.document_expired_date ? (
                                        <Typography variant="span" className={styles.wrapperMultiContent}>
                                            {t('register:document:validUntil')}
                                            {' '}
                                            {formatDate(documentSIKA[0]?.document_expired_date, 'DD/MM/YYYY')}
                                        </Typography>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:stra')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentSTRA[0]?.document_key ? (
                                        // <Link href={documentSTRA[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentSTRA[0]?.document_key); }}
                                        >
                                            {documentSTRA[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                    {documentSTRA[0]?.document_expired_date ? (
                                        <Typography variant="span" className={styles.wrapperMultiContent}>
                                            {t('register:document:validUntil')}
                                            {' '}
                                            {formatDate(documentSTRA[0]?.document_expired_date, 'DD/MM/YYYY')}
                                        </Typography>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:pharmacist')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentApoteker[0]?.document_key ? (
                                        // <Link href={documentApoteker[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentApoteker[0]?.document_key); }}
                                        >
                                            {documentApoteker[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:npwp')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentNpwp[0]?.document_key ? (
                                        // <Link href={documentNpwp[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentNpwp[0]?.document_key); }}
                                        >
                                            {documentNpwp[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:specimen')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentSpecimen[0]?.document_key ? (
                                        // <Link href={documentSpecimen[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentSpecimen[0]?.document_key); }}
                                        >
                                            {documentSpecimen[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('register:document:building')}
                                </Typography>
                                <div className={styles.documentsDetail}>
                                    {documentLokasi[0]?.document_key ? (
                                        // <Link href={documentLokasi[0]?.document_url} rel="noopener noreferrer" target="_blank">
                                        <Typography
                                            variant="span"
                                            className={styles.linkDownload}
                                            onClick={() => { downloadFileWithKey(documentLokasi[0]?.document_key); }}
                                        >
                                            {documentLokasi[0]?.document_name}
                                        </Typography>
                                        // </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapperDetail}>
                        <div className={styles.titleDetail}>
                            <Typography variant="h2" type="bold">
                                {t('register:summary:panel4Title')}
                            </Typography>
                        </div>
                        <div className={styles.wrapperContentDetail}>
                            <div className={styles.breakDownDetail}>
                                <Typography variant="h3" type="bold" className={styles.headerInformation}>
                                    {t('customer:distributor:distributor')}
                                </Typography>
                                <div>
                                    {distributorList.map((distributor, index) => (
                                        <Typography key={index} variant="span" className={styles.wrapperMultiContent}>
                                            {distributor?.vendor_name}
                                            <br />
                                        </Typography>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
