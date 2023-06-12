import { TabPanel as CompTabPanel, TabPanels as CompTabPanels } from '@src_modules/customer/pages/quote/view/components/tab/tabPanel';
import { TabMenus as CompTabMenus, TabMenu as CompTabMenu } from '@src_modules/customer/pages/quote/view/components/tab/tabMenu';
import classNames from 'classnames';
import useStyles from '@src_modules/customer/pages/quote/view/components/tab/style';

export const TabPanels = (props) => <CompTabPanels classNames={classNames} useStyles={useStyles} {...props} />;
export const TabPanel = (props) => <CompTabPanel classNames={classNames} useStyles={useStyles} {...props} />;
export const TabMenus = (props) => <CompTabMenus classNames={classNames} useStyles={useStyles} {...props} />;
export const TabMenu = (props) => <CompTabMenu classNames={classNames} useStyles={useStyles} {...props} />;

export default {};
