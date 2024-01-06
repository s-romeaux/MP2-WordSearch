// wordSearchGenerator.js

// const words = [
//     'JavaScriptt',
//     'React',
//     'Redux',
//     'API',
//     'MongoDB',
//     'Mongoose',
//     'Component',
//     'State',
//     'Props',
//     'Hook',
//     'Express',
//     'Node',
//     'Middleware',
//     'Schema',
//     'Fetch',
// ];

const gridSize = 12;

function generateGrid(words) {
    const grid = [];
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

    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize).fill('');
    }

    for (const word of words) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);

        let currentX = startX;
        let currentY = startY;
        let wordFits = true;

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

            grid[currentX][currentY] = letter;
            currentX += direction.x;
            currentY += direction.y;
        }

        if (!wordFits) {
            for (let i = 0; i < word.length; i++) {
                grid[startX + i * direction.x][startY + i * direction.y] = '';
            }
            generateGrid([word, ...words.filter(w => w !== word)]);
        }
    }

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                grid[i][j] = randomLetter;
            }
        }
    }

    return grid;
}

const wordSearchGrid = generateGrid(words);
console.log(wordSearchGrid);
