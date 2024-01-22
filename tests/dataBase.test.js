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
})

