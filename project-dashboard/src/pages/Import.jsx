import React, { CSSProperties } from 'react';
//import {firestore }from '../services/firebase.js';
//import {collection,doc,getDocs,addDoc} from 'firestore';
//import 'firebase/compat/auth';
//import {add} from '../services/databaseaccess.js';
//import 'firebase/compat/firestore';
import papa from 'papaparse';

let file = null;
var dataArr = [];
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
        console.log(responses.data.length, responses);
        //dataArr.forEach(e => add('Transactions','',e) );
      }
    });
  };

const Import = () => {
    
  return (
    <div>
         <input type="file" id="csv-file" accept=".csv" onChange={handleChange}></input>
         <button onClick={importCSV}>Click Me</button>
    </div>
  )
}

export default Import