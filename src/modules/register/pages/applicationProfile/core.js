/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Layout from '@layout';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { regexPhone } from '@helper_regex';
import {
    getBusinessProfile,
    addBusinessProfile,
    getRegion,
    getCity,
} from '@core_modules/register/services/graphql';
import _ from 'lodash';
import dayjs from 'dayjs';

const ApplicationProfile = (props) => {
    const {
        t, pageConfig, Content,
    } = props;
    const title = `${t('register:businessProfile')} - ${t('register:businessProfile')}`;

    const config = {
        title,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: title,
        bottomNav: false,
    };

    const { data: dataCompanyProfile, loading } = getBusinessProfile();
    const paymentList = [
        {
            label: t('register:profile:paymentMethod:tunai'),
            value: 'tunai',
        },
        {
            label: t('register:profile:paymentMethod:transfer_bank'),
            value: 'transfer_bank',
        },
        {
            label: t('register:profile:paymentMethod:giro_cek'),
            value: 'giro_cek',
        },
    ];

    const [provinces, setProvinces] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const { data: dataRegion } = getRegion({ variables: { country_id: 'ID' } });
    const [getCities, dataCities] = getCity();
    const [specimentFields, setSpecimentFields] = React.useState([]);
    const [specimenValidates, setSpecimentValidate] = React.useState({
        sarana: {},
        apoteker: {},
        asisten: {},
    });

    const [saveProfile] = addBusinessProfile();

    const configValidation = {
        administrasi: Yup.object({
            no_npwp: Yup.string().required(t('register:required')),
            alamat: Yup.string().required(t('register:required')),
            nama_sarana: Yup.string().required(t('register:required')),
            nama_npwp: Yup.string().required(t('register:required')),
            telepon: Yup.string().required(t('register:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            email: Yup.string().email(t('validate:email:wrong')).required(t('register:required')),
            kota_kodepos: Yup.string().required(t('register:required')),
        }),
        faktur: Yup.object({
            nama: Yup.string().required(t('register:required')),
            kota: Yup.string().required(t('register:required')),
            alamat: Yup.string().required(t('register:required')),
        }),
        financial: Yup.object({
            no_account_bank: Yup.string().required(t('register:required')),
            nama_account_bank: Yup.string().required(t('register:required')),
            nama_bank: Yup.string().required(t('register:required')),
        }),
        sarana: Yup.object(specimenValidates.sarana),
        apoteker: Yup.object(specimenValidates.apoteker),
        asisten: Yup.object(specimenValidates.asisten),
    };

    const ProfileSchema = Yup.object().shape(configValidation);

    const getFieldValue = (values, field) => (_.get(values, field) && _.get(values, field) !== ''
        ? _.get(values, field)
        : null);

    const handleSaveProfile = async (values, resetForm) => {
        let inputProfile = {
            administrasi: {
                no_npwp: values.administrasi.no_npwp,
                alamat: values.administrasi.alamat,
                nama_sarana: values.administrasi.nama_sarana,
                nama_npwp: values.administrasi.nama_npwp,
                telepon: values.administrasi.telepon,
                email: values.administrasi.email,
                kota_kodepos: values.administrasi.kota_kodepos,
            },
            faktur: {
                nama: values.faktur.nama,
                kota: values.faktur.kota,
                alamat: values.faktur.alamat,
            },
            bayar: {
                metode: values.cara_bayar.join('|'),
            },
            financial: {
                no_account_bank: values.financial.no_account_bank,
                nama_account_bank: values.financial.nama_account_bank,
                nama_bank: values.financial.nama_bank,
            },
        };

        // speciment has sarana attribute
        if (getFieldValue(values, 'sarana.nama_pelanggan_nib')) {
            inputProfile = {
                ...inputProfile,
                sarana: {
                    ...values.sarana,
                    region_id: getFieldValue(values, 'sarana.region_id')
                        ? Number(getFieldValue(values, 'sarana.region_id'))
                        : null,
                },
            };
        }

        // speciment has apoteker attribute
        if (getFieldValue(values, 'apoteker.nama')) {
            inputProfile = {
                ...inputProfile,
                apoteker: {
                    ...values.apoteker,
                },
            };
        }

        // speciment has asisten attribute
        if (getFieldValue(values, 'asisten.nama')) {
            inputProfile = {
                ...inputProfile,
                asisten: {
                    ...values.asisten,
                },
            };
        }

        console.log('inputProfile v1', inputProfile);

        window.backdropLoader(true);

        saveProfile({
            variables: {
                input: inputProfile,
            },
        })
            .then(() => {
                resetForm();
                Router.push('/customer/application_document');
                window.backdropLoader(false);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[0] || t('register:failed'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            administrasi: {
                no_npwp: '',
                alamat: '',
                nama_sarana: '',
                nama_npwp: '',
                telepon: '',
                email: '',
                kota_kodepos: '',
            },
            faktur: {
                nama: '',
                kota: '',
                alamat: '',
            },
            cara_bayar: [],
            financial: {
                no_account_bank: '',
                nama_account_bank: '',
                nama_bank: '',
            },
            sarana: {
                nama_pelanggan_nib: '',
                no_nib: '',
                masa_berlaku: '',
                alamat: '',
                country_id: 'ID',
                region_id: '',
                city: '',
                kota_kodepos: '',
                email: '',
                telepon: '',
                no_izin: '',
                masa_berlaku_izin: '',
                nama_pemilik: '',
                sertifikasi_cdakb: '',
                sertifikasi_cdob: '',
                no_izin_pak_pbf: '',
            },
            apoteker: {
                nama: '',
                stra: '',
                stra_masa_berlaku: '',
                email: '',
                sika_sipa: '',
                sika_sipa_masa_berlaku: '',
            },
            asisten: {
                nama: '',
                sikttk: '',
                sikttk_masa_berlaku: '',
            },
        },
        validationSchema: ProfileSchema,
        onSubmit: (values, { resetForm }) => {
            handleSaveProfile(values, resetForm);
        },
    });

    useEffect(() => {
        if (loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loading]);

    useEffect(async () => {
        if (dataCompanyProfile) {
            const specimen = _.get(dataCompanyProfile, 'getBusinessProfile.spesimen_data_pelanggan');
            if (specimen) {
                setSpecimentFields(specimen);
            }

            let resValidation = {};
            let resValues = {
                administrasi: {
                    no_npwp: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.no_npwp') ?? '',
                    alamat: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.alamat') ?? '',
                    nama_sarana: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.nama_sarana') ?? '',
                    nama_npwp: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.nama_npwp') ?? '',
                    telepon: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.telepon') ?? '',
                    email: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.email') ?? '',
                    kota_kodepos: _.get(dataCompanyProfile, 'getBusinessProfile.administrasi.kota_kodepos') ?? '',
                },
                faktur: {
                    nama: _.get(dataCompanyProfile, 'getBusinessProfile.faktur.nama') ?? '',
                    kota: _.get(dataCompanyProfile, 'getBusinessProfile.faktur.kota') ?? '',
                    alamat: _.get(dataCompanyProfile, 'getBusinessProfile.faktur.alamat') ?? '',
                },
                cara_bayar: _.get(dataCompanyProfile, 'getBusinessProfile.bayar.metode')
                    ? _.get(dataCompanyProfile, 'getBusinessProfile.bayar.metode').split('|')
                    : [],
                financial: {
                    no_account_bank: _.get(dataCompanyProfile, 'getBusinessProfile.financial.no_account_bank') ?? '',
                    nama_account_bank: _.get(dataCompanyProfile, 'getBusinessProfile.financial.nama_account_bank') ?? '',
                    nama_bank: _.get(dataCompanyProfile, 'getBusinessProfile.financial.nama_bank') ?? '',
                },
            };

            let sarana = {};
            let apoteker = {};
            let asisten = {};

            let saranaValidation = {};
            let apotekerValidation = {};
            let asistenValidation = {};

            /**
             * mapping & set => validation & value
             */
            specimen.map((section) => {
                if (section.label === 'Data Sarana') {
                    section.fields.map((field) => {
                        // field validation
                        const validation = _.get(field, 'validation') ?? [];
                        const required = !!validation.find((val) => val === 'required');
                        if (required) {
                            if (field.name === 'email') {
                                saranaValidation = {
                                    ...saranaValidation,
                                    email: Yup.string().email(t('validate:email:wrong')).required(t('register:required')),
                                };
                            } else if (field.name === 'telepon') {
                                saranaValidation = {
                                    ...saranaValidation,
                                    telepon: Yup.string().required(t('register:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
                                };
                            } else {
                                saranaValidation = {
                                    ...saranaValidation,
                                    [field.name]: Yup.string().required(t('register:required')),
                                };
                            }
                        }

                        // field value
                        if (field.name === 'country_id') {
                            sarana = { ...sarana, [field.name]: field.value ?? 'ID' };
                        } else {
                            sarana = { ...sarana, [field.name]: field.value ?? '' };
                        }

                        return sarana;
                    });
                } else if (section.label === 'Data Apoteker') {
                    section.fields.map((field) => {
                        // field validation
                        const validation = _.get(field, 'validation') ?? [];
                        const required = !!validation.find((val) => val === 'required');
                        if (required) {
                            if (field.name === 'email') {
                                apotekerValidation = {
                                    ...apotekerValidation,
                                    email: Yup.string().email(t('validate:email:wrong')).required(t('register:required')),
                                };
                            } else {
                                apotekerValidation = {
                                    ...apotekerValidation,
                                    [field.name]: Yup.string().required(t('register:required')),
                                };
                            }
                        }

                        // field value
                        apoteker = { ...apoteker, [field.name]: field.value ?? '' };
                        return apoteker;
                    });
                } else if (section.label === 'Data Tenaga Teknis Kefarmasian') {
                    section.fields.map((field) => {
                        // field validation
                        const validation = _.get(field, 'validation') ?? [];
                        const required = !!validation.find((val) => val === 'required');
                        if (required) {
                            asistenValidation = {
                                ...asistenValidation,
                                [field.name]: Yup.string().required(t('register:required')),
                            };
                        }

                        // field value
                        asisten = { ...asisten, [field.name]: field.value ?? '' };
                        return asisten;
                    });
                }

                return section;
            });

            resValues = {
                ...resValues, sarana, apoteker, asisten,
            };
            resValidation = {
                sarana: saranaValidation,
                apoteker: apotekerValidation,
                asisten: asistenValidation,
            };

            // console.log('res All', resValidation, resValues);

            formik.setValues(resValues);
            setSpecimentValidate(resValidation);

            if (resValues?.sarana?.region_id) {
                await getCities({
                    variables: {
                        region_id: Number(resValues.sarana.region_id),
                    },
                });
            }
        }
    }, [dataCompanyProfile]);

    useEffect(() => {
        const items = _.get(dataRegion, 'getRegions.item');
        if (items) {
            const tempRegion = [];
            items.map((item) => tempRegion.push({ value: item.region_id, label: item.name }));
            setProvinces(tempRegion);
        }
    }, [dataRegion]);

    useEffect(() => {
        const items = _.get(dataCities, 'data.getCityByRegionId.item');
        if (items) {
            const tempCity = [];
            items.map((item) => tempCity.push(item.city));
            setCities(tempCity);
        }
    }, [dataCities]);

    const onBack = () => {
        Router.push('/customer/application_type');
    };

    const handleChangeProvince = async (value) => {
        formik.setFieldValue('sarana.region_id', value);
        formik.setFieldValue('sarana.city', '');
        window.backdropLoader(true);
        await getCities({
            variables: {
                region_id: value,
            },
        });
        window.backdropLoader(false);
    };

    const handleChangeDate = ({ value, field }) => {
        const format = dayjs(value).format('DD/MM/YYYY');
        formik.setFieldValue(field, format);
    };

    const handleSelectPaymentMethod = (value) => {
        formik.setFieldValue('cara_bayar', value);
    };

    const coreProps = {
        t,
        formik,
        provinces,
        cities,
        handleChangeProvince,
        handleChangeDate,
        paymentList,
        handleSelectPaymentMethod,
        onBack,
        specimentFields,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                {...props}
                {...coreProps}
            />
        </Layout>
    );
};

export default ApplicationProfile;
