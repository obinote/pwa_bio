import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const generateItems = (maxItems, itemsWidth) => {
    const wrapItems = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < maxItems; i++) {
        wrapItems.push(
            <Grid
                item
                xs={itemsWidth.xs}
                sm={itemsWidth.sm}
                md={itemsWidth.md}
                style={{ padding: '0 12px 0 6px' }}
                key={`skeleton_products_${i}`}
                className="skelContainer"
            >
                <SliderSkeleton />
            </Grid>,
        );
    }
    return wrapItems;
};

const SliderSkeleton = () => (
    <>
        <div className="skeleton-box" style={{ position: 'relative' }}>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '190px', marginBottom: '8px' }}
                smStyle={{ height: '180px' }}
                mdStyle={{ height: '180px' }}
            />
            <div className="skeleton-box-desc">
                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="20%" animation="wave" />
            </div>
        </div>
    </>
);

const CarouselSkeleton = (props) => {
    const defaultConfig = {
        // total items for each breakpoints
        itemsResponsive: {
            xs: 1,
            sm: 3,
            md: 5,
        },
        // column width for each breakpoints
        itemsWidth: {
            xs: 8,
            md: 2,
            sm: 4,
        },
    };

    const conf = { ...defaultConfig, ...props };
    const { itemsResponsive, itemsWidth } = conf;

    const checkBreakpoints = {
        xs: useMediaQuery((theme) => theme.breakpoints.only('xs')),
        sm: useMediaQuery((theme) => theme.breakpoints.only('sm')),
        md: useMediaQuery((theme) => theme.breakpoints.up('md')),
    };
    const currentBreakpoint = Object.entries(checkBreakpoints).filter((val) => val[1] === true);

    if (currentBreakpoint.length === 0) return <></>;
    const maxItems = itemsResponsive[currentBreakpoint[0][0]];

    return (
        <div style={{ padding: '28px 0 28px 0', width: '100%' }}>
            <Grid container className="skeleton-container">
                {generateItems(maxItems, itemsWidth)}
            </Grid>
        </div>
    );
};

export default CarouselSkeleton;
