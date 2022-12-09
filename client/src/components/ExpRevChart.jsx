import React, { useRef, useEffect, useState } from "react";
import { Bar} from 'react-chartjs-2';


function ExpRevChart({datasets}){

    var chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Expenses',
          data: datasets.exp,
          borderColor: 'rgb(153, 0, 0)',
          backgroundColor: 'rgba(153, 0, 0, .8)',
        },
        {
          label: 'Revenue',
          data: datasets.rev,
          borderColor: 'rgb(0, 102, 0)',
          backgroundColor: 'rgba(0, 102, 0, 0.8)',
        },],
      }


    return(
        <Bar data={chartData} options={{ responsive: true, }} />
    )


}

export default ExpRevChart;