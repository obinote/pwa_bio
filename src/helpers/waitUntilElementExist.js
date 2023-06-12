const MAX_WAIT_TIME = 10000;

export function waitUntilElementExist(selector) {
    let waitTime = 0;
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                resolve();
                clearInterval(interval);
            } else if (waitTime >= MAX_WAIT_TIME) {
                reject(new Error('Max wait time exceeded, and the element is still not found.'));
                clearInterval(interval);
            }
            waitTime += 100;
        }, 100);
    });
}

export function waitUntilElementsExist(selectors) {
    let waitTime = 0;
    let interval;
    const promise = new Promise((resolve, reject) => {
        interval = setInterval(() => {
            if (selectors.every((selector) => document.querySelector(selector))) {
                resolve();
                clearInterval(interval);
            } else if (waitTime >= MAX_WAIT_TIME) {
                reject(new Error('Max wait time exceeded, and the element is still not found.'));
                clearInterval(interval);
            }
            waitTime += 500;
        }, 500);
    });
    return [promise, interval];
}

export function waitUntil(testFunc) {
    let waitTime = 0;
    let interval;
    const promise = new Promise((resolve, reject) => {
        interval = setInterval(() => {
            try {
                if (testFunc()) {
                    resolve();
                    clearInterval(interval);
                } else if (waitTime >= MAX_WAIT_TIME) {
                    reject(new Error('Max wait time exceeded'));
                    clearInterval(interval);
                }
            } catch (e) {
                reject(e);
                clearInterval(interval);
            }
            waitTime += 500;
        }, 500);
    });
    return [promise, interval];
}

export default {
    waitUntilElementExist,
    waitUntilElementsExist,
    waitUntil,
};
