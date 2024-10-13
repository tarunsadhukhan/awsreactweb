import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FilterModal = ({ isOpen, onSubmit, onClose, initialFilter }) => {
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const formattedDate = sevenDaysAgo.toISOString().split('T')[0];

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 0);
    const toformattedDate = currentDate.toISOString().split('T')[0];

    setFilter({
      ...initialFilter,
      fromDate: initialFilter.fromDate || formattedDate,
      toDate: initialFilter.toDate || toformattedDate
    });
  }, [initialFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filter);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Machine Number:</Form.Label>
            <Form.Control
              type="text"
              value={filter.machineno}
              onChange={(e) => setFilter({ ...filter, machineno: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>From Date:</Form.Label>
            <Form.Control
              type="date"
              value={filter.fromDate}
              onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>To Date:</Form.Label>
            <Form.Control
              type="date"
              value={filter.toDate}
              onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Apply Filter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;