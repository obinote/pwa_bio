import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SignatureCanvas from 'react-signature-canvas';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const SignatureView = (props) => {
    const {
        onApplySignature,
        onDeleteSignature,
        sigPadRef,
        t,
        loadingSignature,
        formik,
        checkout,
    } = props;

    if (checkout.loading.all || checkout.loading.signature) {
        return <Loader />;
    }

    return (
        <div id="signature-area">
            <SignatureCanvas
                canvasProps={{ height: 360, className: 'sigCanvas', id:"checkout_signCanvas" }}
                ref={sigPadRef}
                onEnd={onApplySignature}
                clearOnResize={false}
            />
            <Grid container spacing={3} className="signatureAction">
                <Grid item xs={12} md={12}>
                    <Button
                        className="signatureDelete"
                        variant="contained"
                        onClick={onDeleteSignature}
                    >
                        {loadingSignature ? (
                            <CircularProgress size={16} />
                        ) : t('checkout:SignatureContent:delete')}
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} className="signatureName">
                <TextField
                    id="checkout_chargeName_textfield"
                    name="signatureName"
                    placeholder="Nama Penanggung Jawab"
                    onChange={formik.handleChange}
                    value={formik.values.signatureName}
                    inputProps={{ style: { padding: 10 } }}
                />
            </Grid>
        </div>
    );
};
export default SignatureView;
