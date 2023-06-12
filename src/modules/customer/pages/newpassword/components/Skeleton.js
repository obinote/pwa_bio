import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

const SkeletonLoader = () => (
    <Box display="flex" flexDirection="column" px="1rem" py="3rem" width="100%" maxWidth="468px" m="auto">
        <Skeleton animation="wave" variant="text" height={60} />
        <Skeleton animation="wave" variant="text" height={60} />
        <Skeleton animation="wave" variant="text" height={60} />
        <Skeleton animation="wave" variant="text" width="80%" height={60} style={{ margin: 'auto' }} />
    </Box>
);

export default SkeletonLoader;
