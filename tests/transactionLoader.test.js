const { UserAccount } = require("../models/UserAccount")
const { TransactionLoader, PaymentEntry } = require("../processors/TransactionLoader")

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await loader.loadPayments("./tests/mable_trans.csv")
    expect(loader.transactions.length).toBe(4)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await loader.loadPayments("./tests/mable_trans.csv")
    expect(loader.transactions[0].to).toBe(1111234522226789)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await loader.loadPayments("./tests/mable_trans.csv")
    const id = loader.transactions;[0]
    const transaction = loader.getPaymentById(id)
    expect(loader.transactions[0].to).toBe(1111234522226789)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await loader.loadPayments("./tests/mable_trans.csv")
    const transaction = loader.getPaymentById(1234)
    expect(transaction).toBe(null)
})