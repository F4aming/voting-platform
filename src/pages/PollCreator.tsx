import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles//PollCreator.css';

type Question = {
  questionText: string;
  options: string[];
};

type Poll = {
  id: string;
  title: string;
  questions: Question[];
};

const PollCreator: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([
        { questionText: '', options: ['', ''] }
    ]);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
    const [polls, setPolls] = useState<Poll[]>([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const savedPolls = localStorage.getItem('polls');
    if (savedPolls) {
      try {
        const parsedPolls = JSON.parse(savedPolls);
        setPolls(Array.isArray(parsedPolls) ? parsedPolls : []);
      } catch {
        setPolls([]);
      }
    }

    setVisible(true);

  }, []);

  // Добавить вопрос
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', ''] }]);
  };

  // Удаление вопроса (подтверждение)
  const deleteQuestion = (index: number) => {
    setConfirmDeleteIndex(index);
  };

  const confirmDeleteQuestion = () => {
    if (confirmDeleteIndex !== null) {
      const updated = [...questions];
      updated.splice(confirmDeleteIndex, 1);
      setQuestions(updated);
      setConfirmDeleteIndex(null);
    }
  };

  // Обновить текст вопроса
  const updateQuestionText = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].questionText = text;
    setQuestions(updated);
  };

  // Обновить вариант ответа
  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  // Добавить вариант
  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  // Удалить вариант
  const deleteOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 2) {
      updated[qIndex].options.splice(oIndex, 1);
      setQuestions(updated);
    }
  };

  // Создание нового опроса и сохранение в localStorage
  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Пожалуйста, введите название опроса');
      return;
    }
    if (questions.some(q => !q.questionText.trim() || q.options.some(opt => !opt.trim()))) {
      alert('Пожалуйста, заполните все вопросы и варианты');
      return;
    }

    const pollId = Date.now().toString();
    const newPoll: Poll = { id: pollId, title: title.trim(), questions };

    // Добавляем новый опрос в localStorage
    const updatedPolls = [newPoll, ...polls];
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
    setPolls(updatedPolls);

    // Сбрасываем форму
    setTitle('');
    setQuestions([{ questionText: '', options: ['', ''] }]);

    // Переходим к странице опроса
    navigate(`/poll/${pollId}`);
  };

  // Подтверждение удаления опроса
  const confirmDeletePoll = () => {
    if (confirmDeleteId) {
      const updatedPolls = polls.filter(poll => poll.id !== confirmDeleteId);
      setPolls(updatedPolls);
      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setConfirmDeleteId(null);
    }
  };

  // Копирование ссылки на опрос
  const copyPollLink = (pollId: string) => {
    const url = `${window.location.origin}/poll/${pollId}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastMessage('Ссылка скопирована!');
      setTimeout(() => setToastMessage(''), 3000);
    });
  };

  return (
   <div className={`d-flex flex-column min-vh-100 page-fade ${visible ? 'visible' : ''}`} style={{ overflowY: 'auto' }}>
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
            <a className="nav-link fw-bold" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Голосовалка
            </a>
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

      <main className="container my-5 flex-grow-1" style={{ paddingTop: '80px' }}>
        <h1 className="mb-4">Создание опроса</h1>
        <input
          className="form-control mb-4"
          type="text"
          placeholder="Название опроса"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {questions.map((q, qIdx) => (
          <div key={qIdx} className="mb-4 p-3 border rounded position-relative">
            <input
              className="form-control mb-2"
              type="text"
              placeholder={`Вопрос ${qIdx + 1}`}
              value={q.questionText}
              onChange={e => updateQuestionText(qIdx, e.target.value)}
            />

            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="input-group mb-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder={`Вариант ${oIdx + 1}`}
                  value={opt}
                  onChange={e => updateOptionText(qIdx, oIdx, e.target.value)}
                />
                {q.options.length > 2 && (
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => deleteOption(qIdx, oIdx)}
                    title="Удалить вариант"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => addOption(qIdx)}
              >
                + Добавить вариант
              </button>
              <button
                type="button"
                className="remove-option-button"
                onClick={() => deleteQuestion(qIdx)}
              >
                ✖
              </button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mb-5">
          <button className="btn btn-outline-dark" onClick={addQuestion}>
            + Добавить вопрос
          </button>
          <button className="btn btn-dark" onClick={handleSubmit}>
            Сохранить опрос
          </button>
        </div>

        {/* Модальное окно подтверждения удаления вопроса */}
        {confirmDeleteIndex !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-text">Удалить этот вопрос?</p>
              <div className="modal-buttons">
                <button className="btn btn-danger" onClick={confirmDeleteQuestion}>
                  Да
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmDeleteIndex(null)}>
                  Нет
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Список созданных опросов */}
        <div className="poll-list-section mt-5">
          <h3>Список созданных опросов</h3>
          {polls.length === 0 ? (
            <p>Опросов пока нет.</p>
          ) : (
            <ul className="poll-list list-group">
              {polls.map(poll => (
                <li key={poll.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/poll/${poll.id}`)}
                    title="Перейти к опросу"
                  >
                    {poll.title}
                  </span>
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      className="btn btn-outline-danger"
                      title="Удалить опрос"
                      onClick={() => setConfirmDeleteId(poll.id)}
                    >
                      🗑
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      title="Скопировать ссылку"
                      onClick={() => copyPollLink(poll.id)}
                    >
                      📋
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Модальное окно подтверждения удаления опроса */}
        {confirmDeleteId && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-text">Удалить опрос?</p>
              <div className="modal-buttons">
                <button className="btn btn-danger" onClick={confirmDeletePoll}>
                  Да
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmDeleteId(null)}>
                  Нет
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Тост сообщение */}
        {toastMessage && (
          <div className="toast-message position-fixed bottom-0 end-0 m-3 p-2 bg-success text-white rounded">
            {toastMessage}
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

export default PollCreator;
