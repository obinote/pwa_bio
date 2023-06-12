import React from 'react';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import { useTranslation } from '@i18n';

const MessageAutotext = ({ formik, setIsExpanded, isExpanded }) => {
    const styles = useStyles();
    const { t } = useTranslation(['chat']);

    const autotexts = [
        t('chat:autoText:readyStock'),
        t('chat:autoText:expired'),
        t('chat:autoText:sendingToday'),
        t('chat:autoText:askingOrder'),
        t('chat:autoText:payment'),
        t('chat:autoText:credit'),
        t('chat:autoText:cancel'),
        t('chat:autoText:minimumOrder'),
        t('chat:autoText:thanks'),
    ];

    const onClickAutotext = (autotext) => {
        formik.setFieldValue('message', autotext);
    };

    return (
        <div className={styles.autoTextContainer}>
            <div className={clsx(styles.autoResponseWrapper, !isExpanded && 'collapse')}>
                <div className={clsx(styles.autoResponseTitle, 'right-title')}>
                    <span>Quick Chat</span>
                    <IconButton style={{ padding: 0 }}>
                        {isExpanded ? (
                            <ExpandLessIcon onClick={() => setIsExpanded(false)} />
                        ) : (
                            <ExpandMoreIcon onClick={() => setIsExpanded(true)} />
                        )}
                    </IconButton>
                </div>
                <div className={styles.autoResponseBody}>
                    {autotexts.map((autotext, idx) => (
                        <Chip
                            key={idx}
                            variant="outlined"
                            label={autotext}
                            onClick={() => {
                                onClickAutotext(autotext);
                                setIsExpanded(false);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageAutotext;
