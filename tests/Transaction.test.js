const { Transaction, TransactionStatus } = require("../models/Transaction")

test("it creates a UUID", () => {
    const transaction = new Transaction(1234,4555, 500.0)

    expect(transaction.id).not.toBeNull
})


// Bad practice but testing properties together
test("it creates a UUID", () => {
    const transaction = new Transaction(1234,4555, 500.0)

    expect(transaction.from).toBe(1234)
    expect(transaction.to).toBe(4555)
    expect(transaction.ammount).toBe(500.0)
    expect(transaction.status).toBe(TransactionStatus.Pending)
})
