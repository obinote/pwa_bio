/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */

import useStyles from '@core_modules/register/components/applicationContainer/style';
import classNames from 'classnames';

const ApplicationContainer = ({
    title,
    stepTitle,
    step,
    totalStep,
    children,
}) => {
    const styles = useStyles();

    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.pageTitleWrapper)}>
                <h1 className={classNames(styles.pageTitle)}>
                    {title}
                </h1>
            </div>

            <div className={classNames(styles.contentContainer)}>
                <div className={classNames(styles.progressContainer)}>
                    <div className={classNames(styles.progressTitle)}>
                        {`${step}/${totalStep} ${stepTitle}`}
                    </div>
                    <div className={classNames(styles.progressBar)}>
                        <div className={classNames(styles.progressBarStep)} style={{ width: `${(step / totalStep * 100)}%` }} />
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
};

export default ApplicationContainer;
