/* eslint-disable no-nested-ternary */
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import Router from 'next/router';
import React from 'react';
import AutoComplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import useStyles from '@common_searchmodal/style';
import VoiceRecognition from '@core_modules/theme/components/header/desktop/components/voicerecognition';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import SearchByImageView from '@src_modules/theme/components/header/desktop/components/searchbyimage';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { StoreConfigContext } from '@core_modules/theme/pages/_app';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const SearchPage = ({
    open, enableVoice, voiceClickHandler, searchPlaceholder, dataCategory, setOpenModal, t, isLogin, storeConfig,
}) => {
    const styles = useStyles();
    const [value, setValue] = React.useState('');

    const safeStoreConfig = storeConfig || React.useContext(StoreConfigContext);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            handleCloseModal();
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            handleCloseModal();
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };
    const CustomPopper = React.useCallback((props) => {
        const anchorEl = document.getElementById('searchResult');
        return <Popper {...props} anchorEl={anchorEl} style={{ width: anchorEl.clientWidth }} placement="bottom" />;
    }, []);

    /* Handle Search by Image */
    const [searchByImageIsOpen, setSearchByImageIsOpen] = React.useState(false);
    const [imageSearch, setImageSearch] = React.useState(false);
    const [imageUuid, setImageUuid] = React.useState(false);
    const handleSearchByImage = () => {
        setSearchByImageIsOpen(true);
    };

    // wrap to properties
    const searchImageAction = {
        searchByImageIsOpen,
        setSearchByImageIsOpen,
        handleSearchByImage,
        imageSearch,
        setImageSearch,
        imageUuid,
        setImageUuid,
    };

    return (
        <>
            <Dialog fullScreen open={open} TransitionComponent={Transition} className={styles.modalSearch}>
                <div className={styles.container}>
                    <AppBar className={styles.appBar}>
                        <Toolbar>
                            <IconButton edge="start" onClick={handleCloseModal} aria-label="close">
                                <ArrowBack className={styles.iconClose} />
                            </IconButton>
                            <div className={styles.mobileSearch}>
                                <VoiceRecognition enableVoice={enableVoice} clickHandler={voiceClickHandler} />
                                <AutoComplete
                                    PopperComponent={CustomPopper}
                                    PaperComponent={(props) => <Paper {...props} elevation={0} square />}
                                    setValue={setValue}
                                    handleSearch={handleSearch}
                                    OptionsItem={OptionAutocomplete}
                                    width="100%"
                                    placeholder={searchPlaceholder}
                                    forcePopupIcon={false}
                                    enableVoice={enableVoice}
                                    dataCategory={dataCategory}
                                    searchImageAction={searchImageAction}
                                />
                                <div className={styles.searchIcon}>
                                    <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                        <SearchIcon style={{ fill: '#f58732' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div id="searchResult" />
                </div>
            </Dialog>
            <SearchByImageView searchImageAction={searchImageAction} t={t} isLogin={isLogin} maxSize={safeStoreConfig.max_size} />
        </>
    );
};

export default SearchPage;
