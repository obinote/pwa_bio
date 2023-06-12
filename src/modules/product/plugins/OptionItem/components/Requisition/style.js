/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, FlexRow } from '@theme_mixins';
// import { WHITE, RED, ORANGE } from '@theme_color';
// import { CenterAbsolute, FlexColumn, FlexRow, CreateMargin, CreatePadding } from '@theme_mixins';
// import { FONT_24, FONT_16 } from '@theme_typography';

export default makeStyles((theme) => ({
    root: {
        zIndex: '1000 !important',
        '& .MuiPopover-paper': {
            overflow: 'visible',
            borderRadius: 0,
            // boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            // boxShadow: '0 3px 3px rgb(0 0 0 / 15%)',
            boxShadow: '0 3px 3px rgb(0 0 0 / 15%)',
            padding: 8,
            border: '1px solid #bbbbbb',
        },
    },
    popoverContainer: {},

    popoverArrow: {
        border: '6px solid',
        borderColor: 'transparent transparent #fff transparent',
        zIndex: 99,
        display: 'block',
        position: 'absolute',
        top: -12,
        right: '20%',
        height: 0,
        width: 0,
    },
    list: {
        cursor: 'pointer',
    },
    listAction: {
        ...FlexRow,
        alignItems: 'center',
    },
    listText: {
        fontSize: 14,
        color: '#2E2E2E',
        ...CreateMargin(3, 0, 3, 0),
        cursor: 'pointer',
    },
    addIcon: {
        fill: '#f58732',
        width: 18,
        height: 18,
        marginRight: 4,
    },
    customFormsModal: {
        zIndex: '1000 !important',
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
        },
        '& h2': {
            fontSize: '30px',
            lineHeight: '39px',
            color: '#42929d',
            fontWeight: '400',
        },
        '& .custom-form-modal': {
            margin: 0,
            '& span': {
                margin: 0,
                display: 'block',
            },
            '& label + .MuiInput-formControl': {
                marginTop: 0,
            },
            '& input': {
                width: '100%',
                borderRadius: '5px',
                height: '40px',
                border: '1px solid #d5eafb',
                marginTop: '5px',
                marginBottom: '10px',
                padding: ' 0 10px',
            },
            '& textarea': {
                width: '100% !important',
                marginTop: '5px',
                borderRadius: '5px',
                border: '1px solid #d5eafb',
                height: '100px',
                padding: ' 0 10px',
            },
            '& .button-wrapper': {
                display: 'flex',
                width: 'max-content',
                '& .btn-submit': {
                    borderRadius: '50px',
                    backgroundColor: '#f58732',
                    borderColor: '#f58732',
                    boxShadow: 'unset',
                },
                '& .btn-cancel': {
                    backgroundColor: 'unset',
                    borderColor: 'unset',
                    '& p': {
                        fontSize: 14,
                        color: '#f58732',
                    },
                },
            },
            '& .asterisk-label': {
                color: 'red',
                display: 'inline',
                marginLeft: '5px',
            },
        },
    },
}));
