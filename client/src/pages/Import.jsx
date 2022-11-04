import React, { CSSProperties } from 'react';
import axios from 'axios'
import papa from 'papaparse';

let file = null;
var dataArr = [];
let output = [];
//const database = db();

const handleChange = ({ target: { files } }) => {
  file = files[0];
};
//const colRef = collection(firestore,'Transactions')
const importCSV = () => {

    function asyncAdd(){

    }
    
    console.log(file, "file");
    dataArr = papa.parse(file, {
      delimiter: "",
      chunkSize: 3,
      header: true,
      complete: function(responses) {
        console.log(responses.data.length)
        //console.log(responses.data.length, responses);
        output = responses.data;
        //responses.data.forEach(e => output.push(e) );
        //console.log(output);
        console.log('uploading');
        axios.post('http://localhost:5000/api/importCSV',{out: output}).then((res) =>{
          console.log('done');
        });
        //output.forEach(element => asyncAdd(element,"Transaction"));
      }
    });
    
    
  };
  
  let i = 0;
  const writeTest = () => {
        //var money = '$1,200.01';
       // console.log( parseFloat(money.substring(1).replace(',','')) );
        //console.log(parseInt(output[i].Month));
        //asyncAdd(output[i],"Transactions")
        i+=50;
        console.log("uploaded index "+ i);
  };



const Import = () => {
    
  return (
    <div>
         <input type="file" id="csv-file" accept=".csv" onChange={handleChange}></input>
         <button onClick={importCSV}>Click Me</button>
         <div><button onClick={writeTest}>write test</button></div>
         
    </div>
  )
}

export default Import