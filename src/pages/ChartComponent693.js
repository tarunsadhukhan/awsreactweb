import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Margin } from '@mui/icons-material';

// Register the required components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ data = [], type }) => {
  const [showNoofDoff, setShowNoofDoff] = useState(true);  // State for toggling NoofDoff
  const [showProd, setShowProd] = useState(true);  // State for toggling Production
  const [showEff, setShowEff] = useState(true);    // State for toggling Efficiency
  const [showWt, setShowWt] = useState(true);    // State for toggling Efficiency

  console.log('Chart data received:', data);  // Log the data received by ChartComponent

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available for the chart.</p>;
  }


  
  console.log('type',type);
  const labelsc = type === 'summarized' 
  ? data.map(row => `Frame ${row.frameno}`)  // X-axis labels for summarized data
  : data.map(row => `Date ${row.doffdate}`);   // X-axis labels for detailed data

  // Prepare datasets based on the state of the checkboxes
  const datasets = [];
  
  if (showNoofDoff) {
    datasets.push({
      label: 'Doff/8Hrs',
      data: data.map(row => row.avgnoofdoff),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    });
  }

  if (showProd) {
    datasets.push({
      label: 'Prod/8 Hrs',
      data: data.map(row => row.avgprod),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    });
  }
  if (showWt) {
    datasets.push({
      label: 'Wt/Doff',
      data: data.map(row => row.avgwt),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    });
  }

  if (showEff) {
    datasets.push({
      label: 'Efficiency',
      data: data.map(row => row.eff),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    });
  }

  // Prepare data for the chart
 

  const chartData = {
  //  labels: data.map(row => `Frame ${row.frameno}`),  // X-axis: Machine Numbers (frameno)
  labels: labelsc, 
  datasets: datasets  // Dynamic datasets based on user selection
  };

  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Frame Wise  No of Doff, Production, and Efficiency',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Machine Numbers (frameno)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values (No of Doff, Production, Efficiency)',
        },
        beginAtZero: true,  // Ensure the y-axis starts from zero
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />

      {/* Checkboxes to toggle datasets */}
      <div className="dataset-controls" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

        <label style={{Margin : '0 0 0 5px'}}>
          <input
            type="checkbox"
            checked={showNoofDoff}
            onChange={() => setShowNoofDoff(!showNoofDoff)}
          />
          Avg No of Doff
        </label>
        <label style={{Margin : '0 50px 5px 5px'}}>
          <input
            type="checkbox"
            checked={showProd}
            onChange={() => setShowProd(!showProd)}
          />
          Avg Production
        </label>
        <label>
          <input
            type="checkbox"
            checked={showWt}
            onChange={() => setShowWt(!showWt)}
          />
          Avg Weight
        </label>
        <label>
          <input
            type="checkbox"
            checked={showEff}
            onChange={() => setShowEff(!showEff)}
          />
          Efficiency
        </label>
      </div>
    </div>
  );
};

export default ChartComponent;
