import useStyles from '@core_modules/customer/pages/companyprofile/edit/components/style';
import MUIPopper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { useRef, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from '@i18n';

export default function useSubDistrictTip() {
    const { t } = useTranslation();
    const styles = useStyles();
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    function show() {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setAnchorEl(ref.current);
        setOpen(true);
    }

    function hide() {
        setOpen(false);
    }

    const Popper = () => (
        <MUIPopper
            open={open}
            anchorEl={anchorEl}
            placement={isLargeScreen ? 'right' : 'bottom-start'}
            transition
            modifiers={{ flip: { enabled: true } }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper elevation={3} className={styles.tipPaper}>
                        {t('customer:companyProfile:mustFillSubDistrictTip')}
                    </Paper>
                </Fade>
            )}
        </MUIPopper>
    );

    return {
        ref, show, hide, Popper,
    };
}
