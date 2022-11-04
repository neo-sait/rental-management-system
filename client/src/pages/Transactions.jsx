import './Transactions.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Sidebar } from '../components';
import {AiOutlineReload} from 'react-icons/ai';

let dataArrInit = [];

const Transactions = () => {
  let navigate = useNavigate();
  let auth = localStorage.getItem("auth");

  // temporary, soon add hash verification
  axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
      if (authed.data == false){
        navigate("/login");
      }
    })
  
  const [dataArr, setDataArr] = useState(dataArrInit)

  
  useEffect(async () => {
    window.addEventListener('storage', ()=>{
      let auth = localStorage.getItem("auth");

      // temporary, soon add hash verification
      axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
        if (authed.data == false){
          navigate("/login");
        }
      })
    })    


    if (dataArrInit.length != parseInt(localStorage.getItem("docCount"))) {
      dataArrInit = []

      axios.get('http://localhost:5000/api/loadTransactions').then( (res)=>{
        dataArrInit = res.data;

        console.log('swapping added to array')
        console.log('newarr is ' + dataArrInit.length)

        setDataArr(dataArrInit)

        console.log('dataarr is ' + dataArr.length)

        localStorage.setItem("docCount", dataArrInit.length)
      })

    } else {
      localStorage.setItem("docCount", dataArrInit.length)
    }
  })

  return (

    <div className="App flex">

      <div className="w-72 fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
              
      <div>
        <h2>Transactions History</h2>
      <div class="container">
      <table class="transactions-table">
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
            <tr>
              <td>{val[0].Number}</td>
              <td>{val[0].Address}</td>
              <td>{val[0].HouseNum}</td>
              <td>{val[0].Date}</td>
              <td>{val[0].DatePaid}</td>
              <td>{val[0].Year}</td>
              <td>{val[0].Month}</td>
              <td>{val[0].YearNum}</td>
              <td>{val[0].PayerName}</td>
              <td>{val[0].PayerTitle}</td>
              <td>{val[0].Payment}</td>
              <td>{val[0].PaymentMethod}</td>
              <td>{val[0].Desc}</td>
              <td>{val[0].Type}</td>
              <td>{val[0].Notes}</td>
            </tr>
          
        ))}
      </tbody>
      </table>
    </div>
      <div className="items-center gap-2 ml-2 mt-3 flex text-s tracking-tight dark:text-white text-slate-500"><AiOutlineReload/><button onClick="location.reload();">Reload</button></div>
    </div>
    
    
      </div>

    </div>

  );

}

export default Transactions