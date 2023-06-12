import Badge from '@material-ui/core/Badge';
import LocalMall from '@material-ui/icons/LocalMallOutlined';

const WithoutLink = ({ cartData = 0 }) => (
    <Badge color="secondary" badgeContent={cartData || 0}>
        <LocalMall style={{ color: '#414048' }} />
    </Badge>
);

export default WithoutLink;
