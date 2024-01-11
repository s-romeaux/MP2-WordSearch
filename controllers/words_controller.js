
const express = require('express')
const words = express.Router()
const Word = require('../models/words')
const seedData = require('../models/word_seed')



async function getWordsFromDatabase() {
  try {
    const words = await Word.find();
    console.log('Words from MongoDB:', words);
    return words;
  } catch (error) {
    console.error('Error fetching words from the database:', error);
    throw error;
  }
}

module.exports = {
  getWordsFromDatabase,
};