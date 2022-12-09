import React, { useState, useEffect } from 'react'
import { Sidebar } from '../components';
import { useNavigate } from 'react-router-dom';
import LoginCheck from '../modules/LoginCheck';
import axios from 'axios'
import "./style.css"
import { ipAddress } from '../App';

const NewTransaction = () => {
  var newTransactionsLoaded = false;
  const navigate = useNavigate();
  var addysArr = [];
  var housenumArr = [];
  var pNameArr = [];
  var descsArr = [];
  var typesArr = [];
  var titlesArr = [];
  var methodsArr = [];
  const [addys, setAddys] = useState([]);
  const [housenum, setNums] = useState([]);
  const [pName, setNames] = useState([]);
  const [descs, setDescs] = useState([]);
  const [types, setTypes] = useState([]);
  const [titles, setTitles] = useState([]);
  const [methods, setMethods] = useState([]);


  const addTransaction = event => {
    event.preventDefault();
    axios.get('http://' + ipAddress + ':5000/api/getTransactionCounter').then((res) => {
      console.log(res);
      const newTransact = {
        Address: document.getElementById('tAdd').value,
        Date: document.getElementById('tDateCharged').value,
        DatePaid: document.getElementById('tDatePaid').value,
        Desc: document.getElementById('tDesc').value,
        HouseNum: document.getElementById('tNum').value,
        Notes: document.getElementById('tNote').value,
        Number: res.data[0].counter + 1,
        PayerName: document.getElementById('tPayer').value,
        PayerTitle: document.getElementById('tTitle').value,
        Payment: parseFloat(document.getElementById('tPay').value),
        PaymentMethod: document.getElementById('tMethod').value,
        Type: document.getElementById('tType').value,
        Month: document.getElementById('tDatePaid').value.substring(5, 7),
        Year: document.getElementById('tDatePaid').value.substring(0, 4),

      };
      console.log(newTransact);
      axios.post('http://' + ipAddress + ':5000/api/newTransaction', newTransact).then((res) => { });
    });
    alert('New transaction created');

  }

  useEffect(() => {
    LoginCheck(navigate);
    if (!newTransactionsLoaded) {
      console.log('lists pulled');
      newTransactionsLoaded = true;
      axios.get('http://' + ipAddress + ':5000/api/getList').then((res) => {
        const arr = res.data;
        arr.forEach((listObj) => {
          console.log('drop loaded');
          if ('Address' in listObj[0]) {
            addysArr.push({ Address: listObj[0].Address, id: listObj[1] });
          }
          else if ('Payer Name' in listObj[0]) {
            pNameArr.push({ Name: listObj[0][`Payer Name`], id: listObj[1] });
          }
          else if ('House Number' in listObj[0]) {
            housenumArr.push({ Number: listObj[0][`House Number`], id: listObj[1] });
          }
          else if ('Description' in listObj[0]) {
            descsArr.push({ Description: listObj[0].Description, id: listObj[1] });
          }
          else if ('Type' in listObj[0]) {
            typesArr.push({ Type: listObj[0].Type, id: listObj[1] });
          }
          else if ('Title' in listObj[0]) {
            titlesArr.push({ Title: listObj[0].Title, id: listObj[1] });
          }
          else if ('Payment Method' in listObj[0]) {
            methodsArr.push({ Method: listObj[0][`Payment Method`], id: listObj[1] });
          }
          else {
            console.log("Invalid element found in database")
          }
        })
        //debug lines
        console.log(addysArr);
        console.log(housenumArr);
        console.log(pNameArr);
        console.log(descsArr);
        console.log(typesArr);
        console.log(titlesArr);
        console.log(methodsArr);
        //update states
        setAddys(addysArr);
        setNums(housenumArr);
        setNames(pNameArr);
        setDescs(descsArr);
        setTypes(typesArr);
        setTitles(titlesArr);
        setMethods(methodsArr);
      })
    }

  },[]);

  return (
    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
        <div className="newtrans__container">

          <form onSubmit={addTransaction} id='Payment_form' className="newtrans__paymentform">
            <h1 className="newtrans__h1">New Transaction</h1>

            <table>
              <tbody>
                <tr>
                  <td>
                    <select name="tpayer" id="tPayer" placeholder='other' className="newtrans__select">
                      {pName.map((val) => (
                        <option value={val.Name}>{val.Name}</option>
                      ))}
                      <option value="other" disabled selected hidden>Payer Name</option>
                    </select>
                  </td>
                  <td>
                    <select name="tTitle" id="tTitle" className="newtrans__select">
                      {titles.map((val) => (
                        <option value={val.Title}>{val.Title}</option>
                      ))}
                      <option value="other" disabled selected hidden>Payer Title</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select name="tAdd" id="tAdd" className="newtrans__select">
                      {addys.map((val) => (
                        <option value={val.Address}>{val.Address}</option>
                      ))}
                      <option value="other" disabled selected hidden>Address</option>
                    </select>
                  </td>
                  <td>
                    <select name="tNum" id="tNum" className="newtrans__select">
                      {housenum.map((val) => (
                        <option value={val.Number}>{val.Number}</option>
                      ))}
                      <option value="other" disabled selected hidden>House Number</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select name="tDesc" id="tDesc" className="newtrans__select">
                      {descs.map((val) => (
                        <option value={val.Description}>{val.Description}</option>
                      ))}
                      <option value="other" disabled selected hidden>Description</option>
                    </select>
                  </td>
                  <td>
                    <select name="tType" id="tType" className="newtrans__select">
                      {types.map((val) => (
                        <option value={val.Type}>{val.Type}</option>
                      ))}
                      <option value="other" disabled selected hidden>Transaction Type</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select name="tMethod" id="tMethod" className="newtrans__select">
                      {methods.map((val) => (
                        <option value={val.Method}>{val.Method}</option>
                      ))}
                      <option value="other" disabled selected hidden>Payment Method</option>
                    </select>

                  </td>

                  <td>
                    <input type="number" name='tPay' id='tPay' step="0.01" placeholder='Payment' className="newtrans__select" />
                  </td>
                </tr>

                <tr>
                  <td><label for="tDateCharged" className="newtrans__label">Date Charged</label></td>
                  <td><label for="tDatePaid" className="newtrans__label">Date Paid</label></td>
                </tr>

                <tr>
                  <td><input type="date" id='tDatePaid' name='tDatePaid' className="newtrans__date"></input></td>
                  <td><input type="date" id='tDateCharged' name='tDateCharged' className="newtrans__date"></input></td>
                </tr>

                <tr>
                  <td><input type="text" name='tNote' id='tNote' placeholder='Note' className="newtrans__select"/></td>
                </tr>

                <tr>
                  <td>
                      <button className='newtrans__formButton'>Clear</button>
                  </td>
                  <td>
                      <button className='newtrans__formButton'>Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewTransaction