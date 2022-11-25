import React from 'react'
import { Sidebar } from '../components';
import "./style.css"

const NewTransaction = () => {
  return (
    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <div className="newtrans__container">
        <div className='newtrans__rect'>
        <ul>
            <li><button>+</button></li>
            <li><button>+</button></li>
            <li><button>+</button></li>
            <li><button>+</button></li>
        </ul>
        </div>
        <form action="Submit" className='newtrans__paymentform'>
          <h1 className="newtrans__h1">New Transaction</h1>
          <select className="newtrans__select" name="first" id="first">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <select className="newtrans__select" name="second" id="second">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <br></br>
          <select className="newtrans__select" name="third" id="third">
            <option value="vals">  </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <select className="newtrans__select" name="fourth" id="fourth">
            

          </select>
          <br></br>
          <select className="newtrans__select" name="fifth" id="fifth">
            
          </select>
          <select className="newtrans__select" name="sixth" id="sixth">
          
          </select>
          <br></br>
          <select className="newtrans__select" name="seventh" id="seventh">
            
          </select>
          <select className="newtrans__select" name="eigth" id="eigth">
           
          </select>
          <br></br>
          <br></br>
          <br></br>
          <div className='newtrans__formButton'>
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