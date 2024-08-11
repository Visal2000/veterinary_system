/*// src/pages/AppointmentItem.js
import React from 'react';
import './AppointmentItem.css';

const AppointmentItem = ({ app }) => {
  return (
    <tr>
      <td>{app.appId}</td>
      <td>{app.petId}</td>
      <td>{app.name}</td>
      <td>{app.reason}</td>
      <td>{app.doctor}</td>
      <td>{app.date}</td>
      
      <td>
        
      <button className='delete-button'>Delete</button>
        
      </td>
    </tr>
  );
};

export default AppointmentItem;*/


import React, { useState } from 'react';
import './AppointmentItem.css';
import axios from 'axios';

const AppointmentItem = ({ app, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete appointment with appId:', app.appId); // Log the appId before sending the request
      const response = await axios.delete(`http://localhost:5000/appointments/${app.appId}`);
      if (response.status === 200) {
        onDelete(app.appId); // Update the state in the parent component
      } else {
        setError(`Failed to delete appointment: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data?.error || error.message);
      setError(`Error deleting appointment: ${error.response?.data?.error || error.message}`);
    }
    setShowConfirm(false);
  };
  
  

  return (
    <tr>
      <td>{app.appId}</td>
      <td>{app.petId}</td>
      <td>{app.name}</td>
      <td>{app.reason}</td>
      <td>{app.doctor}</td>
      <td>{app.date}</td>
      <td>
        <button 
          className='delete-button' 
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </button>
        {showConfirm && (
          <div className="confirm-popup">
            <p>Are you sure you want to delete this appointment?</p>
            <button className="confirm-button" onClick={handleDelete}>Yes</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </td>
    </tr>
  );
};

export default AppointmentItem;



