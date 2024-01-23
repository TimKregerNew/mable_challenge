const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")
const { Payment } = require("../models/Payment")
const { PaymentProcessor } = require("../processors/PaymentProcessor")
const { DataBase } = require("../data/DataBase")
const  Fs  = require('fs') 

const dbPath = './payment.db'
jest
test("success if transaction successful", async () => {
    const processor = new PaymentProcessor()
    await processor.process("./tests/mable_acc_balance.csv", "./tests/mable_trans.csv")
    expect(processor.accountLoader.accounts.length).toBe(5)
    expect(processor.transactionLoader.transactions.length).toBe(4)
})

test("success if transaction successful", async () => {
    const processor = new PaymentProcessor()
    await processor.process("./tests/mable_acc_balance.csv", "./tests/mable_trans.csv")
    processor.outputTransactions('./test-trans.csv')
})

test("success if transaction successful", async () => {
    const processor = new PaymentProcessor()
    await processor.process("./tests/mable_acc_balance.csv", "./tests/mable_trans.csv")
    processor.outputAccounts('./test-acc.csv')
})


function cleanUp() {
    Fs.unlinkSync(dbPath)
}
async function newDb(path) {
    const database = new DataBase(path)
    await database.init()
    await database.createUserAccountTable()
    await database.createTransactionTable()
    return database
}

test("commits successful payments to database", async () => {
    const db = await newDb('./payment.db')
    const processor = new PaymentProcessor(db)
    await processor.process("./tests/mable_acc_balance.csv", "./tests/mable_trans.csv")
 
    const trans = processor.transactionLoader.transactions[0]
    const dbTrans = await db.getTransaction(trans.id)

    expect(dbTrans.id).toBe(trans.id)
    
    cleanUp()
})
