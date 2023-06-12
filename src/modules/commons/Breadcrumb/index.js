/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@common_typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { setResolver, getResolver } from '@helper_localstorage';
import Router from 'next/router';
import { GRAY_SECONDARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    root: {
        '& a': {
            cursor: 'pointer',
            underline: 'none',
        },
        '& p': {
            marginLeft: 0,
            fontSize: 12,
        },
        marginBottom: 10,
        marginTop: 15,
        '& .MuiBreadcrumbs-separator': {
            margin: 0,
        },
    },
    inactive: {
        color: '#7B9AAF',
        fontWeight: 400,
    },
    active: {
        fontWeight: 400,
    },
}));

const CustomBreadcrumb = ({ data = [], variant = 'text' }) => {
    const handleClick = async (url, id) => {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);

        let finalUrl = '/[...slug]';
        let asUrl = url;

        if (id === undefined || url === '/distributor') {
            finalUrl = url;
        }

        if (url === '/categories') {
            finalUrl = '/category-landing';
            asUrl = '/category-landing';
        }

        Router.push(
            `${finalUrl}`,
            `${asUrl}`,
        );
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" style={{ color: GRAY_SECONDARY }} />} className={styles.root}>
            <Link onClick={() => Router.push('/')}>
                <Typography variant="p" className={styles.inactive}>Beranda</Typography>
            </Link>
            {
                variant === 'chip' ? data.map(({
                    label, link, active, id,
                }, index) => (
                    <Link onClick={() => handleClick(link, id)} key={index}>
                        <Chip size="small" label={label} className={active ? styles.active : styles.inactive} />
                    </Link>
                ))
                    : data.map(({
                        label, link, active, id,
                    }, index) => (
                        <Link
                            onClick={index === data.length - 1 ? () => {} : () => handleClick(link, id)}
                            key={index}
                        >
                            <Typography variant="p" className={active ? styles.active : styles.inactive}>{label}</Typography>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};

const BreadcrumbsComp = (props) => (
    <CustomBreadcrumb {...props} />
);

export default BreadcrumbsComp;
