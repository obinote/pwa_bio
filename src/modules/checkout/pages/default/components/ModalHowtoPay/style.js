import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY } from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        height: '70px',
        ...FlexRow,
    },
    btnClose: {
        position: 'absolute',
        right: 10,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    title: {
        justifySelf: 'left',
        fontSize: '20px',
        color: '#42929d',
        ...CreateMargin(10, 0, 10, 20),
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        height: '100%',
        ...CreatePadding(0, 0, 0, 0),

        '& .accordion': {
            '& .collapsible': {
                background: '#e0f5f8',
                color: '#42929d',
                marginBottom: '5px',
                borderRadius: '10px',
                fontWeight: '600',

                '&:hover': {
                    background: '#FAFAFA',
                },

                '&.active': {
                    background: '#FAFAFA',
                },
            },
        },
    },
    footer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        bottom: 0,
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
    },
    btnSave: {
        margin: 'auto',
        width: '100px',
        height: 40,
        background: '#42929d',

        '&:hover': {
            background: '#F2F9FF',

            '& span': {
                color: '#42929d !important',
            },
        },
    },
}));

export default useStyles;
