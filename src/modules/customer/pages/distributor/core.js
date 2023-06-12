import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/distributor/components/skeleton';
import { getCustomer } from '@core_modules/theme/services/graphql';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const DistributorList = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:distributorList'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:distributorList'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [sellerData, setSellerData] = React.useState({});
    const [registerSeller] = gqlService.registerSeller();
    let customerData = {};
    if (typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }

    const { loading, data, refetch } = gqlService.getSellerByKecamatan({
        variables: {
            page_size: pageSize,
            current_page: page + 1,
        },
    });

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setPageSize(value);
        setPage(0);
    };

    const onClickRegister = (currentData) => {
        setSellerData(currentData);
        setOpenRegister(true);
    };

    const handleRegister = () => {
        window.backdropLoader(true);
        setOpenRegister(false);
        registerSeller({
            variables: {
                vendor_code: sellerData.company_code,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:distributor:messageRegisterSuccess'),
                variant: 'success',
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:distributor:messageRegisterFailed'),
                variant: 'error',
            });
        });
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    customerData={customerData}
                    onClickRegister={onClickRegister}
                    handleRegister={handleRegister}
                    setOpenRegister={setOpenRegister}
                    openRegister={openRegister}
                    sellerData={sellerData}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default DistributorList;
