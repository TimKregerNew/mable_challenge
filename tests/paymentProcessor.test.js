const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")
const { Payment } = require("../models/Payment")
const { PaymentProcessor } = require("../processors/PaymentProcessor")


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


