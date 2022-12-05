import React, {Component} from 'react'


const CalcEdit = ({ editFormData, handleEditFormChange, handleCancelClick, propertyArray, currentProp }) => {
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
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}



export default CalcEdit;