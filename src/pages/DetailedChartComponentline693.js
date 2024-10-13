import React,{useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponentLine = ({ data = [], type }) => {
  // Prepare data for the chart based on type (summarized or detailed)
  const [showNoofDoff, setShowNoofDoff] = useState(true);  // State for toggling NoofDoff
  const [showProd, setShowProd] = useState(true);  // State for toggling Production
  const [showEff, setShowEff] = useState(true);    // State for toggling Efficiency
  const [showWt, setShowWt] = useState(true);    // State for toggling Efficiency
  const labels = type === 'summarized' 
    ? data.map(row => `Machine ${row.frameno}`)  // X-axis labels for summarized data
    : data.map(row => `Date ${row.doffdate}`);   // X-axis labels for detailed data

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


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: type === 'summarized' 
          ? 'Summarized Machine Data'  // Title for summarized data
          : 'Detailed Doff Data',      // Title for detailed data
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labelsc = type === 'summarized' 
  ? data.map(row => `Frame ${row.frameno}`)  // X-axis labels for summarized data
  : data.map(row => `Date ${row.doffdatem}`);   // X-axis labels for detailed data

  
  const chartData = {
    //  labels: data.map(row => `Frame ${row.frameno}`),  // X-axis: Machine Numbers (frameno)
    labels: labelsc, 
    datasets: datasets  // Dynamic datasets based on user selection
    };

//  return <Line data={chartData} options={options} />;


return (
    <div>
      <Line data={chartData} options={options} />

      {/* Checkboxes to toggle datasets */}
      <div className="dataset-controls">
        <label style={{Margin : '0 0 0 5px'}}>
          <input
            type="checkbox"
            checked={showNoofDoff}
            onChange={() => setShowNoofDoff(!showNoofDoff)}
          />
          Show Avg No of Doff
        </label>
        <label>
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
          Show Efficiency
        </label>
      </div>
    </div>
  );
};


export default ChartComponentLine;