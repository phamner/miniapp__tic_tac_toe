const express = require('express');
const app = express();
const port = 4000;
const { getScores, increaseWinnerScore } = require('../database/index.js');

//middleware typically comes before requests (see below)
//app.use()
app.use(express.static('client'));


app.get('/scores', (req, res) => {
  console.log('axios GET request has arrived at the server!')
  getScores((data) => {
    res.send(data)
  });
})

//HOW DO I HANDLE INCOMING DATA IN AXIOS POST REQUEST TO UPDATE THE DB???
app.post('/scores', (req, res) =>{
  console.log('REQUEST OBJECT: ', req);
  increaseWinnerScore()
  res.send('axios POST request has arrived at the server! (res.send())')
  //need to build a function in database/index.js that querys the db and updates scores.
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))