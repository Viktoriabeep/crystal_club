import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import '../../../css/auth/auth.css';
import LocaleSelector from '../../components/LocaleSelector';

const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const { translations, status } = usePage().props;

    const [emailSent, setEmailSent] = useState(false);

    const t = (key) => translations?.[key] || key;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password', {
            onSuccess: () => setEmailSent(true),
        });
    };

    return (
        <div className="auth-page">
            <LocaleSelector />
            {emailSent ? (
                <div className="mb-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    <p>{t('A password reset link has been sent to your email address.')}</p>
                    <p>{t('Please check your email and follow the instructions.')}</p>
                </div>
            ) : (
                <div>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>{t('Forgot your password?')}</p>
                        <p>
                            {t(
                                'No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.'
                            )}
                        </p>
                    </div>

                    {/* Session Status */}
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email Address */}
                        <div className="form-item">
                            <label htmlFor="email">{t('Email')}</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder={t('Enter your email')}
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                id="submitReset"
                                disabled={processing}
                                className="btn btn-primary"
                            >
                                {processing ? t('Sending...') : t('Send')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
