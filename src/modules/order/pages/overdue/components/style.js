import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow, CreateMargin,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, BLUE_LIGHT, ORANGE, TEXT_SHADE, BLUE_GRAY, BLACK_DARK,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        marginTop: '24px',
        padding: '0px !important',
        ...FlexColumn,
        display: 'flex',
    },
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(11, 15, 9, 8),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },
    rowFilter: {
        alignItems: 'center',
        paddingTop: '8px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '5px',
        },
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
                width: '100%',
                '& input': {
                    padding: '12px 3px',
                    fontSize: 14,
                    letterSpacing: 0,
                    color: BLUE_GRAY,
                },
            },
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
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 32px)',
        },
        '& .modal-top': {
            display: 'flex',
            alignItems: 'center',
            margin: '0 -10px',
            paddingBottom: 20,
            '& h2': {
                paddingLeft: 10,
                width: 'calc(100% - 30px)',
                fontSize: 18,
                color: TEXT_SHADE,
                letterSpacing: 0,
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
                marginBottom: 20,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .label': {
                    fontWeight: '700',
                    width: '100%',
                    marginBottom: 5,
                    color: TEXT_SHADE,
                    letterSpacing: 0,
                },
                '& .MuiFormControl-root': {
                    width: 167,
                    margin: 0,
                    [theme.breakpoints.down('xs')]: {
                        width: 125,
                    },
                    '& input': {
                        border: '1px solid #7B9AAF',
                        borderRadius: 4,
                        padding: 12,
                        fontSize: 14,
                        textTransform: 'uppercase',
                        color: TEXT_SHADE,
                        [theme.breakpoints.down('xs')]: {
                            padding: '12px 5px',
                        },
                    },
                },
                '& .MuiFormControlLabel-root': {
                    width: '100%',
                },
            },
        },
        '& .modal-footer': {
            '& button': {
                '& .MuiButton-label': {
                    textTransform: 'capitalize',
                    color: ORANGE,
                    fontWeight: 400,
                },
                '&.MuiButton-containedPrimary': {
                    backgroundColor: ORANGE,
                    marginRight: 10,
                    fontWeight: 400,
                    padding: '10px 21px',
                    '& .MuiButton-label': {
                        color: '#FFFFFF',
                    },
                },
            },
        },
    },
    datePickerField: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '& svg': {
            marginTop: 10,
            width: 15,
        },
    },
    btnSubmit: {
        '&.MuiButton-contained.Mui-disabled': {
            backgroundColor: `${GRAY_PRIMARY} !important`,
        },
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
        opacity: '1',
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
        [theme.breakpoints.up('md')]: {
            '& th': {
                borderBottom: '1px solid #E8EDF1',
                padding: '6px 10px 6px 0',
            },
            '& span': {
                float: 'left',
            },
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableRowResponsiveOverdue: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid #DFDFDF',
            padding: 10,
        },
    },
    tableCellResponsive: {
        borderBottom: '1px solid #E8EDF1',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '0',
            '&:last-child': {
                padding: '0',
            },
        },
        [theme.breakpoints.up('md')]: {
            '& th': {
                borderBottom: '1px solid #E8EDF1',
            },
        },
    },
    tableCellResponsiveNone: {
        display: 'none',
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
            margin: 0,
        },
    },
    typographyTableHead: {
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.28px',
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        '& *': {
            fontSize: 14,
            letterSpacing: 0,
            fontWeight: 400,
        },
    },
    valueDownload: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    valuePiutang: {
        fontSize: '18px',
        fontWeight: '700',
        lineHeight: '20px',
        letterSpacing: 0,
        color: BLACK_DARK,
        [theme.breakpoints.down('xs')]: {
            margin: 0,
        },
    },
    valueOverdue: {
        fontSize: '14px',
        fontWeight: '400',
    },
    valueOverdueAction: {
        fontSize: '14px',
        fontWeight: '400',
        color: ORANGE,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
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
    divSort: {
        '& span': {
            textAlign: 'right',
            font: 'normal normal normal 12px/14px Roboto',
            letterSpacing: 0,
            color: '#414048',
            textTransform: 'uppercase',
            marginLeft: '5px',
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
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    boxContainerPiutang: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: BLUE_LIGHT,
        marginBottom: '16px',
        marginTop: '24px',
        padding: '12px 24px 12px 24px',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '11px 13px',
            marginTop: 0,
        },
    },
    titlePiutang: {
        fontSize: '18px',
        fontWeight: '700',
        color: BLACK_DARK,
        letterSpacing: 0,
        margin: 0,
    },
}));
