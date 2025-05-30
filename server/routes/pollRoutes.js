let polls = {};

const { v4: uuidv4 } = require('uuid');

exports.createPoll = (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || !Array.isArray(options)) {
    return res.status(400).json({ message: 'Некорректные данные опроса' });
  }

  const id = uuidv4();
  polls[id] = {
    id,
    question,
    options: options.map(option => ({ text: option, votes: 0 })),
  };

  res.status(201).json({ id, message: 'Опрос создан' });
};

exports.getPollById = (req, res) => {
  const { id } = req.params;

  const poll = polls[id];
  if (!poll) {
    return res.status(404).json({ message: 'Опрос не найден' });
  }

  res.json(poll);
};
