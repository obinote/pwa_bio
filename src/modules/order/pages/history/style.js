import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow, CreateMargin,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, BORDER_GREY, ORANGE, TEXT_SHADE, BLUE_GRAY,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        display: 'flex',
        '&> div:first-child': {
            ...CreateBorder('1px', 0, '1px', 0, GRAY_PRIMARY),
        },
    },
    rowFilter: {
        alignItems: 'center',
        padding: '20px 0',
    },
    filter: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 40,
        '& button': {
            borderRadius: 6,
            '& .MuiButton-label': {
                textTransform: 'capitalize',
                fontWeight: '400',
                color: TEXT_SHADE,
                '& img': {
                    marginRight: 5,
                    width: 18,
                },
            },
        },
    },
    filterSearch: {
        '& .search-box': {
            display: 'flex',
            border: '1px solid #BDCDD7',
            borderRadius: '5px',
            alignItems: 'center',
            padding: '0 10px',
            width: '60%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
            '& .search-input': {
                height: '40px',
                margin: 0,
                '& input': {
                    padding: '12px 3px',
                    fontSize: 14,
                    letterSpacing: 0,
                    color: BLUE_GRAY,
                },
            },
        },
    },
    totalOrder: {
        margin: '10px 10px 10px 0',
        [theme.breakpoints.down('sm')]: {
            margin: '10px 10px 10px 12px',
        },
    },
    paperModalBody: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '100%',
        maxWidth: 410,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        boxShadow: '0px 3px 5px -1px rgb(0, 0, 0, 0.2), 0px 5px 8px 0px rgb(0, 0, 0, 0.14), 0px 1px 14px 0px rgb(0, 0, 0, 0.12)',
        padding: '15px 20px 20px',
        '& .modal-top': {
            display: 'flex',
            alignItems: 'center',
            margin: '0 -10px',
            paddingBottom: 15,
            '& h2': {
                paddingLeft: 10,
                width: 'calc(100% - 30px)',
            },
            '& button': {
                width: 30,
                height: 30,
                padding: 0,
                minWidth: 0,
                marginRight: '-8px',
            },
        },
        '& .modal-body': {
            '& .item': {
                marginBottom: 25,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .label': {
                    fontWeight: '700',
                    width: '100%',
                    marginBottom: 5,
                },
                '& .MuiFormControl-root': {
                    width: 'calc(50% - 15px)',
                    margin: 0,
                    '& input': {
                        border: '1px solid #7B9AAF',
                        borderRadius: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                    },
                    '& p': {
                        display: 'none',
                    },
                },
                '& .MuiFormControlLabel-root': {
                    width: '100%',
                },
            },
        },
        '& .modal-footer': {
            paddingTop: 15,
            '& button': {
                '& .MuiButton-label': {
                    textTransform: 'capitalize',
                    color: ORANGE,
                },
                '&.MuiButton-containedPrimary': {
                    backgroundColor: ORANGE,
                    marginRight: 10,
                    '& .MuiButton-label': {
                        color: '#FFFFFF',
                    },
                },
            },
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
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
        '& .MuiTypography-overline, & .MuiTypography-subtitle2': {
            fontSize: 14,
            letterSpacing: 'unset',
            lineHeight: 'normal',
            display: 'block',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'left',
            },
        },
        '& .MuiTypography-overline': {
            fontWeight: 400,
        },
        '& .MuiTableCell-head': {
            '& h6': {
                textTransform: 'capitalize',
            },
        },
        '& .MuiTableCell-root': {
            borderBottom: `1px solid ${BORDER_GREY}`,
            [theme.breakpoints.down('sm')]: {
                borderBottom: 'none',
                '&:last-child': {
                    borderBottom: '0 transparent',
                },
            },
        },
    },
    table: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
        },
    },
    tableRowHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '0',
            '&:last-child': {
                padding: '0',
            },
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '20%',
        minWidth: '130px',
        maxWidth: '200px',
        paddingRight: 20,
        '& span': {
            fontWeight: '700 !Important',
        },
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    valueDownload: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    action: {
        ...FlexRow,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '& a': {
            [theme.breakpoints.down('sm')]: {
                paddingRight: 15,
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
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
}));
