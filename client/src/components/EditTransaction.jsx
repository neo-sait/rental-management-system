import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Popup.css"

function Popup(props) {
  const [date,setDate] = useState("");
  const [datePaid,setDatePaid] = useState("");
  const [payment,setPayment] = useState("");
  const [note,setNote] = useState("");


  const saveEdit = () => {
    props.setTrigger(false);
    let changedData = props.data;
    changedData.Address = document.getElementById("addressInput").value;
    changedData.HouseNum = document.getElementById("houseInput").value;
    changedData.PayerName = document.getElementById("nameInput").value;
    changedData.PaymentMethod = document.getElementById("methodInput").value;
    changedData.Desc = document.getElementById("descInput").value;
    changedData.Type = document.getElementById("typeInput").value;
    changedData.Notes = document.getElementById("noteInput").value;
    changedData.Date = document.getElementById("dateInput").value;
    changedData.DatePaid = document.getElementById("datePaidInput").value;
    changedData.Payment = document.getElementById("paymentInput").value;

    props.saveData(props.id,changedData);
  }


  useEffect(async () => {
    if (props.trigger == true) {
      document.getElementById(props.data.Address).setAttribute("selected",true);
      document.getElementById(props.data.HouseNum).setAttribute("selected",true);
      document.getElementById(props.data.PayerName).setAttribute("selected",true);
      document.getElementById(props.data.PaymentMethod).setAttribute("selected",true);
      document.getElementById(props.data.Desc+"desc").setAttribute("selected",true);
      document.getElementById(props.data.Type+"type").setAttribute("selected",true);
      if (date.length == 0){
        setDate(props.data.Date);
        setDatePaid(props.data.DatePaid);
        setPayment(props.data.Payment);
        setNote(props.data.Notes);
      }
    }
  })


  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="">
          <h1 className="popup-h1">Transaction {props.data.Number}</h1>
          <table className="popup-table">
            <tbody>

              <tr>
                Address
              </tr>
              <tr>
                <td>
                <select id="addressInput">
                  {props.options.address.map(obj=>
                    <option id={obj} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                House #
              </tr>
              <tr>
                <td>
                <select id="houseInput">
                  {props.options.house.map(obj=>
                    <option id={obj} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                Date
              </tr>
              <tr>
                <td>
                  <input type="date" id="dateInput" value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
                </td>
              </tr>

              <tr>
                Date Paid
              </tr>
              <tr>
                <td>
                  <input type="date" id="datePaidInput" value={datePaid} onChange={(e)=>{setDatePaid(e.target.value)}}></input>
                </td>
              </tr>

              <tr>
                Name
              </tr>
              <tr>
                <td>
                <select id="nameInput">
                  {props.options.name.map(obj=>
                    <option id={obj} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                Payment
              </tr>
              <tr>
                <td>
                  <input type="text" id="paymentInput" value={payment} onChange={(e)=>{setPayment(e.target.value)}}></input>
                </td>
              </tr>

              <tr>
                Method
              </tr>
              <tr>
                <td>
                <select id="methodInput">
                  {props.options.method.map(obj=>
                    <option id={obj} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                Description
              </tr>
              <tr>
                <td>
                <select id="descInput">
                  {props.options.desc.map(obj=>
                    <option id={obj+"desc"} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                Type
              </tr>
              <tr>
                <td>
                <select id="typeInput">
                  {props.options.type.map(obj=>
                    <option id={obj+"type"} value={obj}>{obj}</option>
                  )}
                </select>
                </td>
              </tr>

              <tr>
                Notes
              </tr>
              <tr>
                <td>
                  <input type="text" id="noteInput" value={note} onChange={(e)=>{setNote(e.target.value)}}></input>
                </td>
              </tr>
              
            </tbody>
          </table>
          
        </div>
        <button className="close-btn" onClick={() => saveEdit()}>Save</button>
      </div>
    </div>
  ) : "";
}

export default Popup