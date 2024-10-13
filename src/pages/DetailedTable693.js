import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
import ChartComponentLine from './DetailedChartComponentline693';
import RowDetailView from './RowDetailView693';
import { apipath } from '../others/constant';
import { format } from "date-fns";
import '../css/Page693.css'

const DetailedTable = ({ filterData, onRowClick, onClose }) => {
  const [detailedData, setDetailedData] = useState([]);
  const [isChartView, setIsChartView] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filterData) {
      const { fromDate, toDate, frameno, mechine_id } = filterData;
      const company_id = 2;
      setLoading(true); // Set loading to true before starting the request
      axios.get(`${apipath}api/doffdetail-data`, {
        params: {
          company_id,
          varfromdate: fromDate,
          vartodate: toDate,
          varframeno: frameno,
          varmechine_id: mechine_id
        }
      })
      .then(response => {
        setDetailedData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching detailed data:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
    }
  }, [filterData]);

  const handleClose = () => {
    onClose();
  };

  const handleRowDoubleClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <div className="container mt-0">
      <h4 className="mb-1 text-center">
        Frame Wise Doffing Report {filterData.fromDate && filterData.toDate ? `From ${filterData.fromDate} to ${filterData.toDate}` : 'Date range not specified'}
      </h4>
      <div className="mb-3">
        <Button
          variant={isChartView ? "secondary" : "primary"}
          onClick={() => setIsChartView(!isChartView)}
          className="me-2"
        >
          {isChartView ? 'Hide Detailed Chart' : 'View Detailed Chart'}
        </Button>
        <Button variant="danger" onClick={handleClose}>Close</Button>
      </div>

      {/* Chart view */}
      {isChartView && (
        <ChartComponentLine
          data={detailedData}
          type="detailed"
        />
      )}

      {/* Always show the table header and loading spinner in tbody */}
      <div className="table-container position-relative">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="max-h-96 overflow-y-auto">
            <Table className="table table-striped table-bordered table-hover">
              <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                <tr>
                  <th>Machine No</th>
                  <th>Doff Date</th>
                  <th>No. of Doff</th>
                  <th>Production</th>
                  <th>Prod/ 8 Hours</th>
                  <th>Avg Wt per Doff</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </td>
                  </tr>
                ) : (
                  detailedData.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => onRowClick(row)}
                      onDoubleClick={() => handleRowDoubleClick(row)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{row.frameno}</td>
                      <td>{row.doffdatem}</td>
                      <td>{row.noofdoff}</td>
                      <td>{row.prod}</td>
                      <td>{row.avgprod}</td>
                      <td>{row.avgwt}</td>
                      <td>{row.eff}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Detailed Row View */}
      {selectedRow && (
        <RowDetailView
          rowData={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};

export default DetailedTable;
