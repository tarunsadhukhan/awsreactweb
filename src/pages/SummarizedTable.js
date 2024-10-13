'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Spinner } from 'react-bootstrap';
import ChartComponent from './ChartComponent693';
import FilterModal from './FilterModal693';
import { apipath } from '../others/constant'; 
import { format } from "date-fns";
//import '../css/Page693.css'

export default function SummarizedTable({ onRowClick, onDataReceived, filterData, onFilterChange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChartView, setIsChartView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filterData]);

  const fetchData = async () => {
    setIsRefreshing(true);
    const { machineno, fromDate, toDate } = filterData;
    const company_id = localStorage.getItem('comp_id');
    setLoading(true)
    try {
      const response = await axios.get(`${apipath}api/doffsummary-data`, {
        params: {
          machineno: machineno || '',
          varfromdate: fromDate || '',
          vartodate: toDate || '',
          company_id: company_id
        }
      });
      setData(response.data);
      onDataReceived(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterSubmit = (newFilter) => {
    setIsModalOpen(false);
    setLoading(false);
    onFilterChange(newFilter);
  };

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleRowClick = (rowData) => {
    onRowClick(rowData);
  };

  

  return (
    <Container fluid className="mt-0">
      <h4 className="mb-1 text-center">Frame Wise Doffing Report {filterData.fromDate && filterData.toDate
          ? `From ${format(filterData.fromDate,"dd-MM-yyyy")} to ${format(filterData.toDate,"dd-MM-yyyy")}`
          : 'Date range not specified'}</h4>
      <div className="mb-3">
        <Button
          variant={isChartView ? 'secondary' : 'primary'}
          className="me-2"
          onClick={() => setIsChartView(!isChartView)}
        >
          {isChartView ? 'Hide Chart' : 'View Chart'}
        </Button>
        <Button variant="secondary" onClick={handleFilterClick}>
          Filter
        </Button>
      </div>

      {isChartView && (
        <div className="mb-4">
          <ChartComponent data={data} type="summarized" />
        </div>
      )}

      {/* Table structure is always visible */}
      <div className="table-container position-relative">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="table  table-bordered table-hover">
              <thead className="sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">From Date</th>
                  <th>To Date</th>
                  <th>Machine No</th>
                  <th>No. of Doff</th>
                  <th>Production</th>
                  <th>Prod/ 8 Hours</th>
                  <th>Avg No of Doff/ 8 Hours</th>
                  <th>Avg Wt per Doff</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                   
                    <tr key={index} onDoubleClick={() => handleRowClick(row)} className={row.rowcolor}>
                      <td>{row.fromDate}</td>
                      <td>{row.toDate}</td>
                      <td>{row.frameno}</td>
                      <td>{row.noofdoff}</td>
                      <td>{row.prod}</td>
                      <td>{row.avgprod}</td>
                      <td>{row.avgnoofdoff}</td>
                      <td>{row.avgwt}</td>
                      <td>{row.eff}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
 
        </div>
      </div>
      <div className='text-center mt-4'>
  <span style={{ backgroundColor: 'rgb(248, 148, 144)', color: 'white', padding: '5px 10px', borderRadius: '5px', marginRight: '10px' }}>less than 40%</span> 
  ||
  <span style={{ backgroundColor: 'rgb(167, 167, 247)', color: 'white', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px', marginRight: '10px' }}>50% to 60%</span> 
  ||
  <span style={{ backgroundColor: 'rgb(227, 248, 177)', color: 'black', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px', marginRight: '10px' }}>60% to 70%</span> 
  ||
  <span style={{ backgroundColor: 'rgb(183, 232, 176)', color: 'white', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px' }}>More than 70%</span>  
</div>
      {isModalOpen && (
        <FilterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFilterSubmit}
          initialFilter={filterData}
        />
      )}
    </Container>
  );
}
