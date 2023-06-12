/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';
import { WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    menuParent: {
        '& .MuiTabs-indicator': {
            backgroundColor: WHITE,
        },
    },
    tabMenu: {
        color: '#7B9AAF',
        backgroundColor: '#F2F9FF',
        borderRadius: '5px 5px 0px 0px',
        border: '1px solid #D5EAFB',
        '& > span': {
            textTransform: 'capitalize',
        },
        '&.active': {
            color: '#414048',
            backgroundColor: WHITE,
            borderBottomWidth: 0,
        },
    },
    tabPanel: {
        ...CreatePadding(17, 17, 17, 17),
        border: '1px solid #D5EAFB',
        borderRadius: '0px 0px 5px 5px',
        marginTop: -1,
        display: 'block',
        '& .MuiTabs-indicator': {
            backgroundColor: WHITE,
        },
    },
    tabContent: {
        width: '100%',
    },
}));
