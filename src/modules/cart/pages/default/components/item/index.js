import useStyles from '@core_modules/cart/pages/default/components/style';
import TableList from '@core_modules/cart/pages/default/components/item/TableListItem';

const ItemView = (props) => {
    const styles = useStyles();
    const {
        data, t, toggleEditMode, editMode, deleteItem, handleFeed, toggleEditDrawer, ...other
    } = props;

    return (
        <div className={styles.container}>
            <div className="">
                <TableList
                    data={data}
                    t={t}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    {...other}
                />
            </div>
        </div>
    );
};

export default ItemView;
