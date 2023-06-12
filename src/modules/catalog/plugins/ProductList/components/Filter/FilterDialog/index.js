/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@common_typography';
import Loading from '@common_loaders';
import { BREAKPOINTS } from '@theme/vars';
import useStyles from '@plugin_productlist/components/Filter/FilterDialog/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction={window.innerWidth >= BREAKPOINTS.sm ? 'left' : 'up'} ref={ref} {...props} />
));

let globalTimeout = null;

const FilterDialog = ({
    open,
    setOpen,
    loading = false,
    t,
    isSearch,
    selectedFilter,
    setSelectedFilter,
    handleSave,
    filter,
}) => {
    const styles = useStyles();
    const unappliedFilters = filter.filter((item) => !selectedFilter[item.field]);
    const selectFilter = (field, value) => {
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }
        setSelectedFilter(field, value);
        globalTimeout = setTimeout(() => {
            handleSave();
        }, 1000);
    };
    const generateFilter = (data, itemFilter, idx) => {
        const ItemValueByLabel = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < itemFilter.value.length; index++) {
            ItemValueByLabel.push({
                label: itemFilter.value[index].label,
                value: itemFilter.value[index].label,
            });
        }
        return (
            <div className={styles.listCategoryWrapper}>
                {itemFilter.value.map((val, ids) => {
                    if (val !== 'attribute_set_id') {
                        return (
                            <span onClick={(e) => selectFilter(itemFilter.field, val.value)} className={styles.listCategory} key={ids}>
                                <Typography variant="p" letter="capitalize">
                                    {`${val.label.replace(/_/g, ' ')} `}
                                    <Typography className="count" variant="span" letter="capitalize">
                                        (
                                        {val.count}
                                        )
                                    </Typography>
                                </Typography>
                            </span>
                        );
                    }

                    return null;
                })}
            </div>
        );
    };
    return (
        <Drawer
            fullscreen
            anchor="bottom"
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            classes={{
                paper: styles.drawerPaper,
            }}
        >
            <AppBar className={styles.appBar}>
                <Typography
                    variant="label"
                    type="bold"
                    align="center"
                    className={styles.title}
                >
                    {t('catalog:title:shoppingBasedOn')}
                </Typography>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
            </AppBar>
            <div className={styles.body}>
                {loading ? <Loading size="20px" /> : null}
                {unappliedFilters.map((itemFilter, idx) => {
                    if ((itemFilter.field === 'cat' || itemFilter.field === 'attribute_set_id') && !isSearch) {
                        return <span key={idx} />;
                    }
                    return (
                        <Accordion key={idx} disableGutters elevation={0} defaultExpanded={typeof selectedFilter[itemFilter.field] !== 'undefined'}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography className="heading" variant="p" letter="uppercase">
                                    {itemFilter.label.replace(/_/g, ' ')}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>{generateFilter(unappliedFilters, itemFilter, idx)}</AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
        </Drawer>
    );
};

export default FilterDialog;
