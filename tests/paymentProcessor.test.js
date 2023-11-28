const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")
const { PaymentProcessor } = require("../processors/PaymentProcessor")

test("success if transaction successful", () => {
    const from = new UserAccount(1234, 500.0)
    const to = new UserAccount(4555, 1000)
    const transaction = new Transaction(from, to, 200.0)
    const payment = new PaymentProcessor()
    payment.processPayment(transaction)
    expect(transaction.status).toBe(TransactionStatus.Success)
})

test("payment updated balances", () => {
    const from = new UserAccount(1234, 500.0)
    const to = new UserAccount(4555, 1000.0)
    const transaction = new Transaction(from, to, 200.0)
    const payment = new PaymentProcessor()
    payment.processPayment(transaction)
    expect(transaction.from.balance).toBe(300.0)
    expect(transaction.to.balance).toBe(1200.0)
})

test("insufficient funds returns if balance isn't enough", () => {
    const from = new UserAccount(1234, 500.0)
    const to = new UserAccount(4555, 1000)
    const transaction = new Transaction(from, to, 1000.0)
    const payment = new PaymentProcessor()
    payment.processPayment(transaction)
    expect(transaction.status).toBe(TransactionStatus.InsufficienFunds)
})

test("don't update balances if insufficient funds", () => {
    const from = new UserAccount(1234, 500.0)
    const to = new UserAccount(4555, 1000.0)
    const transaction = new Transaction(from, to, 1000.0)
    const payment = new PaymentProcessor()
    payment.processPayment(transaction)
    expect(transaction.from.balance).toBe(500.0)
    expect(transaction.to.balance).toBe(1000.0)
})