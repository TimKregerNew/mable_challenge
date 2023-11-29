const { UserAccount } = require("../models/UserAccount");
const { AccountLoader } = require("../processors/AccountLoader");
const { TransactionLoader, PaymentEntry } = require("../processors/TransactionLoader")

var accountLoader = new AccountLoader();

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await accountLoader.loadAccounts("./tests/mable_acc_balance.csv")
    await loader.loadPayments("./tests/mable_trans.csv", accountLoader)
    expect(loader.transactions.length).toBe(4)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await accountLoader.loadAccounts("./tests/mable_acc_balance.csv")
    await loader.loadPayments("./tests/mable_trans.csv", accountLoader)
    expect(loader.transactions[0].from.id).toBe(1111234522226789)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await accountLoader.loadAccounts("./tests/mable_acc_balance.csv")
    await loader.loadPayments("./tests/mable_trans.csv", accountLoader)
    const id = loader.transactions;[0]
    const transaction = loader.getPaymentById(id)
    expect(loader.transactions[0].to.id).toBe(1212343433335665)
})

test("it loads the array from csv at path", async () => {
    const loader = new TransactionLoader()
    await accountLoader.loadAccounts("./tests/mable_acc_balance.csv")
    await loader.loadPayments("./tests/mable_trans.csv", accountLoader)
    const transaction = loader.getPaymentById(1234)
    expect(transaction).toBe(null)
})