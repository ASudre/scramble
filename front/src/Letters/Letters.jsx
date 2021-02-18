import React, { useRef, useEffect, useState } from 'react';
import dragula from 'react-dragula';
import './Letters.scss';

const Letters = ({ word, finished, onDragged }) => {
  const ref = useRef();
  const [drake, setDrake] = useState();

  useEffect(() => {
    if (finished && drake) {
      drake.destroy()
      setDrake(null);
    }
  }, [finished, drake]);

  useEffect(() => {
    if (!finished && !drake && ref.current) {
      const d = dragula([ref.current], {
        direction: 'horizontal',
      });
      d.on('dragend', () => {
        const moves = parseInt(document.getElementById('moves').textContent);
        const newWord = {
          id: document.getElementById('word').ariaLabel,
          value: Array.from(document.getElementsByClassName('letter')).map(e => ({
            id: e.id,
            letter: e.textContent,
          }))
        };
        onDragged(newWord, moves);
      });
      setDrake(d);
    }
  }, [ref, drake, word, onDragged, finished]);

  return (
    <div id="word" className="container" ref={ref} aria-label={word.id}>
      {word.value
        ? word.value.map(({ letter, rightPosition, id }) => (
          <div
            className={`letter ${rightPosition ? 'ok' : ''}`}
            key={id}
            id={id}
          >
            {letter}
          </div>
        ))
        : 'No word generated'
      }
    </div >);
};

export default Letters;
