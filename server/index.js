const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Простая in-memory база
let polls = [];

// Создать опрос
app.post('/api/polls', (req, res) => {
  const newPoll = { id: Date.now().toString(), ...req.body };
  polls.push(newPoll);
  res.status(201).json(newPoll);
});

// Получить опрос по id
app.get('/api/polls/:id', (req, res) => {
  const poll = polls.find(p => p.id === req.params.id);
  if (poll) {
    res.json(poll);
  } else {
    res.status(404).json({ error: 'Poll not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
