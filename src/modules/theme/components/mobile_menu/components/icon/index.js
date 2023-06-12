export const HomeIcon = ({ active = false }) => {
    const icon = (active) ? '/assets/img/home-active.svg' : '/assets/img/home.svg';
    return (<img src={icon} alt="home" className="menu-icon" />);
};

export const CategoryIcon = ({ active = false }) => {
    const icon = (active) ? '/assets/img/category-active.svg' : '/assets/img/category.svg';
    return (<img src={icon} alt="home" className="menu-icon" />);
};

export const CartIcon = ({ active = false }) => {
    const icon = (active) ? '/assets/img/cart-active.svg' : '/assets/img/cart.svg';
    return (<img src={icon} alt="home" className="menu-icon" />);
};

export const AccountIcon = ({ active = false }) => {
    const icon = (active) ? '/assets/img/account-active.svg' : '/assets/img/account.svg';
    return (<img src={icon} alt="home" className="menu-icon" />);
};

export default HomeIcon;
