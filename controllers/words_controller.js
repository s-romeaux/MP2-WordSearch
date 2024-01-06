
const express = require('express')
const words = express.Router()
const Word = require('../models/words')
const seedData = require('../models/word_seed')



// SHOW
words.get('/', (req, res) => {
    Word.find().then((wordsRes) => {
        console.log(wordsRes)
    })
  })
  


module.exports = words