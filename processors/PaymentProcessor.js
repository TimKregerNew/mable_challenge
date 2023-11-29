const { AccountLoader } = require("./AccountLoader");
const { TransactionLoader } = require("./TransactionLoader");
const { Payment } = require('../models/Payment')

class PaymentProcessor {
   transactionLoader;
   accountLoader;
    constructor(accountsPath, transactionPath) {
        this.transactionLoader = new TransactionLoader()
        this.accountLoader = new AccountLoader()
    }

    async process(accountsPath, transactionPath) {
        const self = this
        self.transactionLoader.loadPayments(transactionPath)
        self.accountLoader.loadAccounts(accountsPath)
        self.transactionLoader.payments.forEach(function(trans) {
            self.process(trans)
        });
    }
}

module.exports = { PaymentProcessor }