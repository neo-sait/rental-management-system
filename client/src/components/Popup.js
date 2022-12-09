import React from 'react'
import "./Popup.css"



function Popup(props) {
  const data = props.data

  return ( props.trigger) ? (
    <div className="popup">
        
        <div className="popup-inner">
        <div className="tenants-table">
        <table>
        <tr name="colNames">
          <th>Type</th>
          <th>jan</th>
          <th>feb</th>
          <th>mar</th>
          <th>apr</th>
          <th>may</th>
          <th>jn</th>
          <th>jul</th>
          <th>aug</th>
          <th>sep</th>
          <th>oct</th>
          <th>nov</th>
          <th>dec</th>
        </tr>
        <tr>
          <td>Exp</td>
          <td>{data.exp[0]}</td>
          <td>{data.exp[1]}</td>
          <td>{data.exp[2]}</td>
          <td>{data.exp[3]}</td>
          <td>{data.exp[4]}</td>
          <td>{data.exp[5]}</td>
          <td>{data.exp[6]}</td>
          <td>{data.exp[7]}</td>
          <td>{data.exp[8]}</td>
          <td>{data.exp[9]}</td>
          <td>{data.exp[10]}</td>
          <td>{data.exp[11]}</td>
        </tr>
        <tr>
          <td>Rev</td>
          <td>{data.rev[0]}</td>
          <td>{data.rev[1]}</td>
          <td>{data.rev[2]}</td>
          <td>{data.rev[3]}</td>
          <td>{data.rev[4]}</td>
          <td>{data.rev[5]}</td>
          <td>{data.rev[6]}</td>
          <td>{data.rev[7]}</td>
          <td>{data.rev[8]}</td>
          <td>{data.rev[9]}</td>
          <td>{data.rev[10]}</td>
          <td>{data.rev[11]}</td>
        </tr>



      </table>
        </div>
            <button className="close-btn" onClick={() => props.setTrigger(false) }>close</button>
            { props.children }
        </div>
    </div>
  ) : "";


  
}



export default Popup