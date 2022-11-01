import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../components/auth'

const Login = () => {

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
        <div className="App">

            <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full">
                <h1>ERROR, PAGE NOT FOUND</h1>
            </div>
        </div>
    )
}

export default Login