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

  increaseWinnerScore: function(callback){
    connection.query(`UPDATE scores SET score = ${userName} WHERE username = ${userName}`, function (error, results, fields) {
      if (error){
        console.log(error)
      } else {
        callback(results);
      }
    });

  }
}

// module.exports.getScores = getScores;