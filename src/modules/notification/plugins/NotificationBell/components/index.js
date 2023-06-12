/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import Router from 'next/router';
import { breakPointsUp } from '@helper_theme';

const Content = ({ withLink, totalUnread }) => {
    const desktop = breakPointsUp('sm');

    return (
        <div
            style={{ margin: desktop ? 20 : 10, cursor: 'pointer' }}
            onClick={() => {
                if (withLink) {
                    Router.push('/inboxnotification/notification');
                }
            }}
        >
            <Badge color="secondary" badgeContent={totalUnread || 0} overlap="rectangular">
                <NotificationsIcon style={{ color: '#414048' }} />
            </Badge>
        </div>
    );
};

export default Content;
