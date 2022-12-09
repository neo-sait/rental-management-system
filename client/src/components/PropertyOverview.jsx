import React, { useRef, useEffect, useState } from "react";
import { Bar} from 'react-chartjs-2';


function PropOChart({datasets}){

    var chartData = {
        labels: datasets.labels,
        datasets: [{
          label: 'Rent Paid',
          data: datasets.rev,
          borderColor: 'rgb(0, 102, 0)',
          backgroundColor: 'rgba(0, 102, 0, .8)',
          stack: 'Revenue',
        },
        {
          label: 'Expenses',
          data: datasets.exp,
          borderColor: 'rgb(153, 0, 0)',
          backgroundColor: 'rgba(153, 0, 0, 0.8)',
          stack: 'Expenses',
        },
        {
          label: 'Insurance',
          data: datasets.insurance,
          borderColor: 'rgb(255, 255, 51)',
          backgroundColor: 'rgba(255, 255, 51, 0.8)',
          stack: 'Expenses',
        },
        {
          label: 'Property Tax',
          data: datasets.tax,
          borderColor: 'rgb(51, 153, 255)',
          backgroundColor: 'rgba(51, 153, 255, 0.8)',
          stack: 'Expenses',
        },
        {
          label: 'Mortgage Paid',
          data: datasets.mort,
          borderColor: 'rgb(153, 51, 255)',
          backgroundColor: 'rgba(153, 51, 255, 0.8)',
          stack: 'Expenses',
        },
        
        ],
      }


    return(
        <Bar data={chartData} options={{ responsive: true,scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        } }} />
    )


}

export default PropOChart;