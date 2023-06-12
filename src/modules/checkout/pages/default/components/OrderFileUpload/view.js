import React from 'react';
import Typography from '@common_typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const OrderFileUploadView = (props) => {
    const {
        t,
        styles,
        cartId,
        inputFileRef,
        onChangeFileUpload,
        onChangePurchaseLetter,
        onDeleteFileUpload,
        onErrorImagePreview,
        maxSize,
        imageDisplay,
        loading,
        loadingDelete,
        purchaseLetterValue,
        onRequestFileUpload,
        checkout,
    } = props;
    const isLoading = cartId === undefined || loading;
    const isShowImage = imageDisplay !== null && !loading;
    const { cart } = checkout.data;
    return (
        <div id="order-file-upload" className={styles.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <Typography className={styles.containerTitle} variant="title" type="bold" letter="capitalize">
                        {t('checkout:purchaseLetter')}
                    </Typography>
                    <TextField
                        className={styles.purchaseLetter}
                        disabled={isLoading}
                        value={purchaseLetterValue}
                        onChange={onChangePurchaseLetter}
                        placeholder={t('checkout:purchaseLetterPlaceholder')}
                        inputProps={{ style: { padding: 10 } }}
                    />
                </Grid>
                <Grid item xs={12} lg={12} className={styles.orderLetterWrapper}>
                    <Grid item xs={12} lg={8}>
                        <Typography className={styles.containerTitle} variant="title" type="bold" letter="capitalize">
                            {t('checkout:uploadImagePurchaseLetter')}
                        </Typography>
                        {/* FILE INPUT */}
                        <Grid item xs={12}>
                            <input className="upload-button" disabled={isLoading} ref={inputFileRef} type="file" onChange={onChangeFileUpload} />
                        </Grid>
                        <Typography className={[styles.containerTitle, styles.policyText]} variant="caption">
                            {t('checkout:uploadImagePolicy', { max_size: maxSize })}
                        </Typography>
                    </Grid>
                    <Grid item className={isShowImage ? styles.buttonFileUploadFrameNoBreak : styles.buttonFileUploadFrame} xs={12} lg={4}>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            variant="contained"
                            className={styles.buttonFileUpload}
                            onClick={onRequestFileUpload}
                        >
                            {t('checkout:upload')}
                        </Button>
                    </Grid>
                </Grid>
                {/* IMAGE PREVIEW */}
                {isShowImage && (
                    <Grid item xs={12} className={styles.imageFrame}>
                        <Button disabled={loadingDelete} className={styles.buttonFileDelete} variant="contained" onClick={onDeleteFileUpload}>
                            <DeleteIcon />
                        </Button>
                        <img
                            src={imageDisplay}
                            className={isShowImage ? styles.imagePreviewFull : styles.imagePreview}
                            alt="preview"
                            onError={onErrorImagePreview}
                        />
                    </Grid>
                )}
                { cart?.notification_sensitive_category ? (
                    <Grid item xs={12} className={styles.sensitiveAlert}>
                        <Typography className={styles.iconAlert}>
                            <span className="icon-warning" />
                            {cart.notification_sensitive_category}
                        </Typography>
                    </Grid>
                ) : null }
            </Grid>
        </div>
    );
};
export default OrderFileUploadView;
