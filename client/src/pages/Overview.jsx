import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios'
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
var expYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var revYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Overview = () => {

  //clears current year data and passes on data array to be proccessed.
  function loadExpVRev(yr) {
    expYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    revYr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    fullDataArr.forEach(element => procExpRev(element[0], yr));
  }
  // processes revenue vs expense in dataset for specific year
  function procExpRev(elem, yr) {

    if (elem.Year === yr && elem.Type === "Expense") {
      console.log('exp found');
      expYr[elem.Month - 1] += elem.Payment;
      console.log('exp added at m:' + elem.Month);

    } else if (elem.Year === yr && elem.Type === "Revenue") {
      console.log('rev found');
      revYr[elem.Month - 1] += elem.Payment;
      console.log('rev added at m:' + elem.Month);
    }

  }
  const [yearDisp, setYearDisp] = useState(2016);
  const [expRevData, setExpRevData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Expenses',
      data: expYr,
      borderColor: 'rgb(153, 0, 0)',
      backgroundColor: 'rgba(153, 0, 0, .8)',
    },
    {
      label: 'Revenue',
      data: revYr,
      borderColor: 'rgb(0, 102, 0)',
      backgroundColor: 'rgba(0, 102, 0, 0.8)',
    },],
  });

  //changes data displayed when title is clicked
  function cycleYear(num) {
    if (num === 2022) {
      setYearDisp(2016);
      loadExpVRev(2016);
      setExpRevData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Expenses',
          data: expYr,
          borderColor: 'rgb(153, 0, 0)',
          backgroundColor: 'rgba(153, 0, 0, .8)',
        },
        {
          label: 'Revenue',
          data: revYr,
          borderColor: 'rgb(0, 102, 0)',
          backgroundColor: 'rgba(0, 102, 0, 0.8)',
        },],
      });
    } else if (num !== 2022) {
      setYearDisp(num + 1);
      loadExpVRev(num + 1);
      setExpRevData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Expenses',
          data: expYr,
          borderColor: 'rgb(153, 0, 0)',
          backgroundColor: 'rgba(153, 0, 0, .8)',
        },
        {
          label: 'Revenue',
          data: revYr,
          borderColor: 'rgb(0, 102, 0)',
          backgroundColor: 'rgba(0, 102, 0, 0.8)',
        },],
      });
    }
  }
  //initial load of data
  useEffect(() => {
    if (sessionStorage.getItem("arrayLoaded") !== "True") {
      console.log("if checked");
      axios.get('http://localhost:5000/api/loadDash').then((res) => {
        fullDataArr = res.data;
        console.log(fullDataArr.length + ' items pulled from db')
        console.log(fullDataArr);
        loadExpVRev(2016);
        sessionStorage.setItem("arrayLoaded", "True");

        setExpRevData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Expenses',
            data: expYr,
            borderColor: 'rgb(153, 0, 0)',
            backgroundColor: 'rgba(153, 0, 0, .8)',
          },
          {
            label: 'Revenue',
            data: revYr,
            borderColor: 'rgb(0, 102, 0)',
            backgroundColor: 'rgba(0, 102, 0, 0.8)',
          },],
        });
        console.log(expRevData);


      })
    }



  }
  )

  return (


    <div className="App flex">

      <div className="w-72 sidebar
    dark:bg-secondary-dark-bg
    bg-white shadow-2xl">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
        <div className='justify-evenly mx-20 mb-5'>
          <div className="w-5/12 h-2/5 float-left m">
            <div ><h2 onClick={() => cycleYear(yearDisp)}>Expenses and Revenue for {yearDisp}</h2></div>
            <div id='expvsrev'><Bar data={expRevData} options={{ responsive: true, }} /> </div>
          </div>
          <div className="w-5/12 h-2/5 float-right">
            <div ><h2 onClick={() => cycleYear(yearDisp)}>Expenses and Revenue for {yearDisp}</h2></div>
            <div id='expvsrev'><Bar data={expRevData} options={{ responsive: true, }} /> </div>
          </div>

          <div>

            <div id='expvsrev'><Line data={expRevData} options={{ responsive: true, aspectRatio: 3 }} /> </div>
          </div>
        </div>
      </div>

    </div>
  )


}

export default Overview