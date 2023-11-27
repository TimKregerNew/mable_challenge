const { csvReader } = require("../data/ReadCsv")


test("array is valid", async () => {
    const reader = new csvReader()
    await reader.readCSV("./tests/mable_acc_balance.csv")
    reader.printList()
    expect(reader.csvList.length).toBe(5)
})