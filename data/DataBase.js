var sqlite3 = require('sqlite3');
const fs = require("fs");
const { isNull } = require('util');
const { resolve } = require('path');
const { error } = require('console');
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
           
            try {
                self.db = new sqlite3.Database(self.path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
                    if(err) {
                        console.log(err) 
                    } 
                    resolve()
                   
                })
            } catch (error) {
                console.log(error)
                reject()
            }
        })
    }

    async createUserAccountTable() {
        const self = this
        return new Promise(function(resolve, reject) { 
            try {
                self.db.run(
                    'CREATE TABLE IF NOT EXISTS user_account (id INT PRIMARY KEY, balance FLOAT)', (err) => {
                        if(err) {
                        
                        }
                        console.log('success')
                        resolve()
                    })

            } catch (error) {
                console.log(error.message)
                reject()
            }
        })
    

    }

    async setStartBalanceForId(id, value) {
        const self = this
        return new Promise(function(resolve, reject) { 
            try {
                self.db.run(
                    `INSERT INTO user_account (id, balance) VALUES (${id}, ${value})`, (err) => {
                       
                        if(err) {
                            return reject(err)
                        } 
                        resolve()
                    }
                )
            } catch (error) {
                reject()
            }
        })
    } 

    async getBalanceForId(id) {
        const self = this
        return new Promise(function(resolve, reject) { 
            try {
                self.db.all(
                    `SELECT * FROM user_account WHERE id = ${id}`, (err, rows) => {
                       
                        if(err) {
                            return reject(err)
                        } 

                        if(rows.length < 1)
                            return resolve(-1)
                        const value = rows[0]
                        return resolve(value.balance)
                        
                    }
                )
            } catch (error) {
                reject()
            }
        })
    }

    async updateBalanceForId(id, balance) {
        const self = this
        return new Promise(function(resolve, reject) { 
            try {
                self.db.all(
                    `UPDATE user_account SET balance = ${balance}  WHERE id = ${id}`, (err) => {
                       
                        if(err) {
                            return reject(err)
                        } 
                        return resolve()
                        
                    }
                )
            } catch (error) {
                reject()
            }
        })
    }

    
    async dumpValues() {
        const self = this
        return new Promise(function(resolve, reject) { 
            self.db.all(
                'SELECT * FROM user_account', (err, rows) => {
                    if(err) {
                       return reject(err)
                    }

                    rows.forEach(function (row) {
                        console.log(row)
                    })

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


async function test() {
    var db = new DataBase('./test.db')

    await db.init('./test.db')
    await db.createUserAccountTable()
    await db.setStartBalanceForId(1, 700)
    await db.setStartBalanceForId(2, 800)
    await db.setStartBalanceForId(3, 900)
    await db.dumpValues()
}

// test()


