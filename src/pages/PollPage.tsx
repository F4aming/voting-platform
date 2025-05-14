import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/PollPage.css';

const PollPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<any | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const savedPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    const foundPoll = savedPolls.find((p: any) => p.id === id);
    if (foundPoll) {
      setPoll(foundPoll);
      const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
      if (votedPolls.includes(id)) {
        setHasVoted(true);

        // Восстановление выбора (не обязательно точно, просто пример)
        const selected: number[] = [];
        foundPoll.votes.forEach((count: number, index: number) => {
          if (count > 0) selected.push(index);
        });
        setSelectedOptions(selected);
      }
    }
  }, [id]);

  const handleSelect = (index: number) => {
    if (!poll?.multipleChoice) {
      setSelectedOptions([index]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleVote = () => {
    if (!poll || selectedOptions.length === 0) return;

    const updatedPoll = { ...poll };
    selectedOptions.forEach((index) => {
      updatedPoll.votes[index]++;
    });

    const allPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    const updatedPolls = allPolls.map((p: any) =>
      p.id === poll.id ? updatedPoll : p
    );
    localStorage.setItem('polls', JSON.stringify(updatedPolls));

    const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
    localStorage.setItem('votedPolls', JSON.stringify([...votedPolls, id]));

    setPoll(updatedPoll);
    setHasVoted(true);
  };

  const handleCancelVote = () => {
    if (!poll || !hasVoted) return;

    const updatedPoll = { ...poll };
    selectedOptions.forEach((index) => {
      updatedPoll.votes[index] = Math.max(0, updatedPoll.votes[index] - 1);
    });

    const allPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    const updatedPolls = allPolls.map((p: any) =>
      p.id === poll.id ? updatedPoll : p
    );
    localStorage.setItem('polls', JSON.stringify(updatedPolls));

    const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
    const updatedVotedPolls = votedPolls.filter((pollId: string) => pollId !== id);
    localStorage.setItem('votedPolls', JSON.stringify(updatedVotedPolls));

    setPoll(updatedPoll);
    setSelectedOptions([]);
    setHasVoted(false);
  };

  if (!poll) return <p>Опрос не найден</p>;

  return (
    <div className="vote-container">
      <h2>{poll.question}</h2>

      {!hasVoted ? (
        <>
          <ul className="option-list">
            {poll.options.map((option: string, index: number) => (
              <li key={index}>
                <label>
                  <input
                    type={poll.multipleChoice ? 'checkbox' : 'radio'}
                    name="option"
                    value={index}
                    checked={selectedOptions.includes(index)}
                    onChange={() => handleSelect(index)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleVote}
            className="vote-button"
            disabled={selectedOptions.length === 0}
          >
            Проголосовать
          </button>
        </>
      ) : (
        <>
          <h3>Результаты:</h3>
          <ul className="result-list">
            {poll.options.map((option: string, index: number) => {
              const totalVotes = poll.votes.reduce((a: number, b: number) => a + b, 0);
              const voteCount = poll.votes[index];
              const percent = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

              return (
                <li key={index}>
                  <span>{option} — {voteCount} проголосовавших</span>
                  <div className="result-bar-container">
                    <div
                      className="result-bar"
                      style={{ width: `${percent}%` }}
                    >
                      {percent.toFixed(0)}%
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button onClick={handleCancelVote} className="vote-button cancel">
            Отменить голос
          </button>
        </>
      )}

      <div className="back-wrapper">
        <Link to="/create" className="back-button">← Назад к созданию опроса</Link>
      </div>
    </div>
  );
};

export default PollPage;
