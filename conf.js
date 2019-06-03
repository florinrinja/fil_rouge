const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  '', // le mot de passe
database :  'movie', // le nom de la base de données
});

//the database
// mysql> describe movie;
// +---------+--------------+------+-----+---------+----------------+
// | Field   | Type         | Null | Key | Default | Extra          |
// +---------+--------------+------+-----+---------+----------------+
// | id      | int(11)      | NO   | PRI | NULL    | auto_increment |
// | name    | varchar(100) | NO   |     | NULL    |                |
// | trailer | varchar(100) | NO   |     | NULL    |                |
// | rotten  | varchar(100) | NO   |     | NULL    |                |
// | poster  | varchar(255) | NO   |     | NULL    |                |
// | genre   | varchar(50)  | NO   |     | NULL    |                |
// | date    | date         | YES  |     | NULL    |                |
// | color   | tinyint(1)   | YES  |     | NULL    |                |
// | score   | int(10)      | YES  |     | NULL    |                |
// +---------+--------------+------+-----+---------+----------------+
// 9 rows in set (0.00 sec)

connection.connect(function(err){
    if(err) throw err;
    console.log("connected")
});

module.exports = connection;