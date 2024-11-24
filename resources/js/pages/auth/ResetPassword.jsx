import React, {useState} from 'react';
import {useForm, usePage} from '@inertiajs/react';
import '../../../css/auth/auth.css';
import LocaleSelector from '../../components/LocaleSelector';

const ResetPassword = () => {
    const resetToken = window.location.pathname.split('/reset-password/')[1]?.split('?')[0] || '';

    const {data, setData, post, processing, errors} = useForm({
        email: new URLSearchParams(window.location.search).get('email') || '',
        password: '',
        password_confirmation: '',
        token: resetToken,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const props = usePage().props;
    const t = (key) => props.translations?.[key] || key;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <div className="auth-page">
            <LocaleSelector/>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="token" value={data.token}/>

                <div className="form-item">
                    <label htmlFor="email">{t('Email')}</label>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('Enter your email')}
                            autoComplete="username"
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-item mt-4">
                    <label htmlFor="password">{t('Password')}</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('Enter your new password')}
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="button"
                            id="eyeball"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <div className="eye"></div>
                        </button>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>

                <div className="form-item mt-4">
                    <label htmlFor="password_confirmation">{t('Confirm Password')}</label>
                    <div className="input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder={t('Confirm your new password')}
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="button"
                            id="eyeball_confirm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <div className="eye"></div>
                        </button>
                        {errors.password_confirmation && (
                            <span className="error">{errors.password_confirmation}</span>
                        )}
                    </div>
                </div>

                <div className="form-actions mt-4">
                    <button
                        type="submit"
                        id="submitResetPassword"
                        disabled={processing}
                        className="btn btn-primary"
                    >
                        {processing ? t('Resetting...') : t('Reset Password')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
