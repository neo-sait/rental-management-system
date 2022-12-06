import React from 'react'

const CalcTable = ({clients}) =>{


    const format = (money) =>{
        return (money).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
    }

    return (
        <div>
        {clients.map(obj=>{
            return [
            <table>
            <thead><h1>{obj.property}</h1></thead>
            <tbody>
    
              <tr>
                <td>Property Price at Time of Purchase ({obj.date}): </td>
                <td>{format(parseInt(obj.priceAtPurchase))}</td>
              </tr>
    
              <tr>
                <td>Property Price Today: </td>
                <td>{format(parseInt(obj.priceToday))}</td>
              </tr>
    
              <tr>
                <td>Total Revenue to Date: </td>
                <td>{format(obj.calculations.Revenue)}</td>
              </tr>
    
              <tr>
                <td>Total Expense to Date: </td>
                <td>{format(obj.calculations.Expense)}</td>
              </tr>
    
              <tr>
                <td>Principal to Date: </td>
                <td>{format(obj.calculations.Principle)}</td>
              </tr>
    
            </tbody>
          </table>
            ]
        })}
        </div>
    )
}

export default CalcTable;