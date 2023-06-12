/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
// import Layout from '@layout_customer';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailTicket/components/style';
import Button from '@common_button';
import Rating from '@material-ui/lab/Rating';
import EscalateTicketDialog from '@src_modules/customer/plugins/EscalateTicketDialog';
import FileUploadTicket from '@src_modules/customer/pages/createTicket/plugins/FileUploadTicket/core';
import formatDate from '@helper_date';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DetailTicketPage = (props) => {
    const {
        t,
        data,
        rating,
        handleRating,
        openEscalate,
        setOpenEscalate,
        handleEscalate,
        handleChangeMessageEscalate,
        messageEscalate,
        onChangeFileUpload,
        formik,
        maxSize,
        file,
        handleTicketClose,
        handleTicketReOpen,
        dataFile,
        canRateTicket,
    } = props;
    const styles = useStyles();
    const router = useRouter();
    const translateStatusLabel = (label) => {
        const statusLabelMapping = {
            new: t('customer:tickets:statusLabel:new'),
            open: t('customer:tickets:statusLabel:open'),
            closed: t('customer:tickets:statusLabel:closed'),
            'waiting for a customer': t('customer:tickets:statusLabel:waitingForCustomer'),
        };
        return statusLabelMapping[label.toLowerCase()];
    };

    return (
        <>
            <div>
                <Typography variant="h1" type="normal" className={styles.subjectTicket}>
                    <strong>
                        {t('customer:tickets:id')}
                        {' '}
                        {data?.awHelpdesk2TicketById?.uid}
                    </strong>
                </Typography>
                <Typography variant="body2" type="normal" className={styles.subjectTicketSub}>
                    <strong>{t('customer:tickets:subject')}</strong>
                    {' '}
                    <span>{data?.awHelpdesk2TicketById.subject}</span>
                </Typography>
            </div>
            <div className={styles.topPanel}>
                <div>
                    <Typography variant="h5" className={styles.titleElement}>{t('customer:tickets:requestType')}</Typography>
                    <Typography variant="h5" className={styles.valueElement}>{data?.awHelpdesk2TicketById?.department?.name}</Typography>
                </div>
                <div>
                    <Typography variant="h5" className={styles.titleElement}>{t('customer:tickets:status')}</Typography>
                    <Typography variant="h5" className={styles.valueElement}>{translateStatusLabel(data?.awHelpdesk2TicketById?.status?.label)}</Typography>
                </div>
                <div>
                    <Typography variant="h5" className={styles.titleElement}>{t('customer:tickets:rating')}</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        readOnly={!canRateTicket}
                        onChange={(event, newValue) => {
                            handleRating(newValue);
                        }}
                    />
                </div>
                <div className={styles.contentPanel}>
                    {data?.awHelpdesk2TicketById?.status?.label !== 'Closed' ? (
                        <Button align="left" className={styles.buttonClose} onClick={handleTicketClose}>
                            {t('customer:tickets:closeTicket')}
                        </Button>
                    ) : (
                        <Button align="left" className={styles.buttonClose} onClick={handleTicketReOpen}>
                            {t('customer:tickets:reOpenTicket')}
                        </Button>
                    )}
                    <Button align="left" className={styles.buttonEscalate} onClick={() => setOpenEscalate(true)}>
                        {t('customer:tickets:escalateToAdmin')}
                    </Button>
                </div>
            </div>
            {data?.awHelpdesk2TicketById?.status?.label !== 'Closed' ? (
                <div className={styles.replyPanel}>
                    <Typography variant="h5" className={styles.titleElement}>
                        {t('customer:tickets:sendReply')}
                        {' '}
                        <span className="required">*</span>
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <textarea
                            rows={10}
                            cols={15}
                            id="content"
                            className={styles.inputArea}
                            type="text"
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            autoComplete="off"
                        />
                        <div className={styles.inputFileContainer}>
                            <div>
                                <FileUploadTicket
                                    t={t}
                                    dataFile={dataFile}
                                    onChangeFileUpload={onChangeFileUpload}
                                    inputFrameMarginBottom="0px"
                                />
                            </div>
                            <div className={styles.actionBottom}>
                                <Button align="left" className={styles.buttonSend} type="submit">
                                    {t('customer:tickets:sendReply')}
                                </Button>
                            </div>
                        </div>
                        {file && (
                            <span className={styles.fileName}>
                                {' '}
                                {file.name}
                                .
                                {file.extension}
                                {' '}
                            </span>
                        )}
                        <p className={styles.attachInfo}>{t('customer:quote:attachInfo', { max_size: maxSize })}</p>
                    </form>
                </div>
            ) : (
                <Typography className={styles.closedPanel}>
                    {t('customer:tickets:closedPanel')}
                    <Link href="/customer/account/tickets/create">
                        {t('customer:tickets:createLink')}
                    </Link>
                    {t('customer:tickets:closedPanelAfter')}
                </Typography>
            )}
            {data?.awHelpdesk2TicketById?.messages.length > 0 ? (
                <div className={styles.messagePanel}>
                    {data?.awHelpdesk2TicketById?.messages.map((val) => (
                        <div className={styles.itemMessage}>
                            <Typography variant="h4" type="bold">
                                {val.author_name}
                            </Typography>
                            <Typography variant="h4">
                                {formatDate(val.created_at, 'MMM DD, YYYY HH.mm.ss A')}
                            </Typography>
                            <div className={styles.contentMessage}>
                                <Typography variant="h3">
                                    {val.content}
                                </Typography>
                            </div>
                            <div className={styles.contentAttachment}>
                                {val.attachments.map((attachmentFile, index) => (
                                    <a key={index} href={attachmentFile.file_url}>{attachmentFile.file_name}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            <EscalateTicketDialog
                open={openEscalate}
                handleCancel={() => setOpenEscalate(!openEscalate)}
                handleYes={handleEscalate}
                titleMessage={t('customer:tickets:ticketEscalation')}
                message={t('customer:tickets:messageEscalation')}
                confirmationMessage={t('customer:tickets:confirmationEscalation')}
                messageEscalate={messageEscalate}
                handleChangeMessageEscalate={handleChangeMessageEscalate}
            />
            <div className={styles.containerButton}>
                <Button align="left" className={styles.buttonBack} onClick={() => router.back()}>
                    {t('customer:tickets:back')}
                </Button>
            </div>
        </>
    );
};

export default DetailTicketPage;
