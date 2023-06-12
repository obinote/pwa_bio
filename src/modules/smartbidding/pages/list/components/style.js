import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow, CreateMargin,
} from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        display: 'flex',
        '&> div:first-child': {
            ...CreateBorder('1px', 0, '1px', 0, GRAY_PRIMARY),
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
        alignItems: 'stretch',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        },
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
        '& .MuiTableCell-root': {
            borderBottom: '1px solid #E8EDF1',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid #E8EDF1',
            padding: 10,
        },
    },
    tableCellResponsive: {
        borderBottom: '1px solid #E8EDF1',
        padding: '15px 20px 5px 0',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '5px 0',
            '&:last-child': {
                padding: '5px 0',
            },
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '40%',
        paddingRight: 20,
        '& span': {
            fontSize: 14,
            letterSpacing: 0,
            lineHeight: 0,
            margin: 0,
            textAlign: 'left',
        },
        '&.hidden': {
            display: 'none',
        },
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            '& span': {
                lineHeight: 1,
                margin: 0,
                textAlign: 'left',
            },
            '&.desc, &.name': {
                width: '100%',
            },
        },
        '& span': {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0,
        },
    },
    valueDownload: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    action: {
        ...FlexRow,
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
        width: '150px',
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
            paddingLeft: 5,
        },
        '& .button': {
            textTransform: 'none',
        },
        '& .MuiSvgIcon-root': {
            marginLeft: -10,
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
        borderBottom: 'unset',
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
            backgroundColor: '#FFFFFF',
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
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '& .lelangName': {
            font: 'normal normal bold 18px/18px Roboto',
            letterSpacing: '0.36px',
            color: '#000000',
            opacity: '1',
        },
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
}));
