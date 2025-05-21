import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Вход выполнен:', { email, password });
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Вход</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Войти</button>
      </form>

      <div className="register-section">
        <p>Нет аккаунта?</p>
        <button className="register-button" onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </div>

      <div className="back-home-section">
        <button className="back-home-button" onClick={handleBackHome}>
          ← Назад на главную
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
