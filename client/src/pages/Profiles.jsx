import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Sidebar, EditTenant } from '../components';
import ReactDOM from 'react-dom'
import { AiOutlineReload } from 'react-icons/ai'
import LoginCheck from '../modules/LoginCheck';
import { MdMode } from 'react-icons/md';
import './style.css'
import { ipAddress } from '../App';

let dataArrInit = []

const Profiles = () => {
  const [popUp, setPopUp] = useState(false);
  const [dataArr, setDataArr] = useState(dataArrInit);
  const [tenantInfo, setTenantInfo] = useState([]);
  const navigate = useNavigate();
  const count = "tenantCount"

  // regex pattern to convert 10 digit number as
  // (123) 456-7890
  const formatPhoneNumber = (input) => {
    var cleaned = ('' + input).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  LoginCheck(navigate);
  useEffect(async () => {

    if (dataArrInit.length != parseInt(localStorage.getItem(count))) {
      dataArrInit = []

      axios.get('http://' + ipAddress + ':5000/api/loadTenants').then((res) => {
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

  const editTenant = (data) => {
    setPopUp(true);
    setTenantInfo(data);
  }

  return (

    <div className="App flex">

      <div className="w-72 sidebar
        dark:bg-secondary-dark-bg
        bg-white shadow-2xl">
        <Sidebar />
      </div>

      <EditTenant trigger={popUp} setTrigger={setPopUp} data={tenantInfo} />

      <div className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
        <div >
          <h2 className="ten__h2">Profiles</h2>
          <div className="container">

            <table className="ten__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>House Number</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataArr.filter(arr => arr[0]["Title"] == "Owner").map((val) => (

                    <tr key={val.Name}>
                      <td>{val[0][`Name`]}</td>
                      <td>{val[0][`House Number`]}</td>
                      <td>{val[0][`Email Address`]}</td>
                      <td>{formatPhoneNumber(val[0][`Phone Number`])}</td>
                      <td className="ten__edit"><button onClick={() => { editTenant(val) }}><MdMode /></button></td>
                    </tr>

                  ))}
                </tbody>
            </table>
            <table className="ten__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Current Tenant</th>
                  <th>House Number</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataArr.filter(arr => arr[0]["Title"] != "Owner").map((val) => (

                  <tr key={val.Name}>
                    <td>{val[0][`Name`]}</td>
                    <td>{val[0][`Current Tenant`]}</td>
                    <td>{val[0][`House Number`]}</td>
                    <td>{val[0][`Email Address`]}</td>
                    <td>{formatPhoneNumber(val[0][`Phone Number`])}</td>
                    <td className="ten__edit"><button onClick={() => { editTenant(val) }}><MdMode /></button></td>
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

export default Profiles