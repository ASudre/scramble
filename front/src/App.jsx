import React, { useEffect, useState } from 'react';
import './App.scss';
import Letters from './Letters/Letters';

const API_URL = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:8080';

const getWord = async () => fetch(`${API_URL}/word`)
  .then(res => res.json());

const checkWord = async (id, word) => id
  ? fetch(`${API_URL}/word/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word }),
  })
    .then(res => res.json())
  : {}

const App = () => {
  const [word, setWord] = useState({});

  useEffect(() => {
    getWord().then(setWord);
  }, []);

  return (<div className="main" >
    <h1 className="title" onClick={() => {
      setWord({});
      getWord().then(setWord);
    }}>Scramble</h1>
    <Letters
      word={word}
      checkWord={(id, value) => checkWord(id, value).then(setWord)}
    />
  </div >);
};

export default App;
