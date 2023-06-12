/* eslint-disable consistent-return */
import React, { memo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import WidgetPwaLink from '@core_modules/cms/components/cms-renderer/widget-link-pwa';
import WidgetListProduct from '@core_modules/cms/components/cms-renderer/widget-list-product';
import WidgetListProductHomepage from '@core_modules/cms/components/cms-renderer/widget-list-product-homepage';
import WidgetInstagram from '@core_modules/cms/components/cms-renderer/widget-instagram';
import WidgetView from '@core_modules/cms/components/cms-renderer/view';
import PageBuilderSlider from '@core_modules/cms/widget/PageBuilderSlider';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import matchesCurrentHost from '@helpers/matchesCurrentHost';
import { TEMPLATE_SLIDER } from './widget-list-product-homepage/index';

const WidgetRecommendations = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-recommendations'), { ssr: false });

// const TYPE_PWA_SLIDER = 'pwa-slider';
const TYPE_PWA_INSTAGRAM = 'pwa-instagram';
const TYPE_PWA_PAGELINK = 'link';
const TYPE_PWA_PRODUCT = 'pwa-catalog-products-list';

const DOM_NAME = 'pwa';

function getLinkTypeOfFirstElement(domChildren) {
    if (domChildren[0]?.type === 'text') return 'text';
    if (domChildren[0]?.name === 'img') return 'image';
    return 'button';
}

const WidgetRenderer = (props) => {
    const { content, storeConfig } = props;
    let updatedContent = content.includes('widget') ? content.replace('{{widget', '<pwa').slice(0, -2).concat(' />') : content;
    updatedContent = updatedContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    React.useEffect(() => {
        const coll = document.getElementsByClassName('collapsible');
        const accordionHeader = document.getElementsByClassName('accordion-header');
        let i;
        setTimeout(() => {
            if (coll[0]) {
                coll[0].classList.toggle('active');
                const contentCMS = coll[0].nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = `${contentCMS.scrollHeight}px`;
                }
            }
        }, 1000);
        /* eslint-disable */
        for (i = 0; i < coll.length; i += 1) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var contentCMS = this.nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = contentCMS.scrollHeight + "px";
                }
            });
        }
        for (let o = 0; o < accordionHeader.length; o++) {
            accordionHeader[o].addEventListener("click", function () {
                if(this.classList && this.classList.contains('open')) {
                    this.classList.remove("open");
                    var accordionContent = this.nextElementSibling;
                    accordionContent.style.display = 'none';
                } else {
                    this.classList.toggle("open");
                    var accordionContent = this.nextElementSibling;
                    accordionContent.style.display = 'block';
                }
            })
        }
        /* eslint-enable */
    });

    /**
     * component conversion
     * NOTES*: validateDOMNesting(...): <div> cannot appear as a descendant of <p>
     * parent cms page || block must start with <div>
     * @returns {COMPONENT}
     */
    /* eslint-disable */
    const WidgetComponent = () => {
        return parse(updatedContent, {
            replace: (domNode) => {

                if (domNode.attribs && domNode.attribs.class === 'pagebuilder-slider') {
                    const { attribs, children } = domNode;
                    return <PageBuilderSlider attribs={attribs}>{children}</PageBuilderSlider>;
                }

                if (domNode.attribs && domNode.attribs.class === 'Magento\\PageBuilderProductRecommendations\\Block\\PageBuilderRecommendation') {
                    const propsWidget = domNode.attribs;
                    return <WidgetRecommendations storeConfig={storeConfig} pageType="PageBuilder" {...propsWidget} />;
                }

                if (domNode.name === DOM_NAME && domNode.attribs) {
                    const propsWidget = domNode.attribs;
                    switch (domNode.attribs.type) {
                        // case TYPE_PWA_SLIDER:
                        //     return <WidgetSlider {...propsWidget} storeConfig={storeConfig} />;
                        case TYPE_PWA_INSTAGRAM:
                            return <WidgetInstagram {...propsWidget} />;
                        case TYPE_PWA_PAGELINK:
                            return <WidgetPwaLink
                                url={domNode.attribs.href}
                                pwa_link_type={getLinkTypeOfFirstElement(domNode.children)}
                                button={domNode.children[0]?.children ? domNode.children[0]?.children[0]?.data : domNode.children[0]?.data}
                                text={domNode.children[0]?.children ? domNode.children[0]?.children[0]?.data : domNode.children[0]?.data}
                                image={domNode.children[0]?.attribs?.src}
                                {...propsWidget} 
                                />;
                        case TYPE_PWA_PRODUCT:
                            return <WidgetListProduct {...propsWidget} />;
                        case `Magento\\Catalog\\Block\\Product\\Widget\\NewWidget`:
                            return (
                                <WidgetListProductHomepage
                                    {...propsWidget}
                                    drawer_filter_on_desktop_enable={storeConfig.pwa.drawer_filter_on_desktop_enable}
                                />
                            );
                        case 'Magento\\CatalogWidget\\Block\\Product\\ProductsList':
                            return (
                                <WidgetListProductHomepage
                                    conditions_encoded={domNode.attribs.conditions_encoded}
                                    products_count={domNode.attribs.products_count}
                                    template={TEMPLATE_SLIDER}
                                    drawer_filter_on_desktop_enable={storeConfig.pwa.drawer_filter_on_desktop_enable}
                                />
                            );
                        default:
                            return <div>Unable to render the content!</div>;
                    }
                }

                if (domNode.attribs) {
                    if (domNode.attribs.class === 'acctitle') {
                        return (
                            <button
                                type="button"
                                className="collapsible"
                            >
                                {domToReact(domNode.children, domNode)}
                            </button>
                        );
                    } else if (domNode.attribs.class === 'acc_content clearfix') {
                        return (
                            <div className="content-collapsible">
                                {domToReact(domNode.children, domNode)}
                            </div>
                        )
                    } else if(domNode.attribs['data-background-images'] && domNode.attribs['data-background-images'] !== '{}'){
                        /**
                         * only for about us page with background-image style
                         * set style var --desktop-image & --mobile-image 
                         * to get url on css 
                         * see how to use on about-us.css
                         */
                        const dataBackgroundImages = JSON.parse(domNode.attribs['data-background-images'].replace(/\\/g, ""))
                        
                        if(dataBackgroundImages?.desktop_image){
                            domNode.attribs.style = `background-image: url(${dataBackgroundImages.desktop_image})`
                        }
                    }
                    if(domNode.attribs['data-appearance'] && domNode.attribs['data-appearance'] !== '') {
                        if(domNode.attribs['data-appearance'] === 'full-width') {
                            if(domNode.attribs.style) {
                                domNode.attribs.style = `${domNode.attribs.style}; max-width: unset`
                            } else {
                                domNode.attribs.style = 'max-width: unset'
                            }
                        } else if(domNode.attribs['data-appearance'] === 'default') {
                            if(domNode.attribs.style) {
                                domNode.attribs.style = `${domNode.attribs.style}; max-width: 1280px`
                            } else {
                                domNode.attribs.style = 'max-width: 1280px'
                            }
                        }
                    }
                }

                if(domNode.name === 'a' && matchesCurrentHost(domNode.attribs.href)) {
                    return (
                        <Link href={domNode.attribs.href}>
                            <a>{domToReact(domNode.children, domNode)}</a>
                        </Link>
                    );
                }
            },
        });
    };
    /* eslint-enable */

    /**
     * other props
     */
    const propsOther = { WidgetComponent };

    return (
        <div id="html-body">
            <WidgetView {...props} {...propsOther} />
        </div>
    );
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(WidgetRenderer, notRenderIf);
