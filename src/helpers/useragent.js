export const list = {
    oldAppsWrapper: 'wrapper-pwa-biofarma',
    androidApps: 'wrapper-pwa-biofarma-android',
    iosApps: 'wrapper-pwa-biofarma-ios',
};

export const IOSDevices = [
    list.iosApps,
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
];

export const isBrowserReady = () => {
    if (typeof window === 'undefined') return false;
    return true;
};

export const getUserAgent = () => {
    if (!isBrowserReady()) return null;
    return window.navigator.userAgent;
};

const checkUserAgent = {
    isBrowserReady,
    agent: () => getUserAgent(),
    isMobileApps: () => {
        if (!isBrowserReady()) return null;
        const ua = getUserAgent();
        return (ua === list.oldAppsWrapper || ua === list.androidApps || ua === list.iosApps);
    },
    isIosApps: () => {
        if (!isBrowserReady()) return null;
        const ua = getUserAgent();
        return (ua === list.iosApps);
    },
    isIOS: () => {
        // all IOS device, including APPS
        if (!isBrowserReady()) return null;
        const ua = getUserAgent();

        return IOSDevices.includes(ua)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    },
};

export default checkUserAgent;
