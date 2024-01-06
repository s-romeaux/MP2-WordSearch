// wordSearchGenerator.js

const { generateGrid } = require('./gridGenerator'); // Import the generateGrid function from gridGenerator.js

const words = [
    'JavaScript',
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
];

// Generate the grid using the imported generateGrid function
const { grid: wordSearchGrid, placedWords } = generateGrid(words);

module.exports = {
    wordSearchGridWithRandomLetters: wordSearchGrid,
    placedWords,
};
