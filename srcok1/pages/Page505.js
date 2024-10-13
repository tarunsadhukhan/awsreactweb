import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import '../css/Styles.css';
import Page505table from './Page505table';
import Placeholder505 from '../others/Placeholder505';
import 'bootstrap/dist/css/bootstrap.min.css';
import Page505Header from './Page505Header ';

const Page505 = () => {
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [tableData, setTableData] = useState([]);
  const [comboboxOptions, setComboboxOptions] = useState({});
  const [comboboxDesgOptions, setComboboxDesgOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [submittedValues, setSubmittedValues] = useState(null);

  // Set default values when form data is fetched
  useEffect(() => {
    axios.get('http://localhost:5000/api/form?id=505')
      .then(response => {
        const data = response.data;
        setFormData(data);
        
        // Initialize default values if the formValues array is empty
        const initialValues = {};
        data.forEach(item => {
          if (item.variable_name === 'varfromdate') {
            initialValues[item.variable_name] = new Date(new Date().setDate(new Date().getDate() - 15)); // Default to 15 days ago
          } else if (item.variable_name === 'vartodate') {
            initialValues[item.variable_name] = new Date(); // Default to today
          } else {
            initialValues[item.variable_name] = item.initial_value || ''; // Set to initial value if available, else ''
          }
        });

        setFormValues(initialValues); // Initialize form values
      })
      .catch(error => console.error('Error fetching form data:', error));
  }, []);

  // Fetch combobox options based on form data
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
        })
        .catch(error => console.error(`Error fetching combobox options for ${item.variable_name}:`, error));
      }
    });
  }, [formData]);

  // Fetch combobox options for designation
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
        })
        .catch(error => console.error(`Error fetching combobox options for ${item.variable_name}:`, error));
      }
    });
  }, [formData]);

  // Handle input change for all input types
  const handleInputChange = (variable_name, value) => {
    setFormValues(prev => ({
      ...prev,
      [variable_name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Submitted form values:', formValues);  // Log the final formValues
    setSubmittedValues(formValues);  // Store the submitted values
  };

  return (
    <div className="container mt-4">
  
      <Page505Header/>
      <form>
        <div className="row">
          {formData.map(item => (
            <div key={item.variable_name} className="col-md-6 mb-3">
              <label className="form-label">{item.label}</label>

              {item.variable_name === 'varfromdate' ? (
                <DatePicker
                  selected={formValues[item.variable_name] ? new Date(formValues[item.variable_name]) : new Date(new Date().setDate(new Date().getDate() - 15))}
                  onChange={date => handleInputChange(item.variable_name, date)}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              ) : item.variable_name === 'vartodate' ? (
                <DatePicker
                  selected={formValues[item.variable_name] ? new Date(formValues[item.variable_name]) : new Date()}
                  onChange={date => handleInputChange(item.variable_name, date)}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              ) : item.input_type === 'text' || item.input_type === 'integer' ? (
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
              ) : item.variable_name === 'vardesignation' ? (
                <Select
                  options={[{ value: 0, label: 'All' }, ...(comboboxDesgOptions[item.variable_name] || [])]}
                  value={comboboxDesgOptions[item.variable_name]?.find(option => option.value === formValues[item.variable_name])}
                  onChange={option => handleInputChange(item.variable_name, option ? option.value : '')}
                  className="custom-select"
                  placeholder="Select Designation"
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

      {/* Display table if form is submitted */}
      <div>
        {submittedValues && <Page505table submittedValues={submittedValues} />}
      </div>
    </div>
  );
};

export default Page505;
