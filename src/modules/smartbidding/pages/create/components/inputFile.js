/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import useStyles from '@core_modules/smartbidding/pages/create/components/style';

const InputFile = (props) => {
    const {
        formik, formatFile = '.pdf, .jpg, .csv, .png', errorValue, disabled, t, maxSize,
    } = props;
    const styles = useStyles();
    const [lelang, setLelang] = React.useState([]);
    const buttonRef = React.useRef(null);

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
            setLelang(filebase64);

            const idx1 = filebase64[ind].baseCode.indexOf('/');
            const idx2 = filebase64[ind].baseCode.indexOf(',');

            formik.setFieldValue(
                `surat_lelang[${ind}].binary`,
                `${filebase64[ind].baseCode.slice(0, 5)}@file${filebase64[ind].baseCode.slice(idx1, idx2)}${filebase64[ind].baseCode.slice(idx2)}`,
            );
            formik.setFieldValue(`surat_lelang[${ind}].filename`, filebase64[ind].file.path);
        }
    };

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }
    const maxSizeFile = convertKBtoBytes(maxSize);
    const infoMessage = {
        file_type: formatFile,
        max_size: maxSize,
    };
    const messageError = t('common:fileUpload:reject', { infoMessage });
    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        multiple: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: (e) => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
        disabled,
        maxSize: maxSizeFile,
    });

    const removeFileHandle = async () => {
        setLelang(lelang.slice(1));
        await formik.setFieldValue('surat_lelang.binary', null);
        await formik.setFieldValue('surat_lelang.filename', null);
    };

    const wrapperClick = () => {
        if (lelang.length !== 0) return '';
        buttonRef.current.click();
        return '';
    };

    React.useEffect(() => {}, [lelang]);

    return (
        <>
            <div
                className="attachmentDiv"
                onClick={wrapperClick}
                style={{ borderColor: errorValue ? '#ff1744' : 'unset', cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
                <div className="dropzoneDiv" style={{ position: 'relative' }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} ref={buttonRef} />

                        <img style={{ marginRight: 10, width: '12px', verticalAlign: 'middle' }} src="/assets/img/icon_document.svg" />
                        {lelang.length === 0 && <span className="attachment">{t('smartbidding:create:attach')}</span>}
                        {lelang.length > 0 && acceptedFiles.length !== 0 && (
                            <p className="paragraph">
                                <span key={lelang[0].file.path}>{lelang[0].file.path}</span>
                            </p>
                        )}
                    </div>
                    {lelang.length > 0 && acceptedFiles.length !== 0 && (
                        <span className="icon-delete" style={{ cursor: 'pointer' }} onClick={removeFileHandle}>
                            <img src="/assets/img/icon_delete.svg" />
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default InputFile;
