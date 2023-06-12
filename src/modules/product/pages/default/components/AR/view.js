import classNames from 'classnames';
import useStyles from '@core_modules/product/pages/default/components/AR/style';
import Button from '@common_button';
import Typography from '@common_typography';

const View = ({ t, handleClickAr }) => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.wrapper)}>
            <Button className={classNames(styles.btnView)} onClick={handleClickAr}>
                <i className={classNames(styles.iconmoon, 'icon-ar')} />
                <Typography align="center" variant="inherit" className={styles.txtBtn}>
                    {t('product:ar:button')}
                </Typography>
            </Button>
            <Typography align="center" className={classNames(styles.txtCaption)}>
                {t('product:ar:caption')}
            </Typography>
        </div>
    );
};

export default View;
