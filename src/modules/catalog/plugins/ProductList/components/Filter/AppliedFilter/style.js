import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY, GRAY_THIRD, BLUE_SECONDARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    desktopContainer: {
        marginBottom: 40,
        '& .heading': {
            textTransform: 'uppercase',
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#2E2E2E',
        },
        '& .item': {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '4px',
            marginBottom: 8,
            '& .remove-icon': {
                fontSize: 17,
                color: GRAY_THIRD,
                cursor: 'pointer',
            },
            '& .filter': {
                fontSize: 13,
                color: GRAY_THIRD,
            },
            '& .filter-name': {
                color: '#2E2E2E',
                fontWeight: 500,
            },
        },
        '& .clear': {
            fontSize: 13,
            color: BLUE_SECONDARY,
            cursor: 'pointer',
        },
    },

    mobileContainer: {
        padding: 0,
        marginTop: '24px !important',
        borderTop: `1px solid ${GRAY_SECONDARY}`,
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
        '& span.heading': {
            margin: 0,
            fontSize: 14,
            color: '#2E2E2E',
        },
        '& .MuiAccordionSummary-root': {
            padding: 0,
            '& .MuiAccordionSummary-content': {
                margin: 0,
            },
        },
        '& .MuiAccordionDetails-root, .MuiAccordionSummary-root.Mui-expanded': {
            padding: 0,
            minHeight: 0,
            '& .item': {
                display: 'flex',
                alignItems: 'flex-start',
                gap: '4px',
                marginBottom: 8,
                '& .remove-icon': {
                    fontSize: 17,
                    color: GRAY_THIRD,
                    cursor: 'pointer',
                },
                '& .filter': {
                    fontSize: 14,
                    color: GRAY_THIRD,
                },
                '& .filter-name': {
                    color: '#2E2E2E',
                    fontWeight: 500,
                },
            },
            '& .clear': {
                fontSize: 14,
                color: BLUE_SECONDARY,
                cursor: 'pointer',
                display: 'block',
                paddingBottom: 12,
            },
        },

    },
}));

export default useStyles;
