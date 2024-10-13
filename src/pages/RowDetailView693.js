import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RowDetailView = ({ rowData, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Row Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Machine No:</strong> {rowData.frameno}</p>
        <p><strong>Doff Date:</strong> {rowData.doffdate}</p>
        <p><strong>No. of Doff:</strong> {rowData.noofdoff}</p>
        <p><strong>Production:</strong> {rowData.prod}</p>
        <p><strong>Prod/ 8 Hours:</strong> {rowData.avgprod}</p>
        <p><strong>Avg Wt per Doff:</strong> {rowData.avgwt}</p>
        <p><strong>Efficiency:</strong> {rowData.eff}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RowDetailView;