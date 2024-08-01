// src/pages/AppointmentItem.js
import React from 'react';

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
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default AppointmentItem;