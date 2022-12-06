import React, {Component} from 'react'
import {AiFillSave, AiFillCloseCircle} from "react-icons/ai"
import './calc.css';

const CalcEdit = ({ editFormData, handleEditFormChange, handleCancelClick, propertyArray, currentProp, handleEditFormSubmit }) => {
    console.log(currentProp);
  return (
    <tr>
        <td>
        <select name="property" onChange={handleEditFormChange}>
                {propertyArray.map(address=>(
                    address == currentProp ?  <option key={address} value={address} selected>{address}</option> 
                    :  <option key={address} value={address}>{address}</option>
                ))}
              </select>       

        </td>
        <td>
            <input type="number" 
            required="required" 
            placeholder="Price at Purchase..."
            name="priceAtPurchase"
            value={editFormData.priceAtPurchase}
            onChange={handleEditFormChange}
            / >  
        </td>
        <td>
            <input type="number" 
            required="required" 
            placeholder="Price Today..."
            name="priceToday"
            value={editFormData.priceToday}
            onChange={handleEditFormChange}
            / >  
        </td>
        <td>
            <input type="date" 
            required="required" 
            placeholder="Date..."
            name="date"
            value={editFormData.date}
            onChange={handleEditFormChange}
            / > 
        </td>
        <td>
            <button type="submit" className="calc-btn" onClick={handleEditFormSubmit}><AiFillSave/></button>
            <button type="button" onClick={handleCancelClick}><AiFillCloseCircle/></button>
        </td>
    </tr>
  )
}



export default CalcEdit;