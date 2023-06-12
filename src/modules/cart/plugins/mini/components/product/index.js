import useStyles from '@plugin_minicart/components/style';
import Item from '@plugin_minicart/components/product/item';

const ItemCart = (props) => {
    const styles = useStyles();
    const {
        data, deleteCart, updateCart, cartId, qtyUpdate, isLoadingUpdate,
    } = props;
    if (data.length === 0) {
        return null;
    }
    return (
        <ol className={styles.miniCartItemContainer}>
            {data.map((val, idx) => (
                <Item
                    {...val}
                    key={idx}
                    deleteCart={deleteCart}
                    updateCart={updateCart}
                    cartId={cartId}
                    qtyUpdate={qtyUpdate}
                    isLoadingUpdate={isLoadingUpdate}
                />
            ))}
        </ol>
    );
};

export default ItemCart;
