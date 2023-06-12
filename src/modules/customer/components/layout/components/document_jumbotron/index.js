import dynamic from 'next/dynamic';
import { getCompanyStatus } from '@core_modules/customer/services/graphql';

const Jumbotron = (props) => {
    const { data, loading } = getCompanyStatus();

    if (loading) {
        return <></>;
    }

    const status = data?.getCompanyStatus?.status ?? '';
    const revision = data?.getCompanyStatus?.revision ?? '';
    const is_company_admin = data?.getCompanyStatus?.is_company_admin ?? false;
    const docs_expired = data?.getCompanyStatus?.docs_expired ?? '';
    const docs_will_expired = data?.getCompanyStatus?.docs_expired ?? '';

    switch (true) {
    case docs_expired !== '' && status !== 'under_review': {
        const DocsExpired = dynamic(() => import('@layout_customer/components/document_jumbotron/docs_expired'));
        return <DocsExpired expired={docs_expired} isAdmin={is_company_admin} {...props} />;
    }
    case status === 'under_review': {
        const UnderReview = dynamic(() => import('@layout_customer/components/document_jumbotron/under_review'));
        return <UnderReview {...props} />;
    }
    case status === 'revision': {
        const Revision = dynamic(() => import('@layout_customer/components/document_jumbotron/revision'));
        return <Revision {...props} comment={revision} isAdmin={is_company_admin} />;
    }
    case docs_will_expired !== '': {
        const WillExpired = dynamic(() => import('@layout_customer/components/document_jumbotron/will_expired'));
        return <WillExpired docs={docs_will_expired} {...props} />;
    }
    case status === 'open': {
        const Open = dynamic(() => import('@layout_customer/components/document_jumbotron/open'));
        return <Open {...props} isAdmin={is_company_admin} />;
    }
    default: {
        return <></>;
    }
    }
    // endswitch
};

export default Jumbotron;
