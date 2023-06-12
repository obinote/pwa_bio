import React from 'react';
import classNames from 'classnames';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { domToReact } from 'html-react-parser';
import 'swiper/swiper-bundle.css';
import LinkCms from '../link';
import useStyles from './style';
import SlideWrapper from './SlideWrapper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const domOptionsChild = {
    replace: (domNode) => {
        const { attribs } = domNode;
        if (domNode.name === 'pwa' && attribs && attribs.type === 'link') {
            return <LinkCms node={domNode} nodeOptions={domOptionsChild} />;
        }
        return domNode;
    },
};

const domOptions = {
    replace: (domNode) => {
        const { attribs, children } = domNode;

        if (attribs && attribs['data-content-type'] === 'slide') {
            const { style, ...others } = attribs;
            return (
                <SwiperSlide style={{ width: '100%' }}>
                    <div {...others} style={{ ...style }}>
                        {domToReact(children, domOptions)}
                    </div>
                </SwiperSlide>
            );
        }

        if (domNode.name === 'pwa' && attribs && attribs.type === 'link') {
            return <LinkCms node={domNode} nodeOptions={domOptions} />;
        }

        if (attribs && attribs.class === 'pagebuilder-slide-wrapper') {
            const { style } = attribs;
            return (
                <SlideWrapper attribs={attribs} style={style}>
                    {domToReact(children, domOptionsChild)}
                </SlideWrapper>
            );
        }

        return domNode;
    },
};

const PageBuilderSlider = (props) => {
    const classes = useStyles();
    const { attribs, children } = props;
    const styles = attribs.style;

    const paginationOptions = {
        type: 'bullets',
        clickable: true,
    };

    const attributs = {
        className: classNames(classes.main, attribs.class),
        slidesPerView: 1,
        pagination: attribs['data-show-dots'] === 'true' ? { ...paginationOptions } : false,
        navigation: attribs['data-show-arrows'] === 'true',
        loop: attribs['data-infinite-loop'] === 'true',
        autoplay: attribs['data-autoplay'] === 'true' ? {
            delay: attribs['data-autoplay-speed'] || 2000,
        } : false,
    };
    return (
        <Swiper {...attributs} style={{ ...styles }} autoplay={{ delay: 5000 }}>
            {domToReact(children, domOptions)}
        </Swiper>
    );
};

export default PageBuilderSlider;
