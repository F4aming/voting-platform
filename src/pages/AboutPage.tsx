import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setVisible(true);
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const safeNavigate = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className={`d-flex flex-column min-vh-100 page-fade ${visible ? 'visible' : ''}`}>
      {/* Header */}
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center text-dark" href="/" onClick={e => { e.preventDefault(); safeNavigate('/'); }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533890.png"
              alt="Логотип"
              width={40}
              height={40}
              className="me-2"
              style={{ filter: 'grayscale(100%) brightness(0)' }}
            />
            <span className="nav-link fw-bold" style={{ cursor: 'pointer' }}>
              Голосовалка
            </span>
          </a>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={e => { e.preventDefault(); safeNavigate('/'); }}>
                  Главная
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content with embedded video */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ paddingTop: '80px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '960px', paddingBottom: '56.25%', height: 0 }}>
        <iframe
        src="https://www.youtube.com/embed/HEXWRTEbj1I?start=3&autoplay=1"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        }}
        />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>
            <h5>Контактная информация</h5>
            <p className="mb-1">
              Email: <a href="mailto:contact@golosovalka.ru" className="text-white">contact@golosovalka.ru</a>
            </p>
            <p className="mb-0">
              Телефон: <a href="tel:+79991234567" className="text-white">+7 (999) 123-45-67</a>
            </p>
          </div>
          <div className="mt-3 mt-md-0 d-flex align-items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
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

export default AboutPage;
