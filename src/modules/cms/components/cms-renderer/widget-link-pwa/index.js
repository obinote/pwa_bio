/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useRouter } from 'next/router';
import matchesCurrentHost from '@helpers/matchesCurrentHost';
import Button from '@common_button';

const WidgetPwaLink = (props) => {
    const {
        pwa_link_type, type, image, url, text = 'Sample Link',
    } = props;
    const customStyle = props?.class;
    const buttonText = props?.button;
    const isExternal = !matchesCurrentHost(url);
    const modifiedUrl = isExternal ? url : url.replace('.html', '');
    const router = useRouter();

    if (!url) return <span>no url found in pwa link widget</span>;

    const propsLink = {};
    const propsOther = {};
    if (customStyle !== undefined) {
        propsOther.className = customStyle;
    }

    if (isExternal) {
        // propsLink.href = modifiedUrl;
        propsLink.onClick = () => {
            window.open(modifiedUrl, '_blank');
        };
    } else {
        propsLink.onClick = () => {
            router.push('/[...slug]', modifiedUrl);
        };
    }

    /**
     * {{widget type="pwa-cms-page-link" pwa_link_type="text" text="View All" class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiTypography-caption MuiTypography-alignLeft homepage-product-list-btn-viewall-text homepage-product-list-btn-viewall" url="/about-us"}}
     * [LINK] button
     * @return {link-button}
     */
    if (pwa_link_type === 'button') {
        let buttonLink = modifiedUrl;
        if (isExternal) {
            // for eksternal link open new tab
            buttonLink = '';
            propsOther.onClick = () => {
                window.open(modifiedUrl, '_blank');
            };
        }

        return (
            <Button {...propsOther} href={buttonLink} onClick={() => window.open(modifiedUrl, '_blank')}>
                {buttonText}
            </Button>
        );
    }

    /**
     * [LINK] image
     * @return {link}
     */
    if (pwa_link_type === 'image') {
        return (
            <a {...propsLink}>
                <img {...propsOther} src={image} alt={`${type}-${pwa_link_type}`} />
            </a>
        );
    }

    /**
     * [LINK] default || text
     * @return {link}
     */
    return (
        <a {...propsLink} {...propsOther}>
            {text}
        </a>
    );
};

export default WidgetPwaLink;
