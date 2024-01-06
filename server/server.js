const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const { wordSearchGridWithRandomLetters, placedWords } = require('./wordSearchGenerator'); // Importing from wordSearchGenerator.js

app.get('/wordSearchGrid', (req, res) => {
  res.json(wordSearchGridWithRandomLetters);
});

app.get('/wordBank', (req, res) => {
  res.json(placedWords);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
