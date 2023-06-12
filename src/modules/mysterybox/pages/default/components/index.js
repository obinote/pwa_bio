/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import useStyles from '@core_modules/mysterybox/pages/default/components/style';

const MysteryBox = (props) => {
    const styles = useStyles();
    const {
        t, openGift, handleGift, prize, dataPrize, loadingPrize,
    } = props;

    return (
        <div className={styles.fullContainer} style={{ backgroundImage: "url('/assets/img/bg_blur.png')" }}>
            {!openGift ? (
                <div className={styles.container}>
                    <div className={styles.pageTitleWrapper}>
                        <h1 className={styles.pageTitle}>
                            {t('mysterybox:title')}
                        </h1>
                        <br />
                        <h3 className={styles.pageTitleInfo}>
                            {t('mysterybox:titleInfo')}
                        </h3>
                    </div>
                    <div className={styles.divImg}>
                        <img
                            className={clsx(styles.iconImg, prize ? 'imgShake' : 'imgMove')}
                            src="/assets/img/giftbox.gif"
                            alt=""
                            onClick={() => (loadingPrize ? null : handleGift())}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.pageTitleWrapper}>
                        <h1 className={styles.pageTitle}>
                            {t('mysterybox:congrats')}
                        </h1>
                        <br />
                        <h3 className={clsx(styles.pageTitleInfo, 'gift')}>
                            {(prize === 'COUPON') ? (
                                <>{`${t('mysterybox:voucher')} ${dataPrize?.salesrule_name}`}</>
                            ) : (
                                <>{t('mysterybox:medbizPoint')}</>
                            )}
                        </h3>
                    </div>
                    {(prize === 'COUPON') ? (
                        <div className={styles.divGift}>
                            <h3 className={styles.titleGift}>{dataPrize?.salesrule_name}</h3>
                            <span>{dataPrize?.salesrule_description}</span>
                            <div style={{ marginTop: 15 }}>
                                <h5>{t('mysterybox:codePromo')}</h5>
                                <div className={styles.divPromo}>
                                    <div className={styles.box}>
                                        <span>{dataPrize?.coupon_code}</span>
                                    </div>
                                    <Button
                                        className={clsx(styles.btnOrange, 'btn-orange')}
                                        variant="contained"
                                        onClick={() => {
                                            navigator.clipboard.writeText(dataPrize?.coupon_code);
                                        }}
                                    >
                                        {t('mysterybox:copy')}
                                    </Button>
                                </div>
                            </div>
                            <h5 className={styles.terms}>
                                <Link href="/terms-n-conditions">
                                    <a target="_blank">{t('mysterybox:terms')}</a>
                                </Link>
                            </h5>
                        </div>
                    ) : (
                        <div className={clsx(styles.divGift, 'gift-point')}>
                            <h1 className={styles.pageTitle}>{dataPrize?.point_amount}</h1>
                            <img className={styles.iconImg} src="/assets/img/icon-points.svg" alt="" />
                        </div>
                    )}
                    <div className={styles.divBottom}>
                        <Button
                            className={clsx(styles.btnOrange, 'btn-orange btn-bottom')}
                            variant="contained"
                            onClick={() => Router.push(
                                prize === 'POINT' ? 'customer/account/point' : '/categories',
                            )}
                        >
                            {prize === 'COUPON' ? t('mysterybox:checkProduct') : t('mysterybox:checkPoints') }
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MysteryBox;
