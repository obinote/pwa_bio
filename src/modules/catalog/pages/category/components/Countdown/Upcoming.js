import React from 'react';
import useStyles from '@core_modules/catalog/pages/category/components/Countdown/style';
import classNames from 'classnames';
import dayjs from 'dayjs';

const Upcoming = ({
    t, dataPrivateEvent,
}) => {
    const styles = useStyles();
    return (
        <>
            <section className={classNames(styles.wrapperUpcoming, 'wrapper-upcoming')}>
                <div className="coming-soon">{t('catalog:flashSale:comingSoon')}</div>
                {dataPrivateEvent?.getCategoryPrivateEvent?.status === 'upcoming' && (
                    <>
                        <div className="items-date">
                            <div className="item-date item-date-start">
                                <div className="date">{dayjs(dataPrivateEvent?.getCategoryPrivateEvent.start_date).format('DD/MM/YYYY')}</div>
                                <div className="time">{dayjs(dataPrivateEvent?.getCategoryPrivateEvent.start_date).format('HH:mm')}</div>
                            </div>
                            <div className="until">-</div>
                            <div className="item-date item-date-end">
                                <div className="date">{dayjs(dataPrivateEvent?.getCategoryPrivateEvent.end_date).format('DD/MM/YYYY')}</div>
                                <div className="time">{dayjs(dataPrivateEvent?.getCategoryPrivateEvent.end_date).format('HH:mm')}</div>
                            </div>
                        </div>
                    </>
                )}
                {dataPrivateEvent?.getProductPrivateEvent?.status === 'upcoming' && (
                    <>
                        <div className="items-date">
                            <div className="item-date item-date-start">
                                <div className="date">{dayjs(dataPrivateEvent?.getProductPrivateEvent.start_date).format('DD/MM/YYYY')}</div>
                                <div className="time">{dayjs(dataPrivateEvent?.getProductPrivateEvent.start_date).format('HH:mm')}</div>
                            </div>
                            <div className="until">-</div>
                            <div className="item-date item-date-end">
                                <div className="date">{dayjs(dataPrivateEvent?.getProductPrivateEvent.end_date).format('DD/MM/YYYY')}</div>
                                <div className="time">{dayjs(dataPrivateEvent?.getProductPrivateEvent.end_date).format('HH:mm')}</div>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default Upcoming;
