import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/companyusers/components/skeleton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { regexPhone } from '@helper_regex';
import ModalCreateUser from '@src_modules/customer/pages/companyusers/components/modalCreateUser';
import ErrorView from '@src_modules/customer/pages/companyusers/components/errorView';
import React, { useEffect } from 'react';
import get from 'lodash/get';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const CompanyUser = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:companyUsers'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:companyUsers'),
        bottomNav: false,
    };

    const DEFAULT_PAGE_SIZE = 10;
    const [roleId, setRoleId] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
    const [totalData, setTotalData] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [dataList, setDataList] = React.useState([]);

    const {
        loading, data, refetch, error,
    } = gqlService.companyUsers({
        variables: {
            pageSize,
            currentPage: 1,
        },
    });
    const [addCompanyUser] = gqlService.createCompanyUser();
    const [showFieldCompanyUser, setShowFieldCompanyUser] = React.useState(false);

    const CompanyUserSchema = Yup.object().shape({
        job_title: Yup.string().required(t('customer:companyUser:requiredField')),
        firstname: Yup.string().required(t('customer:companyUser:requiredField')),
        lastname: Yup.string().required(t('customer:companyUser:requiredField')),
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('customer:companyUser:requiredField')),
    });

    const handleSubmit = async (values, resetForm) => {
        window.backdropLoader(true);
        await addCompanyUser({
            variables: values,
        })
            .then(async () => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:companyUser:successAdd'),
                    variant: 'success',
                });
                setShowFieldCompanyUser(false);
                resetForm();
                // cek jika modulo 0 menuju ke page+1 , jika tidak 0 pembulatan ke atas
                const toPage = totalData % pageSize === 0 ? totalData / pageSize + 1 : Math.ceil(totalData / pageSize);
                await refetch({
                    pageSize,
                    currentPage: toPage,
                });
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:companyUser:failedAdd'),
                    variant: 'error',
                });
                setShowFieldCompanyUser(true);
            });
    };

    const formikCompanyUser = useFormik({
        initialValues: {
            job_title: '',
            firstname: '',
            lastname: '',
            email: '',
            telephone: '',
            status: 'INACTIVE',
            role_id: roleId,
        },
        validationSchema: CompanyUserSchema,
        onSubmit: (values, { resetForm }) => {
            const variables = {
                job_title: values.job_title,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                telephone: values.telephone,
                status: values.status,
                role_id: roleId,
            };
            handleSubmit(variables, resetForm);
        },
        validateOnChange: false,
        validateOnBlur: true,
    });

    const handleChangePage = async (value) => {
        window.backdropLoader(true);
        try {
            await refetch({
                pageSize,
                currentPage: value,
            });
            window.backdropLoader(false);
        } catch (e) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message ?? 'Error',
                variant: 'error',
            });
        }
    };

    const handleClickOpen = () => {
        setShowFieldCompanyUser(true);
    };

    const handleClickClose = () => {
        setShowFieldCompanyUser(false);
    };

    useEffect(() => {
        if (data) {
            const roleId_res = get(data, 'company.role_id');
            const totalData_res = get(data, 'company.users.total_count') ?? 0;
            const currentPage_res = get(data, 'company.users.page_info.current_page') ?? 0;
            const totalPage_res = get(data, 'company.users.page_info.total_pages') ?? 0;
            const pageSize_res = get(data, 'company.users.page_info.page_size') ?? DEFAULT_PAGE_SIZE;
            const data_res = get(data, 'company.users.items') ?? [];

            setTotalData(totalData_res);
            setCurrentPage(currentPage_res);
            setTotalPage(totalPage_res);
            setPageSize(pageSize_res);
            setDataList(data_res);
            setRoleId(roleId_res);
        }
    }, [data]);

    if (loading) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <ErrorView error={error} />
                </CustomerLayout>
            </Layout>
        );
    }

    const contentProps = {
        t,
        refetch,
        currentPage,
        pageSize,
        totalData,
        totalPage,
        dataList,
        formikCompanyUser,
        handleChangePage,
        handleClickOpen,
        handleClickClose,
        showFieldCompanyUser,
        ModalCreateUser,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props}>
                <Content {...contentProps} />
            </CustomerLayout>
        </Layout>
    );
};

export default CompanyUser;
