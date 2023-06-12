import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/requisition/components/skeleton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const MyRequisition = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:myRequisition'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myRequisition'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(1);
    const pageSize = 10;

    const { loading, data, refetch } = gqlService.getRequisitionList({
        variables: {
            page_size: pageSize,
            current_page: page,
        },
    });
    const [addRequisition] = gqlService.insertRequisitionList();
    const [showFieldRequisition, setShowFieldRequisition] = React.useState(false);

    const RequisitionSchema = Yup.object().shape({
        name: Yup.string().required(t('customer:requisition:requiredField')),
        description: Yup.string().required(t('customer:requisition:requiredField')),
    });

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleSubmit = (values) => {
        addRequisition({
            variables: values,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:requisition:successAdd'),
                variant: 'success',
            });
            setShowFieldRequisition(false);
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:requisition:failedAdd'),
                variant: 'error',
            });
            setShowFieldRequisition(true);
        });
    };

    const formikRequisition = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: RequisitionSchema,
        onSubmit: (values) => {
            const variables = {
                name: values.name,
                description: values.description,
            };
            handleSubmit(variables);
            formikRequisition.values.name = '';
            formikRequisition.values.description = '';
        },
    });

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    const handleClickOpen = () => {
        setShowFieldRequisition(true);
    };

    const handleClickClose = () => {
        setShowFieldRequisition(false);
        formikRequisition.values.name = '';
        formikRequisition.values.description = '';
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    data={data}
                    formikRequisition={formikRequisition}
                    handleClickOpen={handleClickOpen}
                    handleClickClose={handleClickClose}
                    showFieldRequisition={showFieldRequisition}
                    handleChangePage={handleChangePage}
                    page={page}
                    pageSize={pageSize}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default MyRequisition;
