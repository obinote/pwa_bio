import Link from 'next/link';
import Button from '@common_button';
import useStyles from '@core_modules/error/pages/default/components/style';
import Error404 from '@core_modules/error/pages/default/components/404';

const ErrorContent = (props) => {
    const styles = useStyles();
    const {
        statusCode, title, t, withoutLayout,
    } = props;

    return (
        <>
            {statusCode === 404 && !withoutLayout
                ? <Error404 {...props} />
                : (
                    <div className={styles.error}>
                        <div className={styles.wrapper}>
                            {statusCode ? <h1 className={styles.h1}>{statusCode}</h1> : <></>}
                            <div className={styles.desc}>
                                <h2 className={styles.h2}>{title}</h2>
                                <div className={styles.btn}>
                                    <Link href="/">
                                        <Button className={styles.backBtn}>{t('common:error:backtoHome')}</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default ErrorContent;
