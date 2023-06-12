/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
import React from 'react';
import useStyles from '@src_modules/customer/pages/createTicket/plugins/FileUploadTicket/style';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import _ from 'lodash';

const convertKBtoBytes = (kb) => kb * 1024;

export const objFiles = ({
    e,
    fileMaxSize,
}) => {
    const files = _.get(e, 'target.files');
    const fileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
    const fileLength = files?.length;
    const tempFilesData = [];
    let allExtensionAllow = true;
    let allSizeAllow = true;
    if (files && fileLength > 0) {
        Array.from(files).every((file) => {
            const { size, type } = file;
            if (size > convertKBtoBytes(fileMaxSize)) {
                allSizeAllow = false;
                return false;
            }
            if (!(fileTypes.indexOf(type) > -1)) {
                allExtensionAllow = false;
                return false;
            }
            tempFilesData.push(file);
            return true;
        });
    }

    return {
        data_file: tempFilesData,
        data_file_length: files?.length,
        is_allow_size: allSizeAllow,
        is_allow_extension: allExtensionAllow,
    };
};

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const getFilesToBase64 = async (files) => {
    const arrFiles = [];
    for (const fileIndex in files) {
        const fileItem = files[fileIndex];
        if (typeof fileItem === 'object') {
            const fileName = fileItem.name;
            const imgBase64 = await fileToBase64(fileItem);
            arrFiles.push({
                file_name: fileName,
                file_path: '',
                base64_encoded_file: imgBase64,
            });
        }
    }
    return arrFiles;
};
const FileUploadTicket = ({
    t,
    onChangeFileUpload,
    dataFile,
    bg,
    inputFrameMarginBottom,
}) => {
    const styles = useStyles();
    const labelAttachment = _.isEmpty(dataFile)
        ? t('customer:tickets:attachFiles')
        : `${_.get(dataFile, 'length')} ${t('customer:tickets:attachedFiles')}`;
    return (
        <div
            className={styles.inputFileContainer}
            style={{
                ...(inputFrameMarginBottom ? { marginBottom: inputFrameMarginBottom } : null),
            }}
        >
            <div
                className="file-uploader-frame"
                style={{
                    ...(bg ? { backgroundColor: bg } : null),
                }}
            >
                <AttachFileIcon className="attach-icon" />
                <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    multiple="true"
                    className="input file-area"
                    onChange={onChangeFileUpload}
                />
                <label
                    className="file-uploader-button"
                    htmlFor="attachments"
                >
                    {labelAttachment}
                </label>
            </div>
            <div className={styles.files}>
                {dataFile && dataFile.map((dt, index) => (
                    <p key={index} className={styles.fileName}>
                        {dt.name}
                        {index === dataFile.length - 1 ? '.' : ', '}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FileUploadTicket;
