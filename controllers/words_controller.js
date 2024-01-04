
const express = require('express')
const words = express.Router()
const Word = require('../models/words.js')



// SHOW
words.get('/:id', (req, res) => {
    Word.findById(req.params.id)
        .populate('Word')
        .then(foundWord => {
          res.render('show', {
             
          })
        })
        .catch(err => {
          res.send('404')
        })
  })
  

module.exports = words