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

import InputFile from '@core_modules/smartbidding/pages/create/components/inputFile';
import useStyles from '@core_modules/smartbidding/pages/create/components/style';

const Content = (props) => {
    const {
        product, t, formik, handelChangeInput, handleAddProduct, handleRemoveProduct, title, surat, setSurat, maxSize, handleSubmit,
    } = props;
    const styles = useStyles();

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
                    <div className={styles.formContainer}>
                        <div className={styles.field}>
                            <div>
                                <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                    {t('smartbidding:create:name')}
                                </Typography>
                                <Typography type="subtitle1" letter="capitalize" className="required">
                                    *
                                </Typography>
                            </div>
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                className="inputName"
                                error={!!(formik.touched.name && formik.errors.name)}
                                helperText={(formik.touched.name && formik.errors.name) || ''}
                            />
                        </div>
                        <div className={styles.field}>
                            <div>
                                <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                    {t('smartbidding:create:desc')}
                                </Typography>
                                <Typography type="subtitle1" letter="capitalize" className="required">
                                    *
                                </Typography>
                            </div>
                            <TextField
                                id="deskripsi"
                                name="deskripsi"
                                value={formik.values.deskripsi}
                                multiline
                                onChange={(e) => formik.setFieldValue('deskripsi', e.target.value)}
                                className={classNames('inputName', 'deskripsi')}
                                error={!!(formik.touched.deskripsi && formik.errors.deskripsi)}
                                helperText={(formik.touched.deskripsi && formik.errors.deskripsi) || ''}
                            />
                        </div>
                        <div className={classNames(styles.field)}>
                            <div>
                                <InputFile
                                    formik={formik}
                                    t={t}
                                    errorValue={!!(formik.touched.surat_lelang && formik.errors.surat_lelang)}
                                    helperText={(formik.touched.surat_lelang && formik.errors.surat_lelang) || ''}
                                    surat={surat}
                                    setSurat={setSurat}
                                    maxSize={maxSize}
                                />
                                <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label, 'attachmentInfo')}>
                                    {t('smartbidding:create:attachInfo', { max_size: maxSize })}
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div>
                                <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                    {t('smartbidding:create:dueDate')}
                                </Typography>
                                <Typography type="subtitle1" letter="capitalize" className="required">
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
                                inputProps={{
                                    min: formatDate(Date.now(), 'YYYY-MM-DD'),
                                }}
                            />
                        </div>

                        <div className={styles.field}>
                            <table className="items">
                                <tbody>
                                    <tr className="itemsField">
                                        <td className="itemsLabel">
                                            <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                                {t('smartbidding:create:productName')}
                                            </Typography>
                                            <Typography type="subtitle1" letter="capitalize" className="required">
                                                *
                                            </Typography>
                                        </td>
                                        <td className="itemsLabel" style={{ paddingLeft: '14px' }}>
                                            <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                                {t('smartbidding:create:qty')}
                                            </Typography>
                                            <Typography type="subtitle1" letter="capitalize" className="required">
                                                *
                                            </Typography>
                                        </td>
                                        <td>
                                            <></>
                                        </td>
                                    </tr>
                                    {product.map((input, createSBIndex) => (
                                        <tr className="rowInput" key={createSBIndex}>
                                            <td>
                                                <TextField
                                                    id="product_name"
                                                    name="product_name"
                                                    value={input.product_name}
                                                    className="inputProduct"
                                                    error={
                                                        !!(
                                                            formik.touched.items?.[createSBIndex]?.product_name
                                                            && formik.errors.items?.[createSBIndex]?.product_name
                                                        )
                                                    }
                                                    helperText={
                                                        (formik.touched.items?.[createSBIndex]?.product_name
                                                            && formik.errors.items?.[createSBIndex]?.product_name)
                                                        || ''
                                                    }
                                                    onChange={(event) => handelChangeInput(createSBIndex, event)}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    id="qty"
                                                    name="qty"
                                                    value={input.qty}
                                                    className="inputQty"
                                                    error={
                                                        !!(formik.touched.items?.[createSBIndex]?.qty && formik.errors.items?.[createSBIndex]?.qty)
                                                    }
                                                    helperText={
                                                        (formik.touched.items?.[createSBIndex]?.qty && formik.errors.items?.[createSBIndex]?.qty)
                                                        || ''
                                                    }
                                                    onChange={(event) => handelChangeInput(createSBIndex, event)}
                                                    type="number"
                                                />
                                            </td>
                                            <td>
                                                <div className="itemsRemoveWrapper">
                                                    <span
                                                        className={classNames('deleteIcon', 'icon-delete')}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleRemoveProduct(createSBIndex)}
                                                    >
                                                        <img src="/assets/img/icon_delete.svg" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className={classNames(styles.addProduct)}>
                                <Button className="button" disableRipple onClick={() => handleAddProduct()}>
                                    <AddIcon style={{ color: '#F58732' }} />
                                    <span>{t('smartbidding:create:addProduct')}</span>
                                </Button>
                            </div>
                        </div>
                        <div className="itemFields" style={{ textAlign: 'center' }}>
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
                            <div className={classNames(styles.button)}>
                                <Button
                                    className="button"
                                    onClick={(e) => {
                                        handleSubmit(e, '2');
                                    }}
                                >
                                    <span>{t('smartbidding:create:save')}</span>
                                </Button>
                            </div>
                            <div className={classNames(styles.button)}>
                                <Button className="button" href="/customer/account/bidding" style={{ background: 'transparent' }}>
                                    <span style={{ color: '#F58732' }}>{t('smartbidding:create:cancel')}</span>
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
