import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFilePdf, faPrint, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import '../css/Styles.css'; // Import any additional styles here
import filterlogo from '../css/filterIcon.png';
import printlogo from '../css/printIcon.png';
import excellogo from '../css/ic_excel.png'; 

const Page505Header = ({ onFilterClick }) => {
  return (
    <>
      <div className="card mb-4">
        <div className="card-header text-center">
          <h3 className="card-title">Purchase Report</h3>
          <p className="card-subtitle">Period from 2024 to 2025</p>
        </div>
      </div>
     
      <div className="card-header text-right">
        <button id="filter-btn" className="btn btn-light" onClick={onFilterClick}>
          <img src={filterlogo} alt="Filter" className="icon" />
        </button>
        <button id="print-btn" className="btn btn-light">
          <img src={printlogo} alt="Print" className="icon" />
        </button>
        <button id="pdf-btn" className="btn btn-light">
          <FontAwesomeIcon icon={faFilePdf} className="icon" /> 
        </button>
        <button id="excel-btn" className="btn btn-light">
          <img src={excellogo} alt="Excel" className="icon" />
        </button>
      </div>
     
   
    </>
  );
};

export default Page505Header;
