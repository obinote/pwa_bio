/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';
import { useTranslation } from '@i18n';
import propTypes from 'prop-types';
import useStyles from '@core_modules/order/pages/detail/components/OrderComplete/styleDropfile';
import classNames from 'classnames';

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const DropFile = ({
    label,
    name,
    acceptedFile,
    maxSize,
    multiple,
    handleDrop,
    handleSetFile,
    handleDeleteFile,
    error,
    value,
    setValue,
    maxWidth,
    maxHeight,
    required = false,
}) => {
    const styles = useStyles();
    const { t } = useTranslation(['common']);
    const [dropFile, setDropFile] = React.useState([]);

    const checkImage = async (files) => {
        const promises = [];
        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            const promise = new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    file.width = image.width;
                    file.height = image.height;
                    resolve(file);
                };
                const url = URL.createObjectURL(file);
                image.src = url;
            });
            promises.push(promise);
        }

        const dataFiles = await Promise.all(promises);
        let errorImage;
        for (let index = 0; index < dataFiles.length; index += 1) {
            const file = files[index];
            if (file.type && file.type.match(/image/) && maxWidth && maxHeight) {
                if (file.width >= maxWidth || file.height >= maxHeight) {
                    errorImage = `${t('common:fileUpload:maxSizeImage')} ${maxWidth}X${maxHeight} pixel`;
                }
            }
        }

        return errorImage;
    };
    const onDrop = useCallback(async (files) => {
        if (files && files.length > 0) {
            let errorImage = false;
            if (files[0].type.includes('image')) {
                errorImage = await checkImage(files);
            }

            if (!errorImage) {
                if (multiple) {
                    setDropFile([...dropFile, ...files]);
                    if (setValue) setValue([...dropFile, ...files]);
                } else {
                    setDropFile([files[0]]);
                    if (setValue) setValue([files[0]]);
                }
                handleDrop(files);
            } else {
                window.toastMessage({
                    open: true,
                    text: errorImage,
                    variant: 'error',
                });
            }
        }
        // Do something with the files
    }, []);
    const onDropAccepted = async (files) => {
        // eslint-disable-next-line array-callback-return
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [...filebase64, {
                    baseCode,
                    file: files[ind],
                }];
            }
        }
        handleSetFile(filebase64, name);
    };

    const onDelete = async () => {
        await handleDeleteFile(name);
    };

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }

    const maxSizeFile = convertKBtoBytes(maxSize);
    const messageError = `${t('common:fileUpload:reject') + acceptedFile}& max file ${maxSize}Kb`;
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        onDrop,
        accept: acceptedFile,
        onDropAccepted,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
        maxSize: maxSizeFile,
    });

    const noFile = !value || value === '';

    return (
        <div className={classNames(styles.container)}>
            {
                label && label !== ''
                    ? (
                        <p className={styles.label}>
                            {label}
                            {required
                                ? <span className={styles.required}> *</span>
                                : ''}
                        </p>
                    )
                    : <></>
            }
            <div className={classNames(styles.wrapperContent)} {...getRootProps()}>
                {
                    noFile
                        ? (
                            <>
                                <input {...getInputProps()} />
                                <div className={classNames(styles.wrapperInput)}>
                                    <div className={classNames(styles.docLogo)}>
                                        <img
                                            src="/assets/img/clip.svg"
                                            alt="icon"
                                        />
                                    </div>
                                    <p className={classNames(styles.insideLabel)}>
                                        {t('order:modalRating:uploadFile')}
                                    </p>
                                </div>

                            </>
                        )
                        : (
                            <div
                                className={classNames(styles.wrapperInput)}
                                onClick={() => onDelete()}
                                aria-hidden="true"
                            >
                                <div className={classNames(styles.docLogo)}>
                                    <img
                                        src="/assets/img/document-icon.svg"
                                        alt="icon"
                                    />
                                </div>
                                <div className={classNames(styles.wrapperUploaded)}>
                                    <div>
                                        {dropFile.map((val) => (
                                            (
                                                <span className={classNames(styles.filename)}>
                                                    {val.name}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                    <img
                                        className={classNames(styles.trashLogo)}
                                        src="/assets/img/trash-icon.svg"
                                        alt="icon"
                                    />
                                </div>
                            </div>
                        )
                }

            </div>
            {error
                ? (
                    <span className={classNames(styles.errorInfo)}>
                        {error}
                    </span>
                )
                : <></>}
        </div>
    );
};

DropFile.propTypes = {
    label: propTypes.string,
    showListFile: propTypes.bool,
    acceptedFile: propTypes.string,
    maxSize: propTypes.number,
    multiple: propTypes.bool,
    handleDrop: propTypes.func,
    getBase64: propTypes.func,
    error: propTypes.any,
    dropValue: propTypes.array,
    value: propTypes.oneOfType([propTypes.array, propTypes.string]),
    setValue: propTypes.func,
};

DropFile.defaultProps = {
    label: '',
    showListFile: true,
    acceptedFile: 'image/*',
    maxSize: 2000000,
    multiple: true,
    handleDrop: () => { },
    getBase64: () => { },
    error: false,
    dropValue: [],
    value: [],
    setValue: () => { },
};

export default DropFile;
