
const express = require('express')
const words = express.Router()
const Word = require('../models/words')



// SHOW
words.get('/', (req, res) => {
    Word.find().then((wordsRes) => {
        console.log(wordsRes)
    })
  })
  

module.exports = words