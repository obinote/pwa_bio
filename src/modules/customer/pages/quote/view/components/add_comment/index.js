/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import useStyles from '@src_modules/customer/pages/quote/view/components/add_comment/style';
import gqlService from '@src_modules/customer/services/graphql';
import useMessageTranslator from '@helpers/messageTranslator';

const AddComment = ({
    can_comment, uid, refetch, t, maxSize,
}) => {
    const styles = useStyles();
    const [text, setText] = React.useState(null);
    const [fileData, setFileData] = React.useState(false);
    const [file, setFile] = React.useState(false);
    const [addComment] = gqlService.sendNegotiableQuoteForReview();
    const __ = useMessageTranslator();

    const handleChange = ({ target }) => {
        setText(target.value);
    };

    const handleOpenFile = () => {
        document.getElementById('contained-button-file').click();
    };

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }

    const handleInputFile = async ({ target }) => {
        const reader = new FileReader();
        if (target.files.length === 0) {
            setFileData(false);
            setFile(false);
            return;
        }

        const files = target.files[0];

        const { size } = files;
        const isSizeAllow = size < convertKBtoBytes(maxSize);

        if (!isSizeAllow) {
            window.toastMessage({
                open: true,
                text: t('common:error:quoteUploadSize', { maxSize }),
                variant: 'error',
            });
            return;
        }

        setFileData(files);
        reader.readAsDataURL(files);
        reader.onload = () => {
            setFile(reader.result);
        };
    };

    const handleSubmitComment = async () => {
        window.backdropLoader(true);
        const variables = {
            variables: {
                quote_uid: uid,
                comment: text,
            },
        };

        if (file && fileData) {
            variables.variables.attachment = {
                name: fileData.name,
                type: fileData.type,
                base64_encoded_data: file,
            };
        }

        await addComment(variables).then((res) => {
            window.backdropLoader(false);
            setText('');
            setText(null);
            window.toastMessage({
                open: true,
                text: t('customer:quote:add_comment:successMsg'),
                variant: 'success',
            });
            setFileData(false);
            setFile(false);
            // window.location.reload();
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: __(e.message),
                variant: 'error',
            });
        });
    };

    return (
        <div className={classNames(styles.wrapper)}>
            <h2 className={classNames(styles.title)}>{t('customer:quote:add_comment:title')}</h2>
            <h3 className={classNames(styles.txtComment)}>{t('customer:quote:add_comment:info')}</h3>
            <TextareaAutosize
                aria-label="textarea"
                className={classNames(styles.txt)}
                minRows={8}
                maxRows={8}
                resize="none"
                value={text}
                onChange={handleChange}
                disabled={!can_comment}
            />

            <div className={classNames(styles.inputContainer)}>
                <input
                    className={classNames(styles.inputFile)}
                    id="contained-button-file"
                    type="file"
                    accept=".jpeg,.jpg,.png,.pdf"
                    onChange={handleInputFile}
                    disabled={!can_comment}
                />
                <label htmlFor="contained-button-file" className={classNames(styles.labelFile)}>
                    <Button className={classNames(styles.btnFile)} onClick={handleOpenFile} disabled={!can_comment} disableRipple>
                        <img src="/assets/img/clip.svg" alt="clip" className={classNames(styles.clipIcon)} />
                        {t('customer:tickets:attachFiles')}
                    </Button>
                    {fileData && <span className={classNames(styles.fileName)}>{fileData?.name}</span>}
                </label>
            </div>
            <p className={styles.attachInfo}>{t('customer:quote:attachInfo', { max_size: maxSize })}</p>

            <Button
                variant="outlined"
                className={classNames(styles.btn)}
                disabled={!can_comment || text === null || (typeof text === 'string' && text.length === 0)}
                onClick={handleSubmitComment}
            >
                {t('customer:quote:add_comment:btnSend')}
            </Button>
        </div>
    );
};

export default AddComment;
