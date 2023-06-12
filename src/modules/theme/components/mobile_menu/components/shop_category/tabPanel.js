import React from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import useStyle from '@common_mobile_menu/components/shop_category/style';

const TabPanel = (props) => {
    const {
        children, value, index, ...other
    } = props;
    const styles = useStyle();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={classNames(styles.tabPanel, value !== index ? 'hidden' : '')}
            {...other}
        >
            {value === index && (
                <Box>
                    { children }
                </Box>
            )}
        </div>
    );
};

export default TabPanel;
