/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';

const ChatLoading = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={classNames(styles.userContainer, 'hidden-mobile')}>
                <div className={styles.userMainTitle}>
                    <h3>Chat</h3>
                    <div className="hidden-desktop" style={{ cursor: 'pointer' }}>
                        <CloseIcon />
                    </div>
                </div>
                <form className={styles.formUserSearch}>
                    <TextField name="search" placeholder="Search user ..." className={styles.searchInput} value="" onChange={() => {}} />
                    <Button type="submit" className={styles.searchButton}>
                        <SearchIcon
                            fontSize="small"
                            style={{
                                color: 'white',
                            }}
                        />
                    </Button>
                </form>
                <div className={styles.overflowUser}>
                    <Skeleton className="skeletonLoading" variant="circular" width="100%" height={40} />
                    <Skeleton className="skeletonLoading" variant="circular" width="100%" height={40} />
                    <Skeleton className="skeletonLoading" variant="circular" width="100%" height={40} />
                </div>
            </div>
        </div>
    );
};

export default ChatLoading;
