import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import classNames from 'classnames';
import Button from '@common_button';

export const ModalCreate = (props) => {
    const {
        styles, formikCompanyUser, handleClickClose, showFieldCompanyUser, t,
    } = props;
    return (
        <Dialog className={classNames(styles.customFormsModal, 'custom-forms-modal')} open={showFieldCompanyUser} onClose={handleClickClose}>
            <DialogTitle>{t('customer:companyUser:buttonAdd')}</DialogTitle>
            <DialogContent>

                <form onSubmit={formikCompanyUser.handleSubmit} className="custom-form-modal">
                    <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                        {t('customer:companyUser:modalJobTitle')}
                    </Typography>
                    <CloseIcon
                        onClick={handleClickClose}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '15px',
                            right: '20px',
                        }}
                    />
                    <TextField
                        name="job_title"
                        type="text"
                        maxlength="40"
                        onChange={formikCompanyUser.handleChange}
                        value={formikCompanyUser.values.job_title}
                        error={!!(formikCompanyUser.touched.job_title && formikCompanyUser.errors.job_title)}
                        errorMessage={(formikCompanyUser.touched.job_title && formikCompanyUser.errors.job_title) || null}
                    />
                    <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                        {t('customer:companyUser:modalFirstName')}
                    </Typography>
                    <TextField
                        name="firstname"
                        type="text"
                        maxlength="40"
                        onChange={formikCompanyUser.handleChange}
                        value={formikCompanyUser.values.firstname}
                        error={!!(formikCompanyUser.touched.firstname && formikCompanyUser.errors.name)}
                        errorMessage={(formikCompanyUser.touched.firstname && formikCompanyUser.errors.firstname) || null}
                    />
                    <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                        {t('customer:companyUser:modalLastName')}
                    </Typography>
                    <TextField
                        name="lastname"
                        type="text"
                        maxlength="40"
                        onChange={formikCompanyUser.handleChange}
                        value={formikCompanyUser.values.lastname}
                        error={!!(formikCompanyUser.touched.lastname && formikCompanyUser.errors.lastname)}
                        errorMessage={(formikCompanyUser.touched.lastname && formikCompanyUser.errors.lastname) || null}
                    />
                    <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                        {t('customer:companyUser:modalEmail')}
                    </Typography>
                    <TextField
                        name="email"
                        type="text"
                        maxlength="40"
                        onChange={formikCompanyUser.handleChange}
                        value={formikCompanyUser.values.email}
                        error={!!(formikCompanyUser.touched.email && formikCompanyUser.errors.email)}
                        errorMessage={(formikCompanyUser.touched.email && formikCompanyUser.errors.email) || null}
                    />
                    <Typography className="required-field" variant="span" type="bold" color="black" size="14">
                        {t('customer:companyUser:modalPhoneNumber')}
                    </Typography>
                    <TextField
                        name="telephone"
                        type="text"
                        maxlength="40"
                        onChange={formikCompanyUser.handleChange}
                        value={formikCompanyUser.values.telephone}
                        error={!!(formikCompanyUser.touched.telephone && formikCompanyUser.errors.telephone)}
                        errorMessage={(formikCompanyUser.touched.telephone && formikCompanyUser.errors.telephone) || null}
                    />
                    <div className="button-wrapper">
                        <Button className={classNames(styles.generalButton, 'btn-submit')} type="submit" align="left">
                            <Typography variant="span" type="normal" color="white" size="14">
                                {t('customer:companyUser:modalButtonSubmit')}
                            </Typography>
                        </Button>
                        <Button variant="text" className={classNames(styles.generalButton, 'btn-cancel')} onClick={handleClickClose}>
                            <Typography variant="p" type="normal">
                                {t('customer:companyUser:modalButtonCancel')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalCreate;
