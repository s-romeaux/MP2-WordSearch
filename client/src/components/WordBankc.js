import React from 'react';

const WordBank = ({ wordBank, foundWords }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <h2>Word Bank</h2>
    {wordBank.map((word, index) => (
      <div
        key={index}
        style={{
          marginBottom: '8px',
          color: foundWords.includes(word.toUpperCase()) ? 'grey' : 'black',
          textDecoration: foundWords.includes(word.toUpperCase()) ? 'line-through' : 'none',
        }}
      >
        {word}
      </div>
    ))}
  </div>
);

export default WordBank;
