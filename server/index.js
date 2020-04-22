const express = require('express');
const app = express();
const port = 4000;
const { getScores, increaseWinnerScore } = require('../database/index.js');

//middleware typically comes before requests (see below)
//app.use()
app.use(express.static('client'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/scores', (req, res) => {
  console.log('axios GET request has arrived at the server!')
  getScores((data) => {
    res.send(data)
  });
})

app.post('/scores', (req, res) => {
  console.log('REQUEST OBJECT: ', req.body);
  increaseWinnerScore(req.body.score, req.body.username, (data) => {
    res.status(200).send(data)
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))