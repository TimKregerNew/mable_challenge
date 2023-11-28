const { UserAccount } = require("../models/UserAccount")
const { csvReader } = require("../data/ReadCsv")

const UserEntry = {
    id: 0,
    balance: 1
}

class AccountLoader {
    path;
    accounts;
    constructor(path) {
        this.path = path
        this.accounts = new Array()
    }

    async loadAccounts(path) {
        const self = this
        const reader = new csvReader()
        await reader.readCSV(path)

        reader.csvList.forEach(function(entry){
            const account = new UserAccount(entry[UserEntry.id], entry[UserEntry.balance])
            self.accounts.push(account)
         })
    }
}

module.exports = { AccountLoader, UserEntry}
