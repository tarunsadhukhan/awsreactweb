import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Styles.css';

const Page505table = ({ submittedValues }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the current page from the state if available
    if (location.state?.currentPage) {
      setCurrentPage(location.state.currentPage);
    }
  }, [location.state?.currentPage]);

  useEffect(() => {
    const company_id = 2; // Replace with dynamic company_id if needed
    const varfromdate = submittedValues.varfromdate || 'null';
    const vartodate = submittedValues.vartodate || 'null';

    axios.get('http://localhost:5000/api/fetch-table-data', {
      params: {
        varfromdate,
        vartodate,
        varebno: submittedValues.varebno || 'null',
        vardepartment: submittedValues.vardepartment || 'null',
        company_id
      }
    })
    .then(response => {
      setTableData(response.data);
    })
    .catch(error => console.error('Error fetching table data:', error));
  }, [submittedValues]);

  const handleRowDoubleClick = (row) => {
    
      navigate(`/details/${row.id}`, { state: { fromPage: 'Page505table', currentPage } });
  
  
  };

  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="table-container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th style={{ display: 'none' }}>#</th>
              <th>Period From</th>
              <th>Period To</th>
              <th>Emp Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  className="hover-highlight"
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  <td style={{ display: 'none' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className='width-10'>{row.startdate || 'No From Date'}</td>
                  <td className='width-10'>{row.enddate || 'No To Date'}</td>
                  <td className='width-5'>{row.eb_no || 'No EB No'}</td>
                  <td className='width-25'>{row.first_name || 'No Name'}</td>
                  <td className='width-25'>{row.dept_desc || 'No Department'}</td>
                  <td className='width-25'>{row.desig || 'No Designation'}</td>
                  <td className="table-cell align-right width-5">{row.whrs || 'No Working Hours'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" align="center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= tableData.length}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Page505table;
