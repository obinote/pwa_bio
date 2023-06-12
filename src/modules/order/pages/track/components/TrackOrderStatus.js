import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/track/style';
import classNames from 'classnames';

const TrackOrderStatus = (props) => {
    const { histories } = props;
    const styles = useStyles();
    return (
        <div className={styles.trackOrderStatusContainer}>
            {histories?.history.map((data, index, arr) => (
                <Timeline>
                    <TimelineItem>
                        <TimelineSeparator>
                            {index === 0
                                ? (<TimelineDot className={styles.activeDot} />)
                                : (<TimelineDot className={styles.notActiveDot} />)}
                            {index === arr.length - 1
                                ? (null)
                                : (<TimelineConnector className={styles.connectorTimeline} />)}
                        </TimelineSeparator>
                        <TimelineContent className={styles.contentTimeline}>
                            <Typography className={styles.dateTrackOrder}>{data.time || '-'}</Typography>
                            <Typography
                                type="bold"
                                letter="uppercase"
                                className={classNames(index === 0 ? styles.statusTrackOrderActive : styles.statusTrackOrder)}
                            >
                                {data.hub_name || '-'}
                            </Typography>
                            <Typography
                                className={classNames(index === 0 ? styles.descTrackOrderLatest : styles.descTrackOrder)}
                            >
                                {data.message || '-'}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            ))}
        </div>
    );
};

export default TrackOrderStatus;
