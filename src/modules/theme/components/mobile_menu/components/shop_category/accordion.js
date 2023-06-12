/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import useStyle from '@common_mobile_menu/components/shop_category/style';

const Accordion = (props) => {
    const { data, generateLink, handleClick } = props;
    const [showChildren, setShowChildren] = useState(false);
    const [active, setActive] = useState(null);
    const styles = useStyle();

    return (
        <div>
            <div className={classNames(styles.accordion)} onClick={() => setShowChildren(!showChildren)}>
                <a href="#" className={classNames(styles.menuItem)} dangerouslySetInnerHTML={{ __html: data.name }} />
                {showChildren ? (
                    <div className={classNames(styles.arrow)}>
                        <ExpandLessIcon />
                    </div>
                ) : (
                    <div className={classNames(styles.arrow)}>
                        <ExpandMoreIcon className={classNames(useStyle.arrow)} />
                    </div>
                )}
            </div>
            <div style={{ display: !showChildren && 'none' }}>
                {data.children.map((value, index) => (
                    <div>
                        {value.children ? (
                            <div className={classNames(styles.childWrapper)}>
                                <div className={classNames(styles.accordionChild)}>
                                    <div className={classNames(styles.imgWrapper)}>
                                        {value.icons && <img src={value.icons} alt={value.name} className={classNames(styles.imgIcon)} />}
                                        <Link key={index} href={generateLink(value)[0]} as={generateLink(value)[1]}>
                                            <a className={classNames(styles.menuChild)} onClick={() => handleClick(value)}>
                                                {value.name}
                                            </a>
                                        </Link>
                                    </div>
                                    {active !== index ? (
                                        <ExpandMoreIcon onClick={() => setActive(active === index ? null : index)} fontSize="small" />
                                    ) : (
                                        <ExpandLessIcon onClick={() => setActive(active === index ? null : index)} fontSize="small" />
                                    )}
                                </div>
                                <div style={{ display: active !== index && 'none' }} className={classNames(styles.accordionChildWrapper)}>
                                    {value.children.map((val, idx) => (
                                        <div className={classNames(styles.accordionChild)}>
                                            <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]}>
                                                <a className={classNames(styles.menuLastChild)} onClick={() => handleClick(val)}>
                                                    {val.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={index} href={generateLink(value)[0]} as={generateLink(value)[1]}>
                                <a onClick={() => handleClick(value)}>{value.name}</a>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
