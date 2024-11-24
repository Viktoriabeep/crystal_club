import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import '../../css/components/locale_selector.css';

const LocaleSelector = () => {
    const { locale, supportedLocales, currentUrl } = usePage().props;
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLocaleChange = (newLocale) => {
        if (newLocale !== locale) {
            const updatedUrl = currentUrl.replace(`/${locale}/`, `/${newLocale}/`);
            router.visit(updatedUrl);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="locale-selector">
            <button onClick={toggleDropdown}>
                🌐 {locale.toUpperCase()}
            </button>
            {showDropdown && (
                <div className="locale-dropdown">
                    {supportedLocales.map((loc) => (
                        <div
                            key={loc}
                            onClick={() => handleLocaleChange(loc)}
                            className={loc === locale ? 'active' : ''}
                        >
                            {loc.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocaleSelector;
