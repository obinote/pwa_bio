import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    customModalComplete: {
        zIndex: '1000 !important',
        '& *': {
            letterSpacing: 0,
        },
        '& .modal-complete-title': {
            textAlign: 'center',
            padding: '10px 10px 0',
            '& div': {
                textAlign: 'right',
            },
            '& button': {
                padding: 0,
                minWidth: 0,
            },
        },
        '& .modal-complete-content': {
            padding: '10px',
            textAlign: 'center',
            overflow: 'hidden',
            '& h2': {
                textAlign: 'center',
                margin: '0 0 5px',
            },
        },
        '& .modal-action': {
            paddingBottom: '40px',
            justifyContent: 'center',
            '& div': {
                width: 'auto',
            },
        },
        '& .MuiDialog-paper': {
            borderRadius: 15,
            maxWidth: 400,
        },
    },
    customModalRating: {
        zIndex: '1000 !important',
        '& .MuiDialogTitle-root': {
            padding: '10px 20px',
            '& *': {
                fontSize: 18,
                fontWeight: '600',
                lineHeight: 'normal',
            },
        },
        '& .MuiDialogContent-root': {
            padding: '0 20px 26px 20px',
        },
        '& .MuiRating-iconEmpty': {
            color: '#D5EAFB',
        },
        '& .MuiRating-root': {
            marginBottom: '15px',
        },
        '& .upload-review': {
            marginTop: '15px',
        },
        '& .image-review': {
            display: 'flex',
            gap: '20px',
        },
        '& .btn-delete-image': {
            background: 'none',
            color: '#f58732',
            fontSize: '12px',
            padding: 0,
            marginBottom: '20px',
            marginTop: '10px',
            textAlign: 'left',
        },
        '& .btn-delete-image:hover': {
            color: '#f58732',
            background: 'none',
        },
        '& .image-review img': {
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: '1px solid #ccc',
        },
        '& .custom-form-modal': {
            '& .MuiFormControl-root': {
                marginTop: 0,
                marginBottom: 0,
                maxHeight: 'none',
            },
            '& textarea': {
                width: '100% !important',
                marginTop: 0,
                borderRadius: '5px',
                border: '1px solid #d5eafb',
                height: '130px !important',
                padding: '10px',
                boxSizing: 'border-box',
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
        '& .MuiDialog-paperScrollPaper': {
            width: 400,
            minHeight: 400,
            borderRadius: 15,
        },
    },
    buttonYes: {
        backgroundColor: '#f58732',
        padding: '0 15px',
        height: '40px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        outline: 'none',
        '& span': {
            color: '#ffffff',
        },
    },
    buttonTransparent: {
        backgroundColor: 'transparent !important',
        padding: '0 10px',
        height: '40px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        outline: 'none',
        '& p': {
            color: '#f58732',
        },
    },
    modalHead: {
        display: 'flex',
        '& button': {
            minWidth: 0,
            padding: 0,
            height: 30,
            width: 30,
        },
        '& > span': {
            width: '100%',
        },
        '& > div': {
            width: 30,
        },
    },
}));
