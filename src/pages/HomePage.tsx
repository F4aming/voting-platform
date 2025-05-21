import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fixed Navbar */}
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center text-dark" href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533890.png"
              alt="Логотип"
              width={40}
              height={40}
              className="me-2"
              style={{ filter: 'grayscale(100%) brightness(0)' }}
            />
            <span className="fw-bold">Голосовалка</span>
          </a>

          {/* Кнопка для мобильных устройств, чтобы раскрыть меню */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Навигационное меню */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                  О платформе
                </a>
              </li>
            </ul>
          </div>

          {/* Кнопка входа */}
          <button
            className="btn btn-outline-dark ms-auto"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </div>
      </nav>

      {/* Добавляем отступ сверху, чтобы не закрывать контент под фиксированным navbar */}
      <main className="flex-grow-1 container my-5 fade-in" style={{ paddingTop: '0px' }}>
        {/* Hero Section */}
        <header className="text-center py-5 border-bottom border-secondary">
          <h1 className="display-4 fw-bold text-dark">Платформа для голосований</h1>
          <p className="lead text-secondary mb-4">Создавайте опросы быстро и просто</p>
          <button
            className="btn btn-dark btn-lg rounded-pill px-5"
            onClick={() => navigate('/create')}
          >
            Начать опрос/голосование
          </button>
        </header>

        {/* Почему выбирают нас */}
        <section className="my-5">
          <h2 className="text-center fw-bold text-dark mb-4">Почему выбирают нас</h2>
          <div
            className="mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '1.2rem',
            }}
          >
            {[ 
              { title: 'Просто', text: 'Интуитивно понятный интерфейс для всех пользователей.' },
              { title: 'Быстро', text: 'Создание опроса за минуту, результат — сразу.' },
              { title: 'Надёжно', text: 'Ваши данные защищены и обрабатываются прозрачно.' },
            ].map(({ title, text }, idx) => (
              <div
                key={title}
                className="card shadow-sm border-1 border-secondary"
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#fff',
                  gridColumn: idx % 3 === 0 ? 'span 2' : 'auto', // Каждый третий блок шире
                  textAlign: 'center',
                  color: '#222',
                  borderRadius: '0.375rem',
                }}
              >
                <h3 className="fw-bold mb-3">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-5">
          <h2 className="text-center fw-bold text-dark mb-4">Как это работает</h2>
          <div
            className="mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gap: '1.2rem',
            }}
          >
             {[
                { title: 'Создайте опрос', text: 'Простая форма для создания вопросов и вариантов ответов.', icon: '📝' },
                { title: 'Cсылочка', text: 'Отправьте ссылку участникам, чтобы они могли голосовать.', icon: '📤' },
                { title: 'Резалт', text: 'Просматривайте результаты голосования в реальном времени.', icon: '📊' },
              ].map(({ title, text, icon }, idx) => (
              <div
                key={title}
                className="card shadow-sm border-1 border-secondary"
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#fff',
                  gridColumn: idx % 3 === 0 ? 'span 2' : 'auto', // Каждый третий блок шире
                  textAlign: 'center',
                  color: '#222',
                  borderRadius: '0.375rem',
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>{icon}</div>
                <h3 className="fw-bold mb-3">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Отзывы пользователей */}
        <section className="my-5">
          <h2 className="text-center fw-bold text-dark mb-4">Отзывы пользователей</h2>
          <div
            className="mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[{
                name: 'Ирина С.',
                text: 'Очень удобная платформа, быстро разобралась и создала опрос для команды.',
              },
              {
                name: 'Алексей П.',
                text: 'Результаты приходят мгновенно, удобно анализировать и принимать решения.',
              },
              {
                name: 'Мария К.',
                text: 'Безопасность и простота – именно то, что я искала для своих опросов.',
              },
            ].map(({ name, text }, idx) => (
              <div
                key={idx}
                className="shadow-sm border-1 border-secondary"
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '150px',
                }}
              >
                <p className="fst-italic text-secondary">"{text}"</p>
                <footer className="blockquote-footer mt-3 text-dark">{name}</footer>
              </div>
            ))}
          </div>
        </section>
        
        {/* Популярные категории */}
        <section className="my-5 text-center">
          <h2 className="fw-bold text-dark mb-3">Популярные категории</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {[
              '🎓 Образование',
              '🏛 Политика',
              '🎮 Развлечения',
              '💼 Работа',
              '⚽ Спорт',
            ].map((cat, idx) => (
              <div
                key={idx}
                className="badge bg-dark text-white mx-1 my-2 p-3"
                style={{ opacity: 0.9, fontSize: '1rem' }}
              >
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* Градиентный баннер */}
        <div
          className="text-white text-center py-5"
          style={{
            background: 'linear-gradient(90deg,rgb(255, 255, 255),rgb(0, 0, 0))',
            borderRadius: '0.5rem',
            margin: '2rem 0',
          }}
        >
          <h2 className="fw-bold mb-3">Присоединяйтесь к тысячам пользователей!</h2>
          <p className="lead mb-0">Создавайте опросы, делитесь результатами и принимайте решения вместе</p>
        </div>

        {/* Latest news/blog */}
        <section className="my-5">
          <h2 className="text-center fw-bold text-dark mb-4">Последние новости</h2>
          <div className="row g-4">
            {[{
                title: 'Новый функционал для создания опросов',
                date: '12 мая 2025',
                excerpt: 'Добавлены новые типы вопросов и улучшен интерфейс.',
              },
              {
                title: 'Обновления безопасности',
                date: '1 мая 2025',
                excerpt: 'Повышена защита данных пользователей и улучшены механизмы шифрования.',
              },
              {
                title: 'Советы по созданию эффективных опросов',
                date: '20 апреля 2025',
                excerpt: 'Прочитайте лучшие практики для создания опросов, которые дадут качественные результаты.',
              },
            ].map(({ title, date, excerpt }, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card h-100 shadow-sm border-1 border-secondary">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{title}</h5>
                    <small className="text-muted">{date}</small>
                    <p className="card-text mt-2 text-secondary">{excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription form */}
        <section className="my-5 text-center">
          <h2 className="fw-bold text-dark mb-3">Подпишитесь на новости</h2>
          <form className="d-flex justify-content-center" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              className="form-control w-50 me-2"
              placeholder="Введите ваш email"
              required
              style={{ borderColor: '#444' }}
            />
            <button type="submit" className="btn btn-dark">Подписаться</button>
          </form>
        </section>
      </main>

           

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>
            <h5>Контактная информация</h5>
            <p className="mb-1">Email: <a href="mailto:contact@golosovalka.ru" className="text-white">contact@golosovalka.ru</a></p>
            <p className="mb-0">Телефон: <a href="tel:+79991234567" className="text-white">+7 (999) 123-45-67</a></p>
          </div>

          <div className="mt-3 mt-md-0 d-flex align-items-center gap-3">
            <a href="" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Telegram_Messenger.png"
                alt="Telegram"
                width={32}
                height={32}
                style={{ filter: 'invert(1)' }}
              />
            </a>
            <a href="https://vk.com/chupkevichus" target="_blank" rel="noopener noreferrer" aria-label="VK">
              <img
                src="https://pngicon.ru/file/uploads/vk.png"
                alt="VK"
                width={32}
                height={32}
                style={{ filter: 'invert(1)' }}
              />
            </a>
            <a href="https://github.com/F4aming" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                alt="GitHub"
                width={32}
                height={32}
                style={{ filter: 'invert(1)' }}
              />
            </a>
          </div>
        </div>

        <div className="text-center mt-3">
          <small>&copy; 2025 Голосовалка. Все права защищены.</small>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
