import React, { useState } from "react"
import {useAuth} from './auth'
import {useNavigate, useParams} from 'react-router-dom'
import logo from "../logo/react.svg"
import "../css/profile.css"
import {SidebarData} from './SidebarData'
import Axios from 'axios'

const Profile = () =>{
    const auth = useAuth();
    const navigate = useNavigate();

    const [userName,setUserName] = useState("");
    const [userEmail,setEmail] = useState("");

    /*
    * let { username } = useParams();
    * add check for auth.user == username, if false return to own profile page?
    * maybe do in requireAuth.js?
    */

    const logout = () =>{
        auth.logout();
        navigate('/login');
    }

    Axios.post('http://localhost:5000/api/tenantData',{
        id: auth.user
    }).then((res) =>{
        setUserName(res.data.name);
        setEmail(res.data.email)
    })

    return (
    <div className="page">

    <div className="Sidebar">
        <div className="Logo">
                <img src={logo} alt="Temp Logo" className="logoPic"/>
            </div>
        <ul className="SidebarList">
        {SidebarData.map((val,key) =>{
            return <li key={key} className="data" onClick={()=>{navigate(val.link)}}>
                <div>{val.title}</div>
            </li>
        })}
        </ul>
        <button className="Logout" onClick={logout}>Logout</button>
    </div>

    <div className="main">
            <div>
                <label>Name<br></br>
                    <input type="text" className="profileInput" value={userName}/>
                </label>
            </div>
            <div>
                <label>Email<br></br>
                    <input type="text" className="profileInput" value={userEmail}/>
                </label>
            </div>
        </div>
    </div>
    )
}

export default Profile;