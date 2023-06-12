/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const Accordion = (props) => {
    const {
        data, generateLink, handleClick,
    } = props;
    const [showChildren, setShowChildren] = useState(false);
    const [active, setActive] = useState(null);

    return (
        <div>
            <div className="accordion" onClick={() => setShowChildren(!showChildren)}>
                <a href="#" className="menu-item" dangerouslySetInnerHTML={{ __html: data.name }} />
                {showChildren ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
            </div>
            <div style={{ display: !showChildren && 'none' }}>
                {data.children.map((value, index) => (
                    <div>
                        {value.children ? (
                            <div className="menu-accordion">
                                <div className="accordion">
                                    <Link key={index} href={generateLink(value)[0]} as={generateLink(value)[1]}>
                                        <a className="menu-item" onClick={() => handleClick(value)}>
                                            {value.name}
                                        </a>
                                    </Link>
                                    {active !== index ? (
                                        <ExpandMoreIcon onClick={() => setActive(active === index ? null : index)} />
                                    ) : (
                                        <ExpandLessIcon onClick={() => setActive(active === index ? null : index)} />
                                    )}
                                </div>
                                <div style={{ display: active !== index && 'none' }}>
                                    {value.children.map((val, idx) => (
                                        <div className="accordion-child">
                                            <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]}>
                                                <a className="menu-child" onClick={() => handleClick(val)}>
                                                    {val.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={index} href={generateLink(value)[0]} as={generateLink(value)[1]}>
                                <a onClick={() => handleClick(value)}>
                                    {value.name}
                                </a>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <style jsx>
                {`
                    .accordion {
                        display: flex;
                        justify-content: space-between;
                    }
                    .accordion-child {
                        padding-top: 12px;
                    }
                    .menu-accordion {
                        padding: 14px 22px;
                        border-bottom: 1px solid #d5eafb;
                    }
                    .menu-child {
                        padding: 5px 22px;
                        text-transform: none;
                        font-size: 16px;
                    }
                `}
            </style>
        </div>
    );
};

export default Accordion;
