import { useTranslation } from '@i18n';

// The translated texts are available in public/static/locales/{en,id}/message.json
// Usage:
// const __ = useMessageTranslator();
// __('This account is not found.')

export default function useMessageTranslator() {
    const { t } = useTranslation(['message']);
    const __ = (text, options = {}) => t(text, {
        // keySeparator is '.' by default. So we need to change it to avoid conflict with the key.
        keySeparator: false,
        nsSeparator: false,
        ...options,
    });
    return __;
}
