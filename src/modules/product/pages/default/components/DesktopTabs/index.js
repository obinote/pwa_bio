/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';
import useStyles from '@core_modules/product/pages/default/components/DesktopTabs/style';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@common_typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
// import Box from '@material-ui/core/Box';
// import { useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
// import CmsRenderer from '@core_modules/cms/components/cms-renderer';

/**
 * Return html type for product detail
 * @param {} item
 * @returns jsx
 */
const renderHtml = (item, styles) => (
    <>
        <div className={classNames(styles.renderHtml, 'description-html')}>
            {item.content ? <span dangerouslySetInnerHTML={{ __html: item.content }} /> : null}
        </div>
    </>
);

/**
 *  Return array type for more info
 * @param {} item
 * @returns jsx
 */
const renderArray = (item, styles) => (
    <table className={styles.tableParent}>
        {item.content.map((content, idx) => (
            <tr key={idx}>
                <td>{content.label}</td>
                <td>{content.value || '-'}</td>
            </tr>
        ))}
    </table>
);

const TabsView = (props) => {
    const { dataInfo, t } = props;
    // smartProductTabs
    // const theme = useTheme();
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState('panel0');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    dataInfo.map((value) => {
        value.strTitle = value.title.replace(/\s+/g, '_').toLowerCase();
        return value;
    });

    return (
        <div className={styles.root}>
            {dataInfo.map((item, index) => (
                <Accordion
                    index={index}
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    className={styles.accordion}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
                        <Typography variant="p" type="bold" size="14" className={styles.title}>
                            {t(`product:${item.strTitle}`)}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {item.type === 'html' ? renderHtml(item, styles) : <></>}
                        {item.type === 'array' ? renderArray(item, styles) : <></>}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default TabsView;
