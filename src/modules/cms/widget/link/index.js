/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import parse, { domToReact } from 'html-react-parser';
import { getLoginInfo } from '@helper_auth';
import { getCartId } from '@helper_cartid';
// import { getProductById, getCategoryById } from '@modules/catalog/services/graphql';
import { getCmsPageIdentifier } from '../../services/graphql';
// import ModalDialog from '../../plugin/block/components/modalDialog';

const LinkCms = ({
    node, nodeOptions = {}, setActiveTabs, activeTabs, t,
}) => {
    const [fetchCmsPageById, { loading: cmsPageLoading, data: cmsPageData, error: cmsPageError }] = getCmsPageIdentifier();
    // eslint-disable-next-line no-undef
    // const [fetchCategoryById, { loading: categoryLoading, data: categoryData, error: categoryError }] = getCategoryById();
    // eslint-disable-next-line no-undef
    // const [fetchProductById, { loading: productLoading, data: productData, error: productError }] = getProductById();

    let isLogin = 0;
    let cartId = '';
    let hrefFinal = node.attribs.href;

    const handleClickTabs = (id) => {
        const idTabsSelected = id.substring(1);
        const el = document.getElementById(idTabsSelected);
        const prevActive = document.getElementById(activeTabs[el.getAttribute('data-tabs-number')]);
        const prevActiveButton = document.getElementById(`#${activeTabs[el.getAttribute('data-tabs-number')]}`);
        const currentActiveButton = document.getElementById(id);
        // hide prev tab
        if (prevActive) {
            prevActive.classList.remove('visible');
        }
        // remove active previous button
        if (prevActiveButton) {
            prevActiveButton.classList.remove('active');
        }
        // add active previous button
        if (currentActiveButton) {
            currentActiveButton.classList.add('active');
        }
        setTimeout(() => {
            const tempTabs = activeTabs;
            tempTabs[el.getAttribute('data-tabs-number')] = idTabsSelected;
            setActiveTabs(tempTabs);
        }, 200);
        if (el) {
            el.classList.add('visible');
        }
    };

    // if (cmsPageLoading || categoryLoading || productLoading) return (<></>);

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }
    // if (node.attribs.onclick && node.attribs.onclick === 'joinPlusoneNow()') {
    //     return (
    //         <ModalDialog
    //             title={domToReact(node.children)}
    //             class={node.attribs.class}
    //             isLogin={isLogin}
    //             cartId={cartId}
    //             t={t}
    //         />
    //     );
    // }
    if ((node.attribs.class && node.attribs.class === 'tab-title') || !node.attribs.href) {
        return (
            <button
                type="button"
                id={node.attribs.href}
                onClick={() => handleClickTabs(node.attribs.href)}
            >
                {domToReact(node.children)}
            </button>
        );
    }
    if (node.attribs.target && node.attribs.target === '_blank') {
        return (
            <a className={node.attribs.class || ''} href={node.attribs.href} target="_blank">{domToReact(node.children, nodeOptions)}</a>
        );
    }
    if (['product', 'category', 'page'].includes(node.attribs['data-link-type'])) {
        const linkAttribs = parse(node.attribs.href);

        // let paths = [];

        switch (linkAttribs.props.type) {
        case 'Magento\\Cms\\Block\\Widget\\Page\\Link':
            if (!cmsPageData && !cmsPageError) {
                fetchCmsPageById({ variables: { id: linkAttribs.props.page_id } });
                break;
            }

            hrefFinal = cmsPageData.cmsPage.url_key;
            break;
            // case 'Magento\\Catalog\\Block\\Category\\Widget\\Link':
            //     // eslint-disable-next-line prefer-destructuring
            //     paths = linkAttribs.props.id_path.split('/');
            //     if (!categoryData && !categoryError) {
            //         fetchCategoryById({ variables: { id: paths[1] } });
            //         break;
            //     }

            //     hrefFinal = categoryData.category.canonical_url;
            //     break;
            // case 'Magento\\Catalog\\Block\\Product\\Widget\\Link':
            //     // eslint-disable-next-line prefer-destructuring
            //     paths = linkAttribs.props.id_path.split('/');
            //     if (!productData && !productError) {
            //         fetchProductById({ variables: { id: paths[1] } });
            //         break;
            //     }

            //     if (productData.productsByID.length > 0) {
            //         hrefFinal = productData.productsByID[0].canonical_url;
            //     }
            //     break;

        default:
            hrefFinal = node.attribs.href;
            break;
        }
    }
    return (
        <Link href={hrefFinal} as={hrefFinal}>
            <a className={node.attribs.class || ''}>{domToReact(node.children, nodeOptions)}</a>
        </Link>
    );
};

export default LinkCms;
