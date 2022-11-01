import React,{useState,useEffect} from 'react';
import {AiOutlineReload} from 'react-icons/ai';


import {collection,doc,getDocs,addDoc,query,orderBy} from "firebase/firestore";
import {db} from '../services/database'
import './Transactions.css';


const database = db();
var dataArrInit=[];

const writeTest = () => {

      console.log(Array.isArray(dataArr));
      console.log(dataArr.length);
};


const Transactions = () => {
  const [dataArr,setDataArr] = useState(dataArrInit);
  const [order,setOrder] = useState("asc");

  

 


  useEffect( async ()=> {
    console.log('use effect triggered');
    if(dataArrInit.length != parseInt(localStorage.getItem("docCount"))){
      dataArrInit = [];
      
      const q = query(collection(database, "Transaction"), orderBy("Number"));

    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log('trying');
      dataArrInit.push(doc.data());
    
      console.log('data added to array');
      
      }
      
      );
      console.log('swapping added to array');
      console.log('newarr is ' + dataArrInit.length);
      
   
      setDataArr(dataArrInit);
      
      console.log('dataarr is ' + dataArr.length);

      localStorage.setItem("docCount",dataArrInit.length);
    }else{
      localStorage.setItem("docCount",dataArrInit.length);

    }

  });


  const sorting = (col) => { 
    if (order === "asc"){
      const sorted = [...dataArr].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
      setDataArr(sorted);
      setOrder("desc");
    }
    else if (order === "desc"){
      const sorted = [...dataArr].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
      setDataArr(sorted);
      setOrder("asc");
    }
  };

  return (
    
    <div>
        <h2>Transactions History</h2>
      <div class="container">
      <table class="transactions-table">
        <thead>
          <tr>
            <th onClick={()=>sorting("Number")}>Num</th>
            <th onClick={()=>sorting("Address")}>Address</th>
            <th onClick={()=>sorting("HouseNum")}>House #</th>
            <th onClick={()=>sorting("Date")}>Date</th>
            <th onClick={()=>sorting("DatePaid")}>Date Paid</th>
            <th onClick={()=>sorting("Year")}>Year</th>
            <th>Month</th>
            <th onClick={()=>sorting("YearNum")}>Year #</th>
            <th onClick={()=>sorting("PayerName")}>Name</th>
            <th onClick={()=>sorting("PayerTitle")}>Title</th>
            <th onClick={()=>sorting("Payment")}>Payment</th>
            <th onClick={()=>sorting("PaymentMethod")}>Method</th>
            <th onClick={()=>sorting("Desc")}>Desc</th>
            <th onClick={()=>sorting("Type")}>Type</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
        {dataArr.map((val) => (
            <tr>
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
      <div className="items-center gap-2 ml-2 mt-3 flex text-s tracking-tight dark:text-white text-slate-500"><AiOutlineReload/><button onClick='location.reload();'>Reload</button></div>
      
    </div>
    
  
  );
  
}

export default Transactions