import useStyle from '@core_modules/theme/components/MobileLanguageSwitcher/style';
import classNames from 'classnames';

const MobileLangueSwitcherView = (props) => {
    const {
        onClickLanguage, dataLang, lang,
    } = props;
    const style = useStyle();
    const fullName = [
        { locale: 'ID', name: 'Indonesia' },
        { locale: 'EN', name: 'English' },
    ];
    const listDataLanguage = [];
    if (dataLang !== undefined) {
        dataLang.map((item) => {
            const isCurrent = item.value === lang.value;
            const findName = fullName.find((el) => el.locale === item.label);
            const name = findName?.name ?? '';
            listDataLanguage.push({ ...item, isActive: isCurrent, fullName: name });
            return item;
        });
    }

    return (
        <div className={classNames(style.languageSwitcher, 'hidden-desktop')}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'block' }}>
                    <div className={style.buttonWrapper}>
                        {listDataLanguage.reverse().map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className={classNames(style.btnLang, item.isActive ? 'active' : '')}
                                onClick={() => {
                                    onClickLanguage(item);
                                }}
                            >
                                <span>{item.fullName}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileLangueSwitcherView;
