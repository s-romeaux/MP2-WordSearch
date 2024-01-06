import React from 'react';

const SelectedWord = ({ selectedWord, handleBackspace }) => (
  <div>
    <h2>Selected Word:</h2>
    <div>{selectedWord}</div>
    <button onClick={handleBackspace}>Backspace</button>
  </div>
);

export default SelectedWord;
