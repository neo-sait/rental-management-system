import React from 'react'
import {MdMode} from 'react-icons/md';
import {BsFillTrashFill} from 'react-icons/bs'
import './calc.css';

const CalcRead = ( { client, handleEditClick, handleDeleteClick }) => {
    return(
        <tr>
            <td>{client.property}</td>
            <td>{client.priceAtPurchase}</td>
            <td>{client.priceToday}</td>
            <td>{client.date}</td>
            <td>
                <button type="button" onClick={(event)=> handleEditClick(event, client)} className="calc-btn"><MdMode /></button>
                <button type="button" onClick={()=> handleDeleteClick(client.id)}><BsFillTrashFill /></button>
            </td>
        </tr>
    );
};

export default CalcRead;