
import csv from 'csv-parser';



import fs from 'fs';
import stripBom from 'strip-bom-stream';


//fs.createReadStream('datacsv - Copy.csv').pipe(csv({})).on('data',(data) => results.push(data)).on('end', () => {console.log(results)});
//const stripBom = require('strip-bom-stream');
function parseCSV(){
    const results =[];
    fs.createReadStream(filePath)
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        //results.forEach(e => add('Transaction',e.Date,e));
        //console.log(results);
    });
  return results
}

module.exports = {parseCSV};