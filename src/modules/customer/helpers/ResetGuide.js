import { setLocalStorage } from '@helper_localstorage';

const ResetGuide = () => {
    setLocalStorage('guide', '');
};

export default ResetGuide;
