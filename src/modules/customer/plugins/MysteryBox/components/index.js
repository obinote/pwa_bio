/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Router from 'next/router';
import useStyles from '@core_modules/customer/plugins/MysteryBox/components/style';
import Fab from '@material-ui/core/Fab';

const Content = (props) => {
    const {
        dataMysteryBox,
        dataConfig,
    } = props;

    const styles = useStyles();

    return (
        <>
            {(dataMysteryBox?.is_valid && dataConfig)
                && (
                    <div
                        onClick={() => Router.replace('/mysterybox')}
                        className={styles.iconBox}
                    >
                        <Fab aria-label="MysteryBox">
                            <div>
                                <h5>MYSTERY</h5>
                                <h3>BOX</h3>
                            </div>
                            <img src="/assets/img/giftbox.gif" alt="" style={{ width: 80 }} />
                            <div className="counter">{dataMysteryBox?.remaining_misterybox}</div>
                        </Fab>
                    </div>
                )}
        </>
    );
};

export default Content;
