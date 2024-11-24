import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import '../../../css/auth/auth.css';
import LocaleSelector from '../../components/LocaleSelector';

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const props = usePage().props;
    const t = (key) => props.translations?.[key] || key;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <div className="auth-page">
            <LocaleSelector />
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="name">{t('Name')}</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('Enter your name')}
                            autoComplete="name"
                            required
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                </div>

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

                <div className="form-item">
                    <label htmlFor="password">{t('Password')}</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('Enter your password')}
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

                <div className="form-item">
                    <label htmlFor="password_confirmation">{t('Confirm Password')}</label>
                    <div className="input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder={t('Enter your password again')}
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

                <div className="form-actions">
                    <button
                        type="button"
                        id="cancelButton"
                        onClick={handleCancel}
                        className="btn btn-secondary"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        id="submitRegister"
                        disabled={processing}
                        className="btn btn-primary"
                    >
                        {processing ? t('Registering...') : t('Register')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
