import { makeStyles } from '@material-ui/core/styles';
import { FlexRow } from '@theme_mixins';

const tabletsUp = '@media (min-width: 768px)';

const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        marginTop: '30px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    sidebarContainer: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        boxShadow: '0px 0px 4px #00000026',
        padding: '41px 20px 20px',
        opacity: '1',
        height: 'fit-content',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%',
            padding: '20px 0',
            marginBottom: '33px',
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            minWidth: 220,
        },
        '& .sidebar-review-rating': {
            textAlign: 'center',
            borderBottom: '1px solid #E7F3FF',
            [theme.breakpoints.down('xs')]: { padding: 20 },
            [tabletsUp]: { padding: '0 4px 60px' },
            '& .main-rating': {
                [theme.breakpoints.down('xs')]: {
                    display: 'flex',
                    justifyContent: 'space-around',
                },
                '& .main-rating-sidebar': {
                    width: '100%',
                    '& .rating-value': {
                        display: 'block',
                        fontWeight: 'bold',
                        fontSize: '50px',
                    },
                    '& .info-rating-from': {
                        marginBottom: '30px',
                        display: 'block',
                    },

                    '&.with-progress': {
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: '28px auto min-content',
                        gridAutoRows: '1fr',
                        columnGap: '10px',
                        [tabletsUp]: {
                            rowGap: '6px',
                        },
                        '& .MuiLinearProgress-root': {
                            width: '100%',
                            backgroundColor: '#E7F3FF',
                            height: '8px',
                            borderRadius: '6px',
                            '& .MuiLinearProgress-barColorPrimary': {
                                backgroundColor: '#42929D',
                            },
                        },
                        '& .linear-rating-info': {
                            fontWeight: 'bold',
                        },
                        '& .linear-rating': {
                            fontSize: '12px',
                            color: '#7B9AAF',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.25rem',
                        },
                    },
                },
            },
        },
        '& .sidebar-review-filter': {
            color: '#414048',
            [theme.breakpoints.down('xs')]: {
                padding: '0 15px',
            },
            [tabletsUp]: {
                paddingTop: 20,
            },
            '& .filter-all-review': {
                cursor: 'pointer',
                marginBottom: 0,
                height: '1rem',
            },
            '& span': {
                display: 'block',
                marginBottom: '10px',
                fontSize: '16px',
            },
            '& .filter-title': {
                fontWeight: 'bold',
            },
            '& .filter-rating': {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                '@media (max-width: 340px)': { gap: 0 },
                '& > span': {
                    marginBottom: 0,
                    [theme.breakpoints.down('xs')]: {
                        flexShrink: 0,
                    },
                },
                '& > .star': {
                    [theme.breakpoints.down('xs')]: {
                        display: 'flex',
                    },
                },
            },
        },
    },
    ratingFilterContent: {
        display: 'grid',
        rowGap: '4px',
        gridTemplateRows: 'auto auto auto',
        gridAutoFlow: 'column',
        '& > div.filter-rating[role=presentation] > span': {
            lineHeight: '100%',
            fontSize: '12px',
        },
        [tabletsUp]: {
            gridTemplateRows: 'auto',
            gridAutoFlow: 'row',
            rowGap: '9px',
            '& .star': {
                display: 'inline-flex',
                fontSize: '1rem',
            },
            '& .star > svg': {
                fontSize: 'inherit',
            },
            '& > div.filter-rating[role=presentation] > span': {
                fontSize: '1rem',
            },
        },
    },
    mainContainer: {
        padding: '0 20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '100%',
            padding: 0,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: 'calc(100% - 220px)',
            flexBasis: 'auto',
        },
        '& .review-sort': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '30px',
            marginBottom: '30px',
            [theme.breakpoints.down('xs')]: {
                gap: '10px',
                justifyContent: 'normal',
            },
            '& .MuiSelect-root': {
                width: '230px',
                borderBottom: '1px solid #ccc',
                fontSize: '12px',
                [theme.breakpoints.down('xs')]: {
                    width: '154px',
                },
            },
        },
        '& .review-content': {
            paddingLeft: '45px',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                paddingBottom: '90px',
            },
            '& .review-item': {
                borderBottom: '1px solid #E7F3FF',
                marginBottom: '20px',
                '& .star': {
                    lineHeight: 1,
                },
                '& .review-name-edit-container': {
                    ...FlexRow,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& .review-name': {
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        [theme.breakpoints.down('xs')]: {
                            marginBottom: '8px',
                            display: 'block',
                        },
                    },
                },
                '& .review-rating': {
                    display: 'flex',
                    alignItems: 'center',
                    [theme.breakpoints.down('xs')]: {
                        marginBottom: '8px',
                    },
                    '& span': {
                        marginLeft: '10px',
                    },
                },
                '& .review-comment': {
                    margin: '4px 0 15px 0',
                },
                '& .review-images': {
                    display: 'flex',
                    gap: '10px',
                    marginBottom: 12,
                    cursor: 'pointer',
                    '& img': {
                        borderRadius: '8px',
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                    },
                },
                '& .btn-edit-review': {
                    color: 'rgb(245, 135, 50)',
                    fontSize: '12px',
                    textTransform: 'capitalize',
                },
                '& .btn-edit-review:hover': {
                    background: 'none',
                },
                '& .toggle-reply': {
                    cursor: 'pointer',
                    ...FlexRow,
                    alignItems: 'center',
                    gap: '2px',
                    marginBottom: 10,
                    '& .label': {
                        color: '#7B9AAF',
                        textTransform: 'capitalize',
                    },
                    '& .show-hide-icon': {
                        color: '#7B9AAF',
                        fontSize: 16,
                    },
                },
            },
            '& .pagination': {
                display: 'flex',
                justifyContent: 'center',
            },
            [theme.breakpoints.between('sm', 'sm')]: {
                paddingLeft: '36px',
            },
        },
    },
    ratingFilterPopupover: {
        fontSize: '12px',
    },
    modalReview: {
        '& .MuiDialog-paperFullWidth': {
            borderRadius: 15,
        },
        '& .MuiDialog-paperFullScreen': {
            borderRadius: 0,
        },
        '& .modal-header': {
            display: 'block',
            '& .modal-review-close': {
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 0,
            },
            '& .info-buyer': {
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#414048',
                marginRight: 24,
                display: 'flex',
            },
            '& .info-rating': {
                display: 'flex',
                alignItems: 'center',
                '& .star': {
                    lineHeight: 1,
                },
                '& span': {
                    fontSize: '14px',
                    color: '#2E2E2E',
                    fontWeight: 'normal',
                },
                '& .date-rating': {
                    flex: 1,
                    paddingLeft: '10px',
                },
            },
        },
        '& .review-images': {
            marginBottom: '10px',
            '& img': {
                width: '100%',
                objectFit: 'cover',
            },
        },
        '& .review-images-selector': {
            display: 'flex',
            gap: '10px',
            '& img': {
                borderRadius: '8px',
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                cursor: 'pointer',
            },
        },
    },
    starReview: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        },
    },
    replyContainer: {
        marginBottom: 16,
        '& .header': {
            ...FlexRow,
            alignItems: 'center',
            gap: '12px',
            '& .seller-name': {
                fontWeight: 'bold',
                fontSize: 14,
            },
            '& .date': {
                color: '#7B9AAF',
                textAlign: 'right',
                fontSize: '13px',
            },
        },
    },
}));

export default useStyles;
