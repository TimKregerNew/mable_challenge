# mable_challenge
Code challenge for mable. This is a response to the technical assignment for the Mable technical interview. It is a command line application which takes a csv of accounts and a csv of transactions. It will process the transactions and return csv's with the new account balances and transaction status'. The project is written using NodeJS. 

## Run instructions 

- All dependencies have been commited to the repository so no configuration is necessary. 
- After cloning this reposistory, use a CLI to get to the directory.
- Tests are using the Jest framework. To run the tests just type `jest` in the CLI
- To run the app enter this command `node main.js tests/mable_acc_balance.csv tests/mable_trans.csv outAccounts.csv outTrans.csv`. This takes the 2 input files, processes the transactions and returns the resultant account balances and transactions as separate files.

## Further Work

This really just forms the basis of logice for the challenge. The missing pieces are committing the transaction and account detail to a persistant store, effecting the actual transactions with a payment provider. Also there is little to no error handling. 

Initial Database implementation was started but I soon realised this is probably beyond the scope of this excercise. Also I thought perhaps an Event Store would probably be a better persistant model ofr this type of work.

I had initially thought that we should use a message queue to handle the asynchronous nature of the payments to provider. This would allow for failed transactions to be reattempted and update the transaction for each attempt(should probably be limited to 5 retries). If the transaction fails then re-add the transaction to the message queue. 

There is no real error handling anywhere in the project which is a major limitation. As the project is esstially a logic excercise with little dependency on external functions it can maintain a happy path. If a payment frame work and database was added it would need to handle errors associated with API and Database errors.



