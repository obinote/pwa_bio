import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY } from '@theme/colors';

const useStyles = makeStyles((theme) => ({
    main: {
        '& .pagebuilder-slide-wrapper .pagebuilder-overlay': {
            padding: 30,
        },
        '& [data-content-type=slide]': {
            '& .pagebuilder-slide-wrapper': {
                [theme.breakpoints.down('sm')]: {
                    minHeight: '300px !important',
                },
                '& .pagebuilder-slide-button': {
                    margin: '20px 0 0',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                },
                '& .pagebuilder-overlay:not(.pagebuilder-poster-overlay)': {
                    maxWidth: 540,
                },
            },
            '&[data-appearance=poster] .pagebuilder-overlay': {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'fit-content !important',
                    padding: '0 !important',
                },
            },
            '&[data-appearance=collage-centered] .pagebuilder-slide-wrapper .pagebuilder-overlay': {
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            '&[data-appearance=collage-right] .pagebuilder-overlay': {
                marginLeft: 'auto',
            },
        },
        '& .pagebuilder-poster-content': {
            width: 'inherit',
        },
        '& .pagebuilder-button-link': {
            fontSize: '1.8rem',
            lineHeight: '22px',
            margin: '0 10px 10px 0',
            padding: '14px 17px',
            color: PRIMARY,
            textDecoration: 'none',
            background: '0 0',
            border: 0,
            fontWeight: 600,
            display: 'inline-block',
        },
        '& .pagebuilder-button-primary': {
            textDecoration: 'none',
            backgroundImage: 'none',
            cursor: 'pointer',
            background: PRIMARY,
            border: `1px solid ${PRIMARY}`,
            color: '#fff',
            display: 'inline-block',
            boxSizing: 'border-box',
            verticalAlign: 'middle',
            lineHeight: '2.2rem',
            padding: '14px 17px',
            fontSize: '1.8rem',
            borderRadius: '3px',
            fontWeight: '600',
        },
        '& .swiper-pagination-bullet-active': {
            background: PRIMARY,
        },
    },
}));

export default useStyles;
