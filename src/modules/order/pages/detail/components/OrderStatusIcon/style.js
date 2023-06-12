import makeStyles from '@material-ui/core/styles/makeStyles';
import { Centering } from '@theme_mixins';

export const lineStyle = {
    alternativeLabel: {
        top: 30,
        '@media (max-width: 768px )': {
            top: 20,
        },
    },
    active: {
        '& $line': {
            background: '#06aec9',
        },
    },
    completed: {
        '& $line': {
            background: '#06aec9',
        },
    },
    line: {
        height: 2,
        border: 0,
        backgroundColor: '#7B9AAF',
        borderRadius: 1,
    },
};

const configStyleIcon = {
    backgroundPosition: 'center top',
    backgroundSize: '100% 100%',
    width: 28,
    height: 28,
};

const configIconSm = {
    width: 18,
    height: 18,
};

const configStyleAfterIcon = {
    position: 'absolute',
    top: 48,
    margin: '0 4px',
};

const configStyleAfterIconSm = {
    position: 'absolute',
    top: 30,
    margin: '0 -1px',
};

export const useIconStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: 700,
    },
    alternativeLabel: {
        background: '#f2f9ff',
        '& .MuiStep-horizontal': {
            padding: '0 5px',
        },
    },
    stepLabel: {
        marginTop: '20px !important',
        lineHeight: 0,
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '10px !important',
        },
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        zIndex: 2,
        ...Centering,
        [theme.breakpoints.down('xs')]: {
            width: 40,
            height: 40,
        },
    },
    iconContainerinactive: {
        background: '#f2f9ff',
        border: '2px solid #7B9AAF',
    },
    iconContainerskip: {
        border: '2px solid #06aec9',
        background: '#f2f9ff',
    },
    iconContaineractive: {
        background: '#f2f9ff',
        border: '2px solid #06aec9',
    },

    // icon pending

    iconpendinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-confirmation.svg)',
    },
    iconpendingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-confirmation-active.svg)',
    },
    iconpendingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-confirmation-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon processing
    iconprocessinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-processing.svg)',
    },
    iconprocessingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-processing-active.svg)',
    },
    iconprocessingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-processing-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon shipping

    iconshippinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-shipping.svg)',
    },
    iconshippingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-shipping-active.svg)',
    },
    iconshippingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-shipping-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon delivered

    icondeliveredinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-delivered.svg)',
    },
    icondeliveredactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-delivered-active.svg)',
    },
    icondeliveredskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-delivered-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon completed
    iconcompleteinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-complete.svg)',
    },
    iconcompleteactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-complete-active.svg)',
    },
    iconcompleteskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-complete-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },
    // icon canceled
    iconcanceledinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned.svg)',
    },
    iconcanceledactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
    },
    iconcanceledskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon refunded
    iconrefundedinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned.svg)',
    },
    iconrefundedactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
    },
    iconrefundedskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },

    // icon partialy refunded
    iconpartially_refundedinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned.svg)',
    },
    iconpartially_refundedactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
    },
    iconpartially_refundedskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/icon-returned-active.svg)',
        '&:after': {
            ...configStyleAfterIcon,
            content: 'url(/assets/img/order_status/icon-checked.svg)',
            [theme.breakpoints.down('xs')]: {
                ...configStyleAfterIconSm,
            },
        },
    },
}));
