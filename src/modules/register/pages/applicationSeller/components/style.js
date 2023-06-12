import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
    },
    fieldContainer: {
        borderTop: '0.5px solid #D5EAFB',
        paddingTop: 24,
        paddingBottom: 60,
    },
    titleWrapper: {
        marginBottom: 25,
    },
    title: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.1,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
            marginTop: 20,
            marginBottom: 20,
        },
    },
    sellerListWrapper: {
        display: 'grid',
        gridGap: '16px',
        gridTemplateColumns: '1fr 1fr',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    sellerItem: {
        height: 100,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 24px 0 24px',
        alignItems: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            marginTop: 15,
            marginBottom: 15,
        },
    },
    sellerItemCheck: {
        border: '2px solid #42929D',
    },
    sellerItemUncheck: {
        border: '1px solid #E3F1FC',
    },
    sellerContent: {
        display: 'flex',
        alignItems: 'center',
    },
    itemChecked: {
        display: 'inline-block',
        width: 20,
        height: 20,
        marginRight: 16,
    },
    itemUnchecked: {
        width: 20,
        height: 20,
        border: '1px solid #D5EAFB',
        display: 'inline-block',
        marginRight: 16,
        borderRadius: 18,
    },
    itemLabel: {
        fontWeight: 'bold',
    },
    sellerIconWrapper: {
        paddingLeft: 10,
        maxWidth: 48,
    },
    sellerIcon: {
        maxWidth: '100%',
        height: 'auto',
        border: '0',
    },
}));
