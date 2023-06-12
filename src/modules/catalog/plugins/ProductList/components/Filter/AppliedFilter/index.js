/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Typography from '@common_typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '@plugin_productlist/components/Filter/AppliedFilter/style';
import Cookies from 'js-cookie';

const AppliedFilter = ({
    t,
    selectedFilter,
    handleClear,
    handleRemove,
    filter,
}) => {
    const styles = useStyles();
    const getOptionLabelByValue = (filterField, optionValue) => {
        let listFilter = filter;

        if (Cookies.get('of')) {
            listFilter = JSON.parse(Cookies.get('of'));
        }

        // const newFilter = filter.filter(item => item.field === field)
        // return newFilter.label;
        const relatedFilter = listFilter.filter((itemFilter) => itemFilter.field === filterField)[0];
        // console.log('asd', filter, relatedFilter, optionValue);

        // const relatedFilter = filter.filter((itemFilter) => itemFilter.field === filterField)[0];
        const option = relatedFilter.value.filter((item) => item.value === optionValue)[0];
        return option?.label || '';
    };

    const appliedFilters = [];
    filter.forEach((item) => {
        if (selectedFilter[item.field] !== undefined) {
            const value = selectedFilter[item.field].replace('_AND_', '&');
            appliedFilters.push({
                field: item.field,
                label: item.label,
                value: {
                    value,
                    label: getOptionLabelByValue(item.field, value),
                },
            });
        }
    });

    return (
        <div>
            <div className="hidden-mobile">
                {appliedFilters.length > 0 ? (
                    <div className={styles.desktopContainer}>
                        <Typography className="heading" type="bold" variant="body1" letter="uppercase">{t('catalog:title:nowShoppingBasedOn')}</Typography>
                        {appliedFilters.map((appliedFilter) => (
                            <div className="item">
                                <CloseIcon className="remove-icon" onClick={() => handleRemove(appliedFilter.field)} />
                                <p className="filter">
                                    <Typography variant="span" letter="capitalize" className="filter-name">
                                        {appliedFilter.label}
                                        :
                                    </Typography>
                                    {' '}
                                    {appliedFilter.value.label}
                                </p>
                            </div>
                        ))}
                        <span className="clear" onClick={handleClear}>{t('catalog:button:clearAll')}</span>
                    </div>
                ) : null}
            </div>
            <div className="hidden-desktop">
                {appliedFilters.length > 0 ? (
                    <Accordion disableGutters elevation={0} className={styles.mobileContainer}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography type="bold" className="heading" variant="span" letter="capitalize">
                                {t('catalog:title:nowShoppingBasedOn')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="filter-container">
                                {appliedFilters.map((appliedFilter) => (
                                    <div className="item">
                                        <CloseIcon className="remove-icon" onClick={() => handleRemove(appliedFilter.field)} />
                                        <p className="filter">
                                            <span className="filter-name">
                                                {appliedFilter.label}
                                                :
                                            </span>
                                            {' '}
                                            {appliedFilter.value.label}
                                        </p>
                                    </div>
                                ))}
                                <span className="clear" onClick={handleClear}>{t('catalog:button:clearAll')}</span>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ) : null}
            </div>
        </div>
    );
};

export default AppliedFilter;
