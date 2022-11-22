import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from "./Login.module.css"

const Login = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    let auth = localStorage.getItem("auth");
      
    axios.post('http://localhost:5000/api/authenticate', { id: auth }).then( (authed)=>{
      if (authed.data == true){
        navigate("/tenants");
      }
    })

    const login = event => {
        console.log("logging in")
        axios.post('http://localhost:5000/login', {
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
                    navigate("/tenants");
                }
            }
        }).catch((err) =>{
            console.log(err);
        })
        
    }

    /*
                   <div className={classes.inputGroup}>
                    <input type="email" placeholder="Email" id="email" required></input>
                </div>
                <div className={classes.inputGroup}>
                    <input type="password" placeholder="Password" id="password"></input>
                    <div className={classes.error}>{error}</div>
                </div>
                <button className={classes.formButton} type="submit">Login</button>
    */

    return (
        <div className={styles.App}>
            
            <div className={styles.box}>
                <h1>Login</h1>
                <div className={styles.inputGroup}> 
                    <input type="email" placeholder="Email" onChange={e=>{ setEmail(e.target.value) }}></input>
                </div>
                <div className={styles.inputGroup}> 
                    <input type="password" placeholder="Password" onChange={e=>{ setPassword(e.target.value) }}></input>
                    <div className={styles.error}>{error}</div>
                </div>
                <button className={styles.formButton} type="submit" onClick={ ()=> {login()}}>Login</button>
            </div>
        </div>
    )
}

export default Login