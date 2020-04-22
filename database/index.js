const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);



module.exports = {

  getScores: function(callback){
    connection.query('SELECT * FROM scores', function (error, results, fields) {
      if (error){
        console.log(error)
      } else {
        callback(results);
      }
    });
  },

  increaseWinnerScore: function(score, username, callback){
    // console.log(`UPDATE scores SET score = score + 1 WHERE username = '${username}'`);
    connection.query(`UPDATE scores SET score = score + 1 WHERE username = '${username}'`, function (error, results, fields) {
      if (error){
        callback(error)
      } else {
        callback(results);
      }
    });
  }
}
