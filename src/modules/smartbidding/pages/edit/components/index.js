/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import formatDate from '@helper_date';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import useStyles from '@core_modules/smartbidding/pages/edit/components/style';

const Content = (props) => {
    const {
        product,
        t,
        formik,
        handelChangeInput,
        handleAddProduct,
        handleRemoveProduct,
        title,
        data,
        attach,
        handleClose,
        handleSubmit,
        handleItemsOnBlur,
    } = props;
    const styles = useStyles();

    const handleDownload = (url, name) => {
        fetch(url).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = name;
                alink.click();
            });
        });
    };

    return (
        <Layout t={t}>
            <div>
                <Typography
                    variant="h1"
                    type="bold"
                    letter="capitalize"
                    className={classNames(styles.titleContent)}
                    style={{ fontSize: '30px', marginLeft: '0', fontWeight: 'bold' }}
                >
                    {title}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.detailsContainer}>
                        <div className="divData">
                            <div>
                                <Typography variant="subtitle2" type="bold">
                                    {t('smartbidding:details:status')}
                                </Typography>
                                <Typography variant="subtitle2" type="bold">
                                    {t('smartbidding:details:create')}
                                </Typography>
                                <Typography variant="subtitle2" type="bold">
                                    {t('smartbidding:details:expired')}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle2" letter="capitalize">
                                    {data?.status === '1' ? 'Draft' : data?.status === '2' ? 'Open' : data?.status === '3' ? 'Closed' : 'Complete'}
                                </Typography>
                                <Typography variant="subtitle2" letter="capitalize">
                                    {formatDate(data.created_at, 'DD-MM-YYYY')}
                                    {' ('}
                                    {data.company_name}
                                    {') '}
                                </Typography>
                                <Typography variant="subtitle2" letter="capitalize">
                                    {formatDate(data.due_date, 'DD-MM-YYYY')}
                                </Typography>
                            </div>
                        </div>
                        <div style={{ maxWidth: '470px' }}>
                            <Typography variant="subtitle2" letter="capitalize">
                                {data.deskripsi}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
                            <Typography variant="subtitle2" type="bold">
                                {t('smartbidding:details:attach')}
                            </Typography>
                            {attach.length > 0 ? (
                                <>
                                    {attach.map((index) => (
                                        <Button
                                            onClick={() => handleDownload(index.url, index.filename)}
                                            disableRipple
                                            style={{ alignSelf: 'start', padding: '0' }}
                                        >
                                            <Typography variant="subtitle2" style={{ color: '#F58732', margin: 0, marginLeft: '5px' }}>
                                                {index.filename}
                                            </Typography>
                                        </Button>
                                    ))}
                                </>
                            ) : (
                                <Alert severity="warning">{t('smartbidding:notFound')}</Alert>
                            )}
                        </div>
                        <div className={styles.field}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="subtitle2" type="bold" letter="capitalize">
                                    {t('smartbidding:create:dueDate')}
                                </Typography>
                                <Typography type="bold" letter="capitalize" className="required">
                                    *
                                </Typography>
                            </div>
                            <TextField
                                id="due_date"
                                name="due_date"
                                type="date"
                                className="dueDate"
                                value={formik.values.due_date}
                                onChange={(e) => formik.setFieldValue('due_date', formatDate(e.target.value, 'YYYY-MM-DD'))}
                                error={!!(formik.touched.due_date && formik.errors.due_date)}
                                helperText={(formik.touched.due_date && formik.errors.due_date) || ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: formatDate(Date.now(), 'YYYY-MM-DD'),
                                }}
                            />
                        </div>
                        <div className={styles.field}>
                            <table className="items">
                                <tr className="itemsField">
                                    <td className="itemsLabel">
                                        <Typography variant="subtitle2" type="bold" letter="capitalize" className="label">
                                            {t('smartbidding:create:productName')}
                                        </Typography>
                                        <Typography type="bold" letter="capitalize" className="required">
                                            *
                                        </Typography>
                                    </td>
                                    <td className="itemsLabel" style={{ marginLeft: '9px' }} colSpan={2}>
                                        <Typography variant="subtitle2" type="bold" letter="capitalize" className="label">
                                            {t('smartbidding:create:qty')}
                                        </Typography>
                                        <Typography type="bold" letter="capitalize" className="required">
                                            *
                                        </Typography>
                                    </td>
                                </tr>
                                {product.map((input, editSBIndex) => (
                                    <tr key={`editSbIndex_${editSBIndex}`} className="itemsInput">
                                        <td className="rowInput">
                                            <TextField
                                                id={`product_name_${editSBIndex}`}
                                                name="product_name"
                                                value={input.product_name}
                                                className="inputProduct"
                                                error={!!formik.errors.items?.[editSBIndex]?.product_name}
                                                helperText={formik.errors.items?.[editSBIndex]?.product_name || ''}
                                                onChange={(event) => handelChangeInput(editSBIndex, event)}
                                                onBlur={(ev) => {
                                                    handleItemsOnBlur(editSBIndex, ev);
                                                }}
                                            />
                                        </td>
                                        <td className="rowInput">
                                            <TextField
                                                id={`qty_${editSBIndex}`}
                                                name="qty"
                                                value={input.qty}
                                                className="inputQty"
                                                type="number"
                                                error={!!formik.errors.items?.[editSBIndex]?.qty}
                                                helperText={formik.errors.items?.[editSBIndex]?.qty || ''}
                                                onChange={(event) => handelChangeInput(editSBIndex, event)}
                                                onBlur={(ev) => {
                                                    handleItemsOnBlur(editSBIndex, ev);
                                                }}
                                            />
                                        </td>

                                        <td className="rowInput">
                                            <div>
                                                <span
                                                    className={classNames('deleteIcon', 'icon-delete')}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleRemoveProduct(editSBIndex)}
                                                >
                                                    <img src="/assets/img/icon_delete.svg" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>

                            <div className={classNames(styles.addProduct)}>
                                <Button className="button" disableRipple onClick={() => handleAddProduct()}>
                                    <AddIcon style={{ color: '#F58732' }} />
                                    <span>{t('smartbidding:create:addProduct')}</span>
                                </Button>
                            </div>

                        </div>
                        <div className="itemFields">
                            <div className={classNames(styles.button)}>
                                <Button
                                    className="button"
                                    onClick={(e) => {
                                        handleSubmit(e, '1');
                                    }}
                                >
                                    <span>{t('smartbidding:create:draft')}</span>
                                </Button>
                            </div>
                            <div className={classNames(styles.button)} style={{ marginLeft: '16px' }}>
                                <Button
                                    className="button"
                                    onClick={(e) => {
                                        handleSubmit(e, '2');
                                    }}
                                >
                                    <span>{t('smartbidding:create:save')}</span>
                                </Button>
                            </div>
                            <div className={classNames(styles.button)} style={{ marginLeft: '16px' }}>
                                <Button className="button" href="/customer/account/bidding" style={{ background: 'transparent' }}>
                                    <span style={{ color: '#F58732' }}>{t('smartbidding:create:cancel')}</span>
                                </Button>
                            </div>
                            <div className={styles.button} style={{ float: 'right' }}>
                                <Button className="button" onClick={() => handleClose(data.id)}>
                                    <span>{t('smartbidding:details:close')}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Content;
