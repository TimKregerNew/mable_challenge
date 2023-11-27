const { DataBase } = require("../data/DataBase")
const fileStream = require("fs");

var path = './testDb'

test("database is create", ()  => {   
     var db = new DataBase(path)
     expect(db.path).toEqual(path)
})

test("if database is creates", () => {
    var path = './testDb'
    var db = new DataBase(path)
    expect(db.db).toBeNull()
})

test("if database is creates", async () => {
    var path = './testDb'
    var db = new DataBase(path)
    await db.init()
    expect(db.db).not.toBeNull()
})

test("create user table", async () => {
    var path = './testDb'
    var db = new DataBase(path)
    await db.init()
    await db.createUserTable()
})

test("insert values", async () => {
    var path = './testDb'
    var db = new DataBase(path)
    await db.init()
    await db.insertValue()
})

test("insert values", async () => {
    var path = './testDb'
    var db = new DataBase(path)
    await db.init()
    await db.dumpValues()
})