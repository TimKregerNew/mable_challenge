const { PaymentProcessor } = require("./processors/PaymentProcessor");
const { TransactionLoader } = require("./processors/TransactionLoader");


async function main() {
    const paymentprocessor = new PaymentProcessor()
    await paymentprocessor.dataBaseInit()
    
    await paymentprocessor.processCSVTransactions(process.argv[2], process.argv[3] )

    console.log("ACCCOUNTS \n")
    paymentprocessor.printAccounts()
    console.log("\n\TRANSACTIONS \n")
    paymentprocessor.printTransactions()
   
    await paymentprocessor.outputAccounts(process.argv[4])
    await paymentprocessor.outputTransactions(process.argv[5])
}

main()

