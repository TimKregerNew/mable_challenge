const  Fs  = require('fs') 
const { Transaction, TransactionStatus } = require("./models/Transaction")
const { UserAccount } = require("./models/UserAccount")
const { DataBase } = require("./data/DataBase")
const { Payment } = require("./models/Payment")
const { PaymentProcessor } = require("./processors/PaymentProcessor")
const express = require('express');
const app = express();
const PORT = 8888;



async function newDb(path, accountsPath) {
    const database = new DataBase(path)
    await database.init()
    await database.createUserAccountTable()
    await database.createTransactionTable()
    const payproc = new PaymentProcessor(database)
    await payproc.loadAccountsToDB(accountsPath)
    return database
}

const dbPath = './prodDB'
const accountCSVPath = "./tests/mable_acc_balance.csv"

function init() {
    if(!Fs.existsSync(dbPath)) {
        return newDb(dbPath, accountCSVPath)
    } else {
        return new DataBase(dbPath)
    }
}

const db = init()

payment = new Payment()
app.use(express.json())

app.listen(
    PORT,
    () => console.log(`it's alive on http:/localhost:${PORT}`)

)

app.get('/payment', (req, res) => {
    res.status(200).send({
        id: 83219890,
        user: 82390810
    })
})

async function getUserAccount(accountId) {
   const acc = await db.getUserAccountForId(accountId)

}

app.post('/payment', async (req, res) => {
    const { from, to, amount } = req.body
    console.log(from)
    console.log(to)
    console.log(amount)
    // Need to get UserAccounts
    try {
        await getUserAccount(from)
    } catch (error) {
        return console.log(error)
    }
    ß
    const trans = new Transaction(from, to, parseFloat(amount))
    payment.processPayment(trans, null, db)
    res.send({
        "status": "ok",
        "id": trans.id,
        "from": trans.from,
        "to": trans.to,
        "amount": amount

    })
})