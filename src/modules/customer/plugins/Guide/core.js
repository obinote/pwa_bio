import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import PropTypes from 'prop-types';
import { getLoginInfo } from '@helper_auth';
import { getCustomerGuideStatus } from '@core_modules/customer/services/graphql';
import { getCustomerGuideConfig, setCompleteGuide } from '@core_modules/customer/services/graphql/index';
import { useTranslation } from '@i18n';
import { waitUntil } from '@helpers/waitUntilElementExist';
// import DummyResponse from './dummydata';

function buildGuideStatus() {
    return {
        homepage: 0,
        homepage_login: 0,
        pdp: 0,
        cart: 0,
        checkout: 0,
        plp: 0,
    };
}

// to check if this component is is still mounted while doing interval operation
function buildOwnComponentName(pageName) {
    return `guide-${pageName}-identifier`;
}

const CoreGuide = ({ Content, page }) => {
    const { t } = useTranslation(['common']);
    const [stepEnabled, setStepEnabled] = React.useState(false);
    const [steps, setSteps] = useState([]);
    const [introOptions] = useState({
        stepsEnabled: true,
        initialStep: 0,
        options: {
            doneLabel: t('common:button:done'),
            skipLabel: 'x',
            hidePrev: false,
            hideNext: false,
            tooltipClass: 'tooltip-container',
            nextLabel: t('common:button:next'),
            prevLabel: t('common:button:back'),
        },
    });

    const [, guideConfigQuery] = getCustomerGuideConfig(page);
    const [, responseStatus] = getCustomerGuideStatus();
    const [fetchComplete] = setCompleteGuide(page);

    const completeGuide = async () => {
        const status = getLocalStorage('guide') || buildGuideStatus();
        status[page] = 1;

        const isLoggedIn = getLoginInfo() === 1;
        if (isLoggedIn) await fetchComplete();

        setLocalStorage('guide', status);
    };

    function basedOnScreenSize(step) {
        if (window.innerWidth <= 768) {
            return step.element.indexOf('mobile') >= 0;
        }
        return step.element.indexOf('mobile') < 0;
    }

    async function getGuideData() {
        // return DummyResponse[page].data.getCustomerGuideConfig;
        return guideConfigQuery.refetch().then((res) => res.data.getCustomerGuideConfig.items);
    }

    const prependHashtagToElement = (step) => ({ ...step, element: `#${step.element}` });

    function validateSteps(argSteps) {
        if (argSteps.length === 0) throw new Error('No guide elements provided');

        const allGuideElementsAreNoElement = argSteps.every(({ element }) => element === '#no-element');

        // if all guide elements are no-element, then we don't need to wait for elements to exist
        if (allGuideElementsAreNoElement) return [];

        const filteredElements = argSteps.filter(({ element }) => element !== '#no-element').map((step) => step.element);

        if (filteredElements.length === 0) {
            throw new Error(`Element ${filteredElements.join(', ')} not found`);
        }

        const findOwnComponent = () => document.querySelector(`#${buildOwnComponentName(page)}`);
        const findAllStepElements = () => filteredElements.every((element) => document.querySelector(element));

        const [promise, interval] = waitUntil(() => {
            if (!findOwnComponent()) throw new Error('Missing own component');
            return findAllStepElements();
        });

        return [promise, interval];
    }

    const notEmptyIntro = (step) => step.intro.trim() !== '';

    async function getGuideStatus() {
        const isLoggedIn = getLoginInfo() === 1;
        if (!isLoggedIn) return getLocalStorage('guide') || buildGuideStatus();
        return responseStatus.refetch().then((res) => res.data.customer.guide);
    }

    async function hasBeenThroughGuide(pageName) {
        const guideStatus = await getGuideStatus();

        // uncomment this to bypass introjs saved data from graphql
        // return 0;
        return guideStatus[pageName] === 1;
    }

    useEffect(() => {
        let cleanupFunc;
        (async () => {
            try {
                if (await hasBeenThroughGuide(page)) return;
                let composedSteps = (await getGuideData()).filter(notEmptyIntro).filter(basedOnScreenSize).map(prependHashtagToElement);
                const waitArr = validateSteps(composedSteps);
                if (waitArr) {
                    const [promise, interval] = waitArr;
                    cleanupFunc = () => clearInterval(interval);
                    await promise;
                }

                // change background to white on PLP
                composedSteps = page === 'plp'
                    ? composedSteps.map((v) => ({ ...v, highlightClass: 'bg-white' }))
                    : composedSteps;
                setSteps(composedSteps);
                setStepEnabled(true);
            } catch (e) {
                if (e.message !== 'Missing own component') window.toastMessage({ open: true, text: t('common:error:setupGuide'), variant: 'error' });
            }
        })();

        return () => {
            if (cleanupFunc) cleanupFunc();
            setStepEnabled(false);
        };
    }, []);

    return (
        <>
            <div id={buildOwnComponentName(page)} />
            {stepEnabled && <Content introOptions={introOptions} steps={steps} completeGuide={completeGuide} />}
        </>
    );
};

CoreGuide.propTypes = {
    page: PropTypes.string.isRequired,
    Content: PropTypes.func.isRequired,
};

export default CoreGuide;
