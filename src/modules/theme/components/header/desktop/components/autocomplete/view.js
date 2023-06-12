/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
// import { formatPrice } from '@helper_currency';
import useStyles from '@src_modules/theme/components/header/desktop/components/autocomplete/style';
import Typography from '@common_typography';
import { useEffect, useState } from 'react';

const OptionsItem = (props) => {
    const styles = useStyles();
    const {
        name, type, position, small_image, sku, breadcrumbs, vendor_name,
    } = props;
    let breadcrumbsText = '';
    if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            breadcrumbsText += `${element.category_name} > `;
        }
    }
    const [searchbarShrinked, setSearchbarShrinked] = useState(window.scrollY >= 100);

    useEffect(() => {
        const handleScroll = () => {
            setSearchbarShrinked(window.scrollY >= 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {type === 'product' ? (
                <div className={position === 0 ? classNames(styles.listContainer, styles.firstListContainer) : styles.listContainer}>
                    {position === 0
                        ? (
                            <div className={styles.topTitle}>
                                Product
                            </div>
                        )
                        : null}
                    <div className={styles.productSearchWrapper}>
                        <div className={styles.imageContainer}>
                            <img
                                className={styles.img}
                                // src={small_image ? `https:${small_image.url}` : '/assets/img/placeholder.png'}
                                src={small_image?.url ?? '/assets/img/placeholder.png'}
                            />
                        </div>
                        <div className="product-content">
                            <div className={styles.title}>
                                {name}
                            </div>
                            <div className={styles.price}>
                                {sku || '-'}
                            </div>
                            <div className={styles.price}>
                                {vendor_name || '-'}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {type === 'category' ? (
                <div className={styles.listContainerCategory}>
                    <div className={styles.breadcrumbs}>
                        {breadcrumbsText}
                    </div>
                    <div className={styles.listNameCategory}>
                        <div className={styles.titleCategory}>
                            <Typography variant="span" type="bold" size="14">
                                {name}
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : null}
            {type === 'landing' ? (
                <div className={styles.listContainerCategory}>
                    <div className={styles.breadcrumbs}>
                        {breadcrumbsText}
                    </div>
                    <div className={styles.listNameCategory}>
                        <div className={`icon-` + name + ` ${searchbarShrinked ? styles.titleCategoryExpanded : styles.titleCategory}`}>
                            <Typography variant="span" type="bold" size="14">
                                {name}
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default OptionsItem;
