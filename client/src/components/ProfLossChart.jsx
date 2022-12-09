import React, { useRef, useEffect, useState } from "react";
import { Bar} from 'react-chartjs-2';


function ProfLossChart({datasets}){

    var chartData = {
        labels: datasets.labels,
        datasets: [{
          label: 'Revenue',
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
          label: 'Profit',
          data: datasets.prof,
          borderColor: 'rgb(0, 128, 255)',
          backgroundColor: 'rgba(0, 128, 255, 0.8)',
          stack: 'Expenses',
        },
        {
          label: 'Loss',
          data: datasets.loss,
          borderColor: 'rgb(255, 153, 5)',
          backgroundColor: 'rgba(255, 153, 51, 0.8)',
          stack: 'Revenue',
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

export default ProfLossChart;