/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import useStyle from '@common_mobile_menu/components/shop_category/style';
import TabPanel from '@common_mobile_menu/components/shop_category/tabPanel';
import Accordion from '@common_mobile_menu/components/shop_category/accordion';
import Link from 'next/link';
import getPath from '@helper_getpath';
import userAgent from '@helper_useragent';

const PopupCategory = (props) => {
    const {
        data: menu, popupCategory, cmsPages, showPopUp,
    } = props;
    const styles = useStyle();
    const generateLink = (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        if (cat.link_type === 'category_link') {
            return ['/[...slug]', link];
        }
        const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
        if (cms) {
            return ['/[...slug]', link];
        }
        return [link, link];
        // return ['/[...slug]', link];
    };
    const handleClick = () => { };

    if (!popupCategory) return <></>;

    return (
        <>
            <div className={classNames(styles.wrapper)} style={{ top: (showPopUp && !userAgent.isMobileApps()) ? 130 : 60 }}>
                <TabPanel value={0} index={0}>
                    <div>
                        {menu.map((val, idx) => {
                            if (val.include_in_menu && val.name) {
                                return (
                                    <div className={classNames(styles.menu)} key={idx}>
                                        {val.link && val.children.length < 1 ? (
                                            <>
                                                <Link href={generateLink(val)[0]} as={generateLink(val)[1]}>
                                                    <a
                                                        className={classNames(styles.menuItem)}
                                                        onClick={() => handleClick(val)}
                                                        dangerouslySetInnerHTML={{ __html: val.name }}
                                                    />
                                                </Link>
                                            </>
                                        ) : (
                                            <Accordion data={val} generateLink={generateLink} handleClick={handleClick} />
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </TabPanel>
            </div>
        </>
    );
};

export default PopupCategory;
