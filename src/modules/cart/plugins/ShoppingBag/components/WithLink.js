/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LocalMall from '@material-ui/icons/LocalMallOutlined';
import Button from '@material-ui/core/Button';
import { ORANGE } from '@theme_color';

const useStyles = makeStyles({
    root: {
        margin: 10,
        cursor: 'pointer',
        '@media (max-width:767px)': {
            margin: 0,
            // padding: 5,
        },
        '& .shopping-bag-count': {
            background: ORANGE,
            color: 'white',
            height: 22,
            width: 22,
            display: 'inline-flex',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
});

const WithLink = ({ cartData, handleLink, automation_id }) => {
    const styles = useStyles();
    return (
        <Button id={automation_id}>
            <div id="shopping-bag" className={styles.root} onClick={handleLink}>
                <Badge invisible color="secondary" overlap="rectangular">
                    <LocalMall style={{ color: '#414048' }} />
                </Badge>
                {cartData > 0 && <span className="shopping-bag-count">{cartData}</span>}
            </div>
        </Button>
    );
};

export default WithLink;
