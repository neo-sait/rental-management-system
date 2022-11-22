import React from 'react'
import { Sidebar } from '../components';
import classes from "./NewTransaction.css"

const NewTransaction = () => {
  return (
    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <div id="container">
        <div id='rect'>
        <ul>
            <li><button>+</button></li>
            <li><button>+</button></li>
            <li><button>+</button></li>
            <li><button>+</button></li>
        </ul>
        </div>
        <form action="Submit" id='Payment_form'>
          <h1>New Transaction</h1>
          <select name="first" id="first">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <select name="second" id="second">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <br></br>
          <select name="third" id="third">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <select name="fourth" id="fourth">
            

          </select>
          <br></br>
          <select name="fifth" id="fifth">
            
          </select>
          <select name="sixth" id="sixth">
          
          </select>
          <br></br>
          <select name="seventh" id="seventh">
            
          </select>
          <select name="eigth" id="eigth">
           
          </select>
          <br></br>
          <br></br>
          <br></br>
          <div id='form_button'>
            <ul>
              <li><button>Clear</button></li>
              <li><button>Submit</button></li>
            </ul>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default NewTransaction