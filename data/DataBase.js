var sqlite3 = require('sqlite3');
const fs = require("fs");
const { isNull } = require('util');
const { resolve } = require('path');

class DataBase {
    db;
    path;

    constructor(path) {
        this.path = path 
        this.db = null
    }


    async init() {
        const self = this
        return new Promise(function(resolve, reject) {  
            self.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
                if(err) {
                    reject()
                } 

                resolve()
            })
        })
    }

    async createUserTable() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.run(
                'CREATE TABLE IF NOT EXISTS user_account (id INT, balance FLOAT)', (err) => {
                    if(err) {
                        reject()
                    }
                    resolve()
                }
            )
        })
    

    }
        /*
        this.db.run(
            'INSERT INTO user_account(id, balance) VALUES(1, 500.0)', ['C'], (err) => {
                if(err) {
                    return console.log(err.message);
                }
            } 
        )

        this.db.all("SELECT * FROM user_account", function(err,rows){
            console.log("got it")
        rows.array.forEach(element => {
            console.log("hi")
        });
        });
        resolve()
        */
    
    async insertValue() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.run(
                'INSERT INTO user_account (id, balance) VALUES (1, 500.0)', (err) => {
                    if(err) {
                        reject()
                    }
                    resolve()
                }
            )
        })
    } 
    
    async dumpValues() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.run(
                'SELECT * FROM user_account', (err, data) => {
                    if(err) {
                        reject()
                    }
                    resolve()
                }
            )
        })
    }
}
module.exports = { DataBase }