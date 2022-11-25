import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components';
import ReactDOM from 'react-dom'
import { AiOutlineReload } from 'react-icons/ai'
import './style.css'

let dataArrInit = []

const Tenants = () => {
  const navigate = useNavigate();
  const count = "tenantCount";

  let auth = localStorage.getItem("auth");

  // temporary, soon add hash verification
  axios.post('http://localhost:5000/api/authenticate', { id: auth }).then((authed) => {
    if (authed.data == false) {
      navigate("/login");
    }
  })
  const [dataArr, setDataArr] = useState(dataArrInit)


  useEffect(async () => {

    window.addEventListener('storage', () => {
      let auth = localStorage.getItem("auth");

      axios.post('http://localhost:5000/api/authenticate', { id: auth }).then((authed) => {
        console.log("responsed")
        if (authed.data == false) {
          navigate("/login");
        }
      })
    })

    if (dataArrInit.length != parseInt(localStorage.getItem(count))) {
      dataArrInit = []

      axios.get('http://localhost:5000/api/loadTenants').then((res) => {
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

  return (

    <div className="App flex">

      <div className="w-72 sidebar
        dark:bg-secondary-dark-bg
        bg-white shadow-2xl">
        <Sidebar />
      </div>

      <div className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
        <div >
          <h2 className="ten__h2">Tenants</h2>
          <div class="container">
            <table class="ten__table">
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