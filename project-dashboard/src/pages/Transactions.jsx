import React,{useState,useEffect} from 'react';
import {getAll2} from '../services/databaseaccess';


import {collection,doc,getDocs,addDoc,query,orderBy} from "firebase/firestore";
import {db} from '../services/database'
const database = db();
var dataArr=[];//transactionDetails;

const writeTest = () => {

      console.log(Array.isArray(dataArr));
      console.log(dataArr.length);
};

const Transactions = () => {
    
  useEffect( async ()=> {
    
    if(dataArr.length != parseInt(localStorage.getItem("docCount"))){
      dataArr = [];
      const q = query(collection(database, "Transaction"), orderBy("Number"));

      //const querySnapshot = await getDocs(collection(database, "Transactions"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

      dataArr.push(doc.data());
      console.log('data added to array');
      
      });
      localStorage.setItem("docCount",dataArr.length);
    }else{
      localStorage.setItem("docCount",dataArr.length);

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