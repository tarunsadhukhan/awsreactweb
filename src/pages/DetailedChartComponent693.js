import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ data = [], type }) => {
  // Prepare data for the chart based on type (summarized or detailed)
  const labels = type === 'summarized' 
    ? data.map(row => `Machine ${row.frameno}`)  // X-axis labels for summarized data
    : data.map(row => `Date ${row.doffdate}`);   // X-axis labels for detailed data

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'No. of Doff',
        data: data.map(row => row.noofdoff),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Production',
        data: data.map(row => row.prod),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Efficiency',
        data: data.map(row => row.eff),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: type === 'summarized' 
          ? 'Summarized Machine Data1' // Title for summarized data
          : 'Detailed Doff Data',      // Title for detailed data
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartComponent;
