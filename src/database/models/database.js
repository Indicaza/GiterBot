//
//
//
const sqlite3 = require('sqlite3')
let path = require('path');


const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), err => {
	if (err) return console.error(err.message); else {
		console.log('sqlite3 connection succeeded');
		return db;
	}
});


module.exports = {db};