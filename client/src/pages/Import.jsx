import React, { CSSProperties } from 'react';
import { Sidebar } from '../components';
import axios from 'axios'
import papa from 'papaparse';
import classes from "./Import.module.css"

let file = null;
var dataArr = [];
let output = [];

const handleChange = ({ target: { files } }) => {
  file = files[0];
  let display = document.getElementById("display");
  display.innerHTML = files[0].name;
  console.log(files);
};

const importCSV = () => {

  if (file != null){
    let display = document.getElementById("display");
    console.log(file, "file");
    dataArr = papa.parse(file, {
      delimiter: "",
      chunkSize: 3,
      header: true,
      complete: function (responses) {
        console.log(responses.data.length)
        output = responses.data;
  
        // express has a limit on sending data through post requests, the idea is to seperate the imported dataset into chunks
        // this should allow YEARS of archived data to be sent through with ease, regardless if the size exceeds the limit.
        let chunkSize = 100;
  
        for (let i = 0; i < output.length; i += chunkSize) {
          const chunk = output.slice(i, i + chunkSize);
  
          /*
          axios.post('http://localhost:5000/api/importCSV', { out: chunk }).then((res) => {
            console.log(res.data);
          });
          */
        }
        
        // reset frontend logic
        file = null;
        display.innerHTML = "Select CSV File";
        window.alert("Transaction data successfully imported");
      }
    });  
  }else{
    window.alert("No CSV file selected");
  }
};

const Import = () => {

  return (

    <div className="App flex">

      <div className="w-72 sidebar
        dark:bg-secondary-dark-bg
        bg-white shadow-2xl">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <div className={classes.container}>
        <h1 className={classes.title}>Import Transaction CSV File</h1>
      <input type="file" id="import" className={classes.import} accept=".csv" onChange={handleChange}></input>
      <label for="import" id="display" className={classes.display}>Select CSV File</label>
      <button className={classes.importbtn} onClick={importCSV}>Import CSV</button>
      </div>
      </div>
    </div>
  )
}

export default Import