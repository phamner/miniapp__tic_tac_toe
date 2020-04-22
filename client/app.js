
//Building board, score, and counter system (DO NOT DELETE ANYTHING HERE)
var board = [0,0,0,0,0,0,0,0,0];
var counter = 2;
var playerOneWinCountX = 0;
var playerTwoWinCountO = 0;
var XorOCounter = function(){
  if (counter % 2 === 0) {
    return 'X'
  } else {
    return 'O'
  }
}

var checkScores = function(){
  // console.log('about to call axios get request from the client');
  // Make a request for a user with a given ID
  axios.get('/scores')
  .then(function (response) {
    // handle success
    document.getElementById("playerXScore").innerHTML = `Player 1 (X): ${response.data[0].score}`;
    document.getElementById("playerOScore").innerHTML = `Player 2 (O): ${response.data[1].score}`;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

var incrementScore = function(player, newScore){
  console.log('incrementScore has been called', player, newScore)
  axios.post('/scores', {
    username: player,
    score: newScore
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

var checkForWinConditions = function(){
  if (
    board[0] + board[1] + board[2] === 300 ||
    board[3] + board[4] + board[5] === 300 ||
    board[6] + board[7] + board[8] === 300 ||

    board[0] + board[3] + board[6] === 300 ||
    board[1] + board[4] + board[7] === 300 ||
    board[2] + board[5] + board[8] === 300 ||

    board[6] + board[4] + board[2] === 300 ||
    board[0] + board[4] + board[8] === 300
    ) {
      console.log('X has won!');
      document.getElementById("congratsBanner").innerHTML = 'CONGRATS ON THE WIN PLAYER X'

      for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
        document.getElementsByClassName('cell')[i].removeEventListener("click", addPiece)
      }
      playerOneWinCountX++;
      incrementScore('Player 1', playerOneWinCountX);
      document.getElementById('playerXScore').innerHTML = `Player 1 (X): ${playerOneWinCountX}`;
      checkScores();


    } else if (
      board[0] + board[1] + board[2] === 30 ||
      board[3] + board[4] + board[5] === 30 ||
      board[6] + board[7] + board[8] === 30 ||

      board[0] + board[3] + board[6] === 30 ||
      board[1] + board[4] + board[7] === 30 ||
      board[2] + board[5] + board[8] === 30 ||

      board[6] + board[4] + board[2] === 30 ||
      board[0] + board[4] + board[8] === 30
      ) {
        console.log('O has won!');
        document.getElementById("congratsBanner").innerHTML = 'CONGRATS ON THE WIN PLAYER O'
        for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
          document.getElementsByClassName('cell')[i].removeEventListener("click", addPiece)
        }
        playerTwoWinCountO++
        incrementScore('Player 2', playerTwoWinCountO);
        document.getElementById('playerOScore').innerHTML = `Player 2 (O): ${playerTwoWinCountO}`;
        checkScores();

      }



  console.log('checking but no winner found yet!')
}

var addPiece = function(){
  document.getElementById(event.path[0].id).innerHTML = XorOCounter();
  if (counter % 2 === 0) {
    board[event.path[0].id] = 100;
  } else {
    board[event.path[0].id] = 10;
  }
  document.getElementById(event.path[0].id).removeEventListener("click", addPiece)
  counter++;
  console.log(board);
  checkForWinConditions()
}

var resetGame = function(){
  console.log('game will be reset.');
  board = [0,0,0,0,0,0,0,0,0];
  for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
    document.getElementsByClassName('cell')[i].innerHTML = '';
    document.getElementsByClassName('cell')[i].addEventListener("click", addPiece);
  }
  counter = 2;
  document.getElementById("congratsBanner").innerHTML = '';
  checkScores();

}

for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
  document.getElementsByClassName('cell')[i].addEventListener("click", addPiece)
}

document.getElementById("resetGame").addEventListener("click", resetGame)

//loads up correct data when the page is refreshed.
checkScores();
