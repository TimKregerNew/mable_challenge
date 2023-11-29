const { v4: uuidv4 } = require('uuid');
const TransactionStatus = {
    Success: 0,
    InsufficienFunds: 1,
    Pending: 2
}

class Transaction {
    id;
    from;
    to;
    amount;
    status;

    constructor(from, to, amount) {
        this.id = uuidv4() 
        this.from = from
        this.to = to
        this.amount = amount
        this.status = TransactionStatus.Pending

        return this.id
    }

    print() {
        console.log("ID: "  + this.id + " FROM: " + this.from.id +  " TO: " + this.to.id + " AMOUNT: " + this.amount + " STATUS: " + this.status)
    }

    toJson() {
        return {
            'id' : this.id,
            'from': this.from.id,
            'to': this.to.id,
            'amount': this.amount,
            'status': this.status
        }
    }
}

module.exports = {Transaction, TransactionStatus}