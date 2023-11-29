const { PaymentProcessor } = require("./processors/PaymentProcessor");
const { TransactionLoader } = require("./processors/TransactionLoader");


function main() {
    const paymentprocessor = new PaymentProcessor()

    paymentprocessor.process(process.argv[2], process.argv[3] )
    
    paymentprocessor.transactionLoader.printTransactions()


}

main()

