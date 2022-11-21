import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import axios from 'axios';
import { Sidebar } from '../components';
import './Lists.css'

// Array variable that will hold the master lists data.
var listsDataArrInit = []

// Array variables that will hold the individual sub-lists, grouped by their field names.
var addressDataArrInit = [] // Address List Data Details.
var payerDataArrInit = [] // Payer List Data Details.
var houseDataArrInit = [] //House List Data Details.
var descriptionDataArrInit = [] //Description List Data Details.
var typeDataArrInit = [] // Type List Data Details.
var titleDataArrInit = [] // Title List Data Details.
var paymentDataArrInit = [] // Payment List Data Details.

const Lists = () => {
  const [listsDataArr, setListsDataArr] = useState(listsDataArrInit)
  const [addressDataArr, setAddressDataArr] = useState(addressDataArrInit)
  const [payerDataArr, setPayerDataArr] = useState(payerDataArrInit)
  const [houseDataArr, setHouseDataArr] = useState(houseDataArrInit)
  const [descriptionDataArr, setDescriptionDataArr] = useState(descriptionDataArrInit)
  const [typeDataArr, setTypeDataArr] = useState(typeDataArrInit)
  const [titleDataArr, setTitleDataArr] = useState(titleDataArrInit)
  const [paymentDataArr, setPaymentDataArr] = useState(paymentDataArrInit)

  const [newInput, setNewInput] = useState("")

  console.log("hello");

  const count = "listsCount";

  const addAddress = event => {
    let input = document.getElementById("addressInput");

    event.preventDefault()

    /*
    axios.post('http://localhost:5000/api/addToAddressList', {address: input.value}).then((res) =>{
      console.log(input.value + " added to database");
      document.getElementById("addAddress").reset();
    });
    */
  }

  const editInput = (id) =>{
    let element = document.getElementById("edit"+id);

    if (element.innerHTML == "Save"){
      element.innerHTML = "Edit";
      document.getElementById("input"+id).readOnly = true;
      
    }else{
      element.innerHTML = "Save";
      document.getElementById("input"+id).readOnly = false;
      
    }
  }

  useEffect(async () => {
    if (listsDataArrInit.length != parseInt(localStorage.getItem(count))) {
      console.log("Initial doc count:" + localStorage.getItem(count))
      listsDataArrInit = []
      addressDataArrInit = []
      payerDataArrInit = []
      houseDataArrInit = []
      descriptionDataArrInit = []
      typeDataArrInit = []
      titleDataArrInit = []
      paymentDataArrInit = []

      console.log("hihihi");
      
      /*
      axios.get('http://localhost:5000/api/getList').then( (res)=>{
        listsDataArrInit = res.data;

          listsDataArrInit.forEach(function (listObject) {
            if ('Address' in listObject[0]) {
              addressDataArrInit.push({Address: listObject[0].Address, id: listObject[1]})
            }
            else if ('Payer Name' in listObject[0]) {
              payerDataArrInit.push({"Payer Name": listObject[0][`Payer Name`], id: listObject[1]})
            }
            else if ('House Number' in listObject[0]) {
              houseDataArrInit.push({"House Number": listObject[0][`House Number`], id: listObject[1]})
            }
            else if ('Description' in listObject[0]) {
              descriptionDataArrInit.push({Description: listObject[0].Description, id: listObject[1]})
            }
            else if ('Type' in listObject[0]) {
              typeDataArrInit.push({Type: listObject[0].Type, id: listObject[1]})
            }
            else if ('Title' in listObject[0]) {
              titleDataArrInit.push({Title: listObject[0].Title, id: listObject[1]})
            }
            else if ('Payment Method' in listObject[0]) {
              paymentDataArrInit.push({"Payment Method": listObject[0][`Payment Method`], id: listObject[1]})
            }
            else {
              console.log("Invalid element found in database")
              console.log(listObject)
            }
          })

        setListsDataArr(listsDataArrInit)
        setAddressDataArr(addressDataArrInit)
        setPayerDataArr(payerDataArrInit)
        setHouseDataArr(houseDataArrInit)
        setDescriptionDataArr(descriptionDataArrInit)
        setTypeDataArr(typeDataArrInit)
        setTitleDataArr(titleDataArrInit)
        setPaymentDataArr(paymentDataArrInit)
  
        localStorage.setItem(count, listsDataArrInit.length)
        console.log("final doc count:" + localStorage.getItem(count))
      })
    }else {
      localStorage.setItem(count, listsDataArrInit.length)
      */
    }
  })

  return (

    <div className="App flex">

    <div className="w-72 sidebar
          dark:bg-secondary-dark-bg
          bg-white">
      <Sidebar />
    </div>

    <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">

    <div>
      <h2>Lists</h2>

      <div className="container">

        <table className="Lists-table">
          <thead>
            <tr>
              <th>Addresses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addAddress" onSubmit={addAddress}>
                  <input type="text" id="addressInput" placeholder="New Address"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {addressDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                  <input type="text" className="listInput" placeholder={val.Address} id={"input"+val.id} readOnly></input>
                  <button className="Edit" id={"edit"+val.id} onClick={ () => {editInput(val.id)}}>Edit</button>
                  <button className="Delete" id={"delete"+val.id}>Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>Payer Names</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addPayer">
                  <input type="text" name="payer" placeholder="New Payer Name"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {payerDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`Payer Name`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>House Numbers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addHouse">
                  <input type="text" name="house" placeholder="New House Number"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {houseDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`House Number`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>Descriptions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addDescription">
                  <input type="text" name="description" placeholder="New Description"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {descriptionDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`Description`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addType">
                  <input type="text" name="type" placeholder="New Type"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {typeDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`Type`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>Titles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addTitle">
                  <input type="text" name="title" placeholder="New Title"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {titleDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`Title`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <table className="Lists-table">
          <thead>
            <tr>
              <th>Payment Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addPayment">
                  <input type="text" name="payment" placeholder="New Payment"></input>
                  <button className="Add">Add</button>
                </form>
              </td>
            </tr>
            {paymentDataArr.map((val) => (

              <tr key={val.id}>
                <td>
                <input type="text" className="listInput" value={val[`Payment Method`]} readOnly></input>
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div >

    </div>
    </div>
  )

}



export default Lists