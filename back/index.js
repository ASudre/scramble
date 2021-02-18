const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const randomWords = require('random-words');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 204,
};

const port = 8080

const words = [];

const checkPositions = (word) => ((l, i) => ({
  rightPosition: word[i].letter === l.letter,
  ...l,
}));

app.get('/word', cors(corsOptions), (_, res) => {
  const word = {
    id: uuidv4(),
    value: randomWords()
      .split('')
      .map((letter) => ({
        id: uuidv4(),
        letter,
      })),
  };
  words.push(word);
  res.status(200).json({
    id: word.id,
    value: [...word.value]
      .sort(() => (0.5 - Math.random()))
      .map(checkPositions(word.value)),
  });
})

app.options('/word/:id', cors(corsOptions))
app.post('/word/:id', cors(corsOptions), (req, res) => {
  const word = words.find(w => w.id === req.params.id);
  const toCheckWord = req.body;
  res.status(200).json({
    id: word.id,
    value: toCheckWord.value.map(checkPositions(word.value)),
  });
});

app.listen(port, () => {
  console.log(`Scramble app listening at http://localhost:${port}`)
})
