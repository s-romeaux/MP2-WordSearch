// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose //NOTE: might not need

const wordSchema = new Schema ({
    word: {type: String,
         required: true, 
         enum: ['JavaScript',
         'React',
         'Redux',
         'API',
         'MongoDB',
         'Mongoose',
         'Component',
         'State',
         'Props',
         'Hook',
         'Express',
         'Node',
         'Middleware',
         'Schema',
         'Fetch',
     ]
    },
    
})


const Word = mongoose.model('Word', wordSchema)
module.exports = Word