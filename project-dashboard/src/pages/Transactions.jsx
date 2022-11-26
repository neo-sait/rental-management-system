import React,{useState,useEffect} from 'react';
import {collection,doc,getDocs,addDoc,query,orderBy} from "firebase/firestore";
import {db} from '../services/database'
import './Transactions.css';
import FilterTableComponent from './searchtable';
import PaginationTableComponent from './paginationtable';

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
      
  //     // const q = query(collection(database, "Transaction"), orderBy("Number"));

    
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
<div className="container"><FilterTableComponent /> <PaginationTableComponent /></div>

        
    </div>
  
  );
  
}

export default Transactions;