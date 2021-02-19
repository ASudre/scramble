import React, { useEffect, useState } from 'react';
import './App.scss';
import Letters from './Letters/Letters';
import Moves from './Moves/Moves';
import config from './config';

const getWord = async () => fetch(`${config.API_URL}/word`)
  .then(res => res.json());

const checkWord = async ({ id, value }) => id
  ? fetch(`${config.API_URL}/word/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value }),
  })
    .then(res => res.json())
  : {}

const App = () => {
  const [word, setWord] = useState({});
  const [newWord, setNewWord] = useState({});
  const [finished, setFinished] = useState(false);
  const [moves, setMoves] = useState(0);
  const init = () => {
    setMoves(0);
    getWord().then(setWord);
  }

  useEffect(init, []);

  useEffect(() => {
    if (newWord?.value) {
      checkWord(newWord).then(setWord);
    }
  }, [newWord]);

  useEffect(() => {
    setFinished(word?.value?.every(l => l.rightPosition));
  }, [word]);

  return (
    <div className="main">
      <h1 className="title" onClick={init}>Scramble</h1>
      <Moves value={moves} />
      <Letters
        onDragged={(w, m) => {
          setNewWord(w);
          setMoves(m + 1);
        }}
        word={word}
        finished={finished}
      />
    </div>
  );
};

export default App;
