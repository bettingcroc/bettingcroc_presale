import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "./PieChart.css"

import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
  labels: ['PreSale', 'Public Sale', 'Treasury', 'Founders', 'Development', 'Marketing', 'KOLs and Partners', 'Airdrop', 'Liquidity'],
  datasets: [
    {
      label: 'Token Allocation',
      data: [10, 33.3, 14, 10, 10, 10, 4, 3, 5.7],
      backgroundColor: [
        'rgba(83, 143, 255, 0.5)',
        'rgba(180, 49, 230, 0.5)',
        'rgba(255, 91, 88, 0.5)',
        'rgba(247, 237, 101, 0.5)',
        'rgba(40, 210, 171, 0.5)',
        'rgba(252, 162, 7, 0.5)',
        'rgba(38, 129, 137, 0.5)',
        'rgba(246, 204, 249, 0.5)',
        'rgba(45, 26, 119, 0.5)',
      ],
      borderColor: [
        'rgba(83, 143, 255, 1)',
        'rgba(180, 49, 230, 1)',
        'rgba(255, 91, 88, 1)',
        'rgba(247, 237, 101, 1)',
        'rgba(40, 210, 171, 1)',
        'rgba(252, 162, 7, 1)',
        'rgba(38, 129, 137, 1)',
        'rgba(246, 204, 249, 1)',
        'rgba(45, 26, 119, 1)',
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
        size: 12,
        family: "Poppins"
      },
      formatter: function (value, context) {
        return context.chart.data.labels[context.dataIndex] + "\n " + context.chart.data.datasets[0].data[context.dataIndex] + " %";
      },
    },

  },
  cutout: '60%',
};

const PieChart = () => {
  return (
    <div id='chart'>
      <Pie plugins={[ChartDataLabels]} data={data} options={options} />
    </div>
  );
};

export default PieChart;