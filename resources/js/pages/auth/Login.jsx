import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import '../../../css/auth/auth.css';
import LocaleSelector from '../../components/LocaleSelector';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const props = usePage().props;
    const t = (key) => props.translations?.[key] || key;
    const locale = props.locale ? `/${props.locale}` : '';

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const handleNavigation = (path) => {
        router.visit(`${locale}${path}`);
    };

    return (
        <div className="auth-page">
            <LocaleSelector />
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="username">{t('Email')}</label>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            id="username"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('Enter your email')}
                            autoComplete="off"
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="password">{t('Password')}</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('Enter your password')}
                            autoComplete="off"
                            required
                        />
                        <button
                            type="button"
                            id="eyeball"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <div className="eye"></div>
                        </button>
                        <div id="beam"></div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>

                {/* Forgot Password */}
                <a onClick={() => handleNavigation('/forgot-password')} className={'link'}>
                    {t('Forgot password?')}
                </a>
                <br />

                {/* Log in */}
                <button type="submit" id="submitIn" disabled={processing}>
                    {processing ? t('Logging in...') : t('Sign in')}
                </button>

                {/* Sign up */}
                <button
                    type="button"
                    id="submitUp"
                    onClick={() => handleNavigation('/register')}
                >
                    {t('Sign up')}
                </button>
            </form>
        </div>
    );
};

export default Login;
