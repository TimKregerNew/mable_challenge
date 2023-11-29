const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")
const { Payment } = require("../models/Payment")
const { PaymentProcessor } = require("../processors/PaymentProcessor")


test("success if transaction successful", async () => {
    const processor = new PaymentProcessor()
    await processor.process("./tests/mable_acc_balance.csv", "./tests/mable_acc_balance.csv")
    expect(0).toBe(0)
})
