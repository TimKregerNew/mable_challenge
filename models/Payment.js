const { Transaction, TransactionStatus } = require("./Transaction")
const { UserAccount } = require("./UserAccount")

class Payment {
   
    processPayment(transaction) {
        const amount = transaction.amount
        const status = transaction.from.withdraw(amount)

        if(status == TransactionStatus.Success) {
            transaction.to.deposit(amount)
        } 
        
        transaction.status = status
    }

    

}

module.exports = { Payment: Payment }