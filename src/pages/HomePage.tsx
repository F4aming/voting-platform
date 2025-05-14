import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>Платформа для голосований</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1533/1533890.png"
            alt="Логотип"
            className="logo"
          />
        </div>
        <button className="login-button" onClick={() => navigate('/login')}>
          Войти
        </button>
      </header>

      <main className="app-main">
        <section className="hero-section">
          <div className="start-button-wrapper">
            <button className="start-button" onClick={() => navigate('/create')}>
              Начать опрос/голосование
            </button>
          </div>
        </section>

        <section className="features">
          <h2>Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Просто</h3>
              <p>Интуитивно понятный интерфейс для всех пользователей.</p>
            </div>
            <div className="feature-card">
              <h3>Быстро</h3>
              <p>Создание опроса за минуту, результат — сразу.</p>
            </div>
            <div className="feature-card">
              <h3>Надёжно</h3>
              <p>Ваши данные защищены и обрабатываются прозрачно.</p>
            </div>
          </div>
        </section>

        <section className="categories">
          <h2>Популярные категории</h2>
          <ul className="category-list">
            <li>🎓 Образование</li>
            <li>🏛 Политика</li>
            <li>🎮 Развлечения</li>
            <li>💼 Работа</li>
            <li>⚽ Спорт</li>
          </ul>
        </section>
      </main>

      <footer className="app-footer">
        <small>&copy; 2025 Голосовалка. Все права защищены.</small>
      </footer>
    </div>
  );
};

export default HomePage;
