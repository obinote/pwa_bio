/* eslint-disable react/no-danger */
import { getCmsBlocks } from '@core_modules/promotion/services/graphql';
import SkeletonCms from '@core_modules/promotion/pages/default/components/skeletonCms';

const PromotionCmsBlock = () => {
    const {
        data: dataCmsBlocks, loading,
    } = getCmsBlocks({ identifiers: ['promotion-banner'] });
    if (loading) return <><SkeletonCms /></>;
    return (
        <div
            className="content-banner"
            dangerouslySetInnerHTML={{
                __html: dataCmsBlocks
                && dataCmsBlocks.cmsBlocks
                && dataCmsBlocks.cmsBlocks.items[0]
                && dataCmsBlocks.cmsBlocks.items[0].content,
            }}
        />
    );
};

export default PromotionCmsBlock;
