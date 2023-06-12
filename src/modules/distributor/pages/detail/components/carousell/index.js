import Slider from 'react-slick';
import useStyles from '@core_modules/distributor/pages/detail/components/carousell/style';
import classNames from 'classnames';

const Carousell = ({ images }) => {
    const styles = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: `${classNames(styles.slickDotsContainer)} slick-dots`,
        appendDots: (dots) => (
            <div>
                <ul className={classNames(styles.slickDots)}>
                    {dots.map((item) => {
                        const isActive = item.props.className === 'slick-active';
                        return isActive ? (
                            <li className={classNames(styles.slickActiveDotContainer)}>
                                <div className={classNames(styles.slickActiveDot)} />
                            </li>
                        ) : (
                            item
                        );
                    })}
                </ul>
            </div>
        ),
        customPaging: () => <div className={classNames(styles.slickDot)} />,
    };

    const SliderItem = ({ item }) => {
        const { url, position } = item;

        return (
            <div className={classNames(styles.craousellItemContainer)}>
                <img src={url} alt={position} onError={() => {}} className={classNames(styles.craousellImage)} />
            </div>
        );
    };

    return (
        images.length > 0 && (
            <div className={classNames(styles.craousellContainer)}>
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <SliderItem item={item} key={index} />
                    ))}
                </Slider>
            </div>
        )
    );
};

export default Carousell;
