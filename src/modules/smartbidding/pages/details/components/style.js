import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow, CreateMargin,
} from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    detailsContainer: {
        ...FlexColumn,
        display: 'flex',
        marginTop: '24px',
        '& .divData': {
            display: 'flex',
            flexDirection: 'row',
        },
    },
    detailValue: {
        '& *': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },
    },
    description: {
        '& *': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },
    },
    attachment: {
        '& *': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },

    },
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(11, 15, 9, 8),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    linkDownload: {
        ...CreateMargin(0, 0, 0, 21),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },

    imageItem: {
        width: 80,
        height: 100,
    },

    contentItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
        width: '100%',
    },

    columnLabel: {
        width: '30%',
    },

    columnLabelId: {
        width: '14%',
    },

    columnLabelDate: {
        width: '12%',
    },

    columnLabelShipped: {
        width: '23%',
    },

    columnLabelTotal: {
        width: '16%',
    },

    columnLabelStatus: {
        width: '16%',
    },

    columnLabelAction: {
        width: '10%',
    },

    detailItem: {
        ...FlexRow,
        ...CreatePadding(0, 0, 0, 5),
        width: '100%',
    },

    detailContent: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 16),
        width: '70%',
    },

    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    displayFlexRow: {
        ...FlexRow,
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
        marginTop: '28px',
    },
    table: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
        },
        '& .MuiTableCell-sizeSmall': {
            padding: '6px 0px 0px 0px',
            paddingLeft: '0',
        },
    },
    tableRowHead: {
        borderBottom: '1px solid #E8EDF1',
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
        '& .cell': {
            borderBottom: '1px solid #E8EDF1',
            '& .header': {
                color: '#414048',
                font: 'normal normal bold 14px/17px Roboto',
                letterSpacing: '0.28px',
            },
        },
        '& th': {
            borderBottom: '1px solid #E8EDF1',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid #E8EDF1',
            padding: 10,
        },
        '& *': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },
    },
    tableCellResponsive: {
        borderBottom: '1px solid #E8EDF1',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
            '&:last-child': {
                padding: '8px 0',
            },
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '45%',
        paddingRight: 20,
        '& span': {
            letterSpacing: 0,
            margin: 0,
            fontWeight: 700,
        },
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            '& span': {
                margin: 0,
            },
        },
    },
    valueDownload: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    action: {
        ...FlexRow,
        '& span': {
            [theme.breakpoints.down('sm')]: {
                margin: 0,
            },
        },
    },
    linkView: {
        '&::after': {
            borderLeft: '1px solid #737373',
            content: "''",
            display: 'inline-block',
            height: 12,
            margin: '0 10px',
            verticalAlign: -1,
        },
    },
    addButton: {
        width: '135px',
        height: '22px',
        marginTop: '34.75px',
        display: 'inline-flex',
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: '#2E2E2E',
            alignSelf: 'center',
            display: 'flex',
        },
        '& .button': {
            textTransform: 'none',
        },
    },
    formControl: {
        marginLeft: 8,
        verticalAlign: 'middle',
        minWidth: 10,
        '& div': {
            textAlign: 'left',
            font: 'normal normal normal 12px/14px Roboto',
            letterSpacing: 0,
            color: '#414048',
        },
    },
    pagination: {
        width: '100%',
    },
    link: {
        font: 'normal normal normal 14px/50px Roboto',
        letterSpacing: '0.28px',
        color: '#F58732',
    },
    search: {
        position: 'relative',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #BDCDD7',
        borderRadius: '5px',
        width: '380px',
        '&:hover': {
            backgroundColor: '#FFF',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiSvgIcon-root': {
            fill: '#7B9AAF',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: 'inherit',
        height: '40px',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        font: 'normal normal bold 12px/14px Roboto',
        letterSpacing: '0px',
        color: '#7B9AAF',
        [theme.breakpoints.down('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '24px',
    },
    filter: {
        width: '100%',
    },
    buttonFilter: {
        marginLeft: 0,
        marginRight: 0,
        float: 'right',
        border: '1px solid #BDCDD7',
        borderRadius: '5px',
        width: '93px',
        height: '40px',
        '& span': {
            font: 'normal normal normal 14px/50px Roboto',
            letterSpacing: '0.28px',
            color: '#414048',
            textTransform: 'none',
        },
    },
    nameDesc: {
        '& .lelangName': {
            font: 'normal normal bold 18px/18px Roboto',
            letterSpacing: '0.36px',
            color: '#000000',
            opacity: '1',
        },
    },
    buttonFooter: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linkBack: {
        color: '#f58732',
        font: 'normal normal normal 14px/17px Roboto',
        alignSelf: 'center',
        display: 'flex',
        '& span': {
            letterSpacing: 0,
            fontWeight: '400',
            fontSize: 14,
        },
    },
    button: {
        height: '41px',
        display: 'inline-flex',
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: 'white',
            alignSelf: 'center',
            display: 'flex',
        },
        '& .button': {
            textTransform: 'none',
            padding: '12px 21px',
            background: '#F58732 0% 0% no-repeat padding-box',
        },
    },
}));
