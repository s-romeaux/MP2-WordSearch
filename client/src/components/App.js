import React, { useEffect, useState } from 'react';
import useDataFetching from './useDataFetching';
import WordGrid from './WordGridc';
import WordBank from './WordBankc';
import SelectedWord from './SelectedWordc';

function App() {
  useEffect(() => {document.title = "MERN Word Search"}, [])
  const [wordSearchGrid, setWordSearchGrid] = useState([]);
  const [wordBank, setWordBank] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [currentFoundWord, setCurrentFoundWord] = useState([]);

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
      console.log('Found words:', foundWords);
      setSelectedWord('');
      setSelectedLetters([]);
      setCurrentFoundWord((prevFoundWord) => ({
        ...prevFoundWord,
        [selectedWord.toUpperCase()]: selectedLetters,}));
    }
  


    if (isWordInBank && !foundWords.includes(selectedWord.toUpperCase())) {
      setFoundWords((prevFoundWords) => [...prevFoundWords, selectedWord.toUpperCase()]);
      setSelectedWord('');
    }

    console.log('Selected Word:', selectedWord.toUpperCase());
    console.log('Is Selected Word in Bank?', isWordInBank);
    console.log('Found Words:', foundWords);
  }, [selectedWord, wordBank, foundWords]);


  return (
    <div style={{ display: 'flex', gap: '20px' }}>
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
        <h2>Selected Word:</h2>
        <div>{selectedWord}</div>
        <button onClick={handleBackspace}>Backspace</button>
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
