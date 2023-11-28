const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")

test("it creates a UUID", () => {
    const transaction = new Transaction(1234,4555, 500.0)

    expect(transaction.id).not.toBeNull
})


// Bad practice but testing properties together
test("values are correct", () => {

    const from = new UserAccount(1234, 456, 500.0)
    const to = new UserAccount(4555, 1000)
    const transaction = new Transaction(from, to, 500.0)

    expect(transaction.from.id).toBe(1234)
    expect(transaction.to.id).toBe(4555)
    expect(transaction.ammount).toBe(500.0)
    expect(transaction.status).toBe(TransactionStatus.Pending)
})
