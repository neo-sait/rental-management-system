import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from "./Login.module.css"

const Login = () => {

    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [passInput,setPassInput] = useState("");

    const [popup, setPopup] = useState(classes.errorHide);

    let auth = localStorage.getItem("auth");
      
    axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
      if (authed.data == true){
        navigate("/tenants");
      }
    })

    const login = () => {
        axios.post('http://localhost:5000/login', {
            email: emailInput,
            pass: passInput
        }).then((response) => {
             if (response.status == 200) {
                if (response.data == false){
                    setPopup(classes.errorShow);
                }else{
                    setPopup(classes.errorHide);
                    localStorage.setItem("auth",response.data.id);
                    navigate("/tenants");
                }
            }
        }).catch((err) =>{
            console.log(err);
        })
        
    }

    return (
        <div className={classes.App}>

            <div className={classes.Box}>
                <h1>Login</h1>

                <div className={classes.input}>
                    <label>Email</label>
                    <input type="email" name="email"  onChange={(e) => {
                                setEmailInput(e.target.value);
                            }} required/>
                    <span className={classes.errorHide}>Invalid Credentials</span>
                    <label>Password</label>
                    <input type="password" name="password"  onChange={(e) => {
                                setPassInput(e.target.value);
                            }} required/>
                    <span className={popup}>Invalid Credentials</span>
                    <button onClick={login}>Login</button>
                </div>
            </div> 
        </div> 
    )
}

export default Login