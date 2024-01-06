const gridSize = 22;

function generateGrid(words) {
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

for (const word of words) {
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

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === '') {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        grid[i][j] = randomLetter;
    }
    }
}

return { grid, placedWords };
}

module.exports = { generateGrid };