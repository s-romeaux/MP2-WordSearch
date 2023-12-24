// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [wordSearchGrid, setWordSearchGrid] = useState([]);
  const [wordBank, setWordBank] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');

  useEffect(() => {
    const fetchWordSearchGrid = async () => {
      try {
        const response = await axios.get('http://localhost:5000/wordSearchGrid');
        setWordSearchGrid(response.data);
      } catch (error) {
        console.error('Error fetching word search grid:', error);
      }
    };

    const fetchWordBank = async () => {
      try {
        const response = await axios.get('http://localhost:5000/wordBank');
        setWordBank(response.data);
      } catch (error) {
        console.error('Error fetching word bank:', error);
      }
    };

    fetchWordSearchGrid();
    fetchWordBank();
  }, []);

  const handleWordClick = (letter) => {
    setSelectedWord((prevSelectedWord) => prevSelectedWord + letter.toUpperCase());
  };

  const handleBackspace = () => {
    setSelectedWord((prevSelectedWord) => prevSelectedWord.slice(0, -1));
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${wordSearchGrid.length}, 30px)` }}>
        {wordSearchGrid.map((row, rowIndex) => (
          row.map((letter, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} style={{ border: '1px solid black', textAlign: 'center', padding: '9px', cursor: 'pointer' }} onClick={() => handleWordClick(letter)}>
              {letter.toUpperCase()}
            </div>
          ))
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2>Word Bank</h2>
        {wordBank.map((word, index) => (
          <div
            key={index}
            style={{
              cursor: 'pointer',
              marginBottom: '8px',
              color: selectedWord.toUpperCase() === word.toUpperCase() ? 'grey' : 'black',
              textDecoration: selectedWord.toUpperCase() === word.toUpperCase() ? 'line-through' : 'none',
            }}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </div>
        ))}
        <h2>Selected Word:</h2>
        <div>{selectedWord}</div>
        <button onClick={handleBackspace}>Backspace</button>
      </div>
    </div>
  );
}

export default App;
