import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/createPoll.css';

const CreatePoll: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [polls, setPolls] = useState<any[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedPolls = localStorage.getItem('polls');
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls));
    }
  }, []);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const showError = (message: string) => {
    setError(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addOption = () => {
    if (options.length >= 10) {
      showError('Максимум 10 вариантов!');
      return;
    }
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      showError('Минимум 2 варианта!');
      return;
    }
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || options.some(opt => !opt.trim())) {
      showError('Пожалуйста, заполните все поля!');
      return;
    }

    const newPoll = {
      id: Date.now().toString(),
      question: question.trim(),
      options: options.map(opt => opt.trim()),
      votes: Array(options.length).fill(0),
      multipleChoice
    };

    const updatedPolls = [newPoll, ...polls];
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
    setPolls(updatedPolls);
    navigate(`/vote/${newPoll.id}`);
  };

  const confirmDeletePoll = () => {
    if (confirmDeleteId) {
      const updatedPolls = polls.filter(poll => poll.id !== confirmDeleteId);
      setPolls(updatedPolls);
      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setConfirmDeleteId(null);
    }
  };

  const copyPollLink = (pollId: string) => {
    const url = `${window.location.origin}/vote/${pollId}`;
    navigator.clipboard.writeText(url).then(() => {
      showToastMessage('Ссылка скопирована!');
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
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
                <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                  Главная
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Добавляем отступ сверху, чтобы не закрывать контент под фиксированным navbar */}
      <main className="flex-grow-1 container my-5 fade-in" style={{ paddingTop: '80px' }}>
        <h2 className="text-center fw-bold text-dark mb-4">Создание опроса</h2>

        <form className="create-poll-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Вопрос:</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Введите ваш вопрос"
              required
            />
          </div>

          <div className="form-group">
            <label>Тип голосования:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="voteType"
                  checked={!multipleChoice}
                  onChange={() => setMultipleChoice(false)}
                />
                Один вариант
              </label>
              <label style={{ marginLeft: '1rem' }}>
                <input
                  type="radio"
                  name="voteType"
                  checked={multipleChoice}
                  onChange={() => setMultipleChoice(true)}
                />
                Несколько вариантов
              </label>
            </div>
          </div>

          {options.map((option, index) => (
            <div className="form-group option-with-remove" key={index}>
              <label htmlFor={`option${index}`}>Вариант {index + 1}:</label>
              <div className="option-row">
                <input
                  id={`option${index}`}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Введите вариант ${index + 1}`}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="remove-option-button"
                    onClick={() => removeOption(index)}
                  >
                    ✖
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="button-row">
            <button type="button" className="add-option-button" onClick={addOption}>
              Добавить вариант
            </button>
            <button type="submit" className="create-button">Создать опрос</button>
          </div>
        </form>


        {showToast && <div className="toast-error">{error}</div>}
        {toastMessage && <div className="toast-success">{toastMessage}</div>}

        <hr style={{ margin: '2rem 0' }} />

        <div className="poll-list-section">
          <h3>Список созданных опросов</h3>
          {polls.length === 0 ? (
            <p>Опросов пока нет.</p>
          ) : (
            <ul className="poll-list">
              {polls.map(poll => (
                <li key={poll.id} className="poll-item">
                  <Link to={`/vote/${poll.id}`} className="poll-link">
                    {poll.question}
                  </Link>
                  <div className="poll-actions">
                    <button
                      className="copy-link-button"
                      onClick={() => copyPollLink(poll.id)}
                    >
                      📋 Скопировать ссылку
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => setConfirmDeleteId(poll.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {confirmDeleteId && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: '#fff',
                color: '#000',
                padding: '2rem',
                borderRadius: '8px',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 0px 2px rgba(0,0,0,0.5)',
              }}
            >
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                Вы уверены, что хотите удалить этот опрос?
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button
                  onClick={confirmDeletePoll}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#d9534f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Да
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          </div>
        )}

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

export default CreatePoll;
