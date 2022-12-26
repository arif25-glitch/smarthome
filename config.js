const mysql = require("mysql")

myDatabase = 'smartelectronic';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: myDatabase
});

db.connect((err) => {
    if(err) throw err;
    console.log(`Database Connected To ${myDatabase}`);
});

module.exports = db;