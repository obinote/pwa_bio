/* eslint-disable react/no-unknown-property */
import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CancelRounded';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DialogContent = withStyles(() => ({
    root: {
        padding: 0,
        background: 'transparent',
    },
}))(MuiDialogContent);

const Dialog = withStyles(() => ({
    root: {
        padding: 0,
        '& :first-child': {
            padding: 0,
        },
    },
    paper: {
        boxShadow: 'none',
        padding: 0,
        background: 'white',
    },
}))(MuiDialog);

const ModalBriCeriaView = (props) => {
    const {
        open, setOpen, briCeriaData, handleClose,
    } = props;
    if (!briCeriaData) {
        return <></>;
    }

    return (
        <Dialog
            TransitionComponent={Transition}
            aria-labelledby="customized-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            className="modal-briceria"
            PaperProps={{
                classes: {
                    root: 'modal-briceria-paper',
                },
            }}
        >
            <IconButton
                color="primary"
                size="medium"
                className="xendit-btn-close"
                onClick={() => {
                    setOpen();
                    handleClose();
                }}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <DialogContent classes={{ root: 'modal-briceria-box' }}>
                <iframe
                    id="iframe-invoice"
                    className="iframe-invoice"
                    title="Invoice"
                    src={briCeriaData.redirect_url}
                />
            </DialogContent>
            <style jsx global>
                {`
                    .modal-briceria {
                        background: transparent;
                    }
                    .modal-briceria-paper {
                        overflow-y: visible;
                    }
                    .xendit-btn-close {
                        position: absolute;
                        right: -15px;
                        top: -15px;
                        z-index: 99;
                    }

                   .modal-briceria-box {
                       padding: 0px;
                       width: 600px;
                       background: transparent;
                       height: calc(100vh - 150px);
                       overflow: hidden;
                   }
                   .iframe-invoice {
                        height: inherit;
                        width: inherit;
                        border: 0;
                        overflow-y: scroll;
                    }

                    .img-qr-code { 
                        height: 80%;
                        width: inherit;
                        margin-bottom: 10%;
                    }

                    .qr-simulate {
                        padding: 15px;
                        margin-top: 5%;
                    }

                    .btn-qr-code {
                        height: 45px;
                        padding: 5px;
                    }

                    @media screen and (max-width: 768px) {
                        .modal-briceria-box {
                            padding: 0px;
                            height: calc(100vh - 40px);
                            width: calc(100vw - 70px);
                            overflow: hidden;
                        }
                    }
                    
                `}
            </style>
        </Dialog>
    );
};

export default ModalBriCeriaView;
