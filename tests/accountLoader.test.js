const { UserAccount } = require("../models/UserAccount")
const { AccountLoader, UserEntry } = require("../processors/AccountLoader")

test("it loads the array from csv at path", async () => {
    const loader = new AccountLoader()
    await loader.loadAccounts("./tests/mable_acc_balance.csv")
    expect(loader.accounts.length).toBe(5)
})

test("array contains UserAccount", async () => {
    const loader = new AccountLoader()
    await loader.loadAccounts("./tests/mable_acc_balance.csv")
    expect(loader.accounts[0].id).toBe(1111234522226789)
    expect(loader.accounts[0].balance).toBe(5000.0)
})