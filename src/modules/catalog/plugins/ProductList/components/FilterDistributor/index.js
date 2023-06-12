import useStyles from '@plugin_productlist/components/FilterDistributor/style';
import Switch from '@material-ui/core/Switch';
// import ShoppingBagIcon from '@material-ui/icons/LocalMallOutlined';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const FilterDistributor = (props) => {
    const {
        t,
        toggleFilterDistributor,
        active,
    } = props;
    const styles = useStyles();

    return (
        <div className={styles.rootContainer} id={`filter-distributor${typeof window !== 'undefined' && window.innerWidth <= 768 ? '-mobile' : ''}`}>
            <div className={styles.leftContainer}>
                <div className="icon-container">
                    <img src="/assets/img/catalog-filter-distributor.svg" alt="distributor filter" />
                    {/* <ShoppingBagIcon className="shopping-bag-icon" /> */}
                    {/* <VerifiedUserIcon className="verified-user-icon" /> */}
                </div>
            </div>
            <div className={styles.rightContainer}>
                <span className="description" style={{ color: active ? '#F58732' : '#7B9AAF' }}>{t('catalog:title:showApprovedDistributor')}</span>
                <Switch className={styles.rootSwitch} checked={active} onChange={toggleFilterDistributor} id="toggle_on_produk" />
            </div>
        </div>
    );
};

export default FilterDistributor;
