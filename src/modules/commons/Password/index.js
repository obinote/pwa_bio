/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import TextField from '@common_textfield';
import Typography from '@common_typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useMemoizedCheckPassword } from '@helper_passwordstrength';
import classNames from 'classnames';
import useStyles from '@common_password/style';
import replaceAll from '@helpers/replaceAll';
import { useTranslation } from '@i18n';

const PasswordField = ({
    t,
    label = 'Password',
    value = '',
    onChange = () => {},
    showPasswordMeter = false,
    showVisible = false,
    error = false,
    errorMessage = '',
    required = false,
    passwordMeterStyle = '',
    ...other
}) => {
    const [strength, setStrength] = React.useState({
        status: 'No Password',
    });
    const checkPassword = useMemoizedCheckPassword();

    const handleChange = (event) => {
        const newStrength = checkPassword(event.target.value);
        if (showPasswordMeter) setStrength(newStrength);
        onChange(event, newStrength);
    };

    return (
        <PasswordFieldBase
            showRevealIcon={showVisible}
            footer={
                showPasswordMeter && (
                    <>
                        <PasswordMeter strength={strength} textClass={passwordMeterStyle} />
                        <Typography variant="p" type="semiBold" color="red">
                            {strength.message || ''}
                        </Typography>
                    </>
                )
            }
            required={required}
            label={label}
            value={value}
            onChange={handleChange}
            error={error}
            errorMessage={errorMessage}
            {...other}
        />
    );
};

export const PasswordFieldBase = ({
    required, label, value, onChange, error, errorMessage, footer, showRevealIcon, ...other
}) => {
    const [reveal, setReveal] = React.useState(false);

    return (
        <TextField
            required={required}
            label={label}
            type={reveal ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            error={error}
            errorMessage={errorMessage}
            footer={footer}
            endAdornment={
                showRevealIcon && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setReveal(!reveal)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {reveal ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }
            {...other}
        />
    );
};

export const PasswordMeter = ({ textClass, strength }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.passwordStrength}>
            <Typography variant="p" type="semiBold" className={classNames(styles.txtPasswdStr, textClass)}>
                {t('validate:passwordStrength')}
                {': '}
                {t(`validate:${replaceAll(strength.status.toLocaleLowerCase(), ' ', '')}`)}
            </Typography>
            <div
                className={classNames(
                    styles.passwdStrPrgsBar,
                    strength.status.toLocaleLowerCase() === 'no password'
                        ? styles.zeroBar
                        : strength.status.toLocaleLowerCase() === 'weak'
                            ? styles.per3Bar
                            : strength.status.toLocaleLowerCase() === 'medium'
                                ? styles.halfBar
                                : strength.status.toLocaleLowerCase() === 'strong'
                                    ? styles.per7
                                    : styles.full,
                )}
            />
            <div
                className={classNames(
                    styles.passwdStrPrgsCtr,
                    strength.status.toLocaleLowerCase() === 'no password'
                        ? styles.full
                        : strength.status.toLocaleLowerCase() === 'weak'
                            ? styles.per7
                            : strength.status.toLocaleLowerCase() === 'medium'
                                ? styles.half
                                : strength.status.toLocaleLowerCase() === 'strong'
                                    ? styles.per3
                                    : styles.zero,
                )}
            />
        </div>
    );
};

export default PasswordField;
