const { Transaction, TransactionStatus } = require("./Transaction")
const { UserAccount } = require("./UserAccount")

class Payment {
   
    processPayment(transaction) {
        const ammount = transaction.ammount
        const status = transaction.from.withdraw(ammount)

        if(status == TransactionStatus.Success) {
            transaction.to.deposit(ammount)
        }
        
        transaction.status = status
    }
}

module.exports = { Payment: Payment }