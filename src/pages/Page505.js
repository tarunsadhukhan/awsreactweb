import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Page505filter from './Page505filter';
import Page505table from './Page505table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Page505Header from './Page505Header';
import '../css/Styles.css'; // Import your custom styles

 
const Page505 = () => {
  const [formData, setFormData] = useState([]);
  const [comboboxOptions, setComboboxOptions] = useState({});
  const [comboboxDesgOptions, setComboboxDesgOptions] = useState({});
  const [submittedValues, setSubmittedValues] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/form?id=505')
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching form data:', error));
  }, []);

  useEffect(() => {
    formData.forEach(item => {
      if (item.input_type === 'combobox') {
        const company_id = 2;

        axios.get('http://localhost:5000/api/combobox-department', { params: { variable_name: item.variable_name, company_id } })
          .then(response => {
            const transformedOptions = response.data.map(option => ({
              value: option.dept_id,
              label: option.dept_desc
            }));
            setComboboxOptions(prev => ({ ...prev, [item.variable_name]: transformedOptions }));
          })
          .catch(error => console.error('Error fetching department options:', error));

        axios.get('http://localhost:5000/api/combobox-designation', { params: { variable_name: item.variable_name, company_id } })
          .then(response => {
            const transformedOptions = response.data.map(option => ({
              value: option.desg_id,
              label: option.desig
            }));
            setComboboxDesgOptions(prev => ({ ...prev, [item.variable_name]: transformedOptions }));
          })
          .catch(error => console.error('Error fetching designation options:', error));
      }
    });
  }, [formData]);

  const handleSubmit = (formValues) => {
    setSubmittedValues(formValues);
    setShowModal(false); // Hide modal on submit
    console.log('Submitted form values:', formValues);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="container mt-4">
      <Page505Header onFilterClick={handleShow} />
      
      <Modal 
        show={showModal} 
        onHide={handleClose} 
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Page505filter  
            formData={formData}
            comboboxOptions={comboboxOptions}
            comboboxDesgOptions={comboboxDesgOptions}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
       {/*    <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSubmit(submittedValues)}>
            Submit
          </Button> */}
        </Modal.Footer>
      </Modal>
   
      <Page505table submittedValues={submittedValues || {}} />

{/*       {submittedValues && <Page505table submittedValues={submittedValues} />} */}

    </div>
  );
};

export default Page505;
