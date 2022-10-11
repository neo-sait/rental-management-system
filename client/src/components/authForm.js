import React, { useState } from "react"
import Axios from 'axios'
import "../css/authForm.css"


const LoginForm = () => {

    const [emailInput, setEmailInput] = useState("");
    
    const [popupStyle, setPopup] = useState("hide");
    const [response, setResponse] = useState("");

    return (
        <div className="page">
            <div className="cover">
                <h1>2 Factor</h1>
                <input type="email"  placeholder="email"
                onChange={(e) => {
                    setEmailInput(e.target.value);
                }}
                /> 
                <p className={popupStyle}>{response}</p>

                <button className="login-btn">Submit</button>

            </div>
        </div>

    )

}

export default LoginForm

