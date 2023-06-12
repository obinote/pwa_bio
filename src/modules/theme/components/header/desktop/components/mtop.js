/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import Link from 'next/link';
import SwitcherLanguage from '@common_language';
import { distributorPortal } from '@config';
import Cookies from 'js-cookie';

const ViewTop = (props) => {
    const { t, data } = props;
    const adminId = Cookies.get('admin_id');
    let urlEnvironment;
    if (typeof window !== 'undefined') {
        if (window.APP_ENV === 'local') {
            urlEnvironment = distributorPortal.local;
        } else if (window.APP_ENV === 'dev') {
            urlEnvironment = distributorPortal.dev;
        } else if (window.APP_ENV === 'stage') {
            urlEnvironment = distributorPortal.staging;
        } else if (window.APP_ENV === 'prod') {
            urlEnvironment = distributorPortal.prod;
        } else {
            urlEnvironment = '';
        }
    } else {
        urlEnvironment = '';
    }
    return (
        <ul>
            <li>
                <Link href={urlEnvironment}>
                    <a>{t('common:menu:distributorPortal')}</a>
                </Link>
            </li>
            {(data.customer && (adminId !== undefined && adminId !== '')) ? (
                <li>
                    <span className="microsite">
                        {`(Login By ${JSON.parse(adminId)[1]})`}
                    </span>
                </li>
            ) : null}
            <li className="language-switcher">
                <SwitcherLanguage {...props} />
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        text-transform: uppercase;
                        font-family: Montserrat !important;
                    }

                    li {
                        display: inline-block;
                        padding: 5px 10px;
                        position: relative;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                    }
                    ul ul li {
                        display: block;
                    }

                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a,
                    ul button,
                    .microsite {
                        color: #fff;
                        text-decoration: none;
                        font-size: 12px;
                        font-weight: 500;
                        min-width: 0;
                    }

                    ul button span {
                        font-weight: 500;
                    }

                    a:hover {
                        border-bottom: 1px solid #fff;
                        color: #fff;
                    }
                `}
            </style>
        </ul>
    );
};
export default ViewTop;
