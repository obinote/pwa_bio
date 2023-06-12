const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

const getAccessKey = () => process.env.ENCRYPT_KEY; // process.env.ACCESS_KEY

const getEncryptKey = () => process.env.ENCRYPT_KEY;

module.exports = {
    getAppEnv,
    getAccessKey,
    getEncryptKey,
};
