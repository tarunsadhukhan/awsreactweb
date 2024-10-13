import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Use react-datepicker for date input
import 'react-datepicker/dist/react-datepicker.css';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Select from 'react-select';
import '../css/Styles.css'; // Use relative path to your CSS
 
import Page505table from './Page505table';
import Placeholder505 from '../others/Placeholder505';


const Page504 = () => {
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [tableData, setTableData] = useState([]);
  const [comboboxOptions, setComboboxOptions] = useState({});
  const [comboboxDesgOptions, setComboboxDesgOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch form data
    axios.get('http://localhost:5000/api/form?id=504')
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching form data:', error));
  }, []);

  useEffect(() => {
    formData.forEach(item => {
      if (item.input_type === 'combobox') {
        const company_id = 2; // Replace with dynamic company_id if needed
  
        axios.get('http://localhost:5000/api/combobox-department', {
          params: {
            variable_name: item.variable_name,
            company_id: company_id
          }
        })
        .then(response => {
          const transformedOptions = response.data.map(option => ({
            value: option.dept_id,  // Use dept_id as value
            label: option.dept_desc // Use dept_desc as label
          }));
  
          setComboboxOptions(prev => ({
            ...prev,
            [item.variable_name]: transformedOptions
          }));
  
          console.log('Transformed options for', item.variable_name, ':', transformedOptions);
        })
        .catch(error => console.error(`Error fetching combobox options for ${item.variable_name}:`, error));
      }
    });
  }, [formData]);

  useEffect(() => {
    formData.forEach(item => {
      if (item.input_type === 'combobox') {
        const company_id = 2; // Replace with dynamic company_id if needed
  
        axios.get('http://localhost:5000/api/combobox-designation', {
          params: {
            variable_name: item.variable_name,
            company_id: company_id
          }
        })
        .then(response => {
          const transformedDesgOptions = response.data.map(option => ({
            value: option.desg_id,  // Use dept_id as value
            label: option.desig // Use dept_desc as label
          }));
  
          setComboboxDesgOptions(prev => ({
            ...prev,
            [item.variable_name]: transformedDesgOptions
          }));
  
          console.log('Transformed options for', item.variable_name, ':', transformedDesgOptions);
        })
        .catch(error => console.error(`Error fetching combobox options for ${item.variable_name}:`, error));
      }
    });
  }, [formData]);



  useEffect(() => {
    console.log('Current comboboxOptions:', comboboxOptions);
  }, [comboboxOptions]);
  
  const handleInputChange = (variable_name, value) => {
    setFormValues(prev => ({ ...prev, [variable_name]: value }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/submit-form', formValues)
      .then(response => {
        // Assuming table data is returned as part of the response
        setTableData(response.data);
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

return (
    <div className="container mt-4">
        <Placeholder505/>
        <form>
            <div className="row">
                {formData.map(item => (
                    <div key={item.variable_name} className="col-md-6 mb-3">
                        <label className="form-label">{item.label}</label>
                        {item.input_type === 'date' ? (
                            <DatePicker
                                selected={formValues[item.variable_name]}
                                onChange={date => handleInputChange(item.variable_name, date)}
                                className="form-control"
                            />
                        ) : item.input_type === 'text' ? (
                            <input
                                type={item.input_type}
                                value={formValues[item.variable_name] || ''}
                                onChange={e => handleInputChange(item.variable_name, e.target.value)}
                                className="form-control"
                            />
                        ) : item.input_type === 'integer' ? (
                            <input
                                type={item.input_type}
                                value={formValues[item.variable_name] || ''}
                                onChange={e => handleInputChange(item.variable_name, e.target.value)}
                                className="form-control"
                            />
                        ) : item.variable_name === 'vardepartment' ? (
                            <Select
                                options={[{ value: 0, label: 'All' }, ...(comboboxOptions[item.variable_name] || [])]}
                                value={comboboxOptions[item.variable_name]?.find(option => option.value === formValues[item.variable_name])}
                                onChange={option => handleInputChange(item.variable_name, option ? option.value : '')}
                                className="custom-select"
                                placeholder="Select Department"
                            />
                        ): item.variable_name === 'vardesignation' ? (
                            <Select
                                options={[{ value: 0, label: 'All' }, ...(comboboxDesgOptions[item.variable_name] || [])]}
                                value={comboboxOptions[item.variable_name]?.find(option => option.value === formValues[item.variable_name])}
                                onChange={option => handleInputChange(item.variable_name, option ? option.value : '')}
                                className="custom-select"
                                placeholder="Select Department"
                            />
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">  
                <button type="button" className="btn btn-primary" onClick={() => alert('Form Closed')}>
                    Close
                </button>
                <span style={{ width: '10px' }}></span>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>

<div>

<Page505table/>

</div>



        <div className="mt-4">
            <div className="table-responsive">


                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Column 1</th>
                            <th>Column 2</th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr key={index}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{row.column1}</td>
                                <td>{row.column2}</td>
                                {/* Add more columns as needed */}
                            </tr>
                        ))}
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
    </div>
);
};

export default Page504;
