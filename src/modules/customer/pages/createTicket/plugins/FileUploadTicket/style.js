/* eslint-disable no-unused-vars */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE_LIGHT } from '@theme_color';

export default makeStyles((theme) => ({
    inputFileContainer: {
        marginBottom: 10,
        display: 'flex',
        background: BLUE_LIGHT,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
        '& .file-uploader-frame': {
            display: 'flex',
            backgroundColor: '#F2F9FF',
            width: 'auto',
            paddingLeft: 15,
            paddingRight: 5,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 5,
        },
        '& .file-area': {
            cursor: 'pointer',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            visibility: 'hidden',
            width: 0,
        },
        '& .file-uploader-button': {
            background: '0 0',
            cursor: 'pointer',
            '-moz-box-sizing': 'content-box',
            border: 0,
            boxShadow: 'none',
            lineHeight: 'inherit',
            margin: 0,
            padding: 0,
            textDecoration: 'none',
            textShadow: 'none',
            fontWeight: 'bold',
            marginLeft: 10,
            color: '#f58732',
            fontSize: 14,
            width: '100px',
            letterSpacing: 0,
        },
        '& .attach-icon': {
            color: '#6DA1D4',
            fontSize: 18,
            transform: 'rotate(45deg)',
        },
    },
    files: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
    },
    fileName: {
        marginLeft: 8,
        display: 'contents',
    },
}));
