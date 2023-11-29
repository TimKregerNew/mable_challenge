const { Transaction, TransactionStatus } = require("../models/Transaction")
const { csvReader } = require("../data/ReadCsv")

const PaymentEntry = {
    from: 0,
    to: 1,
    amount: 3
}


class TransactionLoader {
    path;
    payments;
        constructor() {
            this.payments = new Array()
        }

        async loadPayments(path) {
            this.path = path
            const self = this
            const reader = new csvReader()
            await reader.readCSV(path)

            reader.csvList.forEach(function(entry){
                const transaction = new Transaction(parseInt(entry[PaymentEntry.to]), parseInt(entry[PaymentEntry.from]), parseFloat(entry[PaymentEntry.amount]))
                self.payments.push(transaction)
             })
        }

        getPaymentById(id) {
            const account = this.payments.find(pay => pay.id === id)
            if(account === undefined) {
                return null
            }
            return account
        }

        printTransactionStatus(transaction) {
            console.log("TransactionID " + transaction.id + " Status " + transaction.status)
        }

        printTransactions() {
            this.payments.forEach(function(entry) {
                printTransactionStatus(entry)
            })
        }
}

module.exports = {TransactionLoader}


