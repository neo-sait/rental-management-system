import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./style.css"
import { ipAddress } from '../App';
const Login = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    let auth = localStorage.getItem("auth");
      
    axios.post('http://' + ipAddress + ':5000/api/authenticate', { id: auth }).then( (authed)=>{
      if (authed.data == true){
        navigate("/profiles");
      }
    })

    const login = event => {
        console.log("logging in")
        axios.post('http://' + ipAddress + ':5000/login', {
            email: email,
            pass: password
        }).then((response) => {
             if (response.status == 200) {
                if (response.data == false){
                    console.log("bad")
                    setError("Email or password invalid")
                }else{
                    console.log("good")
                    localStorage.setItem("auth",response.data.id);
                    navigate("/profiles");
                }
            }
        }).catch((err) =>{
            console.log(err);
        })
        
    }

    return (
        <div className="login__LoginInfo">
            <div className="login__loginContainer">
                <div className="login__leftBox">
                    <div className="login__LoginInfo">
                        <h1 className="login__leftHeading">Welcome to 4Rent</h1><br/>
                        <p>A customizable book keeping web application for property owners.</p><br/>
                        <ul>
                            <li>Store and view property data.</li>
                            <li>Generate charts from financial data.</li>
                            <li>Upload large data sets using excel files</li>
                            <li>Customize your data entry.</li>
                        </ul>
                    </div>
                </div>
                <div className="login__rightBox">
                    <h1 className="login__rightHeading">Login</h1>
                    <div className="login__loginForm">
                        <div className="login__inputEmail">
                            <input type="email" placeholder="Email" onChange={e => {setEmail(e.target.value)}}></input>
                        </div>
                        <div className="login__inputPass">
                            <input type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}></input>
                        </div>
                        <div className="login__submitInput">
                            <button className="formButton" type="submit" onClick={() => {login()}}>Login</button>
                        </div>
                        <div className="login__error">
                            {error}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Login