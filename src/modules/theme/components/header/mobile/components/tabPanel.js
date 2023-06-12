import React from 'react';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={value !== index ? 'hidden' : ''}
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
