// import Layout from '@layout_customer';
import classNames from 'classnames';
import Typography from '@common_typography';
import useStyles from '@core_modules/customer/pages/companyprofile/edit/components/style';
import Select from '@common_select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Content = (props) => {
    const styles = useStyles();
    const {
        t,
        formik,
        countries,
        provinces,
        cities,
        district,
        subdistrict,
        handleChangeCountry,
        handleChangeProvince,
        handleChangeCity,
        handleChangeDistrict,
        handleChangeSubdistrict,
        handleUploadClick,
        handlePhotoChange,
        handlePhotoRemove,
        photoSrc,
        inputPhotoRef,
        photoFileName,
    } = props;

    return (
        <>
            <div>
                <form>
                    <div className={classNames(styles.container)}>
                        <div className="profileContainer col">
                            <Typography variant="h2" type="bold" letter="capitalize" className={classNames('label', styles.noMargin)}>
                                {t('customer:companyProfile:accountInfo')}
                            </Typography>
                            <div className={styles.divEdit}>
                                <div className={classNames(styles.field, styles.gridSpanFull)}>
                                    <div>
                                        <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                            {t('customer:companyProfile:name')}
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
                                        className={classNames('inputField', styles.textField)}
                                        error={!!(formik.touched.name && formik.errors.name)}
                                        helperText={(formik.touched.name && formik.errors.name) || ''}
                                    />
                                </div>
                                <div className={classNames(styles.field, styles.gridSpanFull)}>
                                    <div>
                                        <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                            {t('customer:companyProfile:email')}
                                        </Typography>
                                        <Typography type="subtitle1" letter="capitalize" className="required">
                                            *
                                        </Typography>
                                    </div>
                                    <TextField
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                        className={classNames('inputField', styles.textField)}
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        helperText={(formik.touched.email && formik.errors.email) || ''}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <Typography variant="h2" type="bold" letter="capitalize" className={classNames('label', styles.noMargin)}>
                                    {t('customer:companyProfile:address')}
                                </Typography>
                                <div className={styles.divEdit}>
                                    <div className={classNames(styles.field, styles.gridSpanFull)}>
                                        <div>
                                            <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                                {t('customer:companyProfile:addressEdit:street')}
                                            </Typography>
                                            <Typography type="subtitle1" letter="capitalize" className="required">
                                                *
                                            </Typography>
                                        </div>
                                        <TextField
                                            id="street"
                                            name="street"
                                            value={formik.values.street}
                                            onChange={(e) => formik.setFieldValue('street', e.target.value)}
                                            className={classNames('inputField', styles.textField)}
                                            error={!!(formik.touched.street && formik.errors.street)}
                                            helperText={(formik.touched.street && formik.errors.street) || ''}
                                        />
                                    </div>
                                    <Select
                                        required
                                        label={t('customer:companyProfile:addressEdit:country')}
                                        name="country"
                                        helperText={t('common:form:select')}
                                        options={countries}
                                        value={formik.values.country}
                                        onChange={(e) => handleChangeCountry(e.target.value)}
                                        error={!!(formik.touched.country && formik.errors.country)}
                                        errorMessage={(formik.touched.country && formik.errors.country) || null}
                                        className={classNames(styles.select, styles.gridSpanFullInMobile)}
                                    />
                                    <Select
                                        required
                                        label={t('customer:companyProfile:addressEdit:region')}
                                        name="province"
                                        helperText={t('common:form:select')}
                                        options={provinces}
                                        value={formik.values.province}
                                        onChange={(e) => handleChangeProvince(e.target.value)}
                                        error={!!(formik.touched.province && formik.errors.province)}
                                        errorMessage={(formik.touched.province && formik.errors.province) || null}
                                        className={classNames(styles.select, styles.gridSpanFullInMobile)}
                                    />
                                    <Select
                                        required
                                        label={t('common:form:city')}
                                        name="city"
                                        helperText={t('common:form:select')}
                                        options={cities}
                                        value={formik.values.city}
                                        onChange={(e) => handleChangeCity(e.target.value)}
                                        error={!!(formik.touched.city && formik.errors.city)}
                                        errorMessage={(formik.touched.city && formik.errors.city) || null}
                                        className={classNames(styles.select, styles.gridSpanFullInMobile)}
                                    />
                                    <Select
                                        required
                                        label={t('register:district')}
                                        name="district"
                                        helperText={t('common:form:select')}
                                        options={district}
                                        value={formik.values.district}
                                        onChange={(e) => handleChangeDistrict(e.target.value)}
                                        error={!!(formik.touched.district && formik.errors.district)}
                                        errorMessage={(formik.touched.district && formik.errors.district) || null}
                                        className={classNames(styles.select, styles.gridSpanFullInMobile)}
                                    />
                                    <Select
                                        required
                                        label={t('register:subdistrict')}
                                        name="subdistrict"
                                        helperText={t('common:form:select')}
                                        options={subdistrict}
                                        value={formik.values.subdistrict}
                                        onChange={(e) => handleChangeSubdistrict(e.target.value)}
                                        error={!!(formik.touched.subdistrict && formik.errors.subdistrict)}
                                        errorMessage={(formik.touched.subdistrict && formik.errors.subdistrict) || null}
                                        className={classNames(styles.select, styles.gridSpanFullInMobile)}
                                    />
                                    <div className={classNames(styles.field, styles.gridSpanFull)}>
                                        <div>
                                            <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                                {t('customer:companyProfile:addressEdit:postalCode')}
                                            </Typography>
                                            <Typography type="subtitle1" letter="capitalize" className="required">
                                                *
                                            </Typography>
                                        </div>
                                        <TextField
                                            id="postcode"
                                            name="postcode"
                                            value={formik.values.postcode}
                                            onChange={(e) => formik.setFieldValue('postcode', e.target.value)}
                                            className={classNames('inputField', styles.textField)}
                                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                                            helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                                        />
                                    </div>
                                    <div className={classNames(styles.field, styles.gridSpanFull)}>
                                        <div>
                                            <Typography type="subtitle1" letter="capitalize" className={classNames(styles.label)}>
                                                {t('customer:companyProfile:addressEdit:telephone')}
                                            </Typography>
                                            <Typography type="subtitle1" letter="capitalize" className="required">
                                                *
                                            </Typography>
                                        </div>
                                        <TextField
                                            id="telephone"
                                            name="telephone"
                                            value={formik.values.telephone}
                                            onChange={(e) => formik.setFieldValue('telephone', e.target.value)}
                                            className={classNames('inputField', styles.textField)}
                                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                                            helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ paddingTop: 24 }} />

                            <div className={styles.action}>
                                <Button className={classNames(styles.button)} onClick={formik.handleSubmit}>
                                    <span>{t('customer:companyProfile:save')}</span>
                                </Button>
                                <Button className="button" href="/customer/account/companyprofile" style={{ background: 'transparent' }}>
                                    <span style={{ color: '#F58732', textTransform: 'none' }}>{t('customer:companyProfile:cancel')}</span>
                                </Button>
                            </div>
                        </div>
                        <div className={classNames(styles.photoContainer, 'col')}>
                            <Typography variant="h2" type="bold" letter="capitalize" className={classNames('label', styles.noMargin)}>
                                {t('customer:companyProfile:companyPhoto')}
                            </Typography>
                            <div className={styles.divPhoto}>
                                <div className="view">
                                    <div className="imageView">
                                        <div
                                            style={{
                                                border: '1px solid #E8EDF1',
                                                borderRadius: '10px',
                                                background: '#E8EDF1',
                                                overflow: 'hidden',
                                                aspectRatio: '1/1',
                                                margin: '0 auto',
                                                height: '100%',
                                            }}
                                        >
                                            {photoSrc ? (
                                                <img
                                                    src={photoSrc}
                                                    alt="logo-perusahaan"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        height: '100%',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <CameraAltOutlinedIcon style={{ color: '#42929D' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Box className="imageView" display="flex" flexDirection="column" justifyContent="center">
                                        <input
                                            name="photo"
                                            type="file"
                                            onChange={handlePhotoChange}
                                            style={{ display: 'none' }}
                                            ref={inputPhotoRef}
                                        />
                                        {!formik.values.photo ? (
                                            <Button onClick={handleUploadClick} className="buttonUpload">
                                                {t('customer:companyProfile:photoEdit:change')}
                                            </Button>
                                        ) : (
                                            <Box display="flex" alignItems="center">
                                                <span className={styles.photoFileName}>{photoFileName}</span>
                                                <IconButton onClick={handlePhotoRemove} className={styles.photoRemoveButton} size="small">
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {formik.errors.photo && (
                                            <p className={styles.photoUploadHelper} style={{ color: '#ff0000' }}>
                                                {formik.errors.photo}
                                            </p>
                                        )}
                                        <p className={styles.photoUploadHelper}>{t('customer:companyProfile:photoEdit:editInfo')}</p>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Content;
