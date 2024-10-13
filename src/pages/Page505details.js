import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../css/Styles.css';

const DetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.fromPage || '/'; // Default to root if not set
  const currentPage = location.state?.currentPage || 1;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fetch-details/${id}`)
      .then(response => {
        setDetails(response.data);
      })
      .catch(error => console.error('Error fetching details:', error));
  }, [id]);

  return (
    <div className="detail-page-container">
      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => navigate('/', { state: { fromPage: 'Page505', currentPage } })}
          className="btn btn-secondary"
        >
          Back
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Detail 1</th>
              <th>Detail 2</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {details.length > 0 ? (
              details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.detail1}</td>
                  <td>{detail.detail2}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailPage;
