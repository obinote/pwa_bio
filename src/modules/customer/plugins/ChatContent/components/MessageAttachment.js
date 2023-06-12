/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import formatDate from '@root/core/helpers/date';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import { getUrlFilename } from '@core_modules/customer/helpers/chatHelper';

const MessageAttachment = ({ message, contentMessageText }) => {
    const styles = useStyles();
    const renderFile = () => {
        if (message.filetype === 'image') {
            return (
                <>
                    <img className={styles.messageImage} src={message.filename} alt="messageImage" />
                    <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                </>
            );
        } if (message.filetype === 'video') {
            return (
                <>
                    <video width="320" height="240" controls>
                        <source src={message.filename} type="video/mp4" />
                        <source src={message.filename} type="video/mkv" />
                        Your browser does not support the video tag.
                    </video>
                    <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                </>
            );
        } return (
            <>
                <a href={message.filename} className={styles.fileLink} target="_blank" rel="noopener noreferrer">
                    <DescriptionOutlinedIcon fontSize="large" />
                    <div className={styles.fileName}>{getUrlFilename(message.filename)}</div>
                </a>
                <span>{formatDate(message.createdAt, 'HH:mm')}</span>
            </>
        );
    };
    return (
        <span className={contentMessageText(message)}>
            {renderFile()}
            {message.is_customer_message === 'True' ? (
                <DoneAllIcon className={message.is_admin_read != 0 || message.is_admin_read_db == true
                    ? classNames(styles.chatDeliver, styles.chatDelivered) : styles.chatDeliver}
                />
            ) : null}
        </span>
    );
};

MessageAttachment.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    message: PropTypes.object.isRequired,
    contentMessageText: PropTypes.func.isRequired,
};

export default MessageAttachment;
