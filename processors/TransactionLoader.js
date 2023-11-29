const { Transaction, TransactionStatus } = require("../models/Transaction")
const { csvReader } = require("../data/ReadCsv")

const TransactionEntry = {
    from: 0,
    to: 1,
    amount: 2
}


class TransactionLoader {
    path;
    transactions;
        constructor() {
            this.transactions = new Array()
        }

        async loadPayments(path, accountLoader) {
            this.path = path
            const self = this
            const reader = new csvReader()
            const loader = accountLoader
            await reader.readCSV(path)

            reader.csvList.forEach(function(entry){ 
                const fromUser = accountLoader.getAccountById(parseInt(entry[TransactionEntry.from]))
                const toUser = accountLoader.getAccountById(parseInt(entry[TransactionEntry.to]))
                const amount = parseFloat(entry[TransactionEntry.amount])
                const transaction = new Transaction(fromUser, toUser, amount )
                self.transactions.push(transaction)
             })
        }

        getPaymentById(id) {
            const account = this.transactions.find(pay => pay.id === id)
            if(account === undefined) {
                return null
            }
            return account
        }

        printTransactionStatus(transaction) {
            console.log("TransactionID " + transaction.id + " Status " + transaction.status)
        }

        printTransactions() {
            this.transactions.forEach(function(entry) {
                printTransactionStatus(entry)
            })
        }
}

module.exports = {TransactionLoader}


