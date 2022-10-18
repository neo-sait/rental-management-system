import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import {useAuth} from './auth'

import "../css/loginForm.css"

const LoginForm = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    console.log(auth.user);

    const [emailInput, setEmailInput] = useState("");
    
    const [popupStyle, setPopup] = useState("hide");
    const [response, setResponse] = useState("");

    const login = () =>{
        Axios.post('http://localhost:5000/login',{
            email: emailInput
        }).then((response) => {
            if (response.data == "popup"){
                setPopup("response");
                setResponse("Incorrect email");
            }else if (response.status == 200){
                setPopup("hide");
                console.log(response);
                auth.login(response.data.id);
               navigate('/profile/'+response.data.id, {replace: true});
            }
        })
    }

    return (
        <div className="page">
            <div className="cover">
                <h1>Please Login</h1>
                <input type="email"  placeholder="email"
                onChange={(e) => {
                    setEmailInput(e.target.value);
                }}
                /> 
                <p className={popupStyle}>{response}</p>

                <button className="login-btn" onClick={login}>Submit</button>

            </div>
        </div>
    )

}

export default LoginForm

