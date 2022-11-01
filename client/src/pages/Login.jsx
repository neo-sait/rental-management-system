import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth'

import "./Login.css"

const Login = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");

    const [popupStyle, setPopup] = useState("hide");
    const [response, setResponse] = useState("");

    console.log(emailInput);


    const login = () => {
        /*
        axios.post('http://localhost:5000/login', {
            email: emailInput
        }).then((response) => {
            if (response.data == "popup") {
                setPopup("response");
                setResponse("Incorrect email");
            } else if (response.status == 200) {
                setPopup("hide");
                console.log(response);
                auth.login(response.data.id);
                navigate('/profile/' + response.data.id, { replace: true });
            }
        }).catch((err) =>{
            console.log(err);
        })
        */
    }


    return (
        <div className="App">

                <div className="login">

                    <h1 className="text-center">Sign in</h1>

                    <div className="needs-validation">
                        <div className="form-group was-validated">
                            <label className="form-label" for="email">Email address</label>
                            <input className="form-control" type="email" id="email" required
                            onChange={(e) => {
                                setEmailInput(e.target.value);
                            }}
                            />
                            <p className={popupStyle}>{response}</p>
                        </div>
                        <button className="login-btn" onClick={login}>Submit</button>
                    </div>

                </div>

        </div>
    )
}

export default Login