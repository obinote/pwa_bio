import Tabs from '@material-ui/core/Tabs';

export const TabPanels = (props) => {
    const { classNames, useStyles } = props;
    const styles = useStyles();
    return <Tabs {...props} className={classNames(styles.tabPanel)} />;
};
export const TabPanel = (props) => {
    const {
        children, selected, classNames, useStyles,
    } = props;
    const styles = useStyles();
    return (
        <div role="tabpanel" hidden={!selected} {...props} className={classNames(styles.tabContent)}>
            {selected && children}
        </div>
    );
};

export default {};
