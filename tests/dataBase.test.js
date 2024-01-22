const exp = require("constants")
const { DataBase } = require("../data/DataBase")
const  Fs  = require('fs') 
const dbPath = './testy.db'

function cleanUp() {
    Fs.unlinkSync(dbPath)
}
async function newDb(path) {
    const database = new DataBase(path)
    await database.init()
    return database
}

test("it loads initialises the database", async () => {
    const database = new DataBase(dbPath)
    await database.init()
    const exists = Fs.existsSync(dbPath)

    expect(exists).toBe(true)

    cleanUp()

})

test("helper function creates new database with path", async () => {
    const database = await newDb(dbPath)
    const exists = Fs.existsSync(dbPath)

    expect(exists).toBe(true)
    cleanUp()
})

test("it creates a user table", async () => {
    const database = await newDb(dbPath)
    await expect(database.createUserAccountTable()).resolves.not.toThrow()
    cleanUp()
})

test("it doesn't fail if table exists", async () => {
    const database = await newDb(dbPath)
    await database.createUserAccountTable()
    await expect(database.createUserAccountTable()).resolves.not.toThrow()
    cleanUp()
})

test("it won't allow duplicate ids", async () => {
    const database = await newDb(dbPath)
    await database.createUserAccountTable()
    await database.setStartBalanceForId(1, 400)
    database.setStartBalanceForId(1, 500).catch(error => expect(error.message).toMatch('SQLITE_CONSTRAINT: UNIQUE constraint failed: user_account.id'))
    cleanUp()
})

test("it will return value", async () => {
    const database = await newDb(dbPath)
    await database.createUserAccountTable()
    await database.setStartBalanceForId(1, 400)
    const test = await database.getBalanceForId(1)
    expect(test).toBe(400)
    cleanUp()
})

test("it will return -1 if no matches", async () =>  {
    const database = await newDb(dbPath)
    await database.createUserAccountTable()
    await database.setStartBalanceForId(1, 400)
    const test = await database.getBalanceForId(2)
    expect(test).toBe(-1)
    cleanUp()
})

test("it will update balance", async () =>  {
    const database = await newDb(dbPath)
    await database.createUserAccountTable()
    await database.setStartBalanceForId(1, 400)
    await database.updateBalanceForId(1, 707)
    const test = await database.getBalanceForId(1)
    expect(test).toBe(707)
    cleanUp()
})
    


test("it will create transaction table", async () =>  {
    const database = await newDb(dbPath)
    await database.createTransactionTable()
 

})


