/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import Typography from '@common_typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setImageSearchByImage } from '@core_modules/theme/services/graphql';
import useStyles from '@src_modules/theme/components/header/desktop/components/searchbyimage/style';
import { useRouter } from 'next/router';

const View = ({
    searchImageAction, t, isLogin, maxSize,
}) => {
    const {
        searchByImageIsOpen, setSearchByImageIsOpen, imageSearch, setImageSearch, imageUuid, setImageUuid,
    } = searchImageAction;
    const styles = useStyles();
    const [isDragged, setIsDragged] = React.useState(false);
    const router = useRouter();
    const [setImage, { loading }] = setImageSearchByImage();

    if (!searchByImageIsOpen) return <></>;
    const handleClose = () => {
        setSearchByImageIsOpen(false);
        setImageSearch(false);
        setImageUuid(false);
    };

    function convertKBtoBytes(kb) {
        return kb * 1024;
    }

    const processFile = async (files) => {
        const { size } = files;
        const isSizeAllow = size < convertKBtoBytes(maxSize);
        const reader = new FileReader();
        const acceptableMime = ['image/jpeg', 'image/png'];

        if (!isSizeAllow) {
            window.toastMessage({
                open: true,
                text: t('common:error:quoteUploadSize', { maxSize }),
                variant: 'error',
            });
            return;
        }

        if (!acceptableMime.includes(files.type)) {
            window.toastMessage({
                open: true,
                text: `${t('common:error:fileReject')}.jpg, .jpeg, .png`,
                variant: 'error',
            });
            return;
        }

        reader.readAsDataURL(files);
        reader.onload = async () => {
            setImageSearch(files);
            await setImage({
                variables: {
                    image: reader.result,
                },
            })
                .then(async (res) => {
                    setImageUuid(res.data.saveImage);
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        };
    };

    const searchClickHandler = async () => {
        await router.push({ pathname: '/searchimage', query: { uuid: imageUuid } }, null, { shallow: true });
        handleClose();
    };

    const handleInputFile = async ({ target }) => {
        if (target.files.length === 0) {
            return;
        }

        const files = target.files[0];
        processFile(files);
    };

    const handleOpenFile = () => {
        document.getElementById('searchByImage').click();
    };

    const loginHandler = () => {
        router.push('/customer/account/login');
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragged(false);
        processFile(e.dataTransfer.files[0]);
    };

    const dragOver = (e) => {
        e.preventDefault();
        setIsDragged(true);
    };

    const dragEnter = (e) => {
        e.preventDefault();
        setIsDragged(true);
    };

    const dragLeave = (e) => {
        e.preventDefault();
        setIsDragged(false);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={searchByImageIsOpen}>
            <div
                className={classNames(styles.wrapper, isDragged ? 'drag' : '')}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={onDrop}
            >
                <Typography variant="p" size="16" align="center" type="bold" className={styles.title}>
                    {isLogin ? t('common:search:placeImage') : t('common:searchByImage:loginRequired')}
                </Typography>

                {isLogin ? (
                    <>
                        <div className={styles.inputContainer} onClick={handleOpenFile}>
                            <input
                                className={classNames(styles.inputFile)}
                                id="searchByImage"
                                type="file"
                                accept=".jpeg,.jpg,.png"
                                onChange={handleInputFile}
                            />
                            <label htmlFor="searchByImage" className={classNames(styles.labelFile)}>
                                <Button className={classNames(styles.btnFile)} disableRipple>
                                    <img src="/assets/img/clip.svg" alt="clip" className={classNames(styles.clipIcon)} />
                                    {imageSearch !== false ? imageSearch.name : t('common:search:uploadImage')}
                                </Button>
                            </label>
                        </div>

                        <div className={styles.btnContainer}>
                            <Button
                                className={classNames(styles.btn)}
                                startIcon={loading === false ? <></> : <CircularProgress color="#fff" size={20} />}
                                onClick={searchClickHandler}
                                disabled={(imageSearch === false || loading === true) && imageUuid === false}
                            >
                                {t('common:search:title')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.btnContainer}>
                            <Button className={classNames(styles.btn)} onClick={loginHandler}>
                                {t('common:button:login')}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
};
export default View;
