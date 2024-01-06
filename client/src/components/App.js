import React, { useEffect, useState } from 'react';
import useDataFetching from './useDataFetching';
import WordGrid from './WordGridc';
import WordBank from './WordBankc';
import SelectedWord from './SelectedWordc';

function App() {
  const { data: wordSearchGrid, loading: gridLoading, error: gridError } = useDataFetching(
    'http://localhost:5000/wordSearchGrid',
    []
  );
  const { data: wordBank, loading: bankLoading, error: bankError } = useDataFetching(
    'http://localhost:5000/wordBank',
    []
  );

  const [selectedWord, setSelectedWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const handleWordClick = (letter, rowIndex, colIndex) => {
    const clickedLetter = letter.toUpperCase();
    const clickedCell = { letter: clickedLetter, rowIndex, colIndex };

    const isLetterSelected = selectedLetters.some(
      (item) => item.letter === clickedLetter && item.rowIndex === rowIndex && item.colIndex === colIndex
    );

    if (!isLetterSelected) {
      setSelectedLetters((prevSelectedLetters) => [...prevSelectedLetters, clickedCell]);
      setSelectedWord((prevSelectedWord) => prevSelectedWord + clickedLetter);
    } else {
      setSelectedLetters((prevSelectedLetters) =>
        prevSelectedLetters.filter(
          (item) =>
            !(item.letter === clickedLetter && item.rowIndex === rowIndex && item.colIndex === colIndex)
        )
      );
      setSelectedWord((prevSelectedWord) => prevSelectedWord.replace(clickedLetter, ''));
    }
  };

  const handleBackspace = () => {
    setSelectedWord((prevSelectedWord) => prevSelectedWord.slice(0, -1));
    setSelectedLetters((prevSelectedLetters) => prevSelectedLetters.slice(0, -1));
  };

  useEffect(() => {
    const isWordInBank = wordBank.some(
      (word) => word.toUpperCase() === selectedWord.toUpperCase()
    );

    if (isWordInBank && !foundWords.includes(selectedWord.toUpperCase())) {
      setFoundWords((prevFoundWords) => [...prevFoundWords, selectedWord.toUpperCase()]);
      setSelectedWord('');
    }

    console.log('Selected Word:', selectedWord.toUpperCase());
    console.log('Is Selected Word in Bank?', isWordInBank);
    console.log('Found Words:', foundWords);
  }, [selectedWord, wordBank, foundWords]);

  if (gridLoading || bankLoading) {
    return <div>Loading...</div>;
  }

  if (gridError || bankError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <WordGrid
        wordSearchGrid={wordSearchGrid}
        selectedLetters={selectedLetters}
        handleWordClick={handleWordClick}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <WordBank wordBank={wordBank} foundWords={foundWords} />
        <SelectedWord selectedWord={selectedWord} handleBackspace={handleBackspace} />
      </div>
    </div>
  );
}

export default App;
