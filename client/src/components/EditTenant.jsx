import React, { useEffect } from 'react'
import axios from 'axios';
import "./Popup.css"

function Popup(props) {

  const saveEdit = () => {
    let current;
    let password;
    if (props.data[0]["Title"] != "Owner"){
    current = document.getElementById("current").value;
    }
    const house = document.getElementById("house").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    if (props.data[0]["Title"] == "Owner"){
    password = document.getElementById("password").value;
    }

    if (props.data[0]["Title"] == "Owner"){
      axios.post("http://localhost:5000/api/saveTenantInformation", {
      tenant: props.data[1],
      title: props.data[0].Title,
      password: password,
      house: house,
      email: email,
      phone: phone
    })
    }else{
      axios.post("http://localhost:5000/api/saveTenantInformation", {
      tenant: props.data[1],
      title: props.data[0].Title,
      current: current,
      house: house,
      email: email,
      phone: phone
    })
    }

    window.location.reload();
  }

  useEffect(async () => {
    if (props.trigger == true) {
      if (props.data[0]["Title"] != "Owner"){
        document.getElementById(props.data[0]["Current Tenant"]).setAttribute("selected", true);
      }

      // feels a little janky to do it like this, but its a workaround with states at least?
      document.getElementById("house").value = document.getElementById("house").placeholder;
      document.getElementById("email").value = document.getElementById("email").placeholder;
      document.getElementById("phone").value = document.getElementById("phone").placeholder;
      document.getElementById("house").placeholder = "";
      document.getElementById("email").placeholder = "";
      document.getElementById("phone").placeholder = "";
    }
  })

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="">
          <h1 className="popup-h1">Information on {props.data[0]["Name"]}</h1>
          <table className="popup-table">
            <tbody>

              {props.data[0]["Title"] == "Owner" ?
                ""
                :
                <div>
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
                </div>
              }

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

              {props.data[0]["Title"] == "Owner" ?
              <div>
                <tr>
                  Change Password
                </tr>
                <tr>
                <input id="password" type="text" placeholder="New Password"></input>
                </tr>
              </div>
              :
              ""
              }

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