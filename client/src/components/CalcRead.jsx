import React from 'react'

const CalcRead = ( { client, handleEditClick, handleDeleteClick }) => {
    return(
        <tr>
            <td>{client.property}</td>
            <td>{client.priceAtPurchase}</td>
            <td>{client.priceToday}</td>
            <td>{client.date}</td>
            <td>
                <button type="button" onClick={(event)=> handleEditClick(event, client)}>Edit</button>
                <button type="button" onClick={()=> handleDeleteClick(client.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default CalcRead;