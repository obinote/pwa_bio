/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';
import { BORDER_LIGHT, WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'block',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fff',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 81,
        transition: 'top 0.5s 0s ease',
        overflowY: 'scroll',
        top: 60,
    },
    tabPanel: {
        paddingBottom: 75,
    },
    accordion: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionChildWrapper: {
        marginTop: 0,
    },
    accordionChild: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 37px',
    },
    arrow: {
        marginRight: 22,
        lineHeight: 0,
    },
    imgWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    imgIcon: {
        width: 30,
    },
    menu: {
        // padding: '14px 22px',
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        fontSize: 14,
    },
    childWrapper: {
        padding: '14px 0px',
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        marginBottom: '-1px',
    },
    menuAccordion: {
        padding: '12px 22px',
    },
    menuChild: {
        paddingLeft: '12px',
        fontWeight: 600,
        fontSize: 14,
    },
    menuLastChild: {
        padding: '5px 43px',
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 400,
    },
    menuItem: {
        padding: '14px 22px',
        textTransform: 'none',
        fontSize: 18,
        fontWeight: 600,
        display: 'block',
    },
}));

export default useStyles;
