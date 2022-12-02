import React, { useEffect } from 'react'
import axios from 'axios';
import "./Popup.css"

function Popup(props) {

  const saveEdit = () =>{
    const current = document.getElementById("current").value;
    const house = document.getElementById("house").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    
    axios.post("http://localhost:5000/api/saveTenantInformation",{
      tenant: props.data[1],
      current: current, 
      house: house,
      email: email,
      phone: phone
    })

    window.location.reload();
  }

  useEffect(async ()=>{
    if (props.trigger == true){
      document.getElementById(props.data[0]["Current Tenant"]).setAttribute("selected",true);

      // feels a little janky to do it like this, but its a workaround with states at least?
      document.getElementById("house").value = document.getElementById("house").placeholder;
      document.getElementById("email").value = document.getElementById("email").placeholder;
      document.getElementById("phone").value = document.getElementById("phone").placeholder;
      document.getElementById("house").placeholder = "";
      document.getElementById("email").placeholder = "";
      document.getElementById("phone").placeholder = "";
    }
  })

  return ( props.trigger ) ? (
    <div className="popup">
        <div className="popup-inner">
        <div className="">
        <h1 className="popup-h1">Information on {props.data[0]["Name"]}</h1>
        <table className="popup-table">
        <tbody>
        <tr>
        Current Tenant
        </tr>
        <tr>
        <select id="current">
          <option value="Yes" id="Yes">
            Yes
          </option>
          <option value="No" id="No">
            No
          </option>
        </select>
        </tr>

        <tr>
        House Number
        </tr>
        <tr>
        <input id="house" type="text" placeholder={props.data[0]["House Number"]}></input>
        </tr>

        <tr>
        Email Address
        </tr>
        <tr>
        <input id="email" type="text" placeholder={props.data[0]["Email Address"]}></input>
        </tr>

        <tr>
        Phone Number
        </tr>
        <tr>
        <input id="phone" type="text" placeholder={props.data[0]["Phone Number"]}></input>
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