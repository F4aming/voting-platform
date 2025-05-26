import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type Question = {
  questionText: string;
  options: string[];
};

type Poll = {
  id: string;
  title: string;
  questions: Question[];
};

type Votes = {
  [questionIndex: number]: number; // индекс выбранного варианта
};

const PollPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<Votes>({});
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const pollsStr = localStorage.getItem('polls');
    if (!pollsStr) return;

    const polls: Poll[] = JSON.parse(pollsStr);
    const found = polls.find(p => p.id === id);
    if (found) {
      setPoll(found);

      const storedVotesStr = localStorage.getItem(`votes_${id}`);
      if (storedVotesStr) {
        setVotes(JSON.parse(storedVotesStr));
        setSubmitted(true);
      }

      const finishedStr = localStorage.getItem(`finished_${id}`);
      if (finishedStr === 'true') {
        setFinished(true);
      }
    }
  }, [id]);

  if (!poll) {
    return (
      <div className="container mt-5">
        <h2>Опрос не найден</h2>
        <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    if (submitted || finished) return;
    setVotes(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleCancelVoteForQuestion = (questionIndex: number) => {
    if (submitted || finished) return;
    setVotes(prev => {
      const newVotes = { ...prev };
      delete newVotes[questionIndex];
      return newVotes;
    });
  };

  const handleSubmit = () => {
    if (finished) return;

    if (poll.questions.some((_, idx) => votes[idx] === undefined)) {
      alert('Пожалуйста, ответьте на все вопросы.');
      return;
    }

    localStorage.setItem(`votes_${poll.id}`, JSON.stringify(votes));
    setSubmitted(true);
    alert('Спасибо за ваш голос!');
  };

  const handleFinishPoll = () => {
    if (!submitted) {
      alert('Сначала нужно отправить голос.');
      return;
    }

    localStorage.setItem(`finished_${poll.id}`, 'true');
    setFinished(true);
    alert('Опрос завершён.');
  };

  return (
    <div className="container mt-5">
      <h1>{poll.title}</h1>

      {poll.questions.map((q, i) => (
        <div key={i} className="mb-4 p-3 border rounded">
          <h5>Вопрос {i + 1}: {q.questionText}</h5>
          <ul className="list-unstyled">
            {q.options.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name={`question_${i}`}
                    value={idx}
                    disabled={submitted || finished}
                    checked={votes[i] === idx}
                    onChange={() => handleOptionChange(i, idx)}
                  />
                  {' '}
                  {opt}
                </label>
              </li>
            ))}
          </ul>

          {!finished && !submitted && votes[i] !== undefined && (
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => handleCancelVoteForQuestion(i)}
            >
              Отменить выбор
            </button>
          )}
        </div>
      ))}

      {!finished ? (
        !submitted ? (
          <button className="btn btn-outline-dark" onClick={handleSubmit}>Отправить голос</button>
        ) : (
          <button className="btn btn-outline-dark ms-2" onClick={handleFinishPoll}>Завершить опрос</button>
        )
      ) : (
        <>
          <div className="alert alert-secondary">Опрос завершён.</div>
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Назад</button>
        </>
      )}
    </div>
  );
};

export default PollPage;
