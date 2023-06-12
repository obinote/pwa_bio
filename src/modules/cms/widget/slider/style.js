import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    skeletonContainer: {
        marginBottom: '20px',
        backgroundColor: '#E8E8E8',
        '& .skeleton-item': {
            height: '200px',
            [theme.breakpoints.up('md')]: {
                height: '350px',
            },
        },
    },
}));

export default useStyles;
