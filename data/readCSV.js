const fileStream = require("fs");
const { parse } = require("csv-parse");
class csvReader {
    csvList;
    constructor() {
        this.csvList = new Array()

    }
 
    printList() {
       this.csvList.forEach(function(entry){
           console.log(entry)
        })
    }

    async readCSV(path) {
        var self = this
    
        return new Promise(function(resolve, reject) {
            fileStream.createReadStream(path) 
            .pipe(parse({ delimiter: ",", from_line: 1}))
            .on("data", function (row) {
                self.csvList.push(row)
            })
            .on("end", function () {
                resolve();
            })
            .on("error", function (error) {
                reject()
            });

        })
    }
}

module.exports = {csvReader} ;