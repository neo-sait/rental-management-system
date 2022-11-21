import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import axios from 'axios';
import { Sidebar } from '../components';
import './Lists.css'

// this is the class component version of the OldLists.jsx

class Lists extends Component{

    constructor(props){
        super(props);

        this.state = {
            addressArr: [],
            payerArr: [],
            houseArr: [],
            descArr: [],
            typeArr: [],
            titleArr: [],
            paymentArr: [],
        }

        // add persistence?
        this.appendAddress = json => this.setState(state=>{
          const list = state.addressArr.push(json);

          return{
            list,
          };
        });
        
        this.appendPayer = json => this.setState(state=>{
          const list = state.payerArr.push(json);

          return{
            list,
          };
        });

        this.appendHouse = json => this.setState(state=>{
          const list = state.houseArr.push(json);

          return{
            list,
          };
        });

        this.appendDesc = json => this.setState(state=>{
          const list = state.descArr.push(json);

          return{
            list,
          };
        });

        this.appendType = json => this.setState(state=>{
          const list = state.typeArr.push(json);

          return{
            list,
          };
        });

        this.appendTitle = json => this.setState(state=>{
          const list = state.titleArr.push(json);

          return{
            list,
          };
        });

        this.appendPayment = json => this.setState(state=>{
          const list = state.paymentArr.push(json);

          return{
            list,
          };
        });
       
        this.addToAddresses = event =>{
          event.preventDefault();
          const input = document.getElementById("addressInput")

          this.appendAddress({Address: input.value, id: 123456});
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/getList').then( (res) =>{
            const arr = res.data;

            arr.forEach( (listObj) => {
                if ('Address' in listObj[0]) {
                    this.appendAddress({Address: listObj[0].Address, id: listObj[1]});
                  }
                  else if ('Payer Name' in listObj[0]) {
                    this.appendPayer({"Payer Name": listObj[0][`Payer Name`], id: listObj[1]});
                  }
                  else if ('House Number' in listObj[0]) {
                    this.appendHouse({"House Number": listObj[0][`House Number`], id: listObj[1]});
                  }
                  else if ('Description' in listObj[0]) {
                    this.appendDesc({Description: listObj[0].Description, id: listObj[1]});
                  }
                  else if ('Type' in listObj[0]) {
                    this.appendType({Type: listObj[0].Type, id: listObj[1]});
                  }
                  else if ('Title' in listObj[0]) {
                    this.appendTitle({Title: listObj[0].Title, id: listObj[1]});
                  }
                  else if ('Payment Method' in listObj[0]) {
                    this.appendPayment({"Payment Method": listObj[0][`Payment Method`], id: listObj[1]});
                  }
                  else {
                    console.log("Invalid element found in database")
                  }
            })
        })
    }

    render(){
      return (
        <div className="App flex">

        <div className="w-72 sidebar
              dark:bg-secondary-dark-bg
              bg-white">
          <Sidebar />
        </div>
    
        <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
    
        <div>
          <h2>Lists</h2>
    
          <div className="container">
    
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Addresses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addAddress" onSubmit={this.addToAddresses}>
                      <input type="text" id="addressInput" placeholder="New Address"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.addressArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                      <input type="text" className="listInput" placeholder={val.Address} id={"input"+val.id} readOnly></input>
                      <button className="Edit" id={"edit"+val.id} onClick={ () => {}}>Edit</button>
                      <button className="Delete" id={"delete"+val.id}>Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Payer Names</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addPayer">
                      <input type="text" name="payer" placeholder="New Payer Name"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.payerArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Payer Name`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>House Numbers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addHouse">
                      <input type="text" name="house" placeholder="New House Number"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.houseArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`House Number`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Descriptions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addDescription">
                      <input type="text" name="description" placeholder="New Description"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.descArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Description`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Types</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addType">
                      <input type="text" name="type" placeholder="New Type"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.typeArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Type`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Titles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addTitle">
                      <input type="text" name="title" placeholder="New Title"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.titleArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Title`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
            <table className="Lists-table">
              <thead>
                <tr>
                  <th>Payment Methods</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="addPayment">
                      <input type="text" name="payment" placeholder="New Payment"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.paymentArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Payment Method`]} readOnly></input>
                      <button className="Edit">Edit</button>
                      <button className="Delete">Delete</button>
                    </td>
                  </tr>
    
                ))}
              </tbody>
            </table>
          </div>
        </div >
    
        </div>
        </div>
      )
    }
}

export default Lists