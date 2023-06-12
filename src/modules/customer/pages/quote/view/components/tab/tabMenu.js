import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const TabMenus = (props) => {
    const { classNames, useStyles } = props;
    const styles = useStyles();
    return <Tabs {...props} className={classNames(styles.menuParent)} />;
};

export const TabMenu = (props) => {
    const {
        children, selected, classNames, useStyles,
    } = props;

    const styles = useStyles();
    const selectedClass = selected ? 'active' : '';
    return (
        <Tab disableRipple {...props} className={classNames(styles.tabMenu, selectedClass)}>
            {children}
        </Tab>
    );
};

export default {};
