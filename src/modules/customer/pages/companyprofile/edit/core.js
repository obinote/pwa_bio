import React, { useEffect, useRef } from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helper_regex';
import { storeConfigNameCookie } from '@config';
import helperCookies from '@helper_cookies';
import gqlService from '@core_modules/customer/services/graphql';
import { getCity, getRegion } from '@core_modules/register/services/graphql';
import { useRouter } from '@root/node_modules/next/router';
import get from 'lodash/get';
import split from 'lodash/split';
import uniqBy from 'lodash/uniqBy';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const companyProfile = (props) => {
    const { t, Content } = props;

    let { storeConfig } = props;

    if (!storeConfig && typeof window !== 'undefined') {
        storeConfig = helperCookies.get(storeConfigNameCookie);
    }

    const pageConfig = {
        title: t('customer:companyProfile:editProfileTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:companyProfile:editProfileTitle'),
        bottomNav: false,
    };

    const router = useRouter();
    const mustFillSubDistrict = router.query.mustFillSubDistrict === 'true';

    const countries = [{ label: 'Indonesia', value: 'ID' }];
    const [getCities, dataCities] = getCity();
    const [provinces, setProvinces] = React.useState([]);
    // cityRaw is from BE Response
    const [cityRaw, setCityRaw] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [subdistrict, setSubdistrict] = React.useState([]);

    const [photoSrc, setPhotoSrc] = React.useState('');
    const inputPhotoRef = useRef(null);
    const [photoFileName, setPhotoFileName] = React.useState('');
    const [initEnd, setInitEnd] = React.useState(false);

    // graphql
    const { data } = gqlService.getCustomerCompanyEditValues({
        onCompleted({ getCustomerCompanyDetail }) {
            setPhotoSrc(getCustomerCompanyDetail.company_logo_url);
        },
    });
    const dataCompany = data?.getCustomerCompanyDetail;
    const { data: dataRegion } = getRegion({ variables: { country_id: 'ID' } });
    const [updateCompany] = gqlService.updateCompany();

    const ValidationSchema = {
        email: Yup.string().email().required(t('validate:email:required')),
        name: Yup.string().required(t('validate:name:required')),
        telephone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')),
        postcode: Yup.string().required(t('validate:postal:required')).min(3, t('validate:postal:wrong')).max(20, t('validate:postal:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        province: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
        district: Yup.string().required(t('validate:district:required')),
        subdistrict: Yup.string().required(t('validate:subDistrict:required')),
        photo: Yup.string().nullable(),
    };

    const InitialValue = {
        name: dataCompany?.company_name || '',
        email: dataCompany?.company_email || '',
        street: dataCompany?.company_street || '',
        country: dataCompany?.company_country_id || 'ID',
        province: dataCompany?.company_region_id || '',
        city: dataCompany?.company_city || '',
        district: dataCompany?.company_district || '',
        subdistrict: dataCompany?.company_sub_district || '',
        postcode: dataCompany?.company_postcode || '',
        telephone: dataCompany?.company_telephone || '',
        photo: '',
    };

    const profileSchema = Yup.object().shape(ValidationSchema);

    const handleUpdateCompany = async (values) => {
        const variables = {
            company_email: values.email,
            company_name: values.name,
            ...(values.photo && { company_logo: values.photo }),
            legal_address: {
                street: [values.street],
                country_id: values.country,
                region: {
                    // region: province,
                    region_id: Number(values.province),
                    // region_code: province,
                },
                city: values.city,
                district: values.district,
                sub_district: values.subdistrict,
                postcode: values.postcode,
                telephone: values.telephone,
            },
        };

        window.backdropLoader(true);

        const result = await updateCompany({ variables })
            .then((response) => ({ type: 'success', data: response }))
            .catch((e) => ({ type: 'error', data: e }));

        window.backdropLoader(false);

        window.toastMessage({
            open: true,
            variant: result.type,
            text: result.type === 'error' ? t('customer:companyProfile:failedUpdate') : t('customer:companyProfile:successUpdate'),
        });

        if (result.type === 'success') router.push('/customer/account/companyprofile');
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: InitialValue,
        validationSchema: profileSchema,
        onSubmit: handleUpdateCompany,
    });

    useEffect(async () => {
        if (dataCompany?.company_region_id) {
            // set init city data
            await getCities({
                variables: {
                    region_id: Number(dataCompany.company_region_id),
                },
            });
        }
    }, [dataCompany]);

    useEffect(() => {
        const items = get(dataRegion, 'getRegions.item');
        if (items) {
            const tempRegion = [];
            items.map((item) => tempRegion.push({ value: item.region_id, label: item.name }));
            setProvinces(tempRegion);
        }
    }, [dataRegion]);

    useEffect(() => {
        const items = get(dataCities, 'data.getCityByRegionId.item');
        if (items) {
            setCityRaw(items);
            const tempCities = items.map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[0],
                    label: name[0],
                };
            });
            const uniqCities = uniqBy(tempCities, 'value');
            setCities(uniqCities);
        }
    }, [dataCities]);

    useEffect(() => {
        const selectedCity = formik.values.city;
        if (selectedCity) {
            const tempDistrict = filter(cityRaw, (item) => includes(item.city, `${selectedCity}, `)).map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[1],
                    label: name[1],
                };
            });

            const uniqDistrict = uniqBy(tempDistrict, 'value');

            setDistrict(uniqDistrict);
        }
    }, [formik.values.city, cityRaw]);

    useEffect(async () => {
        const selectedCity = formik.values.city;
        const selectedDistrict = formik.values.district;
        if (selectedDistrict) {
            const tempSubDistrict = filter(cityRaw, (item) => includes(item.city, `${selectedCity}, ${selectedDistrict}, `)).map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[2],
                    label: name[2],
                };
            });
            const uniqSubDistrict = uniqBy(tempSubDistrict, 'value');
            setSubdistrict(uniqSubDistrict);
            await formik.validateForm();
        }
    }, [formik.values.district, cityRaw]);

    useEffect(() => {
        if (!formik.isValidating && !initEnd && Object.keys(formik.errors).length > 0) {
            const keyName = Object.keys(formik.errors)[0];
            const node = document.getElementsByName(keyName);
            if (node?.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setInitEnd(true);
        }
    }, [formik.isValidating, initEnd]);

    const handleChangeCountry = (value) => {
        formik.setFieldValue('country', value);
        formik.setFieldValue('province', '');
        formik.setFieldValue('city', '');
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');
    };

    const handleChangeProvince = async (value) => {
        formik.setFieldValue('province', value);
        formik.setFieldValue('city', '');
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');

        setDistrict([]);
        setSubdistrict([]);

        window.backdropLoader(true);
        await getCities({
            variables: {
                region_id: value,
            },
        });
        window.backdropLoader(false);
    };

    const handleChangeCity = (value) => {
        formik.setFieldValue('city', value);
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');
        setSubdistrict([]);
    };

    const handleChangeDistrict = (value) => {
        formik.setFieldValue('district', value);
        formik.setFieldValue('subdistrict', '');
    };

    const handleChangeSubdistrict = (value) => {
        formik.setFieldValue('subdistrict', value);
    };

    function handleUploadClick() {
        inputPhotoRef.current.click();
    }

    function handlePhotoChange(event) {
        if (event.target.files.length === 0) return;

        const file = event.target.files[0];
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            formik.setFieldError('photo', t('validate:file:wrongType'));
            return;
        }

        if (file.size > 2000000 /* 2MB */) {
            formik.setFieldError('photo', t('validate:file:tooLarge'));
            return;
        }

        setPhotoFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result;
            formik.setFieldValue('photo', base64data);
        };
        reader.readAsDataURL(file);

        setPhotoSrc(URL.createObjectURL(file));
    }

    function handlePhotoRemove() {
        formik.setFieldValue('photo', '');
        setPhotoSrc(data.getCustomerCompanyDetail.company_logo_url);
        inputPhotoRef.current.value = '';
    }

    const contentProps = {
        t,
        formik,
        dataCompany,
        title: pageConfig.headerTitle,
        countries,
        provinces,
        cities,
        district,
        subdistrict,
        handleChangeCountry,
        handleChangeProvince,
        handleChangeCity,
        handleChangeDistrict,
        handleChangeSubdistrict,
        handleUploadClick,
        handlePhotoChange,
        handlePhotoRemove,
        photoSrc,
        inputPhotoRef,
        photoFileName,
        mustFillSubDistrict,
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <CustomerLayout {...props} activeMenu="/customer/account/companyprofile">
                <Content {...contentProps} />
            </CustomerLayout>
        </Layout>
    );
};

export default companyProfile;
