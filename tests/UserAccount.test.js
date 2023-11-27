const fileStream = require("fs");

const { UserAccount } = require("../models/UserAccount")
const { TransactionStatus } = require("../models/Transaction")

test("it creates a user account", () => {
    const account = new UserAccount(1111234522226789, 5000.0)
    expect(account.balance).not.toBeNull
})

test("it can deposit", () => {
    var account = new UserAccount(1111234522226789, 5000.0)
    var status = account.deposit(1000.0)
    expect(account.balance).toBe(6000.0)
})

test("it can withdraw if balance is enough", () => {
    var account = new UserAccount(1111234522226789, 5000.0)
    var status = account.withdraw(1000.0)
    expect(account.balance).toBe(4000.0)
})

test("it can't withdraw if balance is insufficient", () => {
    var account = new UserAccount(1111234522226789, 5000.0)
    var status = account.withdraw(10000.0)
    expect(account.balance).toBe(5000.0)
})


test("it returns succes status if balance is sufficient", () => {
    var account = new UserAccount(1111234522226789, 5000.0)
    var status = account.withdraw(1000.0)
})

test("it return insufficent funds status if balance is insufficient", () => {
    var account = new UserAccount(1111234522226789, 5000.0)
    var status = account.withdraw(100000.0)
    expect(status).toBe(TransactionStatus.InsufficienFunds)
})