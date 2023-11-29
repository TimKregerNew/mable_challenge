var sqlite3 = require('sqlite3');
const fs = require("fs");
const { isNull } = require('util');
const { resolve } = require('path');
// This class never gets used, I couldn't the db to work. 
// There is a test sequence at the bottom.

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
                        console.log(err.message)
                        reject()
                    }
                    console.log('success')
                    resolve()
                }
            )
        })
    

    }

    async insertValue() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.run(
                'INSERT INTO user_account (id, balance) VALUES (1, 500.0)', (err) => {
                    if(err) {
                        console.log(err.message)
                        reject()
                    }
                    console.log('success')
                    resolve()
                }
            )
        })
    } 
    
    async dumpValues() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.all(
                'SELECT * FROM user_account', (err, data) => {
                    if(err) {
                        reject()
                    }
                    resolve()
                }
            )
        })
    }

    closeDb() {
        this.db.close()
    }
}
module.exports = { DataBase }

/*
async function test() {
    var db = new DataBase('./test.db')

    await db.init()
    await db.createUserTable()
    await db.insertValue()
    await db.dumpValues()
    await db.closeDb()
}

test()
*/