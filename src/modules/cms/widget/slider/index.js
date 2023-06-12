/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import Banner from '@modules/commons/SliderPromoSwiper/Banner';
// import SliderHomePage from '@modules/commons/SliderPromoSwiper/sliderHomepage';
import { BREAKPOINTS } from '@theme/vars';
import { getSliderBanner } from '../../services/graphql';
import Skeleton from './skeleton';

const SHOW_ALL_SCREEN = 0;
const SHOW_DESKTOP_SCREEN = 1;
const SHOW_MOBILE_SCREEN = 2;

const SliderBanner = ({
    sliderId, component = {}, isApp = false, showBlockLoading = false,
}) => {
    const { data, loading, error } = getSliderBanner(sliderId);
    const isDesktopScreen = typeof window !== 'undefined' && window.innerWidth >= BREAKPOINTS.sm;
    const imageGroup = {
        desktop: [SHOW_ALL_SCREEN, SHOW_DESKTOP_SCREEN],
        mobile: [SHOW_ALL_SCREEN, SHOW_MOBILE_SCREEN],
    };
    const imageGroupUsed = isDesktopScreen ? imageGroup.desktop : imageGroup.mobile;
    const bannerData = [];

    if (loading) {
        return (
            <>
                {
                    !isApp && !showBlockLoading
                        ? (
                            <Skeleton />
                        ) : null
                }
            </>
        );
    }

    if (error) return null;

    const {
        banner_width,
        banner_height,
        mobile_width,
        mobile_height,
    } = data.getSlider;
    const settingWidth = isDesktopScreen ? banner_width : mobile_width;
    const settingHeight = isDesktopScreen ? banner_height : mobile_height;

    if (data.getSlider && data.getSlider.banner && data.getSlider.banner.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.getSlider.banner.map((media) => {
            if (!imageGroupUsed.includes(media.visible_on)) return;

            const now = new Date();
            const startDate = new Date(media.start_date);
            const expiryDate = new Date(media.end_date);
            if (startDate <= now && now <= expiryDate) {
                bannerData.push({
                    link: media && media.target_url ? media.target_url : '#',
                    imageUrl: media.default_image,
                });
            }
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: 'not found',
        });
    }

    // return component.isHomepage === true ? (
    //     <SliderHomePage
    //         height={settingHeight}
    //         width={settingWidth}
    //         data={bannerData}
    //         showArrow={false}
    //         withThumbor={false}
    //         view={component}
    //     />
    // ) : (
    //     <Banner
    //         data={bannerData}
    //         showArrow={false}
    //         withThumbor={false}
    //         width={settingWidth}
    //         configBanner={data.getSlider}
    //     />
    // );
};

export default SliderBanner;
