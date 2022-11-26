import React, {useState, useEffect} from 'react'
import {getAll2} from '../services/databaseaccess'
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import {collection, doc, getDocs, addDoc, query, orderBy, where} from "firebase/firestore"
import {db} from '../services/database'
import './Lists.css'

// Constant holding the current instance of our firestore database.
const database = db()

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
  const [newAddress, setNewAddress] = useState("")

  const addAddress = async () => {
    console.log("attempting to add new Address")
    await addDoc(collection(database, "Lists"), {Address: newAddress})
    console.log("added new Address")
  }

  useEffect(async () => {
    if (listsDataArrInit.length != parseInt(localStorage.getItem("docCount"))) {
      console.log("Initial doc count:" + localStorage.getItem("docCount"))
      listsDataArrInit = []
      addressDataArrInit = []
      payerDataArrInit = []
      houseDataArrInit = []
      descriptionDataArrInit = []
      typeDataArrInit = []
      titleDataArrInit = []
      paymentDataArrInit = []

      // const querySnapshot = await getAll2("Lists")
      // console.log(querySnapshot)
      // querySnapshot.forEach(function (list) {
      //   listsDataArrInit.push(list)
      //   console.log(listsDataArrInit)
      //   console.log(querySnapshot)
      // })
      listsDataArrInit.push(await getAll2("Lists"))

      listsDataArrInit[0].forEach(function (listObject) {
        if ('Address' in listObject) {
          addressDataArrInit.push({Address: listObject.Address, id: listObject.id})
        }
        else if ('Payer Name' in listObject) {
          payerDataArrInit.push({"Payer Name": listObject[`Payer Name`], id: listObject.id})
        }
        else if ('House Number' in listObject) {
          houseDataArrInit.push({"House Number": listObject[`House Number`], id: listObject.id})
        }
        else if ('Description' in listObject) {
          descriptionDataArrInit.push({Description: listObject.Description, id: listObject.id})
        }
        else if ('Type' in listObject) {
          typeDataArrInit.push({Type: listObject.Type, id: listObject.id})
        }
        else if ('Title' in listObject) {
          titleDataArrInit.push({Title: listObject.Title, id: listObject.id})
        }
        else if ('Payment Method' in listObject) {
          paymentDataArrInit.push({"Payment Method": listObject[`Payment Method`], id: listObject.id})
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

      localStorage.setItem("docCount", listsDataArrInit.length)
      console.log("final doc count:" + localStorage.getItem("docCount"))
    }
    else {
      localStorage.setItem("docCount", listsDataArrInit.length)

    }
  })

  return (

    <div>
      <h2>Lists</h2>

      <div className="container" align="center">

        <table className="Lists-table">
          <thead>
            <tr>
              <th>Addresses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form id="addAddress">
                  <input type="text" name="address" placeholder="New Address" onChange={(event) => {
                    event.preventDefault()
                    setNewAddress(event.target.value)
                  }}></input>
                  <button className="Add" onClick={addAddress}>Add</button>
                </form>
              </td>
            </tr>
            {addressDataArr.map((val) => (

              <tr key={val.id}>
                <td>{val.Address}
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
                <td>{val[`Payer Name`]}
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
                <td>{val[`House Number`]}
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
                <td>{val[`Description`]}
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
                <td>{val[`Type`]}
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
                <td>{val[`Title`]}
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
                <td>{val[`Payment Method`]}
                  <button className="Edit">Edit</button>
                  <button className="Delete">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div >
  )

}



export default Lists
