import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Sidebar } from '../components';
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import './Tenants.css'

let dataArrInit = []

const Tenants = () => {
  const [dataArr, setDataArr] = useState(dataArrInit)

  
  useEffect(async () => {
    console.log('use effect triggered')
    if (dataArrInit.length != parseInt(localStorage.getItem("docCount"))) {
      dataArrInit = []

      /*
      const q = query(collection(database, "Tenants"), orderBy("Name"))

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log('trying')
        dataArrInit.push(doc.data())
        console.log('data added to array')

      }
      )
      */

      axios.get('http://localhost:5000/api/loadTenants').then( (res)=>{
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

  console.log(dataArr);

  return (


    <div className="App flex">

      <div className="w-72 fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <div >
      <h2>Tenants</h2>
      <div class="container">
        <table class="tenants-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Tenant</th>
              <th>House Number</th>
              <th>Email Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((val) => (

              <tr key={val.Name}>
                <td>{val[0][`Name`]}</td>
                <td>{val[0][`Current Tenant`]}</td>
                <td>{val[0][`House Number`]}</td>
                <td>{val[0][`Email Address`]}</td>
                <td>{val[0][`Phone Number`]}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>

  )

}

export default Tenants