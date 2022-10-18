import React,{useState,useEffect} from 'react';
import {getAll2} from '../services/databaseaccess';
//import ReactDOM from "react-dom/client";

import {collection,doc,getDocs,addDoc,query,orderBy} from "firebase/firestore";
import {db} from '../services/database'
const database = db();
var dataArrInit = [];//transactionDetails;

const writeTest = () => {

      console.log(Array.isArray(dataArr));
      console.log(dataArr.length);
};

const Transactions = () => {
  const [dataArr,setDataArr] = useState(dataArrInit);
  useEffect( async ()=> {
    console.log('use effect triggered');
    if(dataArrInit.length != parseInt(localStorage.getItem("docCount"))){
      dataArrInit = [];
      //dataArr=[];
      const q = query(collection(database, "TransactionTest"), orderBy("Number"));

      //const querySnapshot = await getDocs(collection(database, "Transactions"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log('trying');
      dataArrInit.push(doc.data());
      //setDataArr((dataArr) => [ ...dataArr , doc.data()]);
      console.log('data added to array');
      
      }
      
      );
      console.log('swapping added to array');
      console.log('newarr is ' + dataArrInit.length);
      
      //b setDataArr(dataArr =>  [...dataArr,dataArrInit] );
      setDataArr(dataArrInit);
      
      console.log('dataarr is ' + dataArr.length);

      localStorage.setItem("docCount",dataArrInit.length);
    }else{
      localStorage.setItem("docCount",dataArrInit.length);

    }
      

    

  });

  return (
    
    <div >
      <div>
        Transactions
      </div>
      <div>
      <table>
        <thead>
          <tr>
          <th>Num</th>
          <th>Address</th>
          <th>House #</th>
          <th>Date</th>
          <th>Date Paid</th>
          <th>Year</th>
          <th>Month</th>
          <th>Year #</th>
          <th>Name</th>
          <th>Title</th>
          <th>Payment</th>
          <th>Method</th>
          <th>Desc</th>
          <th>Type</th>
          <th>Notes</th>
          </tr>
        </thead>
        <tbody>
        {dataArr.map((val) => (
          
            <tr key={val.Number}>
              <td>{val.Number}</td>
              <td>{val.Address}</td>
              <td>{val.HouseNum}</td>
              <td>{val.Date}</td>
              <td>{val.DatePaid}</td>
              <td>{val.Year}</td>
              <td>{val.Month}</td>
              <td>{val.YearNum}</td>
              <td>{val.PayerName}</td>
              <td>{val.PayerTitle}</td>
              <td>{val.Payment}</td>
              <td>{val.PaymentMethod}</td>
              <td>{val.Desc}</td>
              <td>{val.Type}</td>
              <td>{val.Notes}</td>
            </tr>
          
        ))}
      </tbody>
      </table>
    </div>
      <div><button onClick={writeTest}>reload</button></div>
      <div><button onClick={writeTest}>Arr test</button></div>
    </div>
    
    
  );
  
}

export default Transactions