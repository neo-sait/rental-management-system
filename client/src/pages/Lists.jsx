import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import axios from 'axios';
import { Sidebar } from '../components';
import classes from './Lists.css'
import { throws } from 'assert';

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
        
        this.appendToList = (type,json) => this.setState(state=>{
          let list;

        if (type == "address"){
            list = state.addressArr.push(json);
        }else if (type == "payer"){
          list = state.payerArr.push(json);
        }else if (type == "house"){
          list = state.houseArr.push(json);
        }else if (type == "desc"){
          list = state.descArr.push(json);
        }else if (type == "type") {
          list = state.typeArr.push(json);
        }else if (type == "title") {
          list = state.titleArr.push(json);
        }else if (type == "payment"){
          list = state.paymentArr.push(json);
        }

          return {list};
        })
        
        // thankfully js provides ways to universally grab the input value and the id it came with
        // we can use the information to determine which submit it came from and act upon that :D
        this.addSubmit = event =>{
          event.preventDefault();

          const entry = event.target[0];
          const source = event.target[0].name;

          
          axios.post('http://localhost:5000/api/addToLists',{listType: source, input: entry.value}).then( res =>{
            const data = res.data;
            let json;
          
            if (source == "address"){
              json = {Address: entry.value, id: data[0]};
            }else if (source == "payer"){
              json = {"Payer Name": entry.value, id: data[0]};
            }else if (source == "house"){
              json = {"House Number": entry.value, id: data[0]};
            }else if (source == "desc"){
              json = {Description: entry.value, id: data[0]};
            }else if (source == "type") {
              json = {Type: entry.value, id: data[0]};
            }else if (source == "title") {
              json = {Title: entry.value, id: data[0]};
            }else if (source == "payment"){
              json = {"Payment Method": entry.value, id: data[0]};
            }

            this.appendToList(source,json);

            event.target[0].value = "";
          })
        }

        this.deleteList = (type,id) => {
          let targetList = this.state[type+"Arr"];

          let filter = targetList.filter((obj)=>{
            return obj.id != id;
          })
          
          if (type == "address"){
            this.setState({addressArr: filter});
          }else if (type == "payer"){
            this.setState({payerArr: filter});
          }else if (type == "house"){
            this.setState({houseArr: filter});
          }else if (type == "desc"){
            this.setState({descArr: filter});
          }else if (type == "type") {
            this.setState({typeArr: filter});
          }else if (type == "title") {
            this.setState({tileArr: filter});
          }else if (type == "payment"){
            this.setState({paymentArr: filter});
          }
          
          axios.post('http://localhost:5000/api/removeFromLists',{target: id})
        }

        this.editInput = (type,id) =>{
        let element = document.getElementById("edit"+id);

        if (element.innerHTML == "Save"){
          
          element.innerHTML = "Edit";
          document.getElementById("input"+id).readOnly = true;
          
          if (document.getElementById("input"+id).placeholder != document.getElementById("input"+id).value){
            axios.post('http://localhost:5000/api/editFromLists',{id: id, type: type, input: document.getElementById("input"+id).value});
            document.getElementById("input"+id).placeholder = document.getElementById("input"+id).value;
          }
        }else{
          element.innerHTML = "Save";
          document.getElementById("input"+id).readOnly = false;
          document.getElementById("input"+id).value = document.getElementById("input"+id).placeholder;
          }
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/getList').then( (res) =>{
            const arr = res.data;

            arr.forEach( (listObj) => {
                if ('Address' in listObj[0]) {
                    this.appendToList("address",{Address: listObj[0].Address, id: listObj[1]});
                  }
                  else if ('Payer Name' in listObj[0]) {
                    this.appendToList("payer",{"Payer Name": listObj[0][`Payer Name`], id: listObj[1]});
                  }
                  else if ('House Number' in listObj[0]) {
                    this.appendToList("house",{"House Number": listObj[0][`House Number`], id: listObj[1]});
                  }
                  else if ('Description' in listObj[0]) {
                    this.appendToList("desc",{Description: listObj[0].Description, id: listObj[1]});
                  }
                  else if ('Type' in listObj[0]) {
                    this.appendToList("type",{Type: listObj[0].Type, id: listObj[1]});
                  }
                  else if ('Title' in listObj[0]) {
                    this.appendToList("title",{Title: listObj[0].Title, id: listObj[1]});
                  }
                  else if ('Payment Method' in listObj[0]) {
                    this.appendToList("payment",{"Payment Method": listObj[0][`Payment Method`], id: listObj[1]});
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
                    <form id="addAddress" onSubmit={this.addSubmit}>
                      <input type="text" name="address" placeholder="New Address"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.addressArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                      <input type="text" className="listInput" placeholder={val.Address} id={"input"+val.id} readOnly></input>
                      <button className="Edit" id={"edit"+val.id} onClick={ () => {this.editInput("address",val.id)}}>Edit</button>
                      <button className="Delete" id={"delete"+val.id} onClick={() => {this.deleteList("address",val.id)}}>Delete</button>
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
                    <form id="addPayer" onSubmit={this.addSubmit}>
                      <input type="text" name="payer" placeholder="New Payer Name"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.payerArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Payer Name`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("payer",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("payer",val.id)}}>Delete</button>
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
                    <form id="addHouse" onSubmit={this.addSubmit}>
                      <input type="text" name="house" placeholder="New House Number"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.houseArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`House Number`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("house",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("house",val.id)}}>Delete</button>
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
                    <form id="addDescription" onSubmit={this.addSubmit}>
                      <input type="text" name="desc" placeholder="New Description"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.descArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Description`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("desc",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("desc",val.id)}}>Delete</button>
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
                    <form id="addType" onSubmit={this.addSubmit}>
                      <input type="text" name="type" placeholder="New Type"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.typeArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Type`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("type",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("type",val.id)}}>Delete</button>
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
                    <form id="addTitle" onSubmit={this.addSubmit}>
                      <input type="text" name="title" placeholder="New Title"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.titleArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Title`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("title",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("title",val.id)}}>Delete</button>
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
                    <form id="addPayment" onSubmit={this.addSubmit}>
                      <input type="text" name="payment" placeholder="New Payment"></input>
                      <button className="Add">Add</button>
                    </form>
                  </td>
                </tr>
                {this.state.paymentArr.map((val) => (
    
                  <tr key={val.id}>
                    <td>
                    <input type="text" className="listInput" value={val[`Payment Method`]} readOnly></input>
                      <button className="Edit" onClick={ () => {this.editInput("payment",val.id)}}>Edit</button>
                      <button className="Delete" onClick={() => {this.deleteList("payment",val.id)}}>Delete</button>
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