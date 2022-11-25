import './style.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Sidebar } from '../components';
import {AiOutlineReload} from 'react-icons/ai';

let dataArrInit = [];

const Transactions = () => {
  const [dataArr, setDataArr] = useState(dataArrInit)
  const [order,setOrder] = useState("asc");
  const navigate = useNavigate();
  const count = "transactionsCount";

  let auth = localStorage.getItem("auth");

  axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
      if (authed.data == false){
        navigate("/login");
      }
    })

  
  useEffect(async () => {
    window.addEventListener('storage', ()=>{
      let auth = localStorage.getItem("auth");
      
      axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
        if (authed.data == false){
          navigate("/login");
        }
      })
    })    


    if (dataArrInit.length != parseInt(localStorage.getItem(count))) {
      dataArrInit = []

      axios.get('http://localhost:5000/api/loadTransactions').then( (res)=>{
        dataArrInit = res.data;

        console.log('swapping added to array')
        console.log('newarr is ' + dataArrInit.length)

        setDataArr(dataArrInit)

        console.log('dataarr is ' + dataArr.length)

        localStorage.setItem(count, dataArrInit.length)
      })

    } else {
      localStorage.setItem(count, dataArrInit.length)
    }
  })

  function hoverNote(contains){
    if(contains !== "" ){
      return(
        <div className="trans__hovNote">Note<span className="trans__hovNoteText">{contains}</span></div>
      );
    };
    
  };
  // sorts columns of table
  const sorting = (col) => { 
    

    if (order === "asc"){
      const sorted = [...dataArr].sort(
        (a,b) => typeof a[0][col] == 'number' ? a[0][col] > b[0][col]? 1 : -1 : a[0][col].toLowerCase() > b[0][col].toLowerCase() ? 1 : -1
        );
      setDataArr(sorted);
      setOrder("desc");
    }
    else if (order === "desc"){
      const sorted = [...dataArr].sort(
        (a,b) => typeof a[0][col] == 'number' ? a[0][col] > b[0][col]? 1 : -1 : a[0][col].toLowerCase() > b[0][col].toLowerCase() ? 1 : -1
        );
      setDataArr(sorted);
      setOrder("asc");
    }
  };

  return (


    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
              
      <div>
        <h2 className="trans__h2">Transactions History</h2>
      <div className="container">
      <table className="trans__table">
        <thead>
          <tr>
            <th onClick={()=>sorting("Number")}>Num</th>
            <th onClick={()=>sorting("Address")}>Address</th>
            <th onClick={()=>sorting("HouseNum")}>House #</th>
            <th onClick={()=>sorting("Date")}>Date</th>
            <th onClick={()=>sorting("DatePaid")}>Date Paid</th>
           {/*  <th onClick={()=>sorting("Year")}>Year</th>
            <th>Month</th>
            <th onClick={()=>sorting("YearNum")}>Year #</th>*/ } 
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
              <td className="trans__num">{val[0].Number}</td>
              <td>{val[0].Address}</td>
              <td className="trans__num">{val[0].HouseNum}</td>
              <td>{val[0].Date}</td>
              <td>{val[0].DatePaid}</td>
             {/* <td id='num'>{val.Year}</td>
              <td id='num'>{val.Month}</td>
              <td id='num'>{val.YearNum}</td>
              columns not needed for user to see*/ } 
              <td>{val[0].PayerName}</td>
              <td>{val[0].PayerTitle}</td>
              <td className="trans__num">{val[0].Payment}</td>
              <td>{val[0].PaymentMethod}</td>
              <td>{val[0].Desc}</td>
              <td>{val[0].Type}</td>
              <td>{hoverNote(val[0].Notes)}</td>
            </tr>
          
        ))}
      </tbody>
      </table>
    </div>
      <div className="items-center gap-2 ml-2 mt-3 flex text-s tracking-tight dark:text-white text-slate-500"><AiOutlineReload/><button onClick="this.forceUpdate();">Reload</button></div>
      
    </div>
    
    
      </div>

    </div>

  );

}

export default Transactions