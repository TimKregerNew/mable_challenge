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
    ammount;
    status;

    constructor(from, to, ammount) {
        this.id = uuidv4() 
        this.from = from
        this.to = to
        this.ammount = ammount
        this.status = TransactionStatus.Pending

        return this.id
    }
}

module.exports = {Transaction, TransactionStatus}