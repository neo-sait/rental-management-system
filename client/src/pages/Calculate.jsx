import React, { useState, Fragment, useEffect } from "react";
import './style.css';
import axios from 'axios'
import { CalcEdit,CalcRead,Sidebar } from "../components";

const Calculate = () => {
    let count = "calculateCount";

  const [properties,setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [addFormData, setAddFormData] = useState({
    property: '',
    priceAtPurchase: '',
    priceToday: '',
    date: ''
  });

  const [editFormData, setEditFormData] = useState({
    property: '',
    priceAtPurchase: '',
    priceToday: '',
    date: ''
  })

  const [editClientId, setEditClientID] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    if (addFormData.property == "Select an address" || addFormData.property == ""){
      window.alert("Select an address");
    }else{
      const newClient = {
        id: clients.length+1,
        property: addFormData.property,
        priceAtPurchase: addFormData.priceAtPurchase,
        priceToday: addFormData.priceToday,
        date: addFormData.date
      };
  
      const newClients = [...clients, newClient];
      axios.post('http://localhost:5000/api/addCalcData',{data: newClient});
      setClients(newClients);
    }
  };

//edit data
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

//getting info from client to save after editing
    const editedClient = {
      id: editClientId,
      property: editFormData.property,
      priceAtPurchase: editFormData.priceAtPurchase,
      priceToday: editFormData.priceToday,
      date: editFormData.date
    }
    const newClients = [...clients];
    // index of client
    const index = clients.findIndex((client)=> client.id === editClientId ); 

    newClients[index] = editedClient;

    axios.post('http://localhost:5000/api/addCalcData',{data: editedClient});
    setClients(newClients);
    setEditClientID(null);
  };

  const handleEditClick = (event, client) => {
    event.preventDefault();
    setEditClientID(client.id);

    const formValues = {
    property: client.property,
      priceAtPurchase: client.priceAtPurchase,
      priceToday: client.priceToday,
      date: client.date,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditClientID(null);
  };

  const handleDeleteClick = (clientID) => {
    const newClients = [...clients];

    const index = clients.findIndex((client)=> client.id === clientID);

    axios.post('http://localhost:5000/api/deleteCalcData',{id: clientID});
    newClients.splice(index, 1);

    setClients(newClients);

  }

  useEffect(()=>{

    const load = async () =>{
      axios.get('http://localhost:5000/api/getAddresses').then(res=>{

            setProperties(res.data);
        })

      axios.get('http://localhost:5000/api/getCalcData').then(res=>{
        const data = res.data;
        let initClients = [];

        data.forEach(obj=>{
          initClients.push(obj[0]);
        })

        setClients(initClients);
      })
    }

    load();
  },[])

    return (

        <div className="App flex">

    
        <div className="w-72 sidebar
        dark:bg-secondary-dark-bg
        bg-white shadow-2xl">
        <Sidebar />
      </div>

      <div className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <h1 className="calc__h1">Property Calculator</h1>
        <div className="calc__app-container">
            <form className="calc__form" onSubmit={handleAddFormSubmit}>
              <select className="calc__input"
              name="property"
              onChange={handleAddFormChange}>
                  <option>Select an address</option>
                {properties.map(address=>(
                  <option key={address} value={address}>{address}</option>
                ))}
              </select>

              <input className="calc__input"
              type= "number" 
              name="priceAtPurchase"
              required="required"
              placeholder="Price at Purchase"
              onChange={handleAddFormChange}
              />
              <input className="calc__input"
              type= "number" min= "0" 
              name="priceToday"
              required="required"
              placeholder="Price Today"
              onChange={handleAddFormChange}
              />
              <input className="calc__input"
              type= "date"
              name="date"
              required="required"
              placeholder="Date of purchase"
              onChange={handleAddFormChange}
              />
              <button type="submit" className="calc__btn">Add</button>
            </form>
            
            <form className="calc__form" onSubmit={handleEditFormSubmit}>
            <div className="calc__container"> 
            <table className="calc__table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price at Time of Purchase</th>
                        <th>Price Today</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {clients.map((client)=> (       
                    <Fragment>
                      { editClientId === client.id ? (
                      <CalcEdit 
                      editFormData={editFormData} 
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      propertyArray={properties}
                      currentProp={client.property}
                      />
                      ) : (
                      <CalcRead
                      client={client} 
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                     />
                     )}

                      
                    </Fragment>

                    ))}
                </tbody>
            </table>
            {clients.length > 0 ? <button type="submit" className="calc_calculatebtn">Calculate</button>: ""}
            </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Calculate;