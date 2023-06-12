import React from 'react';
import useStyles from '@core_modules/catalog/pages/category/components/Countdown/style';
import classNames from 'classnames';

const Countdown = ({
    t, timerDays, timerHours, timerMinutes, timerSeconds,
}) => {
    const styles = useStyles();
    return (
        <>
            <section className={classNames(styles.wrapperTimer, 'wrapper-timer')}>
                <section className="end-in">{t('catalog:flashSale:endIn')}</section>
                <section className="timer">
                    {timerDays <= 0 && timerHours <= 0 && timerMinutes <= 0 && timerSeconds <= 0 && (
                        <>
                            <div className="expired">{t('catalog:flashSale:expired')}</div>
                        </>
                    )}
                    <div className="clock">
                        {timerDays > 0 && (
                            <>
                                <section>
                                    <p>
                                        {timerDays < 10 && ('0')}
                                        {timerDays}
                                    </p>
                                    <small>{t('catalog:flashSale:days')}</small>
                                </section>
                                <span className="dots">:</span>
                            </>
                        )}
                        <section>
                            <p>
                                {timerHours < 10 && ('0')}
                                {timerHours}
                            </p>
                            <small>{t('catalog:flashSale:hours')}</small>
                        </section>
                        <span className="dots">:</span>
                        <section>
                            <p>
                                {timerMinutes < 10 && ('0')}
                                {timerMinutes}
                            </p>
                            <small>{t('catalog:flashSale:minutes')}</small>
                        </section>
                        <span className="dots">:</span>
                        <section>
                            <p>
                                {timerSeconds < 10 && ('0')}
                                {timerSeconds}
                            </p>
                            <small>{t('catalog:flashSale:seconds')}</small>
                        </section>
                    </div>
                </section>
            </section>
        </>
    );
};

Countdown.defaultProps = {
    timerDays: 88,
    timerHours: 88,
    timerMinutes: 88,
    timerSeconds: 88,
};

export default Countdown;
