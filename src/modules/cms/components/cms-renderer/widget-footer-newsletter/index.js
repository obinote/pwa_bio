/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import parse from 'html-react-parser';
import NewsletterFooter from '@core_modules/cms/components/cms-renderer/widget-footer-newsletter/newsletter';

const WidgetFooterNewsletter = (props) => {
    const options = {
        replace: (domNode) => {
            if (!domNode?.attribs) return;
            if (domNode?.attribs && domNode?.attribs?.id === 'newsletter-validate-detail') {
                return <NewsletterFooter {...props} />;
            }
        },
    };
    return <div>{parse(props.html, options)}</div>;
};

export default WidgetFooterNewsletter;
