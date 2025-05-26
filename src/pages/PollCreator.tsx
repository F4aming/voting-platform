import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles//PollCreator.css';

type Question = {
  questionText: string;
  options: string[];
};

const PollCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { questionText: '', options: ['', ''] }
  ]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', ''] }]);
  };

  const deleteQuestion = (index: number) => {
    setConfirmDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (confirmDeleteIndex !== null) {
      const updated = [...questions];
      updated.splice(confirmDeleteIndex, 1);
      setQuestions(updated);
      setConfirmDeleteIndex(null);
    }
  };

  const updateQuestionText = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].questionText = text;
    setQuestions(updated);
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const deleteOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 2) {
      updated[qIndex].options.splice(oIndex, 1);
      setQuestions(updated);
    }
  };

  const handleSubmit = () => {
    const pollId = Date.now().toString();
    localStorage.setItem(`poll-${pollId}`, JSON.stringify({ title, questions }));

    const pollIds = JSON.parse(localStorage.getItem('poll-ids') || '[]');
    pollIds.push(pollId);
    localStorage.setItem('poll-ids', JSON.stringify(pollIds));

    navigate(`/poll/${pollId}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center text-dark" href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533890.png"
              alt="Логотип"
              width={40}
              height={40}
              className="me-2 logo-img"
            />
            <span className="fw-bold">Голосовалка</span>
          </a>
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

        <div className="d-flex gap-2">
          <button className="btn btn-outline-dark" onClick={addQuestion}>
            + Добавить вопрос
          </button>
          <button className="btn btn-dark" onClick={handleSubmit}>
            Сохранить опрос
          </button>
        </div>

        {/* Модальное окно */}
        {confirmDeleteIndex !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-text">Удалить этот вопрос?</p>
              <div className="modal-buttons">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Да
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmDeleteIndex(null)}>
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
            <p className="mb-1">
              Email: <a href="mailto:contact@golosovalka.ru" className="text-white">contact@golosovalka.ru</a>
            </p>
            <p className="mb-0">
              Телефон: <a href="tel:+79991234567" className="text-white">+7 (999) 123-45-67</a>
            </p>
          </div>
          <div className="mt-3 mt-md-0 d-flex align-items-center gap-3">
            <a href="#" aria-label="Telegram">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Telegram_Messenger.png" width={32} className="icon-invert" />
            </a>
            <a href="https://vk.com/chupkevichus" target="_blank" rel="noopener noreferrer" aria-label="VK">
              <img src="https://pngicon.ru/file/uploads/vk.png" width={32} className="icon-invert" />
            </a>
            <a href="https://github.com/F4aming" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width={32} className="icon-invert" />
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
