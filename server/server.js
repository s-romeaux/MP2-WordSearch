const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const { getWordsFromDatabase } = require('../controllers/words_controller');
require('dotenv').config()

app.use(cors());


//MONGO CONNECTION
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!!!');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
   
  }
}


connectToMongoDB();


const gridSize = 22;

async function generateGrid(wordsFromDatabase) {
  return new Promise((resolve, reject) => {
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];
  
  const placedWords = [];

  for (const rawWordObject of wordsFromDatabase) {
    const word = String(rawWordObject.word);
    let direction, startX, startY;
    let wordFits = false;

    // Try placing the word up to 50 times
    for (let attempt = 0; attempt < 50; attempt++) {
      direction = directions[Math.floor(Math.random() * directions.length)];
      startX = Math.floor(Math.random() * gridSize);
      startY = Math.floor(Math.random() * gridSize);

      let currentX = startX;
      let currentY = startY;
      wordFits = true;

      for (const letter of word) {
        if (
          currentX < 0 ||
          currentX >= gridSize ||
          currentY < 0 ||
          currentY >= gridSize ||
          grid[currentX][currentY] !== ''
        ) {
          wordFits = false;
          break;
        }

        currentX += direction.x;
        currentY += direction.y;
      }

      if (wordFits) {
        break;
      }
    }

    if (!wordFits) {
      console.error(`Could not place the word: ${word}`);
      console.log('Grid:', grid);
      continue; // Skip to the next word
    }

    let currentX = startX;
    let currentY = startY;

    for (const letter of word) {
      grid[currentX][currentY] = letter;
      currentX += direction.x;
      currentY += direction.y;
    }

    placedWords.push(word);
  }

  console.log('Final Grid:', grid)

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === '') {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        grid[i][j] = randomLetter;
      }
    }
  }
  console.log('Generated grid:', grid);
  console.log('Placed words:', placedWords);
  resolve({ grid, placedWords });
});
}



async function startServer() {
  try {
    const wordsFromDatabase = await getWordsFromDatabase();
    const { grid: wordSearchGrid, placedWords } = await generateGrid(wordsFromDatabase);
    

    app.get('/', (req, res) => {
      res.send('hello');
    });


    app.get('/wordSearchGrid', (req, res) => {
      console.log('Sending wordSearchGrid:', wordSearchGrid);
      res.json(wordSearchGrid);
    });
    
    app.get('/wordBank', (req, res) => {
      console.log('Sending wordBank:', placedWords);
      res.json(placedWords);
    });


    app.get('/databaseWords', async (req, res) => {
      try {
        const wordsFromDatabase = await getWordsFromDatabase();
        res.json(wordsFromDatabase);
        console.log('database words pulled');
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error fetching words from the database:', error.message);
  }
}

startServer();

