import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Popup from "../components/Popup";
import ExpRevChart from "../components/ExpRevChart";
import LoginCheck from '../modules/LoginCheck';
import { useNavigate } from 'react-router-dom';
import ProfLossChart from "../components/ProfLossChart";
import PropChart from "../components/PropertiesChart";
import PropOChart from "../components/PropertyOverview";

import { ipAddress } from '../App';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  PointElement,
  Legend,
} from 'chart.js';
import { Sidebar } from '../components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


var fullDataArr = [];
var expAll = [];
var revAll = [];
var profAll = [];
var lossAll = [];
var expYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var revYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var years = [];
var properties = [];
var propExp = [];
var propRev = [];
var propIns = [];
var propTax = [];
var propMort = [];
var propInt = [];
var propPrin = [];
var propertyData = [];
var antiLoop = true;
var tenants = [];
var owedRent = [];
var filter = {};
const Overview = () => {
  const navigate = useNavigate();
  LoginCheck(navigate);

  const [yearDisp, setYearDisp] = useState(years[0]);
  const [expRevData, setExpRevData] = useState({exp:expYr, rev:revYr});
  const [owed, setOwed] = useState([]);
  const [propData, setPropData] = useState({labels: properties, rev: propRev, exp: propExp, 
                                            insurance: propIns, tax: propTax, mort: propMort, 
                                            interest: propInt, principle: propPrin});
  const [profLossData, setprofLossData] = useState({labels:years,rev:revAll,exp:expAll,
                                                    prof:profAll,loss:lossAll});

  //clears current year data and passes on data array to be proccessed.
  

  function getProperties(arr){
    var props = []
    arr.forEach(elem => {
      //console.log(elem[0].Address);
      if(!props.includes(elem[0].Address) && elem[0].Address !== 'Other' && !('counter' in elem[0])){
        //console.log(elem[0].Address + " added");
        props.push(elem[0].Address);
      }
    });

    props.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    //props.pop();
    //console.log(props)
    return props;
  }

  


  function getYears(arr){
      var yearsArr = []

      arr.forEach(elem => {
        if(!yearsArr.includes(parseInt(elem[0].Year)) && !isNaN(elem[0].Year)){
          //console.log(elem[0].Year + " added");
          yearsArr.push(parseInt(elem[0].Year));
        }
      });

      yearsArr.sort(function(a, b){return a - b});
      return yearsArr;
  }

  // processes revenue vs expense in dataset for specific year
  function procExpRev(elem, yr) {

    if (parseInt(elem.Year) === yr && elem.Type === "Expense") {
      //console.log('exp found');
      expYr[parseInt(elem.Month) - 1] += parseFloat(elem.Payment);
      //console.log(elem.Month + " now " + revYr[parseInt(elem.Month) - 1]);

    } else if (parseInt(elem.Year) === yr && elem.Type === "Revenue") {
      //console.log('rev found');
      revYr[parseInt(elem.Month) - 1] += parseFloat(elem.Payment);
      //console.log(elem.Month + " now " + revYr[parseInt(elem.Month) - 1]);
    }

  }

  function procProfLoss(elem){
      switch (elem.Type){
        case "Expense":
          expAll[years.indexOf(parseInt(elem.Year))] += parseFloat(elem.Payment);
          break;
        case "Revenue":
          revAll[years.indexOf(parseInt(elem.Year))] += parseFloat(elem.Payment);
          break;
        default:
      }
  }

  function procProp(elem, yr){
    
    switch(elem.Desc){
      case "Monthly Rent Paid":
        if(parseInt(elem.Year) === yr){
          propRev[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Community Fee":
        if(parseInt(elem.Year) === yr){
          propExp[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Condo Fee":
        if(parseInt(elem.Year) === yr){
          propExp[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Property Tax":
        if(parseInt(elem.Year) === yr){
          propTax[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Expense":
        if(parseInt(elem.Year) === yr){
          propExp[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Interest":
        if(parseInt(elem.Year) === yr){
          propInt[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Insurance":
          if(parseInt(elem.Year) === yr){
            propIns[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
          };
          break;
      case "Utilities":
        if(parseInt(elem.Year) === yr){
          propExp[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      case "Mortgage":
        if(parseInt(elem.Year) === yr){
          propMort[properties.indexOf(elem.Address)] += parseFloat(elem.Payment);
        };
        break;
      default:
        break;
    }


  }
  function procPrinciple(props){
    props.forEach(elem => {
      propPrin[props.indexOf(elem)] = parseFloat(propMort[props.indexOf(elem)]) - parseFloat(propInt[props.indexOf(elem)]);

    });
  }

  function loadProfLoss(dataArr){ 
    var i = 0;

    years.forEach(elem => {
      expAll.push(0);
      revAll.push(0);
      lossAll.push(0);
      profAll.push(0);
    });

    dataArr.forEach(elem => { procProfLoss(elem[0])});
    years.forEach(elem => {
      var profLoss  = revAll[i] - expAll[i];
      if(profLoss < 0){
        lossAll[i] = -profLoss;
      }else{
        profAll[i] = profLoss;
      }
      i++;
    });

  }

  function loadPropData(yr){
    propExp = [];
    propRev = [];
    propIns = [];
    propTax = [];
    propMort = [];
    propInt = [];
    propPrin = [];
    propertyData = [];

    properties.forEach(element => { propExp.push(0);
                                    propRev.push(0);
                                    propIns.push(0);
                                    propTax.push(0);
                                    propMort.push(0);
                                    propInt.push(0);
                                    propPrin.push(0);
                                    propertyData.push(0);});
    
    fullDataArr.forEach(element => procProp(element[0], yr));
    procPrinciple(properties);
  }

  function resolve(elem){
    elem[0].DatePaid = elem[0].Date;
    axios.post("http://" + ipAddress + ":5000/api/setTransaction",{id: elem[1],data:elem[0]});
    console.log(owedRent);
    owedRent.splice(owedRent.indexOf(elem),1)
    console.log(owedRent);
    setOwed(owedRent);
    cycleYear(yearDisp);
    localStorage.setItem("reloadFlag",'True');
    console.log(elem);
  } 

  function loadExpVRev(yr) {
    expYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    revYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    fullDataArr.forEach(element => procExpRev(element[0], yr));
  }
  
  

  //changes data displayed when title is clicked
  function cycleYear(num) {
    if (num > years[years.length-1]) {
      setYearDisp(years[years.length-1]);
      loadExpVRev(years[years.length-1]);
      loadPropData(years[years.length-1]);
      setExpRevData({exp:expYr, rev:revYr});
      setPropData({labels: properties, rev: propRev, exp: propExp, 
        insurance: propIns, tax: propTax, mort: propMort, 
        interest: propInt, principle: propPrin});
    } else if (num < years[0]){
      setYearDisp(years[0]);
      loadExpVRev(years[0]);
      loadPropData(years[0]);
      setExpRevData({exp:expYr, rev:revYr});
      setPropData({labels: properties, rev: propRev, exp: propExp, 
        insurance: propIns, tax: propTax, mort: propMort, 
        interest: propInt, principle: propPrin});
    }else {
      setYearDisp(years[years.indexOf(num)]);
      loadExpVRev(years[years.indexOf(num)]);
      loadPropData(years[years.indexOf(num)])
      setExpRevData({exp:expYr, rev:revYr});
      setPropData({labels: properties, rev: propRev, exp: propExp, 
        insurance: propIns, tax: propTax, mort: propMort, 
        interest: propInt, principle: propPrin});
    }
    //console.log(expYr[5]);
  }

  LoginCheck(navigate);
  //initial load of data
  useEffect(() => {
    LoginCheck(navigate );
    
    //console.log("if checked");
    if (antiLoop || localStorage.getItem('reloadFlag') === 'True') {
      localStorage.removeItem('reloadFlag');
      antiLoop = false;
      //console.log("if trig");

      axios.get('http://' + ipAddress + ':5000/api/loadTenants').then((res) => {
        //console.log(res.data);
        res.data.forEach(elem => { 
          if (elem[0]['Current Tenant'] === 'Yes'){
            tenants.push(elem[0]);
          }
        });
      //console.log(tenants);
      });
      

      axios.get('http://' + ipAddress + ':5000/api/loadTransactions').then((res) => {
        //res.data.pop();
        fullDataArr = res.data;
        //console.log(fullDataArr);
        years = getYears(fullDataArr);
        properties = getProperties(fullDataArr);
     
        setYearDisp(years[0])
        //console.log(years);
        //console.log(fullDataArr.length + ' items pulled from db')
        loadPropData(years[0]);
        loadExpVRev(years[0]);
        setPropData({labels: properties, rev: propRev, exp: propExp, 
          insurance: propIns, tax: propTax, mort: propMort, 
          interest: propInt, principle: propPrin});
        setExpRevData({exp:expYr, rev:revYr});
       
        getProperties(fullDataArr);
        loadProfLoss(fullDataArr);
        setprofLossData({labels:years,rev:revAll,exp:expAll,prof:profAll,loss:lossAll});
        
        fullDataArr.forEach(elem => { 
          if(elem[0].Desc === 'Monthly Rent Charged' && !(isNaN(elem[0].DatePaid) ||  elem[0].DatePaid !== '')){
            owedRent.push(elem);
          }
          
          
        });
        setOwed(owedRent);
        console.log(owed);
      })
    }
  },[])

  return (


    <div className="App flex">

      <div className="w-72 sidebar
    dark:bg-secondary-dark-bg
    bg-white shadow-2xl">
        <Sidebar />
      </div>

      <div id="over__pageOverview">


        <div class="over__GraphContainer">
           <div class="over__graph">
            <div > <h1 class="over__graphTitle" >Expenses and Revenue for <button onClick={() => cycleYear(yearDisp-1)}>&lt;</button> {yearDisp} <button onClick={() => cycleYear(yearDisp+1)}>&gt;</button></h1></div>
            <div id='accGraph'><ExpRevChart datasets={expRevData} /></div>
          </div>  

          <div class="over__graph">
            <div ><h1 class="over__graphTitle" >Property Data for <button onClick={() => cycleYear(yearDisp-1)}>&lt;</button> {yearDisp} <button onClick={() => cycleYear(yearDisp+1)}>&gt;</button></h1></div>
            <div id='accGraph'><PropOChart datasets={propData} /></div>
          </div>

          <div class="over__graph" >  
            <div ><h1 class="over__graphTitle" >Profit and Loss</h1></div>
            <div id='accGraph'><ProfLossChart datasets={profLossData} />
            </div>
          </div>

          <div class="over__graph">
            <div ><h1 class="over__graphTitle" >Property Data for <button onClick={() => cycleYear(yearDisp-1)}>&lt;</button> {yearDisp} <button onClick={() => cycleYear(yearDisp+1)}>&gt;</button></h1></div>
            <div id='accGraph'><PropChart datasets={propData} /></div>
          </div>
            
        </div>
        <br />
        <div className='over__GraphContainer2'>
            <div class="over__graph2">
              <div ><h1 class="over__graphTitle" >Outstanding Payments</h1></div>
              <div>
                <table className="trans__table">
                  <thead>
                    <tr>
                      <th>Tenant</th>
                      <th>Property</th>
                      <th>Year</th>
                      <th>Month</th>
                      <th>Owed($)</th>
                      <th>Resolve</th>
                    </tr>
                  </thead>

                  <tbody>
                    {owed.map((val) => (

                      <tr>
                        <td>{val[0].PayerName}</td>
                        <td>{val[0].PayerName}</td>
                        <td>{val[0].Year}</td>
                        <td>{val[0].Month}</td>
                        <td>{val[0].Payment}</td>
                        <td > <button className="over_button" onClick={() => resolve(val)}>Mark as Paid</button> </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
           

        </div>


      </div>
        
    </div>
  )


}

export default Overview