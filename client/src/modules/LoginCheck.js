import axios from "axios";
import { ipAddress } from '../App';
// this simply checks if the user logged in has a validated id to use the site
// if they dont, it simply redirects to login page
export default function LoginCheck(navigate){
    let auth = localStorage.getItem("auth");
      
    window.addEventListener('storage', ()=>{
      axios.post('http://' + ipAddress + ':5000/api/authenticate', { id: auth }).then( (authed)=>{
        if (authed.data == false){
          navigate("/login");
        }
      })
    })
  
    axios.post('http://' + ipAddress + ':5000/api/authenticate', { id: auth }).then( (authed)=>{
        if (authed.data == false){
            navigate("/login");
        }
      })
}