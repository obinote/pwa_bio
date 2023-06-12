/* eslint-disable react/no-danger */
import { getCmsBlocks } from '@core_modules/promotion/services/graphql';

const PromotionCmsBlockTnc = () => {
    const {
        data: dataCmsBlocks,
    } = getCmsBlocks({ identifiers: ['promotion-tnc'] });
    return (
        <div
            className="content-tnc"
            dangerouslySetInnerHTML={{
                __html: dataCmsBlocks
                && dataCmsBlocks.cmsBlocks
                && dataCmsBlocks.cmsBlocks.items[0]
                && dataCmsBlocks.cmsBlocks.items[0].content,
            }}
        />
    );
};

export default PromotionCmsBlockTnc;
