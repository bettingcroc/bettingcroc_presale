import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "./PieChart.css"

import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
  labels: ['PreSale', 'Treasury', 'LP', 'Marketing'],
  datasets: [
    {
      label: '# of Votes',
      data: [44, 6, 44, 6],
      backgroundColor: [
        'rgba(102, 178, 255, 0.5)',
        'rgba(255, 255, 51, 0.5)',
        'rgba(102, 51, 0, 0.5)',
        'rgba(102, 204, 0, 0.5)',

      ],
      borderColor: [
        'rgba(102, 178, 255, 1)',
        'rgba(255, 255, 51, 1)',
        'rgba(102, 51, 0, 1)',
        'rgba(102, 204, 0, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.dataIndex];
          return ' ' + tooltipItem.label + ' : ' + currentValue + ' %';
        },
      },
      displayColors: false,
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: '#fff',
      font: {
        size: 26,
        family: "Rubik"
      },
      formatter: function (value, context) {
        return context.chart.data.labels[context.dataIndex]+ "\n "+context.chart.data.datasets[0].data[context.dataIndex]+" %";
      },
    },

  },
};

const PieChart = () => {
  return (
    <div id='chart'>
      <Pie plugins={[ChartDataLabels]} data={data} options={options} />
    </div>
  );
};

export default PieChart;