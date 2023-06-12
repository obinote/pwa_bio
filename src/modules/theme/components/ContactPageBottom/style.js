import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    pageBottom: {
        width: '100%',
        maxWidth: '100%',
        padding: '35px 0',
        background: '#f2f9ff',
        '& .info p': {
            marginBottom: 0,
        },
        '& .info-before-footer': {
            textAlign: 'center',
            marginTop: '15px',
        },
        '& .info-before-footer .email': {
            marginLeft: '32px',
        },
        '& .info-before-footer .email:before': {
            content: 'url(/assets/img/icon-mail.svg)',
            marginRight: '8px',
            verticalAlign: 'middle',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));
