import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page505table = ({ submittedValues }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  

  useEffect(() => {
    // Make the API call to fetch data based on the submitted form values
    console.log('dhhddh',submittedValues);
   // axios.post('http://localhost:5000/api/fetch-table-data', submittedValues1)
   const company_id = 2; // Replace with dynamic company_id if needed
  /*
        axios.get('http://localhost:5000/api/fetch-table-data', {
          params: {
            variable_name: 'ananana',
            company_id: company_id
          }
        })
*/
const varfromdate = submittedValues.varfromdate || 'null';
const vartodate = submittedValues.vartodate || 'null';

   axios.get('http://localhost:5000/api/fetch-table-data', {
        params: {
           
        varfromdate: varfromdate,
        vartodate: vartodate,
        varebno: submittedValues.varebno || 'null',
        vardepartment: submittedValues.vardepartment || 'null',
          company_id: company_id
        }
      })
    
    //  .then(response => setTableData(response.data))
      .then(response => {
        // Check the structure of response.data
        console.log('Response data table:', response.data);
      
        // Update state with the fetched data
        setTableData(response.data);
        console.log('table data===', tableData);
      })
      
      .catch(error => console.error('Error fetching table data:', error));
  }, [submittedValues]);

  useEffect(() => {
    console.log('Updated table data:', tableData);
  }, [tableData]);


  const handleRowDoubleClick = (row) => {
    console.log('Row details:', row);
    // You can perform other actions here, like updating state or showing a modal
  };

  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (

    

    <div className="mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
            <th style={{ display: 'none' }}>#</th> {/* Hide the header */}
              <th>Period From</th>
              <th>Period To</th>
              <th>Emp Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Working Hours</th>



              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
          {console.log('Rendering table data:', tableData)}
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}
              onDoubleClick={() => handleRowDoubleClick(row)}
              style={{ cursor: 'pointer' }} // Change cursor to indicate clickable row
   >
                <td style={{ display: 'none' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{row.startdate || 'No From Date'}</td>
                <td>{row.enddate || 'No To Date'}</td>
                <td>{row.eb_no || 'No EB No'}</td>
                <td>{row.first_name || 'No Name'}</td>
                <td>{row.dept_desc || 'No Department'}</td>
                <td>{row.desig || 'No Designation'}</td>
                <td className="table-cell align-right width-10">{row.whrs || 'No Working Hours'}</td>
   
                {/* Add more columns as needed */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}       </tbody>
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
