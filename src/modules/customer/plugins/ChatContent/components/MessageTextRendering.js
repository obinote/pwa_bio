import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Product from '@core_modules/customer/plugins/ChatContent/components/Preview/Product';
import Order from '@core_modules/customer/plugins/ChatContent/components/Preview/Order';
import userAgent from '@helper_useragent';
import { getAppEnv } from '@root/src/helpers/env';
import { HOST } from '@config';

const DOM_NAME = 'pwa';
const PRODUCT = 'product';
const ORDER = 'order';
const appEnv = getAppEnv();
const LOCALHOST = 'http://localhost';
const LOCALPORT = '3000';
const baseUrl = HOST[appEnv] || HOST.prod;

const MessageTextRendering = ({ html }) => {
    const generateTextUrl = (text) => {
        if (text) {
            const is_local = appEnv === 'local';
            const is_link = text?.startsWith('https') || text?.startsWith('http');
            const is_link_internal = is_local ? text?.startsWith(LOCALHOST) : text?.startsWith(baseUrl);
            const is_mobile_apps = userAgent.isMobileApps();
            const is_mobile_apps_internal = is_link && is_link_internal && is_mobile_apps;
            if (is_mobile_apps_internal) {
                const baseUrlReplace = is_local ? text?.replace(`${LOCALHOST}:${LOCALPORT}`, '') : text?.replace(baseUrl, '');
                return `<a href='${baseUrlReplace}' class='message-link'>${text}</a>`;
            }

            // eslint-disable-next-line no-useless-escape
            const exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            let textFormated = text;
            textFormated = textFormated.replace(exp_match, "<a href='$1' class='message-link' target='__blank'>$1</a>");
            return textFormated;
        }
        return null;
    };
    if (html) {
        return parse(html, {
            replace: (domNode) => {
                if (domNode.name === DOM_NAME && domNode.attribs) {
                    switch (domNode.attribs.type) {
                    case PRODUCT:
                        return <Product data={domNode.attribs} />;
                    case ORDER:
                        const textOrder = domNode?.children[0]?.data || "";
                        return <Order data={domNode.attribs} textOrder={textOrder} />;
                    default:
                        return null;
                    }
                }
                // eslint-disable-next-line react/no-danger
                return <p dangerouslySetInnerHTML={{ __html: generateTextUrl(domNode.data) }} />;
            },
        });
    }
    return null;
};

MessageTextRendering.propType = {
    html: PropTypes.string.isRequired,
};

export default MessageTextRendering;
