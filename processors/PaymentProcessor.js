const { Transaction, TransactionStatus } = require("../models/Transaction")
const { UserAccount } = require("../models/UserAccount")

class PaymentProcessor {
   
    processPayment(transaction) {
        const ammount = transaction.ammount
        const status = transaction.from.withdraw(ammount)

        if(status == TransactionStatus.Success) {
            transaction.to.deposit(ammount)
        }
        
        transaction.status = status
    }
}

module.exports = { PaymentProcessor }