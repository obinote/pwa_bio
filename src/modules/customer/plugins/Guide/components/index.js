/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

/**
 * Autoscroll to element if element is overlapped by header
 * @param {string } el
 * @returns
 */
const checkOverlappingHeader = (el = '') => {
    if (!window || window.scrollY === 0 || !el) return null;

    const element = document.querySelectorAll(el);
    const header = document.getElementsByTagName('header');
    const position = window?.getComputedStyle(header[0], null)?.getPropertyValue('position') ?? null;
    if (!element || !header || !position || element.length === 0) return null;

    // check if the element is inside header
    const isElementInsideHeader = document.querySelector(`header ${el}`);
    if (isElementInsideHeader) return null;

    const { top: topEl } = element[0].getBoundingClientRect();
    const headerDesktop = document.getElementById('header').getBoundingClientRect();
    const headerMobile = document.getElementsByTagName('header')[0].getBoundingClientRect();

    // check is desktop/mobile then measure the length from top screen to bottom header
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const headerBottom = headerDesktop.height > 0 ? headerDesktop.bottom : headerMobile.bottom;

    if (topEl < headerBottom) {
        element[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return true;
};

const IntroComponent = ({
    introOptions, steps, completeGuide,
}) => {
    // const stepRef = React.useRef();
    const onBeforeChange = (stepIndex) => {
        checkOverlappingHeader(steps[stepIndex].element);
    };
    const onStart = () => {
        window.document.body.style.overflow = 'hidden';
    };
    const onEnd = () => {
        window.document.body.style.overflow = 'auto';
    };

    // Add id in element class introjs-skipbutton for automation QA
    useEffect(() => {
        const setElementID = document.querySelector('.introjs-skipbutton');
        if (setElementID) {
            setElementID.id = 'home_close_guide';
        }
    }, []);

    return (
        <Steps
            enabled={introOptions.stepsEnabled}
            steps={steps}
            initialStep={introOptions.initialStep}
            onComplete={() => { completeGuide(); onEnd(); }}
            onExit={() => { onEnd(); }}
            onBeforeChange={onBeforeChange}
            // ref={(steps) => (this.steps = steps)}
            options={introOptions.options}
            onStart={onStart}
        />
    );
};

IntroComponent.propTypes = {
    introOptions: PropTypes.object.isRequired,
    steps: PropTypes.object.isRequired,
    completeGuide: PropTypes.func.isRequired,
};

export default IntroComponent;
