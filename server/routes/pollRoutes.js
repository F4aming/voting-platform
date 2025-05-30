const express = require('express');
const router = express.Router();
const {
  getPolls,
  createPoll,
  getPollById,
  votePoll
} = require('../controllers/pollController');

router.get('/', getPolls);

router.post('/', createPoll);

router.get('/:id', getPollById);

router.post('/:id/vote', votePoll);

module.exports = router;
