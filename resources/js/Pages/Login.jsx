import React, { useState } from 'react';
import '../../css/login.css';
import { useForm } from '@inertiajs/react';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login'); // Відправляємо дані на маршрут логіна Laravel Breeze
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="form-item">
        <label>Email / Username</label>
        <div className="input-wrapper">
          <input
            type="email"
            id="username"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder="Enter your email"
            autoComplete="off"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>

      {/* Password */}
      <div className="form-item">
        <label>Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Enter your password"
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
      <a href="/forgot-password">Forgot password?</a> <br />

      {/* Buttons */}
      <button type="submit" id="submitIn" disabled={processing}>
        {processing ? 'Logging in...' : 'Sign in'}
      </button>
      <button
        type="button"
        id="submitUp"
        onClick={() => (window.location.href = '/register')}
      >
        Sign up
      </button>
    </form>
  );
};

export default Login;