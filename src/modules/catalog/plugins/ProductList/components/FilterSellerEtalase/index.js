import React from 'react';
import classNames from 'classnames';
import useStyles from '@core_modules/catalog/plugins/ProductList/components/FilterSellerEtalase/style';
import _ from 'lodash';

const FilterSellerEtalase = (props) => {
    const {
        t, sellerEtalase, selectedSellerEtalase, setSelectedSellerEtalase,
    } = props;
    const styles = useStyles();
    const etalaseCount = _.size(sellerEtalase) + 1;

    const onHandleClickEtalase = (value) => {
        setSelectedSellerEtalase(value);
    };

    const EtalaseItem = ({ label, value }) => {
        const selected = value === selectedSellerEtalase || (selectedSellerEtalase !== 'all' && selectedSellerEtalase === label);

        return (
            <div
                className={classNames(styles.etalaseItem, selected ? styles.etalaseItemSelected : '')}
                onClick={() => onHandleClickEtalase(value === 'all' ? value : label)}
                aria-hidden="true"
            >
                <span className={classNames(styles.etalaseLabel, selected ? styles.etalaseLabelSelected : '')}>{label}</span>
            </div>
        );
    };

    return (
        <>
            <div className={classNames(styles.etalaseContainer, 'hidden-mobile')}>
                <div className={classNames('sellerEtalase')}>
                    <h3 className={classNames(styles.etalaseH3)}>{`${t('catalog:etalase')} (${etalaseCount})`}</h3>
                    <div className={classNames(styles.etalaseList)}>
                        <EtalaseItem label={t('catalog:allProduct')} value="all" />
                        {sellerEtalase?.map((item) => (
                            <EtalaseItem {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSellerEtalase;
