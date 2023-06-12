import { useTranslation } from '@i18n';
import dayjs from 'dayjs';

/**
 * Format date string based on the language
 *
 * How to use:
 * const { formatDate } = useDateFormatter();
 * const formattedDate = formatDate('2020-01-01');
 */
export default function useDateFormatter() {
    const { i18n } = useTranslation();
    return (dateStr, { removeClock } = {}) => (i18n.language === 'id'
        ? dayjs(dateStr)
            .locale(i18n.language)
            .format(`DD MMMM YYYY${!removeClock ? ', HH:mm:ss' : ''}`)
        : dayjs(dateStr).format(`MMMM DD, YYYY${!removeClock ? ', HH:mm:ss' : ''}`));
}
