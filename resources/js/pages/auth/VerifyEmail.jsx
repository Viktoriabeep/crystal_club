import React from 'react';
import { usePage } from '@inertiajs/react';
import '../../../css/auth/auth.css';
import LocaleSelector from '../../components/LocaleSelector';

const VerifyEmail = () => {
    const { translations } = usePage().props;

    const t = (key) => translations?.[key] || key;

    return (
        <div className="auth-page">
            <LocaleSelector/>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <p>{t('Thanks for signing up!')}</p>
                <p>
                    {t(
                        'Before getting started, could you verify your email address by clicking on the link we just emailed to you?'
                    )}
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;
