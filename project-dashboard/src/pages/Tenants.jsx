import React from 'react';
// import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, pdfexport, Edit, Inject } from '@syncfusion/ej2-react-grids';


// import { customersData, contextMenuItems, customersGrid } from '../data/dummy';
import { Header } from '../components';
import './Tenants.css';

const data = [
  { id:'1', name: "Neo", amount:'$120.00', nextpayment: '10/30/2022' , prevpayment:'9/14/2022' },
  { id:'2', name: "Jake", amount:'$120.00',nextpayment: '10/30/2022' , prevpayment: '9/19/2022' },
  { id:'3', name: "Jerome", amount:'$120.00', nextpayment: '10/30/2022',prevpayment: '9/17/2022' },
  { id:'4', name: "Emmanuel", amount:'$120.00', nextpayment: '10/30/2022', prevpayment: '9/7/2022' },
  { id:'5', name: "Honeylene", amount:'$120.00', nextpayment: '10/30/2022', prevpayment: '9/24/2022' },
  { id:'6', name: "Alain", amount:'$120.00',nextpayment:'10/30/2022', prevpayment: '9/29/2022'  },
]

const Tenants= () => {
  return (
    <div className="App">
      <table>
        <tr name="colNames">
          <th>ID</th>
          <th>Name</th>
          <th>Next Payment Date</th>
          <th>Amount Due</th>
          <th>Previous Payment Date</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.nextpayment}</td>
              <td>{val.amount}</td>
              <td>{val.prevpayment}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Tenants