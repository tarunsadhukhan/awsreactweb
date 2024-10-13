import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFilePdf, faPrint, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import '../css/Styles.css'; // Import any additional styles here
import filterlogo from '../css/filterIcon.png';
import printlogo from '../css/printIcon.png';
import excellogo from '../css/ic_excel.png'; 
import iclogo from '../css/ic_pdf.png';
import logout from '../css/logout.png';
//import CommonHeader from './CommonHeader';


const Page505Header = ({ onFilterClick }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform your logout logic here
    // For example: clear local storage, remove tokens, etc.
    localStorage.removeItem('token'); // Example: remove a token

    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
  {/*   <CommonHeader />
   */}

        <div className="card-header text-center">
          <h3 className="card-title">Purchase Report</h3>
          <p className="card-subtitle">Period from 2024 to 2025</p>
        </div>
   
     
      <div className="card-header text-right">
        <button id="filter-btn" className="pbtn btn-light" onClick={onFilterClick}>
          <img src={filterlogo} alt="Filter" className="icon" />
        </button>
        <button id="print-btn" className="pbtn btn-light">
          <img src={printlogo} alt="Print" className="icon" />
        </button>
        <button id="pdf-btn" className="pbtn btn-light">
        <img src={iclogo} alt="Print" className="icon" />
        </button>
        <button id="excel-btn" className="pbtn btn-light">
          <img src={excellogo} alt="Excel" className="icon" />
        </button>
      </div>
     
   
    </>
  );
};

export default Page505Header;
