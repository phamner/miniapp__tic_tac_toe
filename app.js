console.log('app.js is working!');

var board = [0,0,0,0,0,0,0,0,0];
// var unoccupiedSquares = [0,1,2,3,4,5,6,7,8];
var counter = 2;
var XorOCounter = function(){
  if (counter % 2 === 0) {
    return 'X'
  } else {
    return 'O'
  }
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
      for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
        document.getElementsByClassName('cell')[i].removeEventListener("click", addPiece)
      }
      return 'X has won!';

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
        for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
          document.getElementsByClassName('cell')[i].removeEventListener("click", addPiece)
        }
        return 'O has won';
      }



  console.log('checking but no winner found yet!')
}

// var selectRandomSquare = function(){
//   var randomIndex = Math.floor(Math.random() * unoccupiedSquares.length);
//   // console.log('randomIndex: ',randomIndex, 'randomNumber: ', unoccupiedSquares[randomIndex]);
//   console.log('index: ', randomIndex, 'placing piece on position: ', unoccupiedSquares[randomIndex])
//   return randomIndex;
// }

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




// var redMove = function(event){
//   console.log('begining of red move: ', unoccupiedSquares)
//   document.getElementById(event.path[0].id).style.backgroundColor = 'red';
//   unoccupiedSquares.splice(unoccupiedSquares.indexOf(event.path[0].id), 1);
//   console.log('red move: ', event.path[0].id)

//   setTimeout(blueMove, 300);
//   console.log('end of red move: ', unoccupiedSquares)
// }

// var blueMove = function() {
//   console.log('begining of blue move: ', unoccupiedSquares)

//   var randomIndex = selectRandomSquare();
//   document.getElementById(unoccupiedSquares[randomIndex]).style.backgroundColor = 'blue';
//   unoccupiedSquares.splice(randomIndex, 1)
//   console.log('end of blue move: ', unoccupiedSquares)

// }



for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
  document.getElementsByClassName('cell')[i].addEventListener("click", addPiece)
}

