import React from 'react';

const WordBank = ({ wordBank, foundWords }) => (
  <div>
    <h2>Word Bank</h2>
    {wordBank.map((word, index) => (
      <div
      key={index}
      className={`word ${foundWords.includes(word.toUpperCase()) ? 'word-found' : 'word-not-found'}`}
    >
        {word}
      </div>
    ))}
  </div>
);

export default WordBank;
