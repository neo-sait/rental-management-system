import React, { CSSProperties } from 'react';
//import {firestore }from '../services/firebase.js';
//import {collection,doc,getDocs,addDoc} from 'firestore';
//import 'firebase/compat/auth';
//import 'firebase/firestore/Timestamp';
//import {add} from '../services/databaseaccess.js';
import 'firebase/compat/firestore';

import {db} from '../services/database';
import {asyncAdd,getAll2} from '../services/databaseaccess';

import papa from 'papaparse';

let file = null;
var dataArr = [];
let output = [];
const database = db();

const handleChange = ({ target: { files } }) => {
  file = files[0];
};
//const colRef = collection(firestore,'Transactions')
const importCSV = () => {
    
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
        console.log(output);
        console.log('uploading');
        output.forEach(element => asyncAdd(element,"Transaction"));
        console.log('done');
      }
    });
    
    
  };
  
  let i = 0;
  const writeTest = () => {
        //var money = '$1,200.01';
       // console.log( parseFloat(money.substring(1).replace(',','')) );
        //console.log(parseInt(output[i].Month));
        asyncAdd(output[i],"Transactions")
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