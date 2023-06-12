/* eslint-disable global-require */
import { passwordStrength } from '@config';
import { StoreConfigContext } from '@core_modules/theme/pages/_app';
import { useTranslation } from '@i18n';
import _ from 'lodash';
import { useContext } from 'react';

let zxcvbn = '';

if (typeof window !== 'undefined') {
    zxcvbn = require('@core/helpers/zxcvbn');
}

const defaultValue = passwordStrength.minValue;
const defaultRequiredClass = passwordStrength.numberOfRequiredClass;

const lower = '(?=.*[a-z])';
const upper = '(?=.*[A-Z])';
const number = '(?=.*[0-9])';
const special = '(?=.*[!@#$%^&=?<>+.*_-])';

const getScore = (password, minValue, numberOfRequiredClass) => {
    if (typeof window !== 'undefined') {
        if (password === '' || !password) {
            return 0;
        }

        const valid1 = new RegExp(
            `^(${lower}|${upper}|${number}|${special})(?=.{${minValue},})`,
        );

        const valid2 = new RegExp(
            `^((${lower + upper})|(${lower + number})|(${number + upper})|(${
                lower + special
            })|(${special + upper}))(?=.{${minValue},})`,
        );

        const valid3 = new RegExp(
            `^((${lower + upper + number})|(${lower + upper + special})|(${
                special + lower + number
            })|(${special + upper + number}))(?=.{${minValue},})`,
        );

        const valid4 = new RegExp(
            `^(${lower + upper + number + special})(?=.{${minValue},})`,
        );

        let valid;

        switch (numberOfRequiredClass) {
        case 1:
            valid = valid1.test(password);
            break;
        case 2:
            valid = valid2.test(password);
            break;
        case 3:
            valid = valid3.test(password);
            break;
        case 4:
            valid = valid4.test(password);
            break;
        default:
            break;
        }

        const zxcvbnScore = zxcvbn(password).score;
        return valid === true && zxcvbnScore > 0 ? zxcvbnScore : -1;
    }
    return 0;
};

const GetScore = ({
    t,
    value,
    minValue = defaultValue,
    numberOfRequiredClass = defaultRequiredClass,
}) => {
    const score = getScore(value, minValue, numberOfRequiredClass);
    switch (score) {
    case 0:
        return {
            status: 'No Password',
            score,
        };
    case -1:
        return {
            status: 'Weak',
            message: t('validate:passwordStrengthMessage', { minValue, numberOfRequiredClass }),
            score,
        };
    case 1:
        return {
            status: 'Weak',
            score,
        };
    case 2:
        return {
            status: 'Medium',
            score,
        };
    case 3:
        return {
            status: 'Strong',
            score,
        };
    case 4:
        return {
            status: 'Very Strong',
            score,
        };
    default:
        return false;
    }
};

export function useMemoizedCheckPassword() {
    const storeConfig = useContext(StoreConfigContext);
    const { t } = useTranslation();
    return _.memoize((value) => GetScore({
        t,
        value,
        minValue: storeConfig.customer_password_minimum_password_length,
        numberOfRequiredClass: storeConfig.customer_password_required_character_classes_number,
    }));
}

export default GetScore;
