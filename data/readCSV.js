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
                console.log(row)
                self.csvList.push(row)
            })
            .on("end", function () {
                console.log("finished");
                resolve();
            })
            .on("error", function (error) {
                console.log(error.message);
                reject()
            });

        })
    }
}

module.exports = {csvReader} ;