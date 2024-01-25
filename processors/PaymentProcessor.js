const { AccountLoader } = require("./AccountLoader");
const { TransactionLoader } = require("./TransactionLoader");
const { Payment } = require('../models/Payment');
const { DataBase } = require('../data/DataBase')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class PaymentProcessor {
   transactionLoader;
   accountLoader;
   payment;
   database;
    constructor(database) {
        this.transactionLoader = new TransactionLoader()
        this.accountLoader = new AccountLoader()
        this.database = database
        this.payment = new Payment()
    }

    async loadAccountsToDB(accountsPath) {
        const self = this
        await self.accountLoader.loadAccounts(accountsPath)
        self.accountLoader.accounts.forEach(async function(acc) {
            await self.database.setStartBalanceForId(acc.id, acc.balance)
        })
    }

    async processCSVTransactions(accountsPath, transactionPath) {
        const self = this
       await self.accountLoader.loadAccounts(accountsPath)
       await self.transactionLoader.loadPayments(transactionPath, self.accountLoader)
      
        self.transactionLoader.transactions.forEach(async function(trans) {
            await self.payment.processPayment(trans, self.accountLoader, self.database)
        });
        
    }

    printTransactions() {
        this.transactionLoader.transactions.forEach(function(trans) {
            trans.print()
        })
    }

    printAccounts() {
        this.accountLoader.accounts.forEach(function(account) {
            account.print()
        })
    }

    async outputTransactions(path) {
        const writer = createCsvWriter({
        path: path,
        header: [
            { id: 'id', title: 'ID' },
            { id: 'from', title: 'FROM' },
            { id: 'to', title: 'TO' },
            { id: 'amount', title: 'AMOUNT' },
            { id: 'status', title: 'STATUS'},
        ],
        });
        
        const jsonArray = new Array()
        this.transactionLoader.transactions.forEach(function(trans) {
            const json = trans.toJson()
            jsonArray.push(trans.toJson())
        });

        writer.writeRecords(jsonArray)
     }

     async outputAccounts(path) {
        const writer = createCsvWriter({
        path: path,
        header: [
            { id: 'id', title: 'ID' },
            { id: 'balance', title: 'BALANCE' },
        ],
        });
        
        const jsonArray = new Array()
        this.accountLoader.accounts.forEach(function(account) {
            const json = account.toJson()
            jsonArray.push(account.toJson())
        });

        writer.writeRecords(jsonArray)
     }
}

module.exports = { PaymentProcessor }