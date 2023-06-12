/* eslint-disable newline-per-chained-call */
import React from 'react';
import { breakPointsUp } from '@helper_theme';

const SlideWrapper = ({ attribs, style, children }) => {
    const desktop = breakPointsUp('sm');
    const imgAttr = JSON.stringify(attribs['data-background-images']);
    const cleanImgAttr = imgAttr.replace(/\\/g, '').replace(/{{/g, '').replace(/}}/g, '').replace(/^"/g, '').replace(/"$/g, '');

    let styles = style;

    try {
        const objImgAttr = JSON.parse(cleanImgAttr);

        if (objImgAttr) {
            const bgImage = !desktop && objImgAttr.mobile_image ? objImgAttr.mobile_image : objImgAttr.desktop_image;
            styles = { ...style, backgroundImage: `url(${bgImage})` };
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
    }

    return (
        <div className={attribs.class} style={{ ...styles }}>
            {children}
        </div>
    );
};

export default SlideWrapper;
