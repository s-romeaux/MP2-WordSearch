import React, { useEffect, useState } from 'react';
import useDataFetching from './useDataFetching';
import axios from 'axios';
import WordGrid from './WordGridc';
import WordBank from './WordBankc';
import SelectedWord from './SelectedWordc';
import Guide from "./images/guide.png";
import '../App.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [wordSearchGrid, setWordSearchGrid] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [currentFoundWord, setCurrentFoundWord] = useState([]);

  useEffect(() => {
    document.title = "MERN Word Search";
    const fetchData = async () => {
      try {
        const gridResponse = await axios.get('http://localhost:5000/wordSearchGrid');
        setWordSearchGrid(gridResponse.data);
      } catch (error) {
        console.error('Error fetching word search grid:', error);
      }
    };

    fetchData();
  }, []);

  const { data: fetchedWordSearchGrid, loading: gridLoading, error: gridError } = useDataFetching(
    'http://localhost:5000/wordSearchGrid',
    []
  );
  const { data: wordBank, loading: bankLoading, error: bankError } = useDataFetching(
    'http://localhost:5000/wordBank',
    []
  );

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
      setSelectedLetters([]);
      setCurrentFoundWord((prevFoundWord) => ({
        ...prevFoundWord,
        [selectedWord.toUpperCase()]: selectedLetters,
      }));
    }

    console.log('Selected Word:', selectedWord.toUpperCase());
    console.log('Is Selected Word in Bank?', isWordInBank);
    console.log('Found Words:', foundWords);
  }, [selectedWord, wordBank, foundWords, selectedLetters, setCurrentFoundWord]);

  if (gridLoading || bankLoading) {
    return <div>Loading...</div>;
  }

  if (gridError || bankError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div className="header">MERN Word Search</div>
      <div className="navigation">
        <ul>
          <li><a href="https://www.unlv.edu/" target="_blank" rel="noopener noreferrer">Home</a></li>
          <li><a href="https://digitalskills.instructure.com/" target="_blank" rel="noopener noreferrer">Update Word Bank</a></li>
          <li><a href="https://thrivedx.com/" target="_blank" rel="noopener noreferrer">About Us</a></li>
        </ul>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Your existing content */}
        <WordGrid
          wordSearchGrid={fetchedWordSearchGrid}
          selectedLetters={selectedLetters}
          handleWordClick={handleWordClick}
          currentFoundWord={currentFoundWord}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <WordBank wordBank={wordBank} foundWords={foundWords} />
          <SelectedWord selectedWord={selectedWord} handleBackspace={handleBackspace} />
        </div>
        <div>
          <img src={Guide} alt="Guide to playing Word Search"/>
        </div>
      </div>
    </div>
  );
  
  
}

export default App;