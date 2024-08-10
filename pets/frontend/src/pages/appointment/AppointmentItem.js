// src/pages/AppointmentItem.js
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

export default AppointmentItem;