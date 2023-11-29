const { Transaction, TransactionStatus } = require("./Transaction")
const { UserAccount } = require("./UserAccount")

// Is a skeleton  class to help test logic
// Ideally it would perform the payment at the bank asynchrounously and only update once the transaction status' are confirmed
// My thinking was to use a message queue to the payment service and wait for a return message once transaction is complete
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