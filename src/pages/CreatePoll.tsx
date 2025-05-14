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
    <div className="create-poll-container">
      <h2 className="create-poll-title">Создание опроса</h2>

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

      <div className="back-wrapper">
        <Link to="/" className="back-button">← Назад на главную</Link>
      </div>

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
        <div className="modal-overlay">
          <div className="modal">
            <p>Вы уверены, что хотите удалить этот опрос?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeletePoll} className="confirm-button">Да</button>
              <button onClick={() => setConfirmDeleteId(null)} className="cancel-button">Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
