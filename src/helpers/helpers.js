import { setLocalStorage, getLocalStorage } from '@helper_localstorage';

export const onGenerateId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

export const onGenerateVisitorId = () => {
    let visitor_id = getLocalStorage('visitor_id');
    if (visitor_id === null) {
        visitor_id = onGenerateId(24);
        setLocalStorage('visitor_id', visitor_id);
        return visitor_id;
    }
    return visitor_id;
};
