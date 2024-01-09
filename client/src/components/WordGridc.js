import React from 'react';

const WordGrid = ({ wordSearchGrid, selectedLetters, handleWordClick, currentFoundWord }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${wordSearchGrid.length}, 30px)` }}>
    {wordSearchGrid.map((row, rowIndex) => (
      row.map((letter, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          style={{
            border: '1px solid black',
            textAlign: 'center',
            padding: '9px',
            cursor: 'pointer',
            backgroundColor: Object.values(currentFoundWord).flat().some(
              (item) =>
                item.rowIndex === rowIndex &&
                item.colIndex === colIndex
            )
              ? 'lightblue'
              : selectedLetters.some(
                  (item) =>
                    item.rowIndex === rowIndex &&
                    item.colIndex === colIndex
                )
              ? 'pink'
              : 'white',
          }}
          onClick={() => handleWordClick(letter, rowIndex, colIndex)}
        >
          {letter.toUpperCase()}
        </div>
      ))
    ))}
  </div>
);

export default WordGrid;
