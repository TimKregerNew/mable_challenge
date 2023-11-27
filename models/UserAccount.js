const { TransactionStatus } = require("../models/Transaction")

class UserAccount {
    id;
    balance;

    constructor(id, balance) {
        this.id = parseInt(id)
        this.balance = parseFloat(balance)
    }

    deposit(amount) {
        this.balance += amount
        return TransactionStatus.Success
    }

    withdraw(amount) {
        if(this.balance > amount) {
            this.balance -= amount
            return TransactionStatus.Success
        } else {
            return TransactionStatus.InsufficienFunds
        }
    }

}

module.exports = {UserAccount, TransactionStatus}