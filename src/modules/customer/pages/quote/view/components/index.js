/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Router from 'next/router';
// import Layout from '@layout_customer';
import classNames from 'classnames';
import useStyles from '@src_modules/customer/pages/quote/view/components/style';
// import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import formatDate from '@helper_date';
import {
    TabMenu, TabMenus, TabPanels, TabPanel,
} from '@src_modules/customer/pages/quote/view/components/tab/';
import Typography from '@common_typography';
import Items from '@src_modules/customer/pages/quote/view/components/items';
import Comments from '@src_modules/customer/pages/quote/view/components/comments';
import History from '@src_modules/customer/pages/quote/view/components/history';
import Shipping from '@src_modules/customer/pages/quote/view/components/shipping';
import AddComment from '@src_modules/customer/pages/quote/view/components/add_comment';
import Button from '@material-ui/core/Button';
import gqlService from '@src_modules/customer/services/graphql';
import Modal from '@src_modules/customer/pages/quote/view/components/modal/index/';
// import { setCheckoutSession } from '@core_modules/checkout/services/graphql';
import { getHost } from '@helpers/config';
import { encrypt } from '@helper_encryption';
import userAgent from '@helper_useragent';
import useMessageTranslator from '@helpers/messageTranslator';

const View = (props) => {
    const {
        t, uid, data, refetch, storeConfig,
    } = props;
    const quote = data?.negotiableQuote;
    const { config: pageConfig } = props;
    const styles = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [closeQuote] = gqlService.closeNegotiableQuotes();
    const [deleteQuote] = gqlService.deleteNegotiableQuotes();
    const [placeQuote, { data: dataPlace, loading: loadingPlace, error: errorPlace }] = gqlService.placeNegotiableQuoteOrder();
    const [approveQuote, { data: dataApprove, loading: loadingApprove, error: errorApprove }] = gqlService.negotiableQuoteBiddingAproval();
    const [modalApproveOpen, setModalApproveOpen] = React.useState(false);
    // const [doChekcout, { data: dataCheckout, loading: loadingCheckout, error: errorCheckout }] = setCheckoutSession();
    const [checkCheckout, { data: dataCheckout, loading: loadingCheckout, error: errorCheckout }] = gqlService.checkoutNegotiableQuote();
    const [checkoutTokenState, setCheckoutTokenState] = useState();
    const __ = useMessageTranslator();

    const enable_update = ['CREATED', 'UPDATED', 'OPEN'];
    const has_checkout = quote?.has_checkout;
    const can_update = enable_update.includes(quote.status) && !has_checkout;
    const is_bidding = quote.is_bidding === true;
    const approved_by_buyer = quote.approved_by_buyer === true;
    const can_approve = quote.status === 'UPDATED' && is_bidding && !approved_by_buyer;
    const can_checkout = quote.status === 'UPDATED' && (!is_bidding || (is_bidding && approved_by_buyer));
    const can_comment = ['CREATED', 'UPDATED', 'OPEN'].includes(quote.status) && !has_checkout;

    const issued_by = quote?.buyer?.firstname ? `${quote?.buyer?.firstname} ${quote?.buyer?.lastname}` : '-';
    const estimation_day = (quote?.negotiable_data?.estimation_day)
        ? `${quote?.negotiable_data?.estimation_day} ${t('customer:quote:estimateDay')}`
        : '-';

    const maxSize = storeConfig.max_size;

    const handleModalApproveClose = () => {
        setModalApproveOpen(false);
    };

    if (errorPlace) {
        window.toastMessage({
            open: true,
            text: __(errorPlace.message),
            variant: 'error',
        });
    }

    const handleBtnApprove = async () => {
        const gqlVar = {
            variables: {
                uid,
            },
        };
        await approveQuote(gqlVar);
        if (errorApprove) {
            window.toastMessage({
                open: true,
                text: __(errorApprove.message),
                variant: 'error',
            });
            return;
        }
        if (dataApprove) {
            window.toastMessage({
                open: true,
                text: t('customer:quote:alert:approveSucces'),
                variant: 'success',
            });
        }
        refetch();
        handleModalApproveClose();
    };

    const handleModalApproveOpen = () => {
        setModalApproveOpen(true);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCloseQuote = async () => {
        const variables = {
            variables: {
                quote_uids: uid,
            },
        };

        closeQuote(variables).then((res) => {
            const { result_status } = res.data.closeNegotiableQuotes;
            if (result_status === 'SUCCESS') {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:quote:alert:closeSuccess'),
                    variant: 'success',
                });
            } else {
                window.toastMessage({
                    open: true,
                    text: t('customer:quote:alert:closeFail'),
                    variant: 'error',
                });
            }
            refetch();
        });
    };

    const handleDeleteQuote = async () => {
        const variables = {
            variables: {
                quote_uids: uid,
            },
        };

        deleteQuote(variables).then((res) => {
            const { result_status } = res.data.deleteNegotiableQuotes;
            if (result_status === 'SUCCESS') {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:quote:alert:deleteSuccess'),
                    variant: 'success',
                });
                Router.push('/customer/account/quote');
            } else {
                window.toastMessage({
                    open: true,
                    text: t('customer:quote:alert:deleteFail'),
                    variant: 'error',
                });
            }
        });
    };

    const handleBackToList = () => {
        Router.push('/customer/account/quote');
    };

    const handleCheckout = async () => {
        const variables = {
            variables: {
                uid,
            },
        };
        try {
            await checkCheckout(variables).then((res) => {
                Router.push('/checkout');
            });
        } catch (e) {
            window.toastMessage({
                open: true,
                text: __(e.message),
                variant: 'error',
            });
            return '';
        }
        return '';
    };

    const handlePrintQuote = (uid_quote) => {
        const encryptedUidQuote = encodeURIComponent(encrypt(uid_quote));
        const quotePrintUrl = userAgent.isMobileApps()
            ? `${getHost()}/print/quote/${encryptedUidQuote}`
            : `${getHost()}/customer/account/quote/print/${uid_quote}`;
        window.open(quotePrintUrl);
    };

    return (
        <>
            <div>
                <Typography variant="h1" className={classNames(styles.title)} letter="capitalize">
                    {quote.name}
                </Typography>
                <span className={classNames(styles.status)}>{t(`customer:quote:status:${quote.status}`)}</span>
            </div>

            <div className={classNames(styles.container)}>
                <TableContainer className={classNames(styles.tableDate)}>
                    <TableBody>
                        <TableRow>
                            <TableCell>{t('customer:quote:created')}</TableCell>
                            <TableCell>{formatDate(quote.created_at, 'D MMMM YYYY')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('customer:quote:expired')}</TableCell>
                            <TableCell>{quote.expiration_date ? formatDate(quote.expiration_date, 'D MMMM YYYY') : '-'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('customer:quote:estimate')}</TableCell>
                            <TableCell>
                                {estimation_day}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('customer:quote:issuedBy')}</TableCell>
                            <TableCell>
                                {issued_by}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>

                <div className={classNames(styles.btnContainer)}>
                    <div>
                        <div>
                            <Button
                                className={classNames(styles.btn)}
                                disabled={!quote.user_can_close_quote}
                                disableRipple
                                onClick={handleCloseQuote}
                            >
                                {t('customer:quote:btnCloseQuote')}
                            </Button>
                        </div>
                        <div>
                            <Button className={classNames(styles.btn)} disableRipple onClick={handleDeleteQuote}>
                                {t('customer:quote:btnDelete')}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            className={classNames(styles.btn)}
                            disableRipple
                            onClick={() => {
                                handlePrintQuote(uid);
                            }}
                            startIcon={<img src="/assets/img/icon-print.svg" alt={t('customer:quote:btnPrint')} />}
                        >
                            {t('customer:quote:btnPrint')}
                        </Button>
                    </div>
                </div>

                <div className={classNames(styles.tabContainer)}>
                    <TabMenus value={tabValue} onChange={handleTabChange} aria-label="tab">
                        <TabMenu label={t('customer:quote:items:tab')} />
                        <TabMenu label={t('customer:quote:comments:tab')} />
                        <TabMenu label={t('customer:quote:history:tab')} />
                    </TabMenus>

                    <TabPanels value={tabValue}>
                        <TabPanel>
                            <Items active={tabValue === 0} can_update={can_update} quote={quote} {...props} />
                        </TabPanel>
                        <TabPanel>
                            <Comments active={tabValue === 1} quote={quote} {...props} t={t} />
                        </TabPanel>
                        <TabPanel>
                            <History active={tabValue === 2} quote={quote} {...props} />
                        </TabPanel>
                    </TabPanels>
                </div>

                <Shipping can_update={can_update} {...props} />
                <AddComment can_comment={can_comment} maxSize={maxSize} {...props} />

                <Modal modalOpen={modalApproveOpen} handleModalClose={handleModalApproveClose} title="">
                    <p>{t('customer:quote:ModalApproveInfo')}</p>
                    <div className={classNames(styles.btnModalWrapper)}>
                        <Button onClick={handleModalApproveClose} className={classNames(styles.btnCancel)}>
                            {t('customer:quote:ModalCancel')}
                        </Button>
                        <Button className={classNames(styles.btnApprove)} onClick={handleBtnApprove}>
                            {t('customer:quote:ModalApprove')}
                        </Button>
                    </div>
                </Modal>

                <div className={classNames(styles.checkoutContainer)}>
                    <Button disableRipple variant="text" className={classNames(styles.btnBackToList)} onClick={handleBackToList}>
                        {t('customer:quote:btnBack')}
                    </Button>

                    {!can_approve ? (
                        <></>
                    ) : (
                        <Button variant="outlined" className={classNames(styles.btnCheckout)} onClick={handleModalApproveOpen}>
                            {t('customer:quote:btnApproveQuote')}
                        </Button>
                    )}

                    {!can_checkout ? (
                        <></>
                    ) : (
                        <Button variant="outlined" className={classNames(styles.btnCheckout)} onClick={handleCheckout}>
                            {t('customer:quote:btnCheckout')}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};
export default View;
