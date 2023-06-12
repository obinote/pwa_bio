/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable default-case */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import parse, { domToReact } from 'html-react-parser';

const DOM_NAME = 'pwa';
const START_WITH_CS = 'start-with-cs';
const START_WITH_DISTRIBUTOR = 'start-with-distributor';
const START_CHAT = 'start-chat';
const LINK = 'link';

const DefaultRender = (props) => {
    const { handleAutoTextSubmit = () => {}, ans = {} } = props;
    return (
        <p
            key={ans.id}
            onClick={() => handleAutoTextSubmit(ans)}
        >
            {ans.message}
        </p>
    );
};

const AutoCompleteAction = (props) => {
    const {
        handleAutoTextSubmit = () => {}, ans = {}, getAgent = () => {}, getDistributor = () => {},
    } = props;
    return parse(ans.message, {
        replace: (domNode) => {
            if (domNode.name === DOM_NAME && domNode.attribs) {
                switch (domNode.attribs.type) {
                case START_WITH_CS:
                    return (
                        <p
                            key={ans.id}
                            onClick={() => getAgent()}
                        >
                            {domToReact(domNode.children, domNode)}
                        </p>
                    );
                case START_WITH_DISTRIBUTOR:
                    return (
                        <p
                            key={ans.id}
                            onClick={() => getDistributor()}
                        >
                            {domToReact(domNode.children, domNode)}
                        </p>
                    );
                case START_CHAT:
                    return (
                        <p
                            key={ans.id}
                            onClick={() => window.startChat({
                                agentCode: domNode.attribs.agent_code.toString(),
                                agentName: domNode.attribs.agent_name,
                            })}
                        >
                            {domToReact(domNode.children, domNode)}
                        </p>
                    );
                case LINK:
                    return (
                        <p>
                            <a href={domNode.attribs.href} target="_blank">
                                {domToReact(domNode.children, domNode)}
                            </a>
                        </p>
                    );
                }
            }
            return <DefaultRender handleAutoTextSubmit={handleAutoTextSubmit} ans={ans} />;
        },
    });
};

AutoCompleteAction.propTypes = {
    handleAutoTextSubmit: PropTypes.func.isRequired,
    ans: PropTypes.object.isRequired,
};

export default AutoCompleteAction;
