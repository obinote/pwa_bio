import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/tickets/components/skeleton';
import { getHost } from '@helpers/config';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const TicketsList = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:myTickets'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myTickets'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [sort, setSort] = React.useState('ASC');

    const { loading, data, refetch } = gqlService.getAwHelpdesk2TicketList({
        variables: {
            pageSize,
            currentPage: page,
            sort: {
                updated_at: sort,
            },
        },
    });

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setPageSize(value);
        setPage(0);
    };

    const handleCreateTicket = () => {
        window.location.replace(`${getHost()}/customer/account/tickets/create`);
    };

    const handleSort = () => {
        if (sort === 'ASC') {
            setSort('DESC');
            refetch({
                variables: {
                    pageSize,
                    currentPage: page,
                    sort: {
                        updated_at: 'DESC',
                    },
                },
            });
        } else {
            setSort('ASC');
            refetch({
                variables: {
                    pageSize,
                    currentPage: page,
                    sort: {
                        updated_at: 'ASC',
                    },
                },
            });
        }
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props} activeMenu="/customer/account/tickets">
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props} activeMenu="/customer/account/tickets">
                <Content
                    t={t}
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSort={handleSort}
                    sort={sort}
                    handleCreateTicket={handleCreateTicket}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default TicketsList;
