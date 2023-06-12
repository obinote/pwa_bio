import makeStyles from '@material-ui/core/styles/makeStyles';
import { RED } from '@root/core/theme/colors';
import { BLUE_SECONDARY, ORANGE } from '@theme_color';

const PRIMARY_SOFT = 'black';
const PRIMARY_DARK = '#4D2F82';
const WHITE = '#FFFFFF';
const GRAY_LIGHT = '#8199AD';
const TABLE_GRAY = '#F3F4FA';
const TEXT_COLOR = '#68779F';
const TEXT_DARK_GREY = '#414047';
const PRIMARY_GREEN = '#4EABC6';

export default makeStyles((theme) => ({
    chatWrapper: {
        height: '450px',
        width: '725px',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
    },
    indexBadge: {
        '& span': {
            top: -17,
            right: -7,
            height: 22,
            width: 22,
            [theme.breakpoints.up('md')]: {
                top: -6,
                right: -11,
            },
        },
    },
    container: {
        height: '495px',
        width: '725px',
        display: 'flex',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
        position: 'fixed',
        right: '32px',
        bottom: '94px',
        zIndex: '99999',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100%',
            bottom: 0,
            right: 0,
            borderRadius: 0,
        },
    },
    emptyText: {
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4D2F82',
    },
    userContainer: {
        // width: '338px',
        width: '35%',
        // border: '1px solid red',
        borderRight: '1px solid #E7F3FF',
        height: '100%',
        // boxShadow: '0px 3px 15px #4D2F821A',
        // borderRadius: '8px',
        background: '#FFF',
        // padding: '20px 15px',
        // marginLeft: '12px',
        // paddingRight: '12px',
        paddingBottom: '12px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: '35%',
        },
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
    },
    userMainTitle: {
        '& h3': {
            padding: '18px',
            display: 'inline-block',
        },
        '& .wrapper-button': {
            backgroundColor: '#E7F3FF',
            padding: '15px',
            '& button': {
                backgroundColor: '#F58732',
                border: 'unset',
                padding: '10px',
                display: 'block',
                margin: '0 auto',
                borderRadius: '24px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                '&:hover': {
                    backgroundColor: '#F58732',
                    opacity: '0.8',
                },
            },
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '& .closeWrapper': {
                height: 24,
                marginLeft: 12,
            },
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#E7F3FF',
        },
    },
    formUserSearch: {
        marginBottom: '10px',
        display: 'none',
        paddingTop: '9px',
        paddingBottom: '9px',
        // display: 'none',
        // borderBottom: '1px solid red'
        // border: '1px solid red'
    },
    searchInput: {
        flex: 1,
        // border: '1px solid blue',
        width: '100%',
        marginRight: '10px !important',
        '&.container': {
            margin: 0,
            // border: '1px solid red'
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '2px 5px',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: '12px',
            opacity: 1,
            color: GRAY_LIGHT,
        },
    },
    searchButton: {
        // padding: '13px 23px',
        // minWidth: '60px',
        // width: '60px',
        // border: '1px solid green',
        background: PRIMARY_SOFT,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '12px',
        outline: 'none',
        '&.MuiButtonBase-root': {
            minWidth: '24px !important',
        },
        '&.MuiButtonBase-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
        },
    },
    overflowUser: {
        flex: 1,
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_SOFT,
            borderRadius: '10px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        '& .skeletonLoading': {
            marginBottom: 5,
        },
    },
    userWrapper: {
        // borderTop: `0.5px solid ${GRAY_LIGHT}`,
        // padding: '10px 0',
    },
    userContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 9px',
        cursor: 'pointer',
        '&.active': {
            backgroundColor: '#f2f9ff',
        },
        '&:hover': {
            backgroundColor: '#f2f9ff',
        },
        '&.userBot': {
            borderBottom: '3px solid #e7f3ff',
        },
    },
    userImage: {
        height: '46px',
        width: '46px',
        position: 'relative',
        // height: '65px',
        // width: '65px',
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
            width: '46px',
            height: 'auto',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '12px',
            color: WHITE,
        },
        '&.imageBot': {
            backgroundColor: PRIMARY_GREEN,
            padding: 10,
        },
    },
    badgeCount: {
        position: 'absolute',
        top: '-5px',
        right: 0,
        color: WHITE,
        backgroundColor: RED,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    userText: {
        flex: 1,
        overflow: 'hidden',
    },
    userName: {
        padding: '0px !important',
        textTransform: 'capitalize',
        color: TEXT_DARK_GREY,
        fontSize: '14px',
        lineHeight: '18px',
        lineSpacing: '0px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        height: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('md')]: {
            maxWidth: '60vw',
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            maxWidth: '60%',
        },
    },
    userStatus: {
        fontSize: '12px',
        verticalAlign: 'text-top',
        marginLeft: 4,
        [theme.breakpoints.between('lg', 'xl')]: {
            marginLeft: 4,
        },
    },
    onlineStatus: {
        color: '#1ae01a',
    },
    offlineStatus: {
        color: '#ccc',
    },
    userLastMessage: {
        padding: '0px',
        color: GRAY_LIGHT,
        fontSize: '13px',
        lineHeight: '16px',
        lineSpacing: '0px',
    },
    userBadge: {
        color: PRIMARY_DARK,
        fontSize: '10px',
        fontWeight: 'bold',
        display: 'none',
    },
    userInfo: {
        textAlign: 'center',
        width: '20px',
    },
    userDate: {
        padding: '0px',
        marginBottom: '19px',
    },
    customBadge: {
        '& span': {
            backgroundColor: PRIMARY_GREEN,
            color: '#fff',
            marginRight: '1px',
        },
    },
    chatIcon: {
        fontSize: '20px',
    },
    chatDeliver: {
        fontSize: '17px',
        position: 'absolute',
        right: '19px',
        bottom: 0,
        color: '#d3c7c7',
    },
    chatDelivered: {
        color: 'green !important',
    },
    messageContainer: {
        flex: 1,
        // boxShadow: '0px 3px 15px #4D2F821A',
        // borderRadius: '8px',
        background: WHITE,
        padding: '20px 0px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 0,
            height: '100%',
        },
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
    },
    selectedUser: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '22px',
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: '20px',
        borderBottom: '0.5px solid #E7F3FF',
        maxHeight: '40px',
    },
    userImageWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    userBackIcon: {
        cursor: 'pointer',
        marginRight: '12px',
    },
    selectedUserImage: {
        height: '46px',
        width: '46px',
        // height: '48px',
        // width: '48px',
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        borderRadius: '50%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '14px',
            // fontSize: '18px',
            color: WHITE,
        },
    },
    blockedUserContent: {
        height: '90%',
        padding: '0 2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBlockedUser: {
        height: '10%',
        paddingRight: '1em',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    messageContent: {
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_SOFT,
            borderRadius: '10px',
        },
        padding: '0px 10px',
    },
    messageImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    },
    fileImage: {
        minWidth: '100px',
    },
    messageLeftWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    messageLeftContent: {
        minWidth: '20%',
        maxWidth: '80%',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    messageLeftText: {
        display: 'block',
        width: '100%',
        wordBreak: 'break-word',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '60px',
        fontSize: '12px',
        borderRadius: '20px 20px 20px 0',
        position: 'relative',
        margin: '0px',
        backgroundColor: WHITE,
        border: `1px solid ${GRAY_LIGHT}`,
        '& span': {
            fontSize: '11px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: '16px',
            right: '20px',
        },
    },
    messageRightWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    messageRightText: {
        display: 'block',
        width: '100%',
        wordBreak: 'break-word',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '60px',
        fontSize: '12px',
        borderRadius: '20px 20px 0 20px',
        position: 'relative',
        margin: '0px',
        background: '#f2f9ff',
        '& span': {
            fontSize: '11px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: '16px',
            right: '20px',
        },
        '& .message-link': {
            color: '#06aec9',
        },
    },
    messageLoading: {
        background: 'rgb(66, 146, 157)',
    },
    messageCenterDate: {
        textAlign: 'center',
        fontSize: '12px',
        color: '#7b9aaf',
        margin: 0,
        marginBottom: '22px',
    },
    formContent: {
        display: 'flex',
        alignItems: 'center',
    },
    uploadContainer: {
        marginRight: '8px',
        position: 'absolute',
        right: 103,
        '& button': {
            borderRadius: '12px',
            minWidth: '25px',
        },
        '& svg': {
            color: '#7B9AAF',
            transform: 'rotate(0.1turn)',
        },
    },
    messageForm: {
        // marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        padding: '0px 12px',
    },
    chatPlugin: {
        position: 'fixed',
        right: 80,
        bottom: 14,
        zIndex: theme.zIndex.drawer + 3,
        [theme.breakpoints.down('xs')]: {
            right: 16,
            bottom: 110,
        },
    },
    buttonChat: {
        background: '#06AEC9',
        color: 'white',
        width: 'auto',
        border: 'none',
        padding: '0 20px',
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        height: 45,
        boxShadow: '0 3px 6px rgb(0,0,0,0.2)',
        cursor: 'pointer',
        '&:hover': {
            background: '#06AEC9',
        },
        '& p': {
            marginLeft: 5,
            fontSize: 16,
        },
        '&:before': {
            content: '""',
            display: 'inline',
            width: 22,
            height: 22,
            backgroundImage: 'url(/assets/img/customer-service.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            marginRight: 3,
            [theme.breakpoints.down('xs')]: {
                marginRight: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            height: 48,
            width: 48,
            display: 'flex',
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            right: 16,
        },
    },
    messageInput: {
        flex: 1,
        width: '100%',
        '&.container': {
            margin: 0,
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 30,
            padding: '2px 5px',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '& .MuiInputBase-input': {
            padding: '6px 35px 7px 12px',
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: '12px',
            opacity: 1,
            color: GRAY_LIGHT,
        },
    },
    messageButton: {
        padding: '10px 16px',
        marginLeft: '6px',
        background: '#f58732',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '30px',
        outline: 'none',
        '& span': {
            color: '#ffffff',
            fontSize: 10,
        },
        '&.MuiButtonBase-root': {
            minWidth: '24px !important',
            '& .MuiButton-label': {
                textTransform: 'capitalize',
            },
        },
        '&.MuiButtonBase-root:hover': {
            backgroundColor: '#f58732 !important',
        },
    },
    chatCsButton: {
        // display: 'flex',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.4em 0',
        fontSize: '17px',
        fontWeight: '500',
        color: 'white',
        background: PRIMARY_SOFT,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '12px',
        outline: 'none',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
        },
    },

    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
        },
    },
    btn: {
        borderRadius: 20,
        backgroundColor: 'transparent',
        color: PRIMARY_SOFT,
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
        },
    },
    textNoFile: {
        color: TEXT_COLOR,
        padding: '0px 10px',
    },
    autoResponseWrapper: {
        maxWidth: '80%',
        marginBottom: '20px',
        fontSize: '12px',
        height: 'auto',
        overflow: 'unset',
        '&.collapse': {
            height: 44,
            overflow: 'hidden',
            '& > div:first-child': {
                borderRadius: 20,
            },
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    },
    autoResponseTitle: {
        padding: '14px 20px',
        borderRadius: '0 20px 0 0',
        color: WHITE,
        backgroundColor: BLUE_SECONDARY,
        fontWeight: 'bold',
        position: 'relative',
        '&.right-title': {
            borderRadius: '20px 0 0 0',
        },
        '& .MuiIconButton-root': {
            position: 'absolute',
            bottom: 10,
            right: 20,
            color: WHITE,
        },
    },
    autoResponseBody: {
        borderRadius: '0 0 20px 20px',
        border: `1px solid ${GRAY_LIGHT}`,
        '& p': {
            margin: 0,
            padding: '6px 20px',
            cursor: 'pointer',
            color: ORANGE,
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
        '& p:hover': {
            backgroundColor: TABLE_GRAY,
        },
        '& p:last-child': {
            borderRadius: '0 0 20px 20px',
            borderBottom: 'none',
        },
        '& .MuiChip-outlined': {
            display: 'block',
            border: 0,
            borderRadius: 0,
            padding: '6px 20px',
            color: ORANGE,
            borderBottom: `1px solid ${GRAY_LIGHT}`,
            height: 'auto',
            whiteSpace: 'unset',
            '& .MuiChip-label': {
                padding: 0,
                whiteSpace: 'unset',
            },
            '&:last-child': {
                borderRadius: '0 0 20px 20px',
                borderBottom: 0,
            },
        },
    },
    botName: {
        fontSize: '10px',
        color: TEXT_COLOR,
    },
    customerName: {
        display: 'block',
        fontSize: '10px',
        color: TEXT_COLOR,
        textAlign: 'right',
    },
    sessionTerminated: {
        color: PRIMARY_DARK,
        textAlign: 'center',
        backgroundColor: '#e1e6f6',
        border: '2px solid #c1c6d6',
        borderRadius: '7px',
        padding: '4px',
        marginTop: '4px',
        [theme.breakpoints.between('sm', 'sm')]: {
            width: 'calc(100% - 20px)',
            margin: 'auto',
        },
    },
    lastMessage: {
        color: '#7b9aaf',
        fontSize: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'box',
        lineClamp: 2,
        boxOrient: 'vertical',
        maxWidth: 140,
    },
    fileLink: {
        display: 'flex',
        height: 'auto',
        borderRadius: 10,
        width: 190,
        alignItems: 'center',
    },
    fileName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'box',
        lineClamp: 2,
        boxOrient: 'vertical',
    },
    userUsernameWrapper: {
        display: 'flex',
        '& .userName': {
            [theme.breakpoints.between('lg', 'xl')]: {
                fontSize: 11,
                display: 'block',
                maxWidth: '60%',
            },
        },
    },
    autoTextContainer: {
        padding: '0 10px',
        display: 'flex',
        overflow: 'auto',
        justifyContent: 'flex-end',
    },
}));
