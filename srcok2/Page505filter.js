import React, { useState } from 'react';

const Page505filter = ({ formData, comboboxOptions, comboboxDesgOptions, handleSubmit }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = () => {
    handleSubmit(formValues); // Call the handleSubmit function passed from Page505
  };

  return (
    <form>
      {/* Render form fields dynamically */}
      {formData.map((field) => (
        <div className="form-group" key={field.variable_name}>
          <label>{field.label}</label>
          {field.input_type === 'text' && (
            <input
              type="text"
              name={field.variable_name}
              className="form-control"
              onChange={handleChange}
            />
          )}
          {field.input_type === 'combobox' && (
            <select
              name={field.variable_name}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {(field.variable_name.includes('department')
                ? comboboxOptions[field.variable_name]
                : comboboxDesgOptions[field.variable_name]
              )?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </form>
  );
};

export default Page505filter;
