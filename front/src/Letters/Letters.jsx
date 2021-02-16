import React, { useRef, useEffect, useState } from 'react';
import dragula from 'react-dragula';
import './Letters.scss';

const Letters = ({ word, checkWord }) => {
  const ref = useRef();
  const [drake, setDrake] = useState();

  useEffect(() => {
    if (!drake && ref.current) {
      const d = dragula([ref.current], {
        direction: 'horizontal',
      });
      d.on('dragend', () => {
        const wordId = Array.from(document.getElementsByClassName('container'))[0].id;
        const ids = Array.from(document.getElementsByClassName('letter')).map(e => ({
          id: e.id,
          letter: e.textContent,
        }));
        checkWord(wordId, ids);
      });
      setDrake(d);
    }
  }, [ref, checkWord, drake]);

  return (
    <div className='container' ref={ref} id={word.id} >
      {word.value
        ? word.value.map(({ letter, rightPosition, id }) => (
          <div
            className={`letter ${rightPosition ? "ok" : ""}`}
            key={id}
            id={id}
          >
            {letter}
          </div>
        ))
        : "No word generated"
      }
    </div >);
};

export default Letters;
