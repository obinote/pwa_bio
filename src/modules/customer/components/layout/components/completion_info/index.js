import { useState, useCallback, useEffect } from 'react';
import useStyles from '@src_modules/customer/components/layout/components/completion_info/style';
import classNames from 'classnames';
import Router from 'next/router';
import { getCompanyStatus } from '@core_modules/customer/services/graphql';
import get from 'lodash/get';

const CompletionInfo = (props) => {
    const { t } = props;
    const styles = useStyles();
    const icon = '/assets/img/completion-document-icon.svg';

    const lang = 'common:completionInfo:';
    const UNDER_REVIEW = 'under_review';
    const OPEN = 'open';
    const REVISION = 'revision';

    const { data, loading } = getCompanyStatus();
    const [titleLabel, setTitleLabel] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState(null);
    const [btnLabel, setBtnLabel] = useState(null);
    const [link, setLink] = useState(null);

    const onNavigateTo = useCallback(() => {
        if (link) {
            Router.push(link);
        }
    }, [link]);

    useEffect(() => {
        const detail = get(data, 'getCompanyStatus');
        if (detail) {
            let title = '';
            let desc = '';

            const status = get(detail, 'status');
            const isExpired = get(detail, 'docs_expired');
            const willExpired = get(detail, 'docs_will_expired');
            const isAdmin = get(detail, 'is_company_admin');
            const revLabel = get(detail, 'revision') ?? null;

            if ((status !== UNDER_REVIEW && status !== OPEN && willExpired !== '') || isExpired !== '') {
                title = isAdmin ? t(`${lang}hasExpiredTitleAdmin`) : t(`${lang}nonAdminTitle`);

                if (status !== REVISION && status !== OPEN && status !== UNDER_REVIEW) {
                    if (isExpired === 'time_expired') {
                        title = isAdmin ? t(`${lang}timeExpiredTitleAdmin`) : t(`${lang}nonAdminTitle`);
                        desc = isAdmin ? t(`${lang}timeExpiredDescAdmin`) : t(`${lang}timeExpiredDesc`);
                    } else if (isExpired !== '') {
                        title = isAdmin ? t(`${lang}hasExpiredTitleAdmin`) : t(`${lang}nonAdminTitle`);
                        desc = isAdmin ? t(`${lang}hasExpiredDescAdmin`, { doc: isExpired }) : t(`${lang}hasExpiredDesc`);
                    } else if (willExpired === 'not found') {
                        title = isAdmin ? t(`${lang}notFoundTitleAdmin`) : t(`${lang}nonAdminTitle`);
                        desc = isAdmin ? t(`${lang}notFoundDescAdmin`) : t(`${lang}notFoundDesc`);
                    } else {
                        title = isAdmin ? t(`${lang}willExpiredTitleAdmin`) : t(`${lang}nonAdminTitle`);
                        desc = isAdmin ? t(`${lang}willExpiredDescAdmin`, { doc: willExpired }) : t(`${lang}willExpiredDesc`);
                    }
                }

                // for button
                if (isAdmin) {
                    setBtnLabel(t(`${lang}btnUpdateDoc`));
                    setLink('/customer/application_document');
                }
            }

            if (status === OPEN) {
                title = isAdmin ? t(`${lang}openTitleAdmin`) : t(`${lang}nonAdminTitle`);
                desc = isAdmin ? t(`${lang}openDescAdmin`) : t(`${lang}openDesc`);

                // for button
                if (isAdmin) {
                    setBtnLabel(t(`${lang}btnComplete`));
                    setLink('/customer/application_type');
                }
            }

            if (status === UNDER_REVIEW) {
                title = isAdmin ? t(`${lang}underReviewTitleAdmin`) : t(`${lang}nonAdminTitle`);
                desc = isAdmin ? t(`${lang}underReviewDescAdmin`) : t(`${lang}underReviewDesc`);
            }

            if (status === REVISION) {
                title = isAdmin ? t(`${lang}revisionTitleAdmin`) : t(`${lang}nonAdminTitle`);
                desc = isAdmin ? t(`${lang}revisionDescAdmin`) : t(`${lang}revisionDesc`);

                // for button
                if (isAdmin) {
                    setBtnLabel(t(`${lang}btnUpdateApp`));
                    setLink('/customer/application_summary');
                }
            }

            setTitleLabel(title);
            setDescription(desc);
            setComment(revLabel);
        }
    }, [data]);

    if (loading || !data || titleLabel === '') {
        return <></>;
    }

    return (
        <div className={classNames(styles.completionContainer)}>
            <img src={icon} alt="completion-document-icon" className={classNames(styles.completionImg)} />
            <div className={classNames(styles.completionContent)}>
                <div className={classNames(styles.completionTitle)}>{titleLabel}</div>
                <div className={classNames(styles.completionDescription)}>{description}</div>
                {comment ? (
                    <div className={classNames(styles.completionCommentWrapper)}>
                        <span className={classNames(styles.completionCommentTitle)}>{t(`${lang}commentFromAdmin`)}</span>
                        <p className={classNames(styles.completionCommentDesc)}>{comment}</p>
                    </div>
                ) : (
                    <></>
                )}
                {btnLabel ? (
                    <div className={classNames(styles.btnWrapper)}>
                        <button type="button" className={styles.btnCompletion} onClick={onNavigateTo}>
                            {btnLabel}
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default CompletionInfo;
