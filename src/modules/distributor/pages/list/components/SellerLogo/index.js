import { useEffect, useState } from 'react';
import useStyles from '@core_modules/distributor/pages/list/components/SellerLogo/style';
import classNames from 'classnames';

const SellerLogo = ({ seller }) => {
    const [imgSrc, setImgSrc] = useState('/assets/img/distributor-placeholder.svg');
    const [isError, setIsError] = useState(false);
    const styles = useStyles();

    useEffect(() => {
        if (seller.logo) {
            setImgSrc(seller.logo);
            setIsError(false);
        }
    }, [seller]);

    const handleError = () => {
        if (!isError) {
            setImgSrc('/assets/img/distributor-placeholder.svg');
            setIsError(true);
        }
    };

    return (
        <div className={classNames(styles.sellerLogo)}>
            <img
                className={classNames(styles.sellerLogoImg)}
                src={imgSrc}
                alt={seller.company_name}
                title={seller.company_name}
                onError={handleError}
            />
        </div>
    );
};

export default SellerLogo;
