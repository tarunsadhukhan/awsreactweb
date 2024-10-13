import React, { useState } from 'react';

const EntryEditForm = ({ rowData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(rowData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
 
  
  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.detailed_data}
          onChange={(e) => setFormData({ ...formData, detailed_data: e.target.value })}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default EntryEditForm;
