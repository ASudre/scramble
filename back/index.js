const express = require('express')
const { v4: uuidv4 } = require('uuid');
const randomWords = require('random-words');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const port = 8080

const words = [];

const checkPosition = (word) => ((l, i) => ({
  rightPosition: word[i].letter === l.letter,
  ...l,
}));

app.get('/word', (_, res) => {
  const word = {
    id: uuidv4(),
    value: randomWords()
      .split('')
      .map((letter, index) => ({
        id: uuidv4(),
        letter,
        index,
      })),
  };
  words.push(word);
  res.status(200).json({
    id: word.id,
    value: [...word.value]
      .sort(() => (0.5 - Math.random()))
      .map(checkPosition(word.value)),
  });
})

app.post('/word/:id', (req, res) => {
  const word = words.find(w => w.id === req.params.id);
  res.status(200).json({
    id: word.id,
    value: req.body.word.map(checkPosition(word.value)),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
