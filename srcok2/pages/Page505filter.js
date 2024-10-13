// Page505filter.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const Page505filter = ({ formData, comboboxOptions, comboboxDesgOptions, handleSubmit,handleClose }) => {
  // State to manage form values
  const [formValues, setFormValues] = useState({});

  // Set initial form values based on the formData passed in
  useEffect(() => {
    const initialValues = {};
    formData.forEach(item => {
      if (item.variable_name === 'varfromdate') {
        initialValues[item.variable_name] = new Date(new Date().setDate(new Date().getDate() - 15)); // Default 15 days ago
      } else if (item.variable_name === 'vartodate') {
        initialValues[item.variable_name] = new Date(); // Default to today
      } else {
        initialValues[item.variable_name] = item.initial_value || ''; // Default to initial_value or empty string
      }
    });
    setFormValues(initialValues);
  }, [formData]);

  // Handle input changes for different form fields
  const handleInputChange = (variable_name, value) => {
    setFormValues(prev => ({
      ...prev,
      [variable_name]: value
    }));
  };

  return (
    <form>
      <div className="row">
        {formData.map(item => (
          <div key={item.variable_name} className="col-md-6 mb-3">
            <label className="form-label">{item.label}</label>

            {/* Date Pickers for From Date and To Date */}
            {item.variable_name === 'varfromdate' ? (
              <DatePicker
                selected={formValues[item.variable_name] ? new Date(formValues[item.variable_name]) : new Date()}
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

      {/* Buttons for Close and Submit */}
      <div className="d-flex justify-content-center mt-4">
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
        <span style={{ width: '10px' }}></span>
        <button type="button" className="btn btn-success" onClick={() => handleSubmit(formValues)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page505filter;
